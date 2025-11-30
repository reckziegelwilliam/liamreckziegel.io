'use server';

import { revalidatePath } from 'next/cache';
import { updateSettings } from '@/app/db/settings';
import { auth } from '@/app/auth';
import { permissions } from '@/app/lib/permissions';

export async function updateSettingsAction(formData: FormData) {
  // Security: Verify user is admin (only admins can update settings)
  const session = await auth();
  if (!session || !permissions.settings.edit(session.user)) {
    throw new Error('Unauthorized: Only admins can update settings');
  }

  try {
    const settings = {
      site_title: formData.get('site_title') as string,
      site_description: formData.get('site_description') as string,
      site_url: formData.get('site_url') as string,
      social_github: formData.get('social_github') as string,
      social_twitter: formData.get('social_twitter') as string,
      social_linkedin: formData.get('social_linkedin') as string,
      seo_default_title: formData.get('seo_default_title') as string,
      seo_default_description: formData.get('seo_default_description') as string,
      feature_analytics_enabled: formData.get('feature_analytics_enabled') === 'on',
      feature_contact_enabled: formData.get('feature_contact_enabled') === 'on',
    };

    await updateSettings(settings);
    revalidatePath('/settings');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw new Error('Failed to update settings');
  }
}

