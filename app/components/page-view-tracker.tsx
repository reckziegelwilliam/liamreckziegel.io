'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageViewAction } from '@/app/actions/analytics';

interface PageViewTrackerProps {
  postSlug?: string;
}

export function PageViewTracker({ postSlug }: PageViewTrackerProps) {
  const pathname = usePathname();
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per page visit
    if (tracked.current) return;
    tracked.current = true;

    const trackView = async () => {
      try {
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;

        await trackPageViewAction({
          path: pathname,
          post_slug: postSlug,
          user_agent: userAgent,
          referrer: referrer,
        });
      } catch (error) {
        // Silently fail - don't break the page
        console.error('Failed to track page view:', error);
      }
    };

    trackView();
  }, [pathname, postSlug]);

  // This component doesn't render anything
  return null;
}

