import { createHmac, timingSafeEqual } from 'crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

function verifySignature(payload: string, signature: string | null): boolean {
  if (!signature || !process.env.GITHUB_WEBHOOK_SECRET) {
    return false;
  }

  const hmac = createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  // Constant-time comparison to prevent timing attacks
  try {
    return timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    
    // Verify webhook signature
    if (!verifySignature(body, signature)) {
      console.error('Invalid webhook signature');
      return Response.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const event = req.headers.get('x-github-event');
    const deliveryId = req.headers.get('x-github-delivery');

    console.log(`📬 GitHub webhook received: ${event}`, {
      deliveryId,
      action: payload.action,
      repository: payload.repository?.name,
    });

    // Handle different event types
    switch (event) {
      case 'push':
        console.log(`✅ Push event to ${payload.repository?.name}`);
        revalidateTag('github-activity');
        revalidateTag('github-repos');
        break;

      case 'star':
        const action = payload.action; // created or deleted
        console.log(`⭐ Repository ${action === 'created' ? 'starred' : 'unstarred'}: ${payload.repository?.name}`);
        revalidateTag('github-stats');
        revalidateTag('github-repos');
        break;

      case 'fork':
        console.log(`🔱 Repository forked: ${payload.repository?.name}`);
        revalidateTag('github-stats');
        break;

      case 'repository':
        // created, deleted, archived, etc.
        console.log(`📦 Repository ${payload.action}: ${payload.repository?.name}`);
        revalidateTag('github-stats');
        revalidateTag('github-repos');
        revalidateTag('github-languages');
        break;

      case 'public':
        console.log(`🌍 Repository made public: ${payload.repository?.name}`);
        revalidateTag('github-stats');
        revalidateTag('github-repos');
        break;

      case 'release':
        console.log(`🚀 Release ${payload.action}: ${payload.release?.tag_name}`);
        revalidateTag('github-repos');
        revalidateTag('github-activity');
        break;

      case 'issues':
      case 'issue_comment':
      case 'pull_request':
      case 'pull_request_review':
        console.log(`💬 ${event} ${payload.action}`);
        revalidateTag('github-activity');
        break;

      case 'watch':
        // Someone watched/starred your repo
        console.log(`👀 New watcher on ${payload.repository?.name}`);
        revalidateTag('github-stats');
        break;

      case 'ping':
        console.log('🏓 Webhook ping received');
        return Response.json({ message: 'pong' });

      default:
        console.log(`ℹ️ Unhandled event type: ${event}`);
    }

    // Always revalidate main pages to show latest activity
    revalidatePath('/');
    revalidatePath('/github');

    return Response.json({ 
      received: true,
      event,
      deliveryId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return Response.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to verify webhook is accessible
export async function GET() {
  return Response.json({ 
    status: 'GitHub webhook endpoint active',
    timestamp: new Date().toISOString(),
  });
}

