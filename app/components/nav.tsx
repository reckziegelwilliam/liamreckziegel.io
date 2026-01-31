import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/app/auth';

const navItems = {
  '/': {
    name: 'home',
  },
  '/case-studies': {
    name: 'case studies',
  },
  '/playbooks': {
    name: 'playbooks',
  },
  '/contact': {
    name: 'contact',
  },
};

export async function Navbar() {
  const session = await auth();
  const hasAdminAccess = !!session?.user;

  return (
    <aside className="mb-16 tracking-tight relative">
      <div className="lg:sticky lg:top-20 relative z-50">
        <nav
          className="flex flex-row items-start justify-between px-0 pb-0 fade md:overflow-auto scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
          {hasAdminAccess ? (
              <Link
                href="/admin/dashboard"
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 text-xs opacity-50 hover:opacity-100"
                title="Admin Dashboard"
              >
                admin
              </Link>
            ) : (
              <Link
                href="/api/auth/signin?callbackUrl=/admin/dashboard"
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 text-xs opacity-30 hover:opacity-100"
                title="Admin Login"
              >
                •
              </Link>
            )}
            <Link href="/">
              <Image
                src="/pro_headshot.png"
                alt="Liam Reckziegel"
                width={32}
                height={32}
                className="rounded-full border border-[#00D9FF]/20 hover:border-[#00D9FF]/50 transition-all"
              />
            </Link>

          </div>
        </nav>
      </div>
    </aside>
  );
}