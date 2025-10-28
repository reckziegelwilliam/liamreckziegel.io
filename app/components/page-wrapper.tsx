'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();

  // Split children into sections
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{
          scaleX: scrollYProgress
        }}
      />
    </motion.div>
  );
}

