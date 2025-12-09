import { auth } from '@/app/auth';
import Link from 'next/link';

export default async function DebugSessionPage() {
  const session = await auth();
  
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          🔍 Session Debug Info
        </h1>
        
        {session ? (
          <>
            <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-100">
                ✅ You are signed in
              </h2>
              <div className="space-y-2 text-neutral-900 dark:text-neutral-100">
                <p><strong>Email:</strong> <span className="font-mono bg-white dark:bg-neutral-800 px-2 py-1 rounded">{session.user?.email || 'NO EMAIL FOUND'}</span></p>
                <p><strong>Name:</strong> {session.user?.name || 'No name'}</p>
                <p><strong>ID:</strong> {session.user?.id || 'No ID'}</p>
                <p><strong>Image:</strong> {session.user?.image ? '✓ Yes' : '✗ No'}</p>
              </div>
            </div>

            <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
                📋 Expected Admin Emails
              </h2>
              <ul className="list-disc list-inside space-y-1 text-neutral-900 dark:text-neutral-100">
                <li className="font-mono bg-white dark:bg-neutral-800 px-2 py-1 rounded inline-block mb-2">reckziegel.william96@gmail.com</li>
                <li className="font-mono bg-white dark:bg-neutral-800 px-2 py-1 rounded inline-block">reckziegel.william@gmail.com</li>
              </ul>
              {session.user?.email && (
                <p className="mt-4">
                  <strong>Match Status:</strong>{' '}
                  {session.user.email === 'reckziegel.william96@gmail.com' || 
                   session.user.email === 'reckziegel.william@gmail.com' ? (
                    <span className="text-green-600 dark:text-green-400 font-bold">✅ MATCH - Should have access!</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-bold">❌ NO MATCH - This is the problem!</span>
                  )}
                </p>
              )}
            </div>

            <details className="mb-6">
              <summary className="cursor-pointer text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                🔧 Full Session Object (click to expand)
              </summary>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm text-neutral-900 dark:text-neutral-100">
                {JSON.stringify(session, null, 2)}
              </pre>
            </details>

            <div className="flex gap-4">
              <Link 
                href="/admin/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Admin Access
              </Link>
              <Link 
                href="/api/auth/signout"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sign Out
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-yellow-900 dark:text-yellow-100">
                ⚠️ Not Signed In
              </h2>
              <p className="text-neutral-900 dark:text-neutral-100">You need to sign in first to see your session info.</p>
            </div>
            <Link 
              href="/api/auth/signin"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          </>
        )}
        
        <div className="mt-8">
          <Link 
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

