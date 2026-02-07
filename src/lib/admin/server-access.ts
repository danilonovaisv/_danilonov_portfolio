import type { User } from '@supabase/supabase-js';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export class AdminAccessError extends Error {
  public readonly code: 'unauthorized' | 'forbidden';

  constructor(message: string, code: 'unauthorized' | 'forbidden') {
    super(message);
    this.name = 'AdminAccessError';
    this.code = code;
  }
}

export function assertAdminAccess(user: User | null | undefined) {
  if (!user) {
    throw new AdminAccessError('Unauthorized.', 'unauthorized');
  }

  if (shouldEnforceAdminRole() && !isAdminUser(user)) {
    throw new AdminAccessError('Forbidden.', 'forbidden');
  }
}

export async function requireAdminAccess() {
  const requestScopedSupabase = await createClient();
  const {
    data: { user },
    error,
  } = await requestScopedSupabase.auth.getUser();

  if (error) {
    throw new AdminAccessError(error.message, 'unauthorized');
  }

  assertAdminAccess(user);

  let supabase = requestScopedSupabase;

  try {
    supabase = createAdminClient();
  } catch {
    // Keep request-scoped client as fallback when service role is not configured.
  }

  return { supabase, user };
}
