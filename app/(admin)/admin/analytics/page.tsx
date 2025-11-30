import {
  getAnalyticsStats,
  getPopularPosts,
  getDailyViews,
  getViewsByType,
  getDailyContacts,
} from '@/app/db/analytics';
import { Eye, FileText, Mail, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ViewsChart } from './views-chart';
import { ContactsChart } from './contacts-chart';

export const metadata = {
  title: 'Analytics',
};

export default async function AnalyticsPage() {
  // Fetch all analytics data
  const [stats, popularPosts, dailyViews, viewsByType, dailyContacts] = await Promise.all([
    getAnalyticsStats(),
    getPopularPosts(10),
    getDailyViews(),
    getViewsByType(),
    getDailyContacts(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-[#9CA3AF]">Track your site performance and engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-xl border-2 border-[#00D9FF]/30 bg-[#00D9FF]/10">
          <div className="flex items-start justify-between mb-4">
            <Eye className="w-8 h-8 text-[#00D9FF]" />
            <span className="text-3xl font-bold text-[#00D9FF]">
              {stats.totalViews}
            </span>
          </div>
          <h3 className="text-sm text-[#E8E9ED] font-medium mb-1">Total Views</h3>
          <p className="text-xs text-[#9CA3AF]">{stats.viewsLast30Days} in last 30 days</p>
        </div>

        <div className="p-6 rounded-xl border-2 border-[#10B981]/30 bg-[#10B981]/10">
          <div className="flex items-start justify-between mb-4">
            <FileText className="w-8 h-8 text-[#10B981]" />
            <span className="text-3xl font-bold text-[#10B981]">
              {stats.totalPosts}
            </span>
          </div>
          <h3 className="text-sm text-[#E8E9ED] font-medium mb-1">Published Posts</h3>
          <p className="text-xs text-[#9CA3AF]">Live on site</p>
        </div>

        <div className="p-6 rounded-xl border-2 border-[#FFB84D]/30 bg-[#FFB84D]/10">
          <div className="flex items-start justify-between mb-4">
            <Mail className="w-8 h-8 text-[#FFB84D]" />
            <span className="text-3xl font-bold text-[#FFB84D]">
              {stats.totalContacts}
            </span>
          </div>
          <h3 className="text-sm text-[#E8E9ED] font-medium mb-1">Contact Submissions</h3>
          <p className="text-xs text-[#9CA3AF]">{stats.contactsLast30Days} in last 30 days</p>
        </div>

        <div className="p-6 rounded-xl border-2 border-[#9CA3AF]/30 bg-[#9CA3AF]/10">
          <div className="flex items-start justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-[#9CA3AF]" />
            <span className="text-3xl font-bold text-[#9CA3AF]">
              {stats.totalViews > 0 ? Math.round((stats.totalContacts / stats.totalViews) * 100) : 0}%
            </span>
          </div>
          <h3 className="text-sm text-[#E8E9ED] font-medium mb-1">Conversion Rate</h3>
          <p className="text-xs text-[#9CA3AF]">Contacts / Views</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Views Chart */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#00D9FF]/20">
          <h2 className="text-xl font-semibold mb-4">Page Views (Last 30 Days)</h2>
          <ViewsChart data={dailyViews} />
        </div>

        {/* Contacts Chart */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#FFB84D]/20">
          <h2 className="text-xl font-semibold mb-4">Contacts (Last 30 Days)</h2>
          <ContactsChart data={dailyContacts} />
        </div>
      </div>

      {/* Popular Posts & Type Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Posts */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Most Viewed Posts</h2>
            <Link href="/admin/blog" className="text-sm text-[#00D9FF] hover:underline">
              Manage Posts
            </Link>
          </div>
          <div className="space-y-3">
            {popularPosts.length === 0 ? (
              <p className="text-[#9CA3AF] text-center py-8">No view data yet</p>
            ) : (
              popularPosts.map((post, index) => (
                <div key={post.slug} className="flex items-center gap-3 p-3 rounded bg-[#0A0E1A] hover:bg-[#1A1F35] transition-colors">
                  <span className="text-lg font-bold text-[#00D9FF] w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/playbooks/${post.slug}`} 
                      target="_blank"
                      className="font-medium text-[#E8E9ED] hover:text-[#00D9FF] truncate block"
                    >
                      {post.title}
                    </Link>
                    <span className="text-xs text-[#9CA3AF]">{post.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#9CA3AF]">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.views}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Views by Type */}
        <div className="p-6 bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <h2 className="text-xl font-semibold mb-4">Views by Post Type</h2>
          <div className="space-y-3">
            {viewsByType.length === 0 ? (
              <p className="text-[#9CA3AF] text-center py-8">No data yet</p>
            ) : (
              viewsByType.map((item) => {
                const total = viewsByType.reduce((sum, i) => sum + i.views, 0);
                const percentage = total > 0 ? Math.round((item.views / total) * 100) : 0;

                return (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#E8E9ED] capitalize">{item.type}</span>
                      <span className="text-[#9CA3AF]">{item.views} views ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#0A0E1A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00D9FF] rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

