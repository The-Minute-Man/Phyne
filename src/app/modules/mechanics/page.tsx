import React from 'react';
import { combinedUnits } from '@/data/curriculum';

export default function MechanicsModule() {
  const mechanicsUnits = combinedUnits.filter(u => u.course === 'Mechanics');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Mechanics Module</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Comprehensive AP Physics C: Mechanics curriculum covering all 7 official College Board units.
      </p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {mechanicsUnits.map((unit, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
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
