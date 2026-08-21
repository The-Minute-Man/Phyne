import React, { useState, useEffect, useRef } from 'react';

interface AutoScrubberProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  speedMultiplier?: number;
}

export default function AutoScrubber({ value, min, max, step, onChange, speedMultiplier = 1 }: AutoScrubberProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const lastUpdateRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;
      const deltaTime = timestamp - lastUpdateRef.current;
      
      // Update value at roughly 60fps pacing, scaled by speed
      if (deltaTime >= (16 / speedMultiplier)) {
        let nextValue = Number((value + step).toFixed(3));
        if (nextValue > max) {
          nextValue = min;
        }
        onChange(nextValue);
        lastUpdateRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, value, step, onChange, speedMultiplier]);

  // Wrap around logic is now handled in the animation frame

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pause when user manually scrubs to prevent fighting the auto-scrubber
    setIsPlaying(false);
    onChange(parseFloat(e.target.value));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          background: 'var(--accent)',
          color: 'var(--bg-primary)',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0
        }}
        title={isPlaying ? "Pause Auto-Scrub" : "Play Auto-Scrub"}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleManualChange}
        style={{ flex: 1, cursor: 'pointer' }}
      />
    </div>
  );
}
