'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateSubmissionStatus } from '@/app/db/contact';
import { auth } from '@/app/auth';
import { sql } from '@/app/db/postgres';

export async function updateContactStatusAction(
  id: number,
  status: 'unread' | 'read' | 'replied' | 'archived'
) {
  // Security: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be signed in to manage contact submissions');
  }

  try {
    await updateSubmissionStatus(id, status);
    revalidatePath('/contact');
    return { success: true };
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw new Error('Failed to update contact status');
  }
}

export async function deleteContactAction(id: number) {
  // Security: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be signed in to delete contact submissions');
  }

  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error('Database not configured');
    }

    await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
    revalidatePath('/contact');
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw new Error('Failed to delete contact submission');
  }
}

