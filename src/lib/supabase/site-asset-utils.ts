import type { DbAsset } from '@/types/admin';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
  validateExternalUrl,
} from '@/lib/supabase/urls';

export type NormalizedSiteAsset = DbAsset & {
  publicUrl: string;
  href?: string | null;
  resolvedPage: string;
};

export function normalizeAssetRecord(asset: DbAsset): NormalizedSiteAsset {
  const cleanBucket = ((asset.bucket || 'site-assets') as string)
    .replace(/^bucket:\s*/i, '')
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '')
    .replace(/^\/+|\/+$/g, '');

  const cleanKey = asset.key
    ?.replace(/^key:\s*/i, '')
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '')
    .replace(/,+$/g, '')
    .trim();

  const cleanPath = normalizeStoragePath(asset.file_path, cleanBucket);

  // Corrige bucket para media de portfólio que foram importadas com o bucket errado
  const resolvedBucket =
    cleanBucket === 'site-assets' && cleanPath.startsWith('projects/')
      ? 'portfolio-media'
      : cleanBucket;

  const inferPageFromValue = (value?: string | null) => {
    if (!value) return undefined;
    const trimmed = value
      .replace(/^page:\s*/i, '')
      .replace(/^"+|"+$/g, '')
      .replace(/^'+|'+$/g, '')
      .replace(/,+$/g, '')
      .trim();
    if (!trimmed) return undefined;
    if (/^updated_at:/i.test(trimmed) || /^key:/i.test(trimmed)) return undefined;
    const delimiter = trimmed.includes('/') ? '/' : '.';
    const base = trimmed.split(delimiter)[0];
    return base?.toLowerCase();
  };

  const resolvedPage =
    inferPageFromValue(asset.page) ||
    inferPageFromValue(cleanPath) ||
    inferPageFromValue(cleanKey) ||
    'global';

  const publicUrl =
    buildSupabaseStorageUrl(resolvedBucket, cleanPath) ||
    (asset.file_path?.startsWith('http') ? asset.file_path : '') ||
    '';

  // Processar href se existir
  let processedAsset: NormalizedSiteAsset = {
    ...asset,
    key: cleanKey ?? asset.key,
    bucket: resolvedBucket,
    file_path: cleanPath,
    page: resolvedPage,
    resolvedPage,
    publicUrl,
  };

  if (asset.href) {
    const validatedHref = validateExternalUrl(asset.href);
    if (validatedHref) {
      processedAsset = {
        ...processedAsset,
        href: validatedHref,
      };
    }
  }

  return processedAsset;
}

export function normalizeAssetList(
  assets: DbAsset[],
  options: { onlyActive?: boolean; dropInvalid?: boolean } = {}
) {
  const { onlyActive = false, dropInvalid = true } = options;
  const normalized = new Map<string, NormalizedSiteAsset>();

  const isInvalidValue = (value?: string | null) => {
    if (!value) return true;
    const normalizedValue = value.trim().toLowerCase();
    if (!normalizedValue) return true;
    return (
      normalizedValue.startsWith('updated_at:') ||
      normalizedValue.startsWith('key:') ||
      normalizedValue === '.keep'
    );
  };

  const scoreRecord = (record: NormalizedSiteAsset) => {
    const activeScore = record.is_active ? 4 : 0;
    const urlScore = record.publicUrl ? 2 : 0;
    const pathScore = record.file_path?.includes('/') ? 1 : 0;
    return activeScore + urlScore + pathScore;
  };

  for (const asset of assets) {
    const record = normalizeAssetRecord(asset);
    const key = record.key?.trim();
    if (!key) continue;

    if (dropInvalid) {
      if (isInvalidValue(key) || isInvalidValue(record.file_path)) continue;
    }

    if (onlyActive && !record.is_active) continue;

    const hasUsableUrl = Boolean(
      record.publicUrl || record.asset_type === 'font'
    );
    if (dropInvalid && !hasUsableUrl) continue;

    const existing = normalized.get(key);
    if (!existing) {
      normalized.set(key, record);
      continue;
    }

    if (scoreRecord(record) > scoreRecord(existing)) {
      normalized.set(key, record);
    }
  }

  return Array.from(normalized.values()).sort((a, b) => {
    const pageA = a.page ?? '';
    const pageB = b.page ?? '';
    if (pageA === pageB) {
      const orderA = a.sort_order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.sort_order ?? Number.MAX_SAFE_INTEGER;
      if (orderA === orderB) return a.key.localeCompare(b.key);
      return orderA - orderB;
    }
    return pageA.localeCompare(pageB);
  });
}
