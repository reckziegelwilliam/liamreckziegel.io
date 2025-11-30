import { getPublishedPosts } from '@/app/db/posts';
import Link from 'next/link';
import { Clock, Tag, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

// Disable static generation until database is set up
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Playbooks',
  description: 'Technical guides, lessons learned, and insights from building products at scale.',
  openGraph: {
    title: 'Playbooks | Liam Reckziegel',
    description: 'Technical guides, lessons learned, and insights from building products at scale.',
    type: 'website',
  },
};

export default async function PlaybooksPage() {
  const posts = await getPublishedPosts();

  return (
    <section>
      <h1 className="font-bold text-4xl mb-4 tracking-tight">
        Playbooks
      </h1>
      <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
        Technical guides, lessons learned, and insights from building products at scale. 
        Real stories from the trenches of startup engineering.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-4">
            No playbooks published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/playbooks/${post.slug}`}
              className="block group"
            >
              <article className="border-l-4 border-transparent hover:border-[#00D9FF] pl-6 py-4 transition-all duration-200 hover:translate-x-1">
                <div className="flex items-center gap-4 text-sm text-[#9CA3AF] dark:text-[#9CA3AF] mb-2">
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={new Date(post.published_at).toISOString()}>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
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

                <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#00D9FF] transition-colors">
                  {post.title}
                </h2>
                
                {post.subtitle && (
                  <p className="text-lg text-[#9CA3AF] dark:text-[#9CA3AF] mb-3">
                    {post.subtitle}
                  </p>
                )}

                {post.summary && (
                  <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-4">
                    {post.summary}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && post.tags[0] !== '' && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-[#9CA3AF]" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-[#9CA3AF] dark:text-[#9CA3AF] hover:text-[#00D9FF] transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 text-[#00D9FF] flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read more →
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

