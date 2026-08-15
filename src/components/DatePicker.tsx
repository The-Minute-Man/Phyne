'use client';

import { useState, useRef, useEffect } from 'react';

export default function DatePicker({
  value,
  onChange,
  label
}: {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const parseValue = (val: string) => {
    if (!val) return new Date();
    const [y, m, d] = val.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const selectedDate = parseValue(value);
  const [currentView, setCurrentView] = useState(selectedDate);

  useEffect(() => {
    setCurrentView(parseValue(value));
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const path = e.composedPath();
      if (containerRef.current && !path.includes(containerRef.current)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const year = currentView.getFullYear();
  const month = currentView.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentView(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentView(new Date(year, month + 1, 1));
  };

  const handleSelect = (day: number) => {
    const newY = currentView.getFullYear();
    const newM = String(currentView.getMonth() + 1).padStart(2, '0');
    const newD = String(day).padStart(2, '0');
    onChange(`${newY}-${newM}-${newD}`);
  };

  const formatDisplay = (val: string) => {
    if (!val) return 'Select Date';
    const [y, m, d] = val.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col gap-sm" ref={containerRef} style={{ position: 'relative' }}>
      {label && <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>}
      
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field flex justify-between items-center"
        style={{ cursor: 'pointer', textAlign: 'left', minWidth: '200px' }}
      >
        <span>{formatDisplay(value)}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      {isOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          marginBottom: '0.5rem',
          width: '280px',
          padding: '1rem',
          zIndex: 100,
          animation: 'fadeInSlideUp 0.2s ease forwards'
        }}>
          
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <button type="button" onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem' }}>
              &larr;
            </button>
            <div style={{ fontWeight: 'bold', color: 'white' }}>
              {monthNames[month]} {year}
            </div>
            <button type="button" onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem' }}>
              &rarr;
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '0.5rem' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  style={{
                    padding: '0.4rem 0',
                    border: 'none',
                    backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
