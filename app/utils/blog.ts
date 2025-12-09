// Blog utility functions (non-server)

// Calculate reading time from content
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== 'string') {
    return 1; // Default to 1 minute for empty/invalid content
  }
  
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute) || 1;
}

// Generate slug from title
export function generateSlug(title: string): string {
  if (!title || typeof title !== 'string') {
    return 'untitled-post'; // Fallback for empty/invalid titles
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled-post';
}

