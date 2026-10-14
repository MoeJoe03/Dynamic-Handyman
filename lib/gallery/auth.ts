import { createClient } from '@/lib/supabase/server';

export async function getAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  const userId = user?.id;
  if (authError || !userId) return null;

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !admin) return null;
  return { supabase, userId };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}
