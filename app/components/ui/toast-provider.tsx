'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1A1F35',
          color: '#E8E9ED',
          border: '1px solid #00D9FF33',
        },
      }}
    />
  );
}

