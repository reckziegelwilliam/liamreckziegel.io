'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { TimelineCard } from './timeline-card';
import { experience } from '@/data/experience';
import { Experience } from '@/types/experience';

const Timeline: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    experience.forEach(exp => {
      exp.tech?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Extract unique years for navigation
  const uniqueYears = useMemo(() => {
    return Array.from(new Set(experience.map(exp => exp.year))).sort((a, b) => b - a);
  }, []);

  // Filter and search experience
  const filteredExperience = useMemo(() => {
    return experience.filter(exp => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        exp.title.toLowerCase().includes(searchLower) ||
        exp.company.toLowerCase().includes(searchLower) ||
        exp.description.toLowerCase().includes(searchLower) ||
        exp.achievements.some(a => a.toLowerCase().includes(searchLower));

      // Tech filter
      const matchesTech = !selectedTech || exp.tech?.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  // Scroll to year
  const scrollToYear = useCallback((year: number) => {
    const element = document.querySelector(`[id*="${year}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTech(null);
  }, []);

  const hasActiveFilters = searchQuery || selectedTech;

  return (
    <section className="relative py-20" aria-label="Work experience timeline">
      <div className="max-w-6xl mx-auto px-4">
        {/* Controls Section */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by role, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="Search timeline"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle and Year Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters || selectedTech
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-2 border-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by Tech</span>
              {selectedTech && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs">1</span>
              )}
            </button>

            {/* Year Navigation Pills */}
            <div className="flex flex-wrap gap-2" role="navigation" aria-label="Jump to year">
              {uniqueYears.map(year => (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={`Jump to year ${year}`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
                aria-label="Clear all filters"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Tech Filter Dropdown */}
          {showFilters && (
            <div className="max-w-4xl mx-auto p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Filter by Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedTech === tech
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 border border-gray-200 dark:border-gray-700'
                    }`}
                    aria-pressed={selectedTech === tech}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          {hasActiveFilters && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredExperience.length} of {experience.length} {filteredExperience.length === 1 ? 'position' : 'positions'}
            </p>
          )}
        </div>

        {/* Timeline vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block" aria-hidden="true" />

        {/* Timeline items */}
        {filteredExperience.length > 0 ? (
          <div className="space-y-12 md:space-y-16">
            {filteredExperience.map((item: Experience, index: number) => (
              <TimelineCard
                key={`${item.year}-${item.company}`}
                experience={item}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No positions found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
