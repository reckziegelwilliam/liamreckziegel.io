import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from './components/admin-nav';
import { ToastProvider } from '@/app/components/ui/toast-provider';

export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin',
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Only authenticated users can access admin area
  // Email validation happens in auth.ts signIn callback
  if (!session?.user) {
    redirect('/?error=unauthorized');
  }

  return (
    <div className="min-h-screen flex bg-[#0A0E1A]">
      <ToastProvider />
      {/* Sidebar Navigation */}
      <AdminNav user={session?.user || { name: '', email: '', image: '' }} />
      
      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

