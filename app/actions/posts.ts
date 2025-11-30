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
import { permissions } from '@/app/lib/permissions';

export async function createPostAction(formData: FormData) {
  // Security: Verify user has permission to create posts
  const session = await auth();
  if (!session || !permissions.blog.create(session.user)) {
    throw new Error('Unauthorized: You do not have permission to create posts');
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

  try {
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

    revalidatePath('/blog');
    revalidatePath('/playbooks');
    redirect('/admin/blog');
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}

export async function updatePostAction(id: number, formData: FormData) {
  // Security: Verify user has permission to edit posts
  const session = await auth();
  if (!session || !permissions.blog.edit(session.user)) {
    throw new Error('Unauthorized: You do not have permission to edit posts');
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

  try {
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

    revalidatePath('/blog');
    revalidatePath('/playbooks');
    revalidatePath(`/playbooks/${slug}`);
    redirect('/admin/blog');
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
}

export async function deletePostAction(id: number) {
  // Security: Verify user has permission to delete posts (admin only)
  const session = await auth();
  if (!session || !permissions.blog.delete(session.user)) {
    throw new Error('Unauthorized: Only admins can delete posts');
  }

  try {
    await deletePost(id);
    revalidatePath('/blog');
    revalidatePath('/playbooks');
    redirect('/admin/blog');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
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

