import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const role = user.app_metadata?.role ?? 'user';

  if (role !== 'admin') {
    redirect('/');
  }

  redirect('/admin/dashboard');
}
