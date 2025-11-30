'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Mail, 
  BarChart3, 
  Settings,
  Image,
  LogOut,
  Home
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1A1F35] border-r border-[#00D9FF]/20 min-h-screen fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-[#00D9FF]/20">
        <h2 className="text-lg font-semibold text-[#00D9FF]">Admin Studio</h2>
        <p className="text-sm text-[#9CA3AF] mt-1 truncate">
          {user.name || user.email}
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#00D9FF]/20 text-[#00D9FF]'
                      : 'text-[#9CA3AF] hover:bg-[#0A0E1A] hover:text-[#E8E9ED]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] hover:bg-[#0A0E1A] hover:text-[#E8E9ED] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}

