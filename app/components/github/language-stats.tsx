'use client';

import { motion } from 'framer-motion';
import type { LanguageStat } from '@/lib/github';

interface LanguageStatsProps {
  languages: LanguageStat[];
}

export function LanguageStats({ languages }: LanguageStatsProps) {
  if (!languages || languages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No language data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Top Languages
      </h3>
      
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <div className="flex justify-between text-sm mb-1.5">
              <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                {lang.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${lang.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: lang.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language legend */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {languages.map((lang) => (
          <div
            key={`legend-${lang.name}`}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

