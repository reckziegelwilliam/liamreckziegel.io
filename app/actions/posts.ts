'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createPost,
  updatePost,
  deletePost,
} from '@/app/db/posts';
import { generateSlug, calculateReadingTime } from '@/app/utils/blog';
import { createContactSubmission } from '@/app/db/contact';
import { auth } from '@/app/auth';

export async function createPostAction(formData: FormData) {
  // Security: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be signed in to create posts');
  }
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;
  const type = formData.get('type') as string;
  const coverImageUrl = formData.get('cover_image_url') as string;
  const status = formData.get('status') as 'draft' | 'published';
  const tagsString = formData.get('tags') as string;
  let slug = formData.get('slug') as string;

  // Generate slug from title if not provided
  if (!slug || slug.trim() === '') {
    slug = generateSlug(title);
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  // Parse tags
  const tags = tagsString
    ? tagsString.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  await createPost({
    slug,
    title,
    subtitle,
    summary,
    content,
    type,
    cover_image_url: coverImageUrl,
    status,
    reading_time_minutes: readingTime,
    tags,
  });

  // Revalidate paths
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath('/playbooks');
  
  // Only revalidate the specific post page if it's published
  if (status === 'published') {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/playbooks/${slug}`);
  }
  
  redirect('/admin/blog');
}

export async function updatePostAction(id: number, formData: FormData) {
  // Security: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be signed in to edit posts');
  }

  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;
  const type = formData.get('type') as string;
  const coverImageUrl = formData.get('cover_image_url') as string;
  const status = formData.get('status') as 'draft' | 'published';
  const tagsString = formData.get('tags') as string;
  let slug = formData.get('slug') as string;

  // Generate slug from title if not provided
  if (!slug || slug.trim() === '') {
    slug = generateSlug(title);
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  // Parse tags
  const tags = tagsString
    ? tagsString.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  await updatePost(id, {
    slug,
    title,
    subtitle,
    summary,
    content,
    type,
    cover_image_url: coverImageUrl,
    status,
    reading_time_minutes: readingTime,
    tags,
  });

  // Revalidate paths
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath('/playbooks');
  
  // Only revalidate the specific post page if it's published
  if (status === 'published') {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/playbooks/${slug}`);
  }
  
  redirect('/admin/blog');
}

export async function deletePostAction(id: number) {
  // Security: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be signed in to delete posts');
  }

  await deletePost(id);
  revalidatePath('/blog');
  revalidatePath('/playbooks');
  redirect('/admin/blog');
}

export async function submitContactForm(formData: FormData) {
  const type = formData.get('type') as 'hire' | 'studio';
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const projectBrief = formData.get('project_brief') as string;
  const budgetRange = formData.get('budget_range') as string;
  const timeline = formData.get('timeline') as string;

  try {
    await createContactSubmission({
      type,
      name,
      email,
      company,
      project_brief: projectBrief,
      budget_range: budgetRange,
      timeline,
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
}

