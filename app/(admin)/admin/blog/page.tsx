import { getPosts } from '@/app/db/posts';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';

export const metadata = {
  title: 'Blog Posts',
};

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-[#9CA3AF]">Manage your blog posts and playbooks</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00B8D9] transition-colors font-medium"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-[#1A1F35] rounded-xl border border-[#1A1F35] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#0A0E1A]">
            <tr className="text-left">
              <th className="px-6 py-4 text-[#9CA3AF] font-medium">Title</th>
              <th className="px-6 py-4 text-[#9CA3AF] font-medium">Type</th>
              <th className="px-6 py-4 text-[#9CA3AF] font-medium">Status</th>
              <th className="px-6 py-4 text-[#9CA3AF] font-medium">Updated</th>
              <th className="px-6 py-4 text-[#9CA3AF] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#9CA3AF]">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No posts yet</p>
                  <p className="text-sm">Create your first blog post or playbook</p>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-[#0A0E1A] hover:bg-[#0A0E1A] transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#E8E9ED]">{post.title}</p>
                    {post.subtitle && (
                      <p className="text-sm text-[#9CA3AF] mt-1">{post.subtitle}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded bg-[#1A1F35] text-[#00D9FF] border border-[#00D9FF]/20">
                      {post.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        post.status === 'published'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#FFB84D]/20 text-[#FFB84D]'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#9CA3AF]">
                    {new Date(post.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-[#00D9FF] hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

