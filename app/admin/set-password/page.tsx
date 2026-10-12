import { getAdmin } from '@/lib/gallery/auth';
import { AdminSetPassword } from '@/components/admin/AdminSetPassword';

export default async function SetPasswordPage() {
  const admin = await getAdmin();
  return <AdminSetPassword hasAdminSession={!!admin} />;
}
