'use client';

import { useState } from 'react';
import { MarkdownEditor } from '@/app/components/markdown-editor';
import { updatePostAction, deletePostAction } from '@/app/actions/posts';
import { PostWithTags } from '@/app/db/posts';
import { Save, Eye, Trash2, Loader2, ArrowLeft, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface EditPostFormProps {
  post: PostWithTags;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    summary: post.summary || '',
    content: post.content,
    type: post.type,
    cover_image_url: post.cover_image_url || '',
    tags: post.tags?.filter((t) => t !== '').join(', ') || '',
  });

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      form.append('status', status);

      await updatePostAction(post.id, form);
      // Server action will handle redirect, but this shouldn't be reached
      // unless there's an error
    } catch (error: any) {
      console.error('Error updating post:', error);
      
      // Check if this is a redirect error (which is actually success in Next.js)
      if (error?.message?.includes('NEXT_REDIRECT') || error?.digest?.includes('NEXT_REDIRECT')) {
        // This is actually a successful redirect, ignore the error
        return;
      }
      
      // Show user-friendly error message
      const errorMessage = error?.message || 'Failed to update post. Please try again.';
      alert(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await deletePostAction(post.id);
      // Server action will handle redirect
    } catch (error: any) {
      console.error('Error deleting post:', error);
      
      // Check if this is a redirect error (which is actually success in Next.js)
      if (error?.message?.includes('NEXT_REDIRECT') || error?.digest?.includes('NEXT_REDIRECT')) {
        // This is actually a successful redirect, ignore the error
        return;
      }
      
      // Show user-friendly error message
      const errorMessage = error?.message || 'Failed to delete post. Please try again.';
      alert(errorMessage);
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <section>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#00D9FF] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog Management
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded text-sm ${
              post.status === 'published'
                ? 'bg-[#10B981]/20 text-[#10B981]'
                : 'bg-[#FFB84D]/20 text-[#FFB84D]'
            }`}
          >
            {post.status === 'published' ? 'Published' : 'Draft'}
          </span>
          {post.status === 'published' && (
            <Link
              href={`/playbooks/${post.slug}`}
              target="_blank"
              className="text-sm text-[#00D9FF] hover:underline"
            >
              View Live →
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title..."
              className="w-full px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Optional subtitle..."
              className="w-full px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Slug <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="post-url-slug"
              className="w-full px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] font-mono text-sm"
              required
            />
            <p className="text-xs text-[#9CA3AF] mt-1">
              URL: /playbooks/{formData.slug || 'your-slug'}
            </p>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-2">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief summary for the post list..."
              className="w-full px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] h-24 resize-none"
              maxLength={200}
            />
            <p className="text-xs text-[#9CA3AF] mt-1">
              {formData.summary.length}/200 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content <span className="text-[#EF4444]">*</span>
            </label>
            <MarkdownEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="# Start writing your post in Markdown..."
              storageKey={`post-${post.id}-content`}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="p-6 bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20">
            <h3 className="font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSubmit('draft')}
                disabled={isSubmitting || !formData.title || !formData.content}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#FFB84D] text-[#0A0E1A] rounded-lg hover:bg-[#E5A344] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save as Draft
              </button>
              <button
                onClick={() => handleSubmit('published')}
                disabled={isSubmitting || !formData.title || !formData.content}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0F9F75] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : post.status === 'published' ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {post.status === 'published' ? 'Update' : 'Publish'}
              </button>
              <Link
                href={`/admin/blog/preview/${formData.slug}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
              {post.status === 'published' && (
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#9CA3AF] text-[#0A0E1A] rounded-lg hover:bg-[#6B7280] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  Unpublish
                </button>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="p-6 bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20">
            <h3 className="font-semibold mb-4">Metadata</h3>
            <div className="space-y-4">
              {/* Type */}
              <div>
                <label htmlFor="type-edit" className="block text-sm font-medium mb-2">Type</label>
                <select
                  id="type-edit"
                  aria-label="Post type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
                >
                  <option value="playbook">Playbook</option>
                  <option value="note">Note</option>
                  <option value="update">Update</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="react, typescript, nextjs"
                  className="w-full px-3 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED]"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Comma-separated
                </p>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#0A0E1A] border border-[#00D9FF]/20 rounded-lg focus:outline-none focus:border-[#00D9FF] text-[#E8E9ED] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 bg-[#EF4444]/10 rounded-lg border border-[#EF4444]/30">
            <h3 className="font-semibold mb-2 text-[#EF4444]">Danger Zone</h3>
            <p className="text-sm text-[#9CA3AF] mb-4">
              {showDeleteConfirm
                ? 'Are you sure? This action cannot be undone.'
                : 'Permanently delete this post'}
            </p>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium ${
                showDeleteConfirm
                  ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]'
                  : 'bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10'
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {showDeleteConfirm ? 'Confirm Delete' : 'Delete Post'}
            </button>
            {showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full mt-2 px-4 py-2 text-[#9CA3AF] hover:text-[#E8E9ED] transition-colors text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

