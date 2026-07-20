'use client';

import { useState, useTransition } from 'react';
import { updateRoadmapDates } from '@/app/auth/actions';

type Unit = { course?: string; unitTitle: string; lessons: string[] };

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
  const [startDate, setStartDate] = useState(initialStart || '');
  const [endDate, setEndDate] = useState(initialEnd || '');
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  
  // Calculate dates for individual lessons
  const calculateDates = () => {
    let globalLessonIndex = 0;
    const flatLessons = units.flatMap(u => u.lessons);
    
    if (!startDate || !endDate) return units.map(u => ({ ...u, lessonDates: u.lessons.map(() => null) }));
    
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diff = end - start;
    if (diff <= 0) return units.map(u => ({ ...u, lessonDates: u.lessons.map(() => null) }));

    const step = diff / (flatLessons.length - 1 || 1);
    
    return units.map(unit => {
      const lessonDates = unit.lessons.map(() => {
        const lessonDate = new Date(start + step * globalLessonIndex);
        globalLessonIndex++;
        return lessonDate.toLocaleDateString();
      });
      return { ...unit, lessonDates };
    });
  };

  const scheduledUnits = calculateDates();

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateRoadmapDates(startDate, endDate);
      if (res.success) {
        setSaveMessage('Roadmap dates saved!');
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
          Set your start and end dates below, and we'll automatically generate your schedule.
        </p>
      </header>

      {/* Settings Panel */}
      <div className="glass-panel fade-in delay-1" style={{ padding: '2rem', marginBottom: '4rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Start Date</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Target End Date</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
        </div>
        <button 
          onClick={handleSave} 
          disabled={isPending || !startDate || !endDate}
          className="btn-primary" 
          style={{ padding: '0.75rem 2rem', height: 'fit-content', backgroundColor: 'white', color: 'black' }}
        >
          {isPending ? 'Saving...' : 'Generate & Save'}
        </button>
        {saveMessage && <span style={{ color: 'white', marginLeft: '1rem' }}>{saveMessage}</span>}
      </div>

      {/* S-Curve Timeline */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: '2rem 0' }}>
        {scheduledUnits.map((unit, i) => {
          const isLeft = i % 2 === 0;
          const isLast = i === scheduledUnits.length - 1;
          const animDelay = i * 0.4; // seconds

          return (
            <div key={i} style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              zIndex: 1
            }}>
              
              {/* CSS Border Connector for S-Curve */}
              {!isLast && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [isLeft ? 'left' : 'right']: '50%',
                  width: '25%', // Width of the curve arc
                  height: '100%', // Reaches the center of the next row
                  border: '3px solid white',
                  [isLeft ? 'borderLeft' : 'borderRight']: 'none',
                  borderTopRightRadius: isLeft ? '40px' : '0',
                  borderBottomRightRadius: isLeft ? '40px' : '0',
                  borderTopLeftRadius: !isLeft ? '40px' : '0',
                  borderBottomLeftRadius: !isLeft ? '40px' : '0',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'wipeDown 0.6s linear forwards',
                  animationDelay: `${animDelay + 0.2}s`
                }} />
              )}

              {/* Connecting Dot */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '50%',
                zIndex: 2,
                opacity: 0,
                animation: 'fadeInScale 0.3s ease forwards',
                animationDelay: `${animDelay}s`
              }} />

              {/* Module Box Container */}
              <div style={{ 
                width: '50%', 
                display: 'flex', 
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                padding: isLeft ? '3rem 3rem 3rem 0' : '3rem 0 3rem 3rem',
                zIndex: 3 
              }}>
                {/* Interactive Accordion Box */}
                <div className="glass-panel hover-lift" style={{
                  width: '100%',
                  maxWidth: '400px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  opacity: 0,
                  transform: `translateX(${isLeft ? '20px' : '-20px'})`,
                  animation: 'fadeInSlide 0.4s ease forwards',
                  animationDelay: `${animDelay + 0.1}s`,
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
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
                    {unit.course && (
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontWeight: 'bold' }}>
                        {unit.course}
                      </div>
                    )}
                  </div>

                  {/* Accordion Body (Lessons) */}
                  {expanded === i && (
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                      <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {unit.lessons.map((lesson, lessonIdx) => (
                          <div key={lessonIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span style={{ color: 'white', flex: 1, paddingRight: '1rem' }}>{lesson}</span>
                            <span style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                              {(unit as any).lessonDates[lessonIdx] || 'TBD'}
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
        })}
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
      `}} />
    </div>
  );
}
