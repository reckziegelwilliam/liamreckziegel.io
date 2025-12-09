import { getPublishedPosts } from '@/app/db/posts';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/playbooks/${post.slug}`}
              className="block group"
            >
              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 transition-all duration-300 hover:border-[#00D9FF] hover:shadow-lg hover:shadow-[#00D9FF]/20">
                {/* Cover Image Section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/liam_rex_playbook.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/10" />
                  
                  {/* Text overlay */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-200 w-fit">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400" />
                      {post.type || 'Playbook'}
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl md:text-2xl font-semibold text-slate-50 group-hover:text-[#00D9FF] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.subtitle && (
                        <p className="text-sm text-slate-200/80 line-clamp-2">
                          {post.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                    {post.published_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={new Date(post.published_at).toISOString()}>
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
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
                  </div>

                  {/* Summary */}
                  {post.summary && (
                    <p className="text-[#9CA3AF] line-clamp-3">
                      {post.summary}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && post.tags[0] !== '' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4 text-[#9CA3AF]" />
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-[#9CA3AF] hover:text-[#00D9FF] transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read more */}
                  <div className="pt-2 text-[#00D9FF] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read more →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

