import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Building2, MapPin, Calendar } from 'lucide-react';
import { Experience, RelatedContent } from '@/types/experience';

// components/ContentViewer.tsx
const ContentViewer: React.FC<{ content: RelatedContent }> = ({ content }) => {
  switch (content.type) {
    case 'video':
      return (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <iframe
            src={content.url}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
          />
        </div>
      );
    
    case 'image':
      return (
        <div className="rounded-lg overflow-hidden">
          <img 
            src={content.url} 
            alt={content.title}
            className="w-full h-auto"
          />
        </div>
      );
    
    case 'blog':
    case 'link':
    case 'github':
      return (
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 
                   transition-colors border border-blue-500/20"
        >
          <h4 className="text-lg font-medium text-blue-300 mb-2">
            {content.title}
          </h4>
          {content.description && (
            <p className="text-blue-100/80 text-sm">{content.description}</p>
          )}
          <div className="mt-2 flex items-center text-blue-400 text-sm">
            <span>View {content.type}</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </div>
        </a>
      );
  }
};

export const Modal = ({ event, onClose }: { event: Experience; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'related'>('details');
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-x-4 bottom-4 top-20 md:inset-x-auto md:left-1/2 md:transform 
                   md:-translate-x-1/2 md:w-[800px] bg-gradient-to-b from-blue-900/95 
                   to-gray-900/95 rounded-xl backdrop-blur-xl border border-blue-500/20 
                   overflow-hidden z-50"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm border-b 
                      border-blue-500/20 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{event.year}</div>
              <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-blue-500/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-blue-400" />
            </button>
          </div>
  
          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            {['details', 'related'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'details' | 'related')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-blue-200/60 hover:text-blue-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
  
        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-200px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Company Info */}
                  <div className="grid grid-cols-3 gap-4 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {event.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.period}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-blue-100 leading-relaxed">
                    <p>{event.description}</p>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-blue-300">Key Achievements</h4>
                    <ul className="space-y-3">
                      {event.achievements.map((achievement, i) => (
                        <li 
                          key={i}
                          className="flex items-start gap-3 text-blue-100"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies Used */}
                  {event.tech && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-blue-300">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-200 
                                     border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
            ) : (
              <motion.div
                key="related"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {event.relatedContent ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.relatedContent.map((content, i) => (
                      <ContentViewer key={i} content={content} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-blue-200/60 py-12">
                    No related content available
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };