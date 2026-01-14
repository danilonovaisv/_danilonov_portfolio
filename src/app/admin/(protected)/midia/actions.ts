'use server';

import type { SiteAssetRole } from '@/lib/supabase/asset-roles';
import {
  buildAssetFilePath,
  getFileExtension,
} from '@/lib/supabase/asset-paths';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type AssetPayload = {
  key: string;
  page: string;
  asset_type: string;
  description?: string | null;
  sort_order?: number | null;
  file_path?: string | null;
  bucket?: string;
};

export async function upsertAsset(payload: AssetPayload) {
  const supabase = await createClient();
  const { error } = await supabase.from('site_assets').upsert(
    {
      ...payload,
      bucket: payload.bucket ?? 'site-assets',
      is_active: true,
    },
    { onConflict: 'key' }
  );
  if (error) throw error;
  refreshAssetRoutes();
}

type AssignAssetRolePayload = {
  assetId: string;
  role: SiteAssetRole;
};

export async function assignAssetRole(payload: AssignAssetRolePayload) {
  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from('site_assets')
    .select('bucket,file_path')
    .eq('id', payload.assetId)
    .single();

  if (fetchError || !existing) {
    throw fetchError ?? new Error('Asset não encontrado.');
  }

  const extension = getFileExtension(existing.file_path) || 'bin';
  const targetPath = buildAssetFilePath({
    page: payload.role.page,
    key: payload.role.key,
    subPath: payload.role.subPath,
    extension,
  });

  let file_path = existing.file_path;

  if (file_path !== targetPath) {
    const { error: moveError } = await supabase.storage
      .from(existing.bucket)
      .move(file_path, targetPath);
    if (moveError) throw moveError;
    file_path = targetPath;
  }

  const { error: updateError } = await supabase
    .from('site_assets')
    .update({
      key: payload.role.key,
      page: payload.role.page,
      asset_type: payload.role.asset_type,
      description: payload.role.description,
      sort_order: payload.role.sort_order ?? null,
      file_path,
    })
    .eq('id', payload.assetId);

  if (updateError) throw updateError;
  refreshAssetRoutes();
}

export async function removeAsset(payload: {
  id: string;
  bucket: string;
  file_path?: string | null;
}) {
  const supabase = await createClient();
  if (payload.file_path) {
    const { error: storageError } = await supabase.storage
      .from(payload.bucket)
      .remove([payload.file_path]);
    if (storageError) throw storageError;
  }
  const { error } = await supabase
    .from('site_assets')
    .delete()
    .eq('id', payload.id);
  if (error) throw error;
  refreshAssetRoutes();
}

function refreshAssetRoutes() {
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/portfolio');
}
