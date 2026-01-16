import { createClientComponentClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';
import {
  normalizeAssetRecord,
  type NormalizedSiteAsset,
} from '@/lib/supabase/site-asset-utils';

export type SiteAsset = NormalizedSiteAsset;

export async function getClientSiteAssets() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('page', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  if (error) throw error;

  const records = (data ?? []) as DbAsset[];
  return records.map((asset) => normalizeAssetRecord(asset)) as SiteAsset[];
}
