#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import { promises as fs, readFileSync } from 'node:fs';
import { normalizeStoragePath } from '../src/lib/supabase/urls';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SiteAssetRow {
  id: string;
  key: string;
  bucket: string | null;
  file_path: string | null;
  updated_at: string | null;
  asset_type: string | null;
}

function parseEnvFile(filePath: string): Record<string, string> {
  try {
    const content = readFileSync(filePath, 'utf8');
    return content
      .split(/\r?\n/)
      .reduce<Record<string, string>>((acc, line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return acc;
        const [key, ...rest] = trimmed.split('=');
        if (!key) return acc;
        acc[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
        return acc;
      }, {});
  } catch {
    return {};
  }
}

function loadEnvOverrides() {
  const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
  const overrides = parseEnvFile(envFile);
  return {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ??
      overrides.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL ?? overrides.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY:
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      overrides.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY:
      process.env.SUPABASE_SERVICE_KEY ?? overrides.SUPABASE_SERVICE_KEY,
  };
}

// Helper to detect corrupt data
function isCorruptData(value: string | null | undefined): boolean {
  if (!value) return false;
  // Timestamp pattern
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return true;
  // Excessive path repetition
  const segments = value.split('/');
  if (segments.length > 10) return true;
  return false;
}

async function main() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY,
  } = loadEnvOverrides();

  const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL;
  const serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Fetch all records
  const { data, error } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at,asset_type');

  if (error) throw error;

  const rows = (data ?? []) as SiteAssetRow[];

  // Save backup
  const backupPath = path.resolve(
    process.cwd(),
    `site_assets_backup-${Date.now()}.json`
  );
  await fs.writeFile(backupPath, JSON.stringify(rows, null, 2), 'utf8');
  console.log(`✅ Backup salvo em ${backupPath}`);

  // Identify corrupt records
  const corruptIds = rows
    .filter((r) => isCorruptData(r.key) || isCorruptData(r.file_path))
    .map((r) => r.id);

  if (corruptIds.length > 0) {
    console.log(
      `\n🗑️  Encontrados ${corruptIds.length} registros corruptos (timestamps/malformed data).`
    );
    console.log('IDs:', corruptIds.slice(0, 5));

    // Delete corrupt records
    const { error: deleteError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', corruptIds);

    if (deleteError) {
      console.error('❌ Erro ao deletar registros corruptos:', deleteError);
      throw deleteError;
    }

    console.log(`✅ ${corruptIds.length} registros corruptos deletados.`);
  }

  // Now handle duplicates by key
  const keyMap = new Map<string, string[]>();
  rows
    .filter((r) => !corruptIds.includes(r.id)) // Exclude already-deleted corrupt records
    .forEach((asset) => {
      if (!keyMap.has(asset.key)) {
        keyMap.set(asset.key, []);
      }
      keyMap.get(asset.key)!.push(asset.id);
    });

  // Find duplicate IDs (keep first, delete rest)
  const duplicateIds: string[] = [];
  keyMap.forEach((ids, key) => {
    if (ids.length > 1) {
      console.log(`⚠️  Chave duplicada: "${key}" (${ids.length} registros)`);
      duplicateIds.push(...ids.slice(1)); // Keep first, mark rest for deletion
    }
  });

  if (duplicateIds.length > 0) {
    console.log(
      `\n🗑️  Deletando ${duplicateIds.length} registros duplicados...`
    );

    const { error: deleteDupError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', duplicateIds);

    if (deleteDupError) {
      console.error('❌ Erro ao deletar duplicatas:', deleteDupError);
      throw deleteDupError;
    }

    console.log(`✅ Duplicatas removidas.`);
  }

  console.log(
    '\n✅ Limpeza concluída. Execute o script de reparo novamente se necessário.'
  );
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
