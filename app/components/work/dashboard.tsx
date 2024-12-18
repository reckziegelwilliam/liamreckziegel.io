import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Layout, Book, Video, Image, Link, Github, 
  ChevronLeft, ExternalLink, Code
} from 'lucide-react';
import { Experience } from '@/types/experience';

type DashboardSection = 'overview' | 'blog' | 'video' | 'images' | 'code' | 'links';

interface DashboardProps {
  experience: Experience;
  onClose: () => void;
}

const navigationItems: { id: DashboardSection; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: Layout },
  { id: 'blog', label: 'Blog Posts', icon: Book },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'links', label: 'Links', icon: Link }
];

export const Dashboard: React.FC<DashboardProps> = ({ 
  experience, 
  onClose 
}) => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Info */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-blue-300 mb-4">Company Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-blue-100">
                  <span className="text-blue-300 w-24">Company:</span>
                  {experience.company}
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="text-blue-300 w-24">Location:</span>
                  {experience.location}
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="text-blue-300 w-24">Period:</span>
                  {experience.period}
                </div>
              </div>
            </div>

            {/* Technologies */}
            {experience.tech && (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium text-blue-300 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm bg-blue-500/10 
                               text-blue-200 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-blue-300 mb-4">Key Achievements</h3>
              <ul className="space-y-4">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-blue-100">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

    //   case 'blog':
    //     return (
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {experience.blogPosts?.map((post, i) => (
    //           <a
    //             key={i}
    //             href={post.url}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="p-6 rounded-xl bg-white/5 border border-white/10 
    //                      hover:bg-white/10 transition-colors group"
    //           >
    //             {post.thumbnail && (
    //               <img 
    //                 src={post.thumbnail} 
    //                 alt={post.title}
    //                 className="w-full h-48 object-cover rounded-lg mb-4"
    //               />
    //             )}
    //             <h3 className="text-lg font-medium text-blue-300 group-hover:text-blue-200 
    //                          transition-colors mb-2">
    //               {post.title}
    //             </h3>
    //             <p className="text-blue-100/80 text-sm mb-4">{post.description}</p>
    //             <div className="flex items-center text-blue-300">
    //               <span>Read post</span>
    //               <ExternalLink className="w-4 h-4 ml-1" />
    //             </div>
    //           </a>
    //         ))}
    //       </div>
    //     );

      // Add similar sections for videos, images, code, and links...
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-xl">
      {/* Header */}
      <div className="h-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{experience.title}</h2>
            <div className="text-blue-300">{experience.company}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-5rem)] flex">
        {/* Navigation */}
        <div className="w-64 border-r border-white/10 p-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                          transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-blue-100/60 hover:text-blue-100 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};