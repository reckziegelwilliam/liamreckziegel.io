'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, MapPin, ChevronDown, Award } from 'lucide-react';

interface Achievement {
  text: string;
  impact?: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: Achievement[] | string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const formatAchievement = (achievement: Achievement | string) => {
    if (typeof achievement === 'string') {
      return achievement;
    }
    return achievement.text + (achievement.impact ? ` (${achievement.impact})` : '');
  };

  return (
    <section className="py-12">
      <h2 className="font-bold text-2xl mb-8 tracking-tighter">
        Work Experience
      </h2>

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800" />

        {experience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Timeline dot */}
            <div className="absolute left-[29px] top-2">
              <motion.div 
                className="w-4 h-4 rounded-full border-2 border-blue-500 bg-background"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.2 }}
              />
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500/20 transition-colors">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 shrink-0" />
                  {job.period}
                </span>
              </div>

              {/* Company and Location */}
              <div className="flex flex-col md:flex-row gap-2 md:items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1 shrink-0" />
                  {job.company}
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  {job.location}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {job.description}
              </p>

              {/* Achievements */}
              <div className="space-y-3">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  Key Achievements
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {job.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          {formatAchievement(achievement)}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}