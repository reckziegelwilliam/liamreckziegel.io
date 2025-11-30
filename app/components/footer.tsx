import Link from 'next/link';
import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-4 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex justify-center items-center">
        <Link
          href="/admin/dashboard"
          className="opacity-30 hover:opacity-100 transition-opacity duration-300 group"
          title="Admin"
        >
          <Terminal className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-[#00D9FF] transition-colors" />
        </Link>
      </div>
    </footer>
  );
}

