'use client';

import { useState } from 'react';
import { MediaItem } from '@/app/db/media';
import { Copy, Trash2, Check } from 'lucide-react';
import { deleteMediaAction } from '@/app/actions/media';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface MediaGridProps {
  mediaItems: MediaItem[];
}

export function MediaGrid({ mediaItems }: MediaGridProps) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: number, filename: string) => {
    if (!confirm(`Delete ${filename}? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteMediaAction(id);
      toast.success('Media deleted');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete media');
      console.error(error);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#9CA3AF]">No media files yet. Upload your first file!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mediaItems.map((item) => (
        <div
          key={item.id}
          className="group relative bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20 overflow-hidden hover:border-[#00D9FF] transition-all"
        >
          {/* Preview */}
          <div className="aspect-square bg-[#0A0E1A] flex items-center justify-center overflow-hidden">
            {item.mime_type.startsWith('image/') ? (
              <img
                src={item.url}
                alt={item.filename}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-[#9CA3AF] text-4xl">📄</div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-sm font-medium text-[#E8E9ED] truncate" title={item.filename}>
              {item.filename}
            </p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              {formatBytes(item.size)} • {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Actions Overlay */}
          <div className="absolute inset-0 bg-[#0A0E1A]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => handleCopyUrl(item.url, item.id)}
              className="p-2 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] transition-colors"
              title="Copy URL"
            >
              {copiedId === item.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => handleDelete(item.id, item.filename)}
              className="p-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

