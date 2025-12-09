import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import ViewCounter from '../view-counter';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import { PostCover } from '@/app/components/post-cover';
import { ReadingProgress } from './reading-progress';
import { TableOfContents, extractHeadings } from '@/app/components/table-of-contents';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://liamrex.io${image}`
    : `https://liamrex.io/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://liamrex.io/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  noStore();
  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgress />
      <div className="xl:grid xl:grid-cols-[1fr_250px] xl:gap-12">
        <section>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `https://liamrex.io${post.metadata.image}`
                  : `https://liamrex.io/og?title=${post.metadata.title}`,
                url: `https://liamrex.io/blog/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'Liam Reckziegel',
                },
              }),
            }}
          />
          
          {/* PostCover component with dynamic text overlay */}
          <PostCover
            title={post.metadata.title}
            subtitle={post.metadata.summary}
            label="Blog Post"
          />

          <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
            <Suspense fallback={<p className="h-5" />}>
              <Views slug={post.slug} />
            </Suspense>
          </div>
          <article className="prose prose-quoteless prose-neutral dark:prose-invert">
            <CustomMDX source={post.content} />
          </article>
        </section>
        
        <aside className="hidden xl:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
