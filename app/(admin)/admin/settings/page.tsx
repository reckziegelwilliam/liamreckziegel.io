import { getSettings } from '@/app/db/settings';
import { getUserRole } from '@/app/lib/permissions';
import { auth } from '@/app/auth';
import { SettingsForm } from './settings-form';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  const session = await auth();
  const userRole = getUserRole(session?.user);
  const settings = await getSettings();

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 bg-[#1A1F35] rounded-xl border border-[#EF4444]/30">
          <AlertTriangle className="w-12 h-12 text-[#EF4444] mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
          <p className="text-[#9CA3AF]">
            Only administrators can access site settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-[#9CA3AF]">Configure your site settings and preferences</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}

