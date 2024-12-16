import { getBlogPosts } from 'app/db/blog';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://liamrex.io/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/blog', '/guestbook', '/uses', '/work'].map((route) => ({
    url: `https://liamrex.io${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
