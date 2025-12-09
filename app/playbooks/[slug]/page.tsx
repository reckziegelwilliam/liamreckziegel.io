import { getPostBySlug, getPublishedPosts } from '@/app/db/posts';
import { notFound } from 'next/navigation';
import { Clock, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CustomMDX } from '@/app/components/mdx';
import { getBlogPostSchema } from '@/lib/structured-data';
import { PostCover } from '@/app/components/post-cover';
import { PageViewTracker } from '@/app/components/page-view-tracker';

interface PageProps {
  params: {
    slug: string;
  };
}

// Disable static generation until database is set up
export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   const posts = await getPublishedPosts();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary || post.subtitle,
    openGraph: {
      title: post.title,
      description: post.summary || post.subtitle,
      type: 'article',
      publishedTime: post.published_at?.toISOString(),
      authors: ['Liam Reckziegel'],
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || post.subtitle,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function PlaybookPost({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Page View Tracking */}
      <PageViewTracker postSlug={post.slug} />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(getBlogPostSchema({
            ...post,
            published_at: post.published_at || new Date(),
            updated_at: post.updated_at
          })) 
        }}
      />

      <section>
      {/* Back button */}
      <Link
        href="/playbooks"
        className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#00D9FF] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Playbooks
      </Link>

      {/* PostCover component with dynamic text overlay */}
      <PostCover
        title={post.title}
        subtitle={post.subtitle}
        label="Liamrex · Playbook"
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-[#9CA3AF] dark:text-[#9CA3AF] mb-4">
          {post.published_at && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={new Date(post.published_at).toISOString()}>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          )}
          
          {post.reading_time_minutes && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time_minutes} min read</span>
            </div>
          )}

          {post.type && (
            <div className="px-2 py-0.5 bg-[#1A1F35] dark:bg-[#1A1F35] text-[#00D9FF] rounded text-xs uppercase">
              {post.type}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-xl text-[#9CA3AF] dark:text-[#9CA3AF]">
            {post.subtitle}
          </p>
        )}

        {post.tags && post.tags.length > 0 && post.tags[0] !== '' && (
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <Tag className="w-4 h-4 text-[#9CA3AF]" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-[#1A1F35] dark:bg-[#1A1F35] text-[#9CA3AF] rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>

      {/* CTA */}
      <div className="mt-16 p-8 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h3 className="text-2xl font-semibold mb-2">
          Want help with this?
        </h3>
        <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-4">
          If you're facing similar challenges and need someone who can architect, build, and ship—let's talk.
        </p>
        <Link
          href="/contact?type=hire"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#0A0E1A] rounded-lg font-medium hover:bg-[#00B8D9] hover:scale-105 transition-all"
        >
          Get in Touch →
        </Link>
      </div>
    </section>
    </>
  );
}

