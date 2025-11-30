'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] p-4">
      <div className="max-w-md w-full p-8 bg-[#1A1F35] rounded-xl border border-[#EF4444]/30">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
          <h1 className="text-2xl font-bold text-[#E8E9ED]">Something went wrong</h1>
        </div>
        
        <p className="text-[#9CA3AF] mb-6">
          {error.message || 'An unexpected error occurred in the admin panel.'}
        </p>

        {error.digest && (
          <p className="text-sm text-[#9CA3AF] mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-4 py-2 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] transition-colors font-medium"
          >
            Try Again
          </button>
          <a
            href="/admin/dashboard"
            className="flex-1 px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/30 text-[#E8E9ED] rounded-lg hover:border-[#00D9FF] transition-colors text-center"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

