import { useAuthStore } from '@/store/authStore';
import { CreatorDashboard } from '@/components/dashboard/CreatorDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {user.role === 'admin' ? <AdminDashboard /> : <CreatorDashboard />}
    </div>
  );
}