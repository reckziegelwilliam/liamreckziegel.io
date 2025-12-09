import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import ViewCounter from './view-counter';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      <div className="space-y-6">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="group block"
              href={`/blog/${post.slug}`}
            >
              <article className="relative aspect-[1200/630] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-slate-950 transition-all hover:shadow-lg dark:hover:shadow-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700">
                {/* Background Cover Image */}
                <Image
                  src="/liam_rex_playbook.png"
                  alt={post.metadata.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Gradient overlay - darker on left, lighter on right for text */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/10" />
                
                {/* Content Grid - Split into two halves */}
                <div className="relative z-10 grid grid-cols-2 h-full">
                  {/* Left Side - Label Badge */}
                  <div className="flex items-start p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-200">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400" />
                      playbook
                    </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="flex flex-col justify-center p-6 md:p-8 bg-white/95 dark:bg-slate-950/95">
                    <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      <time dateTime={post.metadata.publishedAt}>
                        {formatDate(post.metadata.publishedAt)}
                      </time>
                      <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                      <span>{calculateReadingTime(post.content)} min read</span>
                    </div>

                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 md:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.metadata.title}
                    </h2>

                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
                      {post.metadata.summary}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                        Read more
                        <svg 
                          className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
      </div>
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
