import { auth } from '@/app/auth';

export default async function DebugSessionPage() {
  const session = await auth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Debug Info</h1>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      <div className="mt-4">
        <p><strong>Email from session:</strong> {session?.user?.email || 'No email found'}</p>
        <p><strong>Name:</strong> {session?.user?.name || 'No name found'}</p>
        <p><strong>ID:</strong> {session?.user?.id || 'No ID found'}</p>
      </div>
    </div>
  );
}

