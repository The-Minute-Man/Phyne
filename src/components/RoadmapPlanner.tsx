'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { updateRoadmapDates } from '@/app/auth/actions';
import DatePicker from './DatePicker';

type Unit = { course?: string; unitTitle: string; lessons: string[] };

function useScrollProgress(startOffset = 0.6, endOffset = 0.2) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * startOffset;
      const endTrigger = windowHeight * endOffset;
      
      const currentPos = rect.top;
      
      if (currentPos >= startTrigger) {
        setProgress(0);
      } else if (currentPos <= endTrigger) {
        setProgress(1);
      } else {
        setProgress((startTrigger - currentPos) / (startTrigger - endTrigger));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [startOffset, endOffset]);

  return [ref, progress] as const;
}

function TimelineNode({ unit, i, isLast, expanded, setExpanded }: { unit: Unit & { lessonDates: (string | null)[] }, i: number, isLast: boolean, expanded: number | null, setExpanded: (val: number | null) => void }) {
  const [ref, progress] = useScrollProgress(0.65, 0.15); // Triggers between 65% and 15% from the top
  const isLeft = i % 2 === 0;

  // Map progress to specific animation phases
  const clamp = (val: number) => Math.min(Math.max(val, 0), 1);
  const mapProgress = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
  // If it's the first node, force it to be completely materialized on load
  const effectiveProgress = i === 0 ? 1 : progress;

  const pDot = mapProgress(effectiveProgress, 0.0, 0.2);
  const pLine = mapProgress(effectiveProgress, 0.1, 0.7);
  const pPanel = mapProgress(effectiveProgress, 0.0, 0.4);

  return (
    <div className="timeline-node" ref={ref} style={{ 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'flex-start', // Fixed: flex-start ensures the dot and line stay anchored when accordion expands
      width: '100%',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      zIndex: 1
    }}>
      
      {/* CSS Border Connector for S-Curve */}
      {!isLast && (
        <div className="timeline-connector" style={{
          position: 'absolute',
          top: '6rem', // Fixed: explicit offset aligns exactly with the dot and doesn't break when row expands
          [isLeft ? 'left' : 'right']: '50%',
          width: '40%', // Widen the S-curve
          height: '100%', // Reaches the center of the next row
          border: '3px solid white',
          [isLeft ? 'borderLeft' : 'borderRight']: 'none',
          borderTopRightRadius: isLeft ? '80px' : '0',
          borderBottomRightRadius: isLeft ? '80px' : '0',
          borderTopLeftRadius: !isLeft ? '80px' : '0',
          borderBottomLeftRadius: !isLeft ? '80px' : '0',
          zIndex: 0,
          opacity: pLine > 0 ? 1 : 0,
          clipPath: `inset(0 0 ${100 - pLine * 100}% 0)`,
          willChange: 'clip-path'
        }} />
      )}

      {/* Connecting Dot */}
      <div className="timeline-dot" style={{
        position: 'absolute',
        left: '50%',
        top: '6rem', // Fixed: explicit offset matches the line start
        transform: `translate(-50%, -50%) scale(${pDot})`,
        width: '16px',
        height: '16px',
        backgroundColor: 'white',
        borderRadius: '50%',
        zIndex: 2,
        opacity: pDot,
        willChange: 'transform, opacity'
      }} />

      {/* Module Box Container */}
      <div className="timeline-box-container" style={{ 
        width: '50%', 
        display: 'flex', 
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        padding: isLeft ? '4rem 4rem 4rem 0' : '4rem 0 4rem 4rem', // slightly more padding for the wider curve
        zIndex: 3 
      }}>
        {/* Interactive Accordion Box */}
        <div className="hover-lift timeline-box" style={{
          width: '100%',
          maxWidth: '450px',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#121212', // Opaque to hide the line behind it
          borderRadius: '12px',
          opacity: pPanel,
          transform: `translateX(${isLeft ? 30 * (1 - pPanel) : -30 * (1 - pPanel)}px)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          zIndex: 4,
          willChange: 'transform, opacity'
        }}>
          
          {/* Accordion Header */}
          <div 
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {unit.unitTitle}
              </h3>
              <span style={{ color: 'white', fontSize: '1.5rem', lineHeight: '1rem' }}>
                {expanded === i ? '−' : '+'}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontWeight: 'bold' }}>
              {unit.course ? `${unit.course} • ` : ''}Starts: {unit.lessonDates[0] || 'TBD'}
            </div>
          </div>

          {/* Accordion Body (Lessons) */}
          {expanded === i && (
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {unit.lessons.map((lesson: string, lessonIdx: number) => (
                  <div key={lessonIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: 'white', flex: 1, paddingRight: '1rem' }}>{lesson}</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                      {unit.lessonDates[lessonIdx] || 'TBD'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default function RoadmapPlanner({
  courseTitle,
  units,
  initialStart,
  initialEnd
}: {
  courseTitle: string;
  units: Unit[];
  initialStart: string | null;
  initialEnd: string | null;
}) {
  const getAcademicYearDates = () => {
    const now = new Date();
    // If we are in June (month 5) or later, default to the upcoming academic year
    const year = now.getMonth() >= 5 ? now.getFullYear() : now.getFullYear() - 1;
    return { start: `${year}-09-01`, end: `${year + 1}-05-10` };
  };

  const defaults = getAcademicYearDates();

  // If the dates saved in the database are identical (e.g., today and today due to a previous bug), ignore them
  const isInvalidDbDates = !initialStart || !initialEnd || initialStart === initialEnd;

  const [startDate, setStartDate] = useState(isInvalidDbDates ? defaults.start : initialStart);
  const [endDate, setEndDate] = useState(isInvalidDbDates ? defaults.end : initialEnd);
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  
  // Calculate dates for individual lessons
  const calculateDates = () => {
    let globalLessonIndex = 0;
    const flatLessons = units.flatMap(u => u.lessons);
    
    if (!startDate || !endDate) return units.map(u => ({ ...u, lessonDates: u.lessons.map(() => null) }));
    
    const parseLocal = (dateString: string) => {
      const [y, m, d] = dateString.split('-').map(Number);
      return new Date(y, m - 1, d).getTime();
    };
    
    const start = parseLocal(startDate);
    const end = parseLocal(endDate);
    const diff = end - start;
    if (diff <= 0) return units.map(u => ({ ...u, lessonDates: u.lessons.map(() => null) }));

    const step = diff / (flatLessons.length - 1 || 1);
    
    return units.map(unit => {
      const lessonDates = unit.lessons.map(() => {
        const lessonDate = new Date(start + step * globalLessonIndex);
        globalLessonIndex++;
        // Display as Short Date (e.g., Sep 1)
        return lessonDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
      return { ...unit, lessonDates };
    });
  };

  const scheduledUnits = calculateDates();

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateRoadmapDates(startDate, endDate);
      if (res.success) {
        setSaveMessage('Roadmap dates saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage(res.error || 'Failed to save');
      }
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header className="fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
          {courseTitle} Roadmap
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your personalized journey through AP Physics C.
        </p>
      </header>

      {/* S-Curve Timeline */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: '2rem 0' }}>
        {scheduledUnits.map((unit, i) => (
          <TimelineNode 
            key={i}
            unit={unit}
            i={i}
            isLast={i === scheduledUnits.length - 1}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </div>

      {/* Settings Panel Moved to the Bottom */}
      <div className="glass-panel fade-in settings-panel" style={{ position: 'relative', zIndex: 50, padding: '2rem', marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
        <DatePicker 
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker 
          label="Target End Date"
          value={endDate}
          onChange={setEndDate}
        />
        <button 
          onClick={handleSave} 
          disabled={isPending || !startDate || !endDate}
          className="btn-primary" 
          style={{ padding: '0.75rem 2rem', height: 'fit-content', backgroundColor: 'white', color: 'black' }}
        >
          {isPending ? 'Saving...' : 'Generate & Save'}
        </button>
        {saveMessage && <div style={{ width: '100%', textAlign: 'center', color: '#10b981', marginTop: '0.5rem' }}>{saveMessage}</div>}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wipeDown {
          0% { clip-path: inset(0 0 100% 0); opacity: 0; }
          1% { opacity: 1; }
          100% { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeInSlide {
          to { opacity: 1; transform: translateX(0); }
        }
        
        /* Mobile overrides */
        @media (max-width: 768px) {
          .timeline-node {
            justify-content: flex-end !important;
          }
          .timeline-connector {
            left: 20px !important;
            right: auto !important;
            width: 0 !important;
            border-right: none !important;
            border-left: 3px solid white !important;
            border-radius: 0 !important;
          }
          .timeline-dot {
            left: 20px !important;
          }
          .timeline-box-container {
            width: 100% !important;
            padding: 4rem 1rem 4rem 3.5rem !important;
            justify-content: flex-start !important;
          }
          .timeline-box {
            transform: translateX(0) !important;
          }
          .settings-panel {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 1.5rem !important;
          }
          .settings-panel > button {
            width: 100% !important;
          }
        }
      `}} />
    </div>
  );
}
