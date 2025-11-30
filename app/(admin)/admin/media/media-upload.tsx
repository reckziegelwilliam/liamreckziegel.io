'use client';

import { useState, useCallback } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadMediaAction } from '@/app/actions/media';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function MediaUpload() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await uploadMediaAction(formData);
      toast.success('File uploaded successfully');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload file');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`p-12 border-2 border-dashed rounded-xl transition-all ${
        isDragging
          ? 'border-[#00D9FF] bg-[#00D9FF]/10'
          : 'border-[#00D9FF]/30 bg-[#1A1F35]'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {isUploading ? (
          <>
            <Loader2 className="w-12 h-12 text-[#00D9FF] animate-spin" />
            <p className="text-[#9CA3AF]">Uploading...</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-[#00D9FF]" />
            <div className="text-center">
              <p className="text-[#E8E9ED] mb-1">
                Drag and drop your file here, or{' '}
                <label className="text-[#00D9FF] hover:underline cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                    disabled={isUploading}
                  />
                </label>
              </p>
              <p className="text-sm text-[#9CA3AF]">
                Supports: JPEG, PNG, GIF, WebP, SVG (Max 10MB)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

