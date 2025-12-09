'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownEditor } from '@/app/components/markdown-editor';
import { createPostAction } from '@/app/actions/posts';
import { generateSlug } from '@/app/utils/blog';
import { Save, Eye, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    summary: '',
    content: '',
    type: 'playbook',
    cover_image_url: '',
    tags: '',
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(formData.title),
      }));
    }
  }, [formData.title]);

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      form.append('status', status);

      await createPostAction(form);
      // Redirect handled by server action
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
      setIsSubmitting(false);
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

      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Create New Post
      </h1>

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
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                Publish
              </button>
              {formData.slug && (
                <a
                  href={`/admin/blog/preview/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </a>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="p-6 bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20">
            <h3 className="font-semibold mb-4">Metadata</h3>
            <div className="space-y-4">
              {/* Type */}
              <div>
                <label htmlFor="type-select" className="block text-sm font-medium mb-2">Type</label>
                <select
                  id="type-select"
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
        </div>
      </div>
    </section>
  );
}

