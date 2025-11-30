import { getMediaItems, getTotalMediaSize, getMediaCountByType } from '@/app/db/media';
import { MediaUpload } from './media-upload';
import { MediaGrid } from './media-grid';
import { HardDrive, Image as ImageIcon, Film, Music, FileText } from 'lucide-react';

export const metadata = {
  title: 'Media Library',
};

export default async function MediaPage() {
  const [mediaItems, totalSize, countsByType] = await Promise.all([
    getMediaItems(),
    getTotalMediaSize(),
    getMediaCountByType(),
  ]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Film;
      case 'audio': return Music;
      default: return FileText;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Media Library</h1>
        <p className="text-[#9CA3AF]">Upload and manage your media files</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-5 h-5 text-[#00D9FF]" />
            <span className="text-sm text-[#9CA3AF]">Total Storage</span>
          </div>
          <div className="text-2xl font-bold text-[#00D9FF]">{formatBytes(totalSize)}</div>
        </div>

        {countsByType.map((item) => {
          const Icon = getTypeIcon(item.type);
          return (
            <div key={item.type} className="p-4 bg-[#1A1F35] rounded-lg border border-[#00D9FF]/20">
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-[#00D9FF]" />
                <span className="text-sm text-[#9CA3AF] capitalize">{item.type}s</span>
              </div>
              <div className="text-2xl font-bold text-[#00D9FF]">{item.count}</div>
            </div>
          );
        })}
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <MediaUpload />
      </div>

      {/* Media Grid */}
      <MediaGrid mediaItems={mediaItems} />
    </div>
  );
}

