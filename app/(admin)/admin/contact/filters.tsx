'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FilterStatus = 'all' | 'unread' | 'read' | 'replied' | 'archived';

interface ContactFiltersProps {
  counts: {
    all: number;
    unread: number;
    read: number;
    replied: number;
    archived: number;
  };
  currentFilter: FilterStatus;
}

export function ContactFilters({ counts, currentFilter }: ContactFiltersProps) {
  const filters: { label: string; value: FilterStatus; color: string }[] = [
    { label: 'All', value: 'all', color: '#00D9FF' },
    { label: 'Unread', value: 'unread', color: '#FFB84D' },
    { label: 'Read', value: 'read', color: '#9CA3AF' },
    { label: 'Replied', value: 'replied', color: '#10B981' },
    { label: 'Archived', value: 'archived', color: '#6B7280' },
  ];

  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        const count = counts[filter.value];

        return (
          <Link
            key={filter.value}
            href={`/contact${filter.value === 'all' ? '' : `?filter=${filter.value}`}`}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              isActive
                ? 'bg-[#00D9FF]/20 text-[#00D9FF] border-2 border-[#00D9FF]'
                : 'bg-[#1A1F35] text-[#9CA3AF] border-2 border-transparent hover:border-[#00D9FF]/30'
            }`}
          >
            {filter.label}
            <span className={`ml-2 px-2 py-0.5 rounded text-sm ${
              isActive ? 'bg-[#00D9FF] text-[#0A0E1A]' : 'bg-[#0A0E1A]'
            }`}>
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

