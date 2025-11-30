'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function AuthErrorToast() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'unauthorized') {
      setShow(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm max-w-md">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="font-semibold">Access Denied</p>
            <p className="text-sm mt-1 opacity-90">
              You don't have permission to access the admin area.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

