import type { User } from '@supabase/supabase-js';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
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
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new AdminAccessError(error.message, 'unauthorized');
  }

  assertAdminAccess(user);
  return { supabase, user };
}
