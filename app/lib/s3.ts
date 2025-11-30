import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';

/**
 * Upload a file to S3 and return the public URL
 */
export async function uploadFileToS3(
  file: Buffer,
  filename: string,
  mimeType: string
): Promise<string> {
  if (!BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is not set');
  }

  // Generate a unique filename with timestamp
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `uploads/${timestamp}-${sanitizedFilename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: mimeType,
    ContentDisposition: `inline; filename="${filename}"`,
    // Note: Public access is handled by bucket policy, not ACL
  });

  try {
    await s3Client.send(command);
    
    // Construct the public URL
    // Format: https://bucket-name.s3.region.amazonaws.com/key
    const region = process.env.AWS_REGION || 'us-east-1';
    const url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;
    
    return url;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to upload file to S3: ${errorMessage}`);
  }
}

/**
 * Delete a file from S3
 */
export async function deleteFileFromS3(url: string): Promise<void> {
  if (!BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is not set');
  }

  try {
    // Extract the key from the URL
    // URL format: https://bucket-name.s3.region.amazonaws.com/uploads/timestamp-filename
    const urlObj = new URL(url);
    const key = urlObj.pathname.slice(1); // Remove leading slash

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting from S3:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to delete file from S3: ${errorMessage}`);
  }
}

/**
 * Generate a presigned URL for private file access (optional)
 * Use this if you want to keep files private and generate temporary access URLs
 */
export async function generatePresignedUrl(
  key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  if (!BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is not set');
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate presigned URL');
  }
}

/**
 * Get image dimensions from buffer
 */
export async function getImageDimensions(
  buffer: Buffer,
  mimeType: string
): Promise<{ width: number; height: number } | null> {
  try {
    // For a simple implementation, we'll return null
    // In production, you might want to use a library like 'sharp' or 'image-size'
    // to extract actual dimensions
    return null;
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return null;
  }
}

