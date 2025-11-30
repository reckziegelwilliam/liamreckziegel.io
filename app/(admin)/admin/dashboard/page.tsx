import { Suspense } from 'react';
import { getPosts } from '@/app/db/posts';
import { getContactSubmissions, getUnreadCount } from '@/app/db/contact';
import { FileText, Mail, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/app/components/ui/skeleton';

export const metadata = {
  title: 'Dashboard',
};

function StatCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border-2 border-[#00D9FF]/30 bg-[#00D9FF]/10 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-8 h-8 bg-[#00D9FF]/20 rounded" />
        <div className="w-12 h-8 bg-[#00D9FF]/20 rounded" />
      </div>
      <div className="w-24 h-4 bg-[#00D9FF]/20 rounded mb-2" />
      <div className="w-16 h-3 bg-[#00D9FF]/20 rounded" />
    </div>
  );
}

async function DashboardStats() {
  const [posts, contacts, unreadCount] = await Promise.all([
    getPosts(),
    getContactSubmissions(),
    getUnreadCount(),
  ]);

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  const stats = [
    {
      label: 'Total Posts',
      value: posts.length,
      change: `${draftCount} drafts`,
      icon: FileText,
      color: 'cyan',
      href: '/blog',
    },
    {
      label: 'Contact Submissions',
      value: contacts.length,
      change: `${unreadCount} unread`,
      icon: Mail,
      color: 'amber',
      href: '/contact',
    },
    {
      label: 'Published Posts',
      value: publishedCount,
      change: 'Live on site',
      icon: TrendingUp,
      color: 'green',
      href: '/blog',
    },
  ];

  const colorMap = {
    cyan: {
      border: 'border-[#00D9FF]/30',
      bg: 'bg-[#00D9FF]/10',
      text: 'text-[#00D9FF]',
      hover: 'hover:border-[#00D9FF]',
    },
    amber: {
      border: 'border-[#FFB84D]/30',
      bg: 'bg-[#FFB84D]/10',
      text: 'text-[#FFB84D]',
      hover: 'hover:border-[#FFB84D]',
    },
    green: {
      border: 'border-[#10B981]/30',
      bg: 'bg-[#10B981]/10',
      text: 'text-[#10B981]',
      hover: 'hover:border-[#10B981]',
    },
  };

  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];
        
        return (
          <Link
            key={stat.label}
            href={stat.href}
            className={`p-6 rounded-xl border-2 ${colors.border} ${colors.bg} ${colors.hover} hover:scale-105 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <Icon className={`w-8 h-8 ${colors.text}`} />
              <span className={`text-3xl font-bold ${colors.text}`}>
                {stat.value}
              </span>
            </div>
            <h3 className="text-sm text-[#E8E9ED] font-medium mb-1">{stat.label}</h3>
            <p className="text-xs text-[#9CA3AF]">{stat.change}</p>
          </Link>
        );
      })}
    </>
  );
}

export default async function DashboardPage() {
  const [posts, contacts] = await Promise.all([
    getPosts(),
    getContactSubmissions(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[#9CA3AF]">Welcome to your admin studio</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Suspense fallback={<><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>}>
          <DashboardStats />
        </Suspense>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Link
              href="/admin/blog/new"
              className="text-sm text-[#00D9FF] hover:underline"
            >
              Create New
            </Link>
          </div>
          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-[#9CA3AF] text-center py-8">
                No posts yet. Create your first one!
              </p>
            ) : (
              posts.slice(0, 5).map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  className="block p-3 rounded hover:bg-[#0A0E1A] transition-colors"
                >
                  <p className="font-medium text-[#E8E9ED] truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        post.status === 'published'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#FFB84D]/20 text-[#FFB84D]'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {new Date(post.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Contacts</h2>
            <Link
              href="/admin/contact"
              className="text-sm text-[#00D9FF] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <p className="text-[#9CA3AF] text-center py-8">
                No contact submissions yet
              </p>
            ) : (
              contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded bg-[#0A0E1A]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#E8E9ED] truncate">
                        {contact.name}
                      </p>
                      <p className="text-sm text-[#9CA3AF] truncate">
                        {contact.email}
                      </p>
                    </div>
                    {contact.status === 'unread' && (
                      <span className="ml-2 w-2 h-2 bg-[#FFB84D] rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] transition-colors font-medium"
          >
            Create New Post
          </Link>
          <Link
            href="/admin/blog"
            className="px-4 py-2 bg-[#1A1F35] border border-[#00D9FF]/30 text-[#E8E9ED] rounded-lg hover:border-[#00D9FF] transition-colors"
          >
            Manage Posts
          </Link>
          <Link
            href="/admin/contact"
            className="px-4 py-2 bg-[#1A1F35] border border-[#FFB84D]/30 text-[#E8E9ED] rounded-lg hover:border-[#FFB84D] transition-colors"
          >
            View Contacts
          </Link>
        </div>
      </div>
    </div>
  );
}
