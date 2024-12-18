"use client";

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { Hero } from '@/components/home/hero';
import { Skills } from '@/components/home/skills';
import { Experience } from '@/components/home/experience';
import { Projects } from '@/components/home/projects';


import { skills } from '@/app/data/skill';
import { experience } from '@/app/data/experience';
import { projects } from '@/app/data/projects';

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

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Hero Section */}
      <motion.div variants={item}>
        <Hero />
      </motion.div>

      {/* Skills Section */}
      <motion.div variants={item}>
        <Skills skills={skills} />
      </motion.div>

      {/* Work Experience Section */}
      <motion.div variants={item}>
        <Experience experience={experience} />
      </motion.div>

      {/* Projects Section */}
      <motion.div variants={item}>
        <Projects projects={projects} />
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-blue-500 origin-left"
        style={{
          scaleX: scrollYProgress
        }}
      />
    </motion.div>
  );
}