'use client';

import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { heroData } from '@/data/hero';
import { CTAButton } from '@/components/ui/cta-button';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-5xl md:text-6xl mb-6 tracking-tighter">
          {heroData.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#00D9FF] mb-6 font-semibold">
          {heroData.title}
        </h2>
        <p className="text-lg text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl leading-relaxed">
          {heroData.description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/contact?type=hire" variant="primary">
            Hire Me as a Founding Engineer
          </CTAButton>
          <CTAButton href="/contact?type=studio" variant="secondary">
            Work with Lumenaut Studio
          </CTAButton>
        </div>
      </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#00D9FF]/20 shadow-2xl shadow-[#00D9FF]/10">
            <Image
              src="/liam_rex_hero.png"
              alt="Liam Reckziegel"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-[#9CA3AF]" />
      </motion.div>
    </section>
  );
}