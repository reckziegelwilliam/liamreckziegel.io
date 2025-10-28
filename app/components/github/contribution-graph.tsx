'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ContributionCalendar } from '@/lib/github';

interface ContributionGraphProps {
  calendar: ContributionCalendar;
}

export function ContributionGraph({ calendar }: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    color: string;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!calendar || !calendar.weeks || calendar.weeks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No contribution data available
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Get month labels
  const getMonthLabel = (weekIndex: number) => {
    const week = calendar.weeks[weekIndex];
    if (!week || !week.contributionDays || week.contributionDays.length === 0) return null;
    
    const firstDay = new Date(week.contributionDays[0].date);
    const isFirstWeekOfMonth = firstDay.getDate() <= 7;
    
    if (isFirstWeekOfMonth && weekIndex % 4 === 0) {
      return firstDay.toLocaleDateString('en-US', { month: 'short' });
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          Contribution Activity
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {calendar.totalContributions.toLocaleString()}
          </span>
          {' '}contributions in the last year
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-2 ml-6">
            {calendar.weeks.map((week, weekIndex) => {
              const label = getMonthLabel(weekIndex);
              return (
                <div key={weekIndex} className="w-[11px] text-xs text-gray-500 dark:text-gray-400">
                  {label || ''}
                </div>
              );
            })}
          </div>

          {/* Graph */}
          <div className="flex gap-[3px]" onMouseMove={handleMouseMove}>
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 justify-around text-xs text-gray-500 dark:text-gray-400">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Contribution squares */}
            {calendar.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: (weekIndex * 7 + dayIndex) * 0.001,
                      duration: 0.2 
                    }}
                    whileHover={{ scale: 1.5 }}
                    onHoverStart={() => setHoveredDay({
                      date: day.date,
                      count: day.contributionCount,
                      color: day.color
                    })}
                    onHoverEnd={() => setHoveredDay(null)}
                    className="w-[11px] h-[11px] rounded-sm cursor-pointer transition-all"
                    style={{
                      backgroundColor: day.contributionCount === 0 
                        ? 'rgb(235, 237, 240)' 
                        : day.color,
                    }}
                    title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-[11px] h-[11px] rounded-sm"
                  style={{
                    backgroundColor: level === 0 
                      ? 'rgb(235, 237, 240)'
                      : `rgb(${64 - level * 10}, ${196 - level * 20}, ${104 + level * 20})`
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 40,
          }}
        >
          <div className="px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm shadow-lg">
            <div className="font-semibold">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
            </div>
            <div className="text-xs opacity-90">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

