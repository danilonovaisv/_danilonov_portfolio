import { createClient } from '@supabase/supabase-js';

/**
 * Creates a static Supabase client for SSG/ISR
 * bypassing Next.js cookies() access.
 */
export function createStaticClient() {
  if (process.env.PLAYWRIGHT_TEST) {
    const mockQuery = {
      eq: () => mockQuery,
      order: () => mockQuery,
      limit: () => mockQuery,
      returns: () => Promise.resolve({ data: [], error: null }),
      select: () => mockQuery,
      single: () => Promise.resolve({ data: null, error: null }),
    };
    return {
      from: () => mockQuery,
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://umkmwbkwvulxtdodzmzf.supabase.co';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA';

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}
