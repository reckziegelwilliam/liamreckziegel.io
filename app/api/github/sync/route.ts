import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Verify this is called by Vercel Cron (or manual with secret)
  const authHeader = req.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('🔄 Running scheduled GitHub sync...');

  try {
    // Revalidate all GitHub-related tags
    revalidateTag('github-stats');
    revalidateTag('github-activity');
    revalidateTag('github-repos');
    revalidateTag('github-languages');
    revalidateTag('github-contributions');
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/github');

    console.log('✅ GitHub sync completed successfully');

    return Response.json({ 
      synced: true,
      timestamp: new Date().toISOString(),
      tags: [
        'github-stats',
        'github-activity', 
        'github-repos',
        'github-languages',
        'github-contributions'
      ]
    });
  } catch (error) {
    console.error('❌ GitHub sync failed:', error);
    return Response.json(
      { error: 'Sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

