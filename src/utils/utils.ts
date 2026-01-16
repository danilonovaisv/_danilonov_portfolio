import type React from 'react';
import { SUPABASE_STORAGE_URL } from '@/config/brand';

export const ASSET_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

function normalizePath(path: string) {
  return path
    .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
    .replace(/^\/?storage\/v1\/object\/public\//, '')
    .replace(/^\/+/, '');
}

export function getAssetUrl(path?: string | null): string {
  if (!path) return ASSET_PLACEHOLDER;
  const trimmed = path.trim();
  if (!trimmed) return ASSET_PLACEHOLDER;
  if (/^https?:\/\//.test(trimmed)) return trimmed;

  const normalized = normalizePath(trimmed);
  if (!normalized) return ASSET_PLACEHOLDER;

  return `${SUPABASE_STORAGE_URL}/${normalized}`;
}

export function applyImageFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event>
) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied) return;
  target.dataset.fallbackApplied = 'true';
  target.src = ASSET_PLACEHOLDER;
}
