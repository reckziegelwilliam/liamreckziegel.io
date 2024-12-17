
// import { useEffect, useRef, useState } from 'react';

// export const BinaryStreamTimeline = () => {
//     const [scrollPhase, setScrollPhase] = useState('binary'); // 'binary', 'merging', 'timeline'
//     const [mergeProgress, setMergeProgress] = useState(0);
//     const streamRef = useRef(null);
//     const [binaryStrings, setBinaryStrings] = useState(['', '', '']);
//     const projectsSectionRef = useRef(null);
  
//     useEffect(() => {
//       const generateBinary = () => {
//         return Array(100).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('');
//       };
  
//       const updateBinary = () => {
//         setBinaryStrings(prev => prev.map(() => generateBinary()));
//       };
  
//       const interval = setInterval(updateBinary, 100);
//       return () => clearInterval(interval);
//     }, []);
  
//     useEffect(() => {
//       const handleScroll = () => {
//         const projectsSection = document.querySelector('.projects-section');
//         if (!projectsSection) return;
  
//         const projectsBottom = projectsSection.getBoundingClientRect().bottom;
//         const viewportHeight = window.innerHeight;
//         const scrollPosition = window.scrollY;
        
//         // Calculate phase based on scroll position
//         if (projectsBottom > viewportHeight) {
//           setScrollPhase('binary');
//           setMergeProgress(0);
//         } else {
//           const distance = Math.min(viewportHeight - projectsBottom, 300);
//           const progress = distance / 300;
          
//           if (progress < 0.5) {
//             setScrollPhase('merging');
//             setMergeProgress(progress * 2);
//           } else {
//             setScrollPhase('timeline');
//             setMergeProgress(1);
//           }
//         }
//       };
  
//       window.addEventListener('scroll', handleScroll);
//       return () => window.removeEventListener('scroll', handleScroll);
//     }, []);
  
//     const getBinaryStreamStyle = (index) => {
//       if (scrollPhase === 'binary') {
//         return {
//           transform: 'none',
//           opacity: 0.2,
//           bottom: `${index * 12}px`
//         };
//       }
  
//       const mergeY = index * 12 * (1 - mergeProgress);
//       return {
//         transform: `
//           translateY(${mergeY}px)
//           scale(${1 - mergeProgress * 0.3})
//         `,
//         opacity: scrollPhase === 'merging' ? 0.2 - mergeProgress * 0.1 : 0,
//         bottom: 0
//       };
//     };
  
//     const getTimelineStyle = () => {
//       const baseStyle = {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         width: '100%',
//         height: '2px',
//         backgroundColor: 'rgb(59, 130, 246)',
//         transform: 'scaleY(0)',
//         transition: 'transform 0.5s ease-in-out'
//       };
  
//       if (scrollPhase === 'timeline') {
//         return {
//           ...baseStyle,
//           transform: `
//             scaleY(${1 + mergeProgress})
//             rotateX(60deg)
//             translateZ(-20px)
//           `,
//           transformStyle: 'preserve-3d',
//           transformOrigin: 'bottom'
//         };
//       }
  
//       return baseStyle;
//     };
  
//     return (
//       <div 
//         ref={streamRef}
//         className="fixed bottom-0 left-0 w-full h-32 pointer-events-none"
//         style={{
//           perspective: '1000px',
//           perspectiveOrigin: 'center bottom'
//         }}
//       >
//         <div className="relative h-full max-w-4xl mx-auto">
//           {/* Binary Streams */}
//           {binaryStrings.map((binary, index) => (
//             <div
//               key={index}
//               className="absolute w-full text-xs font-mono whitespace-nowrap overflow-hidden transition-all duration-300"
//               style={getBinaryStreamStyle(index)}
//             >
//               {binary.split('').map((bit, i) => (
//                 <span
//                   key={i}
//                   className={`
//                     inline-block
//                     ${bit === '1' ? 'text-blue-500' : 'text-gray-500'}
//                     animate-pulse
//                   `}
//                 >
//                   {bit}
//                 </span>
//               ))}
//             </div>
//           ))}
  
//           {/* 3D Timeline */}
//           <div className="timeline-container" style={getTimelineStyle() as React.CSSProperties}>
//             {scrollPhase === 'timeline' && (
//               <div className="absolute top-0 left-0 w-full h-full">
//                 {/* Timeline markers and events here */}
//                 <div className="flex justify-between px-4 absolute w-full" style={{ top: '-20px' }}>
//                   {['2018', '2020', '2022', 'Present'].map((year) => (
//                     <div 
//                       key={year}
//                       className="flex flex-col items-center transform-gpu"
//                       style={{
//                         transform: 'rotateX(-60deg) translateZ(20px)',
//                       }}
//                     >
//                       <div className="w-2 h-8 bg-blue-500"/>
//                       <span className="text-sm font-medium text-blue-500">{year}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };