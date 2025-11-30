'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Wrench, Network } from 'lucide-react';

const services = [
  {
    icon: Rocket,
    title: '0→1 Product Builds',
    description: 'From concept to production-ready MVP. I architect, build, and ship products that work from day one.',
    color: 'cyan',
  },
  {
    icon: Wrench,
    title: 'App Rescue & Rebuilds',
    description: 'Turn failing apps into stable, shippable products. I specialize in diagnosing issues and rebuilding what\'s broken.',
    color: 'amber',
  },
  {
    icon: Network,
    title: 'System Architecture at Scale',
    description: 'Design and implement scalable systems that handle thousands of concurrent users without breaking.',
    color: 'green',
  },
];

export function WhatIDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section ref={ref} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4 tracking-tight">
          What I Do
        </h2>
        <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
          I specialize in three core areas that matter most for early-stage products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorMap = {
              cyan: {
                bg: 'bg-[#00D9FF]/10',
                border: 'border-[#00D9FF]/30',
                icon: 'text-[#00D9FF]',
                hover: 'hover:border-[#00D9FF]',
              },
              amber: {
                bg: 'bg-[#FFB84D]/10',
                border: 'border-[#FFB84D]/30',
                icon: 'text-[#FFB84D]',
                hover: 'hover:border-[#FFB84D]',
              },
              green: {
                bg: 'bg-[#10B981]/10',
                border: 'border-[#10B981]/30',
                icon: 'text-[#10B981]',
                hover: 'hover:border-[#10B981]',
              },
            };
            const colors = colorMap[service.color];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-xl border-2 ${colors.bg} ${colors.border} ${colors.hover} transition-all hover:scale-105`}
              >
                <Icon className={`w-12 h-12 mb-4 ${colors.icon}`} />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-[#9CA3AF] dark:text-[#9CA3AF]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

