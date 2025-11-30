'use client';

import { useState } from 'react';
import { SiteSettings } from '@/app/db/settings';
import { updateSettingsAction } from '@/app/actions/settings';
import { Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SettingsFormProps {
  initialSettings: SiteSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await updateSettingsAction(formData);
      toast.success('Settings updated successfully');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update settings');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Site Information */}
      <section className="p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h2 className="text-xl font-semibold mb-4">Site Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Title</label>
            <input
              placeholder="Site Title"
              type="text"
              name="site_title"
              value={settings.site_title}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              placeholder="Site Description"
              name="site_description"
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] h-20 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site URL</label>
            <input
              placeholder="Site URL"
              type="url"
              name="site_url"
              value={settings.site_url}
              onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
              required
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              placeholder="GitHub URL"
              type="url"
              name="social_github"
              value={settings.social_github || ''}
              onChange={(e) => setSettings({ ...settings, social_github: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Twitter/X URL</label>
            <input
              placeholder="Twitter/X URL"
              type="url"
              name="social_twitter"
              value={settings.social_twitter || ''}
              onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
            <input
              placeholder="LinkedIn URL"
              type="url"
              name="social_linkedin"
              value={settings.social_linkedin || ''}
              onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            />
          </div>
        </div>
      </section>

      {/* SEO Configuration */}
      <section className="p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h2 className="text-xl font-semibold mb-4">SEO Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Meta Title</label>
            <input
              placeholder="Default Meta Title"
              type="text"
              name="seo_default_title"
              value={settings.seo_default_title || ''}
              onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default Meta Description</label>
            <textarea
              placeholder="Default Meta Description"
              name="seo_default_description"
              value={settings.seo_default_description || ''}
              onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] h-20 resize-none"
              maxLength={160}
            />
            <p className="text-xs text-[#9CA3AF] mt-1">
              {settings.seo_default_description?.length || 0}/160 characters
            </p>
          </div>
        </div>
      </section>

      {/* Feature Flags */}
      <section className="p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h2 className="text-xl font-semibold mb-4">Feature Flags</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="feature_analytics_enabled"
              checked={settings.feature_analytics_enabled}
              onChange={(e) => setSettings({ ...settings, feature_analytics_enabled: e.target.checked })}
              className="w-5 h-5 rounded bg-[#0A0E1A] border-[#00D9FF]/20 text-[#00D9FF] focus:ring-[#00D9FF]"
            />
            <div>
              <div className="text-sm font-medium text-[#E8E9ED]">Enable Analytics</div>
              <div className="text-xs text-[#9CA3AF]">Track page views and user engagement</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="feature_contact_enabled"
              checked={settings.feature_contact_enabled}
              onChange={(e) => setSettings({ ...settings, feature_contact_enabled: e.target.checked })}
              className="w-5 h-5 rounded bg-[#0A0E1A] border-[#00D9FF]/20 text-[#00D9FF] focus:ring-[#00D9FF]"
            />
            <div>
              <div className="text-sm font-medium text-[#E8E9ED]">Enable Contact Form</div>
              <div className="text-xs text-[#9CA3AF]">Allow visitors to submit contact inquiries</div>
            </div>
          </label>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}

