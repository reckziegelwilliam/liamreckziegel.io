'use server';

import { trackPageView } from '@/app/db/analytics';

export async function trackPageViewAction(data: {
  path: string;
  post_slug?: string;
  user_agent?: string;
  referrer?: string;
}): Promise<void> {
  try {
    await trackPageView(data);
  } catch (error) {
    // Silently fail - don't break the page if analytics fails
    console.error('Error tracking page view:', error);
  }
}

