import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Experience } from '@/types/experience';
import { calculateCardState } from '@/utils/calculations';
import { Modal } from './modal';
import { ViewState } from '@/types/view';

interface TimelineCardsProps {
  events: Experience[];
  scrollProgress: number;
}

export const TimelineCards: React.FC<TimelineCardsProps> = ({ events, scrollProgress }) => {
  const [viewState, setViewState] = useState<ViewState>('timeline');
  const [modalCard, setModalCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Experience | null>(null);

  // Handle scroll-based card expansion
  useEffect(() => {
    const adjustedProgress = Math.max(0, scrollProgress - 15);
    const currentCardIndex = Math.floor((adjustedProgress / 85) * events.length);
    setExpandedCard(currentCardIndex >= 0 ? currentCardIndex : null);
  }, [scrollProgress, events.length]);

  // Separate handlers for modal interaction
  const handleCardClick = (event: Experience, e: React.MouseEvent) => {
    e.stopPropagation();
    const index = events.indexOf(event);
    setModalCard(index);
    setSelectedEvent(event);
    setViewState('modal');
    // Don't modify expandedCard here
  }

  const handleCloseModal = () => {
    setModalCard(null);
    setSelectedEvent(null);
    setViewState('timeline');
    // expandedCard remains unchanged
  }

  return (
    <>
      {events.map((event, index) => {
        const cardState = calculateCardState(index, scrollProgress);
        const isExpanded = expandedCard === index;
        
        return (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{ 
              transformStyle: 'preserve-3d',
              zIndex: cardState.zIndex
            }}
            animate={{
              transform: `
                translate(-50%, ${cardState.verticalOffset}px)
                translateX(${cardState.horizontalOffset}px)
                translateZ(${cardState.depth}px)
                scale(${isExpanded ? cardState.scale * 1.1 : cardState.scale})
              `,
              opacity: cardState.opacity
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={(e) => handleCardClick(event, e)}
          >
            <div 
              className="w-80 p-6 rounded-xl bg-slate-400/90 border border-blue-500/20 cursor-pointer"
              style={{
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-3">{event.year}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-blue-100/80 line-clamp-2">{event.description}</p>
              
              <div className="mt-4 flex items-center justify-center text-sm text-blue-300">
                <span>Click to learn more</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Modal Overlay and Content */}
      <AnimatePresence>
        {viewState === 'modal' && selectedEvent !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={handleCloseModal}
            />
            <Modal 
              event={selectedEvent} 
              onClose={handleCloseModal} 
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
