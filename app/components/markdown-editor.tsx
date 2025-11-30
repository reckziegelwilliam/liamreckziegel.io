'use client';

import { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Eye, Edit } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  storageKey?: string; // Unique key for localStorage
}

export function MarkdownEditor({ value, onChange, placeholder, storageKey = 'draft-content' }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Auto-save to localStorage every 30 seconds with unique key
    const interval = setInterval(() => {
      if (value) {
        localStorage.setItem(storageKey, value);
        localStorage.setItem(`${storageKey}-timestamp`, new Date().toISOString());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [value, storageKey]);

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const charCount = value.length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  return (
    <div className="border border-[#1A1F35] dark:border-[#1A1F35] rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between bg-[#1A1F35] dark:bg-[#1A1F35] px-4 py-2 border-b border-[#00D9FF]/20">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'edit'
                ? 'bg-[#00D9FF] text-[#0A0E1A]'
                : 'text-[#9CA3AF] hover:text-[#E8E9ED]'
            }`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'preview'
                ? 'bg-[#00D9FF] text-[#0A0E1A]'
                : 'text-[#9CA3AF] hover:text-[#E8E9ED]'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
        
        <div className="text-sm text-[#9CA3AF]">
          {wordCount} words • {charCount} chars • {estimatedReadingTime} min read
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {activeTab === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Start writing in Markdown...'}
            className="w-full min-h-[500px] p-4 bg-transparent text-[#E8E9ED] font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
        ) : (
          <div className="min-h-[500px] p-4 prose prose-neutral dark:prose-invert max-w-none">
            {mounted && value ? (
              <MDXRemote source={value} />
            ) : (
              <p className="text-[#9CA3AF]">Nothing to preview yet...</p>
            )}
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="px-4 py-2 bg-[#0A0E1A] dark:bg-[#0A0E1A] border-t border-[#1A1F35] text-xs text-[#9CA3AF]">
        Markdown supported. Use **bold**, *italic*, `code`, # headings, etc.
        {mounted && localStorage.getItem(`${storageKey}-timestamp`) && (
          <span className="ml-4">
            Last auto-saved: {new Date(localStorage.getItem(`${storageKey}-timestamp`)!).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}

