'use server';

import { revalidatePath } from 'next/cache';
import { createMediaItem, deleteMediaItem, getMediaItemById } from '@/app/db/media';
import { auth } from '@/app/auth';
import { permissions } from '@/app/lib/permissions';
import { uploadFileToS3, deleteFileFromS3, getImageDimensions } from '@/app/lib/s3';

export async function uploadMediaAction(formData: FormData) {
  // Security: Verify user has permission to upload media
  const session = await auth();
  if (!session || !permissions.media.upload(session.user)) {
    throw new Error('Unauthorized: You do not have permission to upload media');
  }

  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only images are allowed.');
  }

  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to S3
    const url = await uploadFileToS3(buffer, file.name, file.type);

    // Get image dimensions if it's an image
    let width, height;
    if (file.type.startsWith('image/')) {
      const dimensions = await getImageDimensions(buffer, file.type);
      width = dimensions?.width;
      height = dimensions?.height;
    }

    // Store metadata in database
    await createMediaItem({
      filename: file.name,
      url: url,
      size: file.size,
      mime_type: file.type,
      width,
      height,
      uploaded_by: session.user?.email || undefined,
    });

    revalidatePath('/media');
    return { success: true, url };
  } catch (error) {
    console.error('Error uploading media:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to upload media: ${errorMessage}`);
  }
}

export async function deleteMediaAction(id: number) {
  // Security: Verify user is admin (only admins can delete media)
  const session = await auth();
  if (!session || !permissions.media.delete(session.user)) {
    throw new Error('Unauthorized: Only admins can delete media');
  }

  try {
    // Get the media item to retrieve the S3 URL
    const mediaItem = await getMediaItemById(id);
    if (!mediaItem) {
      throw new Error('Media item not found');
    }

    // Delete the file from S3
    await deleteFileFromS3(mediaItem.url);

    // Delete the database record
    await deleteMediaItem(id);
    
    revalidatePath('/media');
    return { success: true };
  } catch (error) {
    console.error('Error deleting media:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to delete media: ${errorMessage}`);
  }
}

