import { getContactSubmissions } from '@/app/db/contact';
import { ContactSubmissionCard } from './submission-card';
import { ContactFilters } from './filters';

export const metadata = {
  title: 'Contact Submissions',
};

type FilterStatus = 'all' | 'unread' | 'read' | 'replied' | 'archived';

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  // Auth check handled by layout.tsx
  const submissions = await getContactSubmissions();
  
  const filter = (searchParams.filter || 'all') as FilterStatus;

  // Filter submissions based on selected filter
  const filteredSubmissions = filter === 'all' 
    ? submissions
    : submissions.filter((s) => s.status === filter);

  // Calculate counts for each status
  const counts = {
    all: submissions.length,
    unread: submissions.filter((s) => s.status === 'unread').length,
    read: submissions.filter((s) => s.status === 'read').length,
    replied: submissions.filter((s) => s.status === 'replied').length,
    archived: submissions.filter((s) => s.status === 'archived').length,
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Contact Submissions
      </h1>

      {/* Filter Tabs */}
      <ContactFilters counts={counts} currentFilter={filter} />

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#9CA3AF]">
              {filter === 'all' 
                ? 'No contact submissions yet.' 
                : `No ${filter} submissions.`}
            </p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <ContactSubmissionCard key={submission.id} submission={submission} />
          ))
        )}
      </div>
    </section>
  );
}
