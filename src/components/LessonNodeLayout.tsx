'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LessonNode {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LessonNodeLayoutProps {
  nodes: LessonNode[];
}

export default function LessonNodeLayout({ nodes }: LessonNodeLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [completedNodes, setCompletedNodes] = useState<Set<number>>(new Set([0]));
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    // When visiting a node, mark it as completed immediately
    setCompletedNodes((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const navigateTo = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < nodes.length - 1) {
      navigateTo(currentIndex + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 100px)' }}>
      {/* Node Content Area */}
      <div style={{ flex: 1, position: 'relative', overflowX: 'hidden', paddingBottom: '120px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: '100%', minHeight: '100%' }}
          >
            {nodes[currentIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Timeline */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 2rem',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          
          {/* Connecting Background Line */}
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border)', zIndex: 0, transform: 'translateY(-50%)' }} />
          
          {/* Animated Green Line for Completion */}
          <motion.div
            style={{ position: 'absolute', top: '50%', left: '0', height: '2px', background: 'var(--accent)', zIndex: 1, transform: 'translateY(-50%)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${(currentIndex / (nodes.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {nodes.map((node, i) => {
            const isCompleted = completedNodes.has(i);
            const isActive = i === currentIndex;
            const isHovered = hoveredNode === i;
            const showTitle = isActive || isHovered;
            
            const isFirst = i === 0;
            const isLast = i === nodes.length - 1;
            const xOffset = isFirst ? '0%' : isLast ? '-100%' : '-50%';
            const leftPos = isFirst ? '0%' : isLast ? 'auto' : '50%';
            const rightPos = isLast ? '0%' : 'auto';
            
            return (
              <div 
                key={node.id} 
                style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <button
                  onClick={() => navigateTo(i)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--accent)' : isCompleted ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    border: isActive ? '4px solid #fff' : isCompleted ? '2px solid var(--accent)' : '2px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 0 10px var(--accent)' : 'none',
                  }}
                />
                {showTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: xOffset }}
                    animate={{ opacity: 1, y: 0, x: xOffset }}
                    style={{ position: 'absolute', top: '-30px', left: leftPos, right: rightPos, whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}
                  >
                    {node.title}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Navigation Action */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            onClick={handleNext}
            disabled={currentIndex === nodes.length - 1}
            className={currentIndex === nodes.length - 1 ? 'btn-secondary' : 'btn-primary'}
            style={{ opacity: currentIndex === nodes.length - 1 ? 0.5 : 1, padding: '0.5rem 2rem' }}
          >
            {currentIndex === nodes.length - 1 ? 'Lesson Complete' : 'Continue to Next Node'}
          </button>
        </div>
      </div>
    </div>
  );
}
