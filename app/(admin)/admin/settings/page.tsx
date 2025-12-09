import { getSettings } from '@/app/db/settings';
import { SettingsForm } from './settings-form';

export const metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  const settings = await getSettings();

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

