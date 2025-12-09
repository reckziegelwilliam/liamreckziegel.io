import { notFound } from 'next/navigation';
import { CustomMDX } from '@/app/components/mdx';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@/app/db/postgres';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering for preview page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Preview Post',
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string;
  type: string;
  cover_image_url?: string;
  status: 'draft' | 'published';
  reading_time_minutes?: number;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
  tags: string[];
}

// Get post regardless of status (for preview)
async function getPostForPreview(slug: string): Promise<Post | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  
  const result = await sql`
    SELECT p.*, 
           COALESCE(
             array_agg(DISTINCT pt.tag) FILTER (WHERE pt.tag IS NOT NULL), 
             '{}'
           ) as tags
    FROM posts p
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    WHERE p.slug = ${slug}
    GROUP BY p.id
  `;

  return result.length > 0 ? (result[0] as any) : null;
}

function formatDate(date: Date | string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  };
  return d.toLocaleDateString('en-US', options);
}

export default async function PreviewPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostForPreview(slug);
  } catch (error) {
    console.error('Error fetching post for preview:', error);
    throw error;
  }
  
  if (!post) {
    notFound();
  }

  return (
    <section>
      <Link
        href={`/admin/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#00D9FF] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Edit
      </Link>

      <div className="mb-6 p-4 bg-[#FFB84D]/20 border border-[#FFB84D] rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#FFB84D] font-medium">
            📝 Preview Mode - Status: {post.status}
          </p>
          {post.status === 'draft' && (
            <p className="text-xs text-[#9CA3AF]">
              This post is not publicly visible
            </p>
          )}
        </div>
      </div>

      <article className="prose prose-invert prose-quoteless max-w-none">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.published_at || post.created_at,
              dateModified: post.updated_at,
              description: post.summary,
              image: post.cover_image_url,
              url: `https://liamreckziegel.io/playbooks/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'Liam Reckziegel',
              },
            }),
          }}
        />
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-xl text-[#9CA3AF] mb-4">{post.subtitle}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-[#9CA3AF] mb-8">
          <time dateTime={new Date(post.created_at).toISOString()} suppressHydrationWarning>
            {formatDate(post.created_at)}
          </time>
          {post.reading_time_minutes && (
            <>
              <span>·</span>
              <span>{post.reading_time_minutes} min read</span>
            </>
          )}
        </div>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-lg mb-8"
          />
        )}

        {post.tags && post.tags.length > 0 && post.tags[0] !== '' && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#00D9FF]/10 text-[#00D9FF] rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

