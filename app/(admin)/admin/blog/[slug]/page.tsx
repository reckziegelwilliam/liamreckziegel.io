import { getPostById, getPostBySlugAdmin } from '@/app/db/posts';
import { notFound } from 'next/navigation';
import EditPostForm from './form';

export const metadata = {
  title: 'Edit Post',
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function EditPostPage({ params }: PageProps) {
  // Auth check handled by layout.tsx
  
  // Try to parse as ID first (for backwards compatibility with numeric IDs)
  const postId = parseInt(params.slug);
  let post;
  
  if (!isNaN(postId)) {
    post = await getPostById(postId);
  } else {
    post = await getPostBySlugAdmin(params.slug);
  }
  
  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}

