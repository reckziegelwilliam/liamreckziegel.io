'use client';

import { useState } from 'react';
import { Mail, Clock, Briefcase, Users, Calendar, Check, Reply, Archive, Trash2 } from 'lucide-react';
import { ContactSubmission } from '@/app/db/contact';
import { updateContactStatusAction, deleteContactAction } from '@/app/actions/contact';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ContactSubmissionCardProps {
  submission: ContactSubmission;
}

export function ContactSubmissionCard({ submission }: ContactSubmissionCardProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: 'read' | 'replied' | 'archived') => {
    setIsUpdating(true);
    try {
      await updateContactStatusAction(submission.id, newStatus);
      toast.success(`Marked as ${newStatus}`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission? This cannot be undone.')) {
      return;
    }

    setIsUpdating(true);
    try {
      await deleteContactAction(submission.id);
      toast.success('Submission deleted');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete submission');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusColors = {
    unread: { border: 'border-[#FFB84D]/50', bg: 'bg-[#FFB84D]/10' },
    read: { border: 'border-[#9CA3AF]/30', bg: 'bg-[#9CA3AF]/5' },
    replied: { border: 'border-[#10B981]/50', bg: 'bg-[#10B981]/10' },
    archived: { border: 'border-[#6B7280]/30', bg: 'bg-[#6B7280]/5' },
  };

  const colors = statusColors[submission.status];

  return (
    <div className={`p-6 bg-[#1A1F35] rounded-lg border ${colors.border} ${colors.bg}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {submission.type === 'hire' ? (
            <Briefcase className="w-5 h-5 text-[#00D9FF]" />
          ) : (
            <Users className="w-5 h-5 text-[#FFB84D]" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{submission.name}</h3>
              <span className={`px-2 py-0.5 rounded text-xs ${
                submission.status === 'unread' ? 'bg-[#FFB84D]/20 text-[#FFB84D]' :
                submission.status === 'replied' ? 'bg-[#10B981]/20 text-[#10B981]' :
                submission.status === 'archived' ? 'bg-[#6B7280]/20 text-[#6B7280]' :
                'bg-[#9CA3AF]/20 text-[#9CA3AF]'
              }`}>
                {submission.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
              <a 
                href={`mailto:${submission.email}`} 
                className="flex items-center gap-1 hover:text-[#00D9FF] transition-colors"
              >
                <Mail className="w-3 h-3" />
                {submission.email}
              </a>
              {submission.company && <span>• {submission.company}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
          <Calendar className="w-3 h-3" />
          {new Date(submission.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-[#E8E9ED] whitespace-pre-wrap">{submission.project_brief}</p>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-[#9CA3AF] pb-4 border-b border-[#0A0E1A]">
        {submission.budget_range && (
          <span className="px-2 py-1 bg-[#0A0E1A] rounded">
            Budget: {submission.budget_range}
          </span>
        )}
        {submission.timeline && (
          <span className="flex items-center gap-1 px-2 py-1 bg-[#0A0E1A] rounded">
            <Clock className="w-3 h-3" />
            {submission.timeline}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4">
        {submission.status === 'unread' && (
          <button
            onClick={() => handleStatusChange('read')}
            disabled={isUpdating}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#9CA3AF] text-[#0A0E1A] rounded hover:bg-[#6B7280] transition-colors disabled:opacity-50 text-sm"
          >
            <Check className="w-3 h-3" />
            Mark as Read
          </button>
        )}
        {(submission.status === 'unread' || submission.status === 'read') && (
          <button
            onClick={() => handleStatusChange('replied')}
            disabled={isUpdating}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#10B981] text-white rounded hover:bg-[#0F9F75] transition-colors disabled:opacity-50 text-sm"
          >
            <Reply className="w-3 h-3" />
            Mark as Replied
          </button>
        )}
        {submission.status !== 'archived' && (
          <button
            onClick={() => handleStatusChange('archived')}
            disabled={isUpdating}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#6B7280] text-white rounded hover:bg-[#4B5563] transition-colors disabled:opacity-50 text-sm"
          >
            <Archive className="w-3 h-3" />
            Archive
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isUpdating}
          className="flex items-center gap-2 px-3 py-1.5 ml-auto bg-transparent border border-[#EF4444] text-[#EF4444] rounded hover:bg-[#EF4444]/10 transition-colors disabled:opacity-50 text-sm"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  );
}

