import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function createClient() {
  let cookieStore: ReadonlyRequestCookies | undefined;
  try {
    cookieStore = await cookies();
  } catch {
    // During build/static generation, cookies() might not be available
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Silenciamos o erro durante o build se não houver ENV
    if (process.env.NODE_ENV === 'production' && !cookieStore) {
      return createServerClient('http://localhost', 'placeholder', {
        cookies: { getAll: () => [], setAll: () => {} },
      });
    }

    const missing = [];
    if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!supabaseKey) missing.push('SUPABASE_KEY (ANON or PUBLISHABLE)');

    console.error(
      `[Supabase Server] Error: Missing credentials. ${missing.join(', ')}`
    );
    throw new Error(
      `Missing Supabase server client credentials: ${missing.join(', ')}`
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore?.getAll() ?? [];
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore?.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
        }
      },
    },
  });
}
