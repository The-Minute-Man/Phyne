import React from 'react';
import { combinedUnits } from '@/data/curriculum';

export default function ElectromagnetismModule() {
  const emUnits = combinedUnits.filter(u => u.course === 'Electricity & Magnetism' || u.course === 'AP Skills' || u.course === 'AP Exam Prep');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Electricity & Magnetism Module</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Comprehensive AP Physics C: Electricity & Magnetism curriculum covering all 6 official College Board units, plus AP Exam preparation.
      </p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {emUnits.map((unit, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: unit.course !== 'Electricity & Magnetism' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
            <h2>{unit.unitTitle}</h2>
            <p>
              {unit.lessons.map(l => typeof l === 'string' ? l.replace(' (Interactive)', '') : l.title).join(', ')}.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
