'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  className?: string;
}

export function CTAButton({ 
  href, 
  children, 
  variant = 'primary',
  icon: Icon,
  className = ''
}: CTAButtonProps) {
  const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200";
  
  const variantStyles = {
    primary: "bg-[#00D9FF] text-[#0A0E1A] hover:bg-[#00B8D9] hover:shadow-lg hover:shadow-[#00D9FF]/50 hover:scale-105",
    secondary: "bg-[#1A1F35] text-[#E8E9ED] border-2 border-[#00D9FF]/30 hover:border-[#00D9FF] hover:bg-[#1A1F35]/80 hover:scale-105"
  };

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </Link>
      )}
    </motion.div>
  );
}

