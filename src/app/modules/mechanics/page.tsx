import React from 'react';
import { combinedUnits } from '@/data/curriculum';
import ScrollReveal from '@/components/ScrollReveal';

export default function MechanicsModule() {
  const mechanicsUnits = combinedUnits.filter(u => u.course === 'Mechanics');

  return (
    <main className="container section-padding">
      <ScrollReveal>
        <h1 className="text-display-md">Mechanics Module</h1>
        <p className="text-body-lg text-muted" style={{ marginTop: '1rem' }}>
          Comprehensive AP Physics C: Mechanics curriculum covering all 7 official College Board units.
        </p>
      </ScrollReveal>
      
      <div className="grid gap-md" style={{ marginTop: '2rem' }}>
        {mechanicsUnits.map((unit, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h2 className="text-display-sm" style={{ marginBottom: '0.5rem' }}>{unit.unitTitle}</h2>
              <p className="text-body-md text-muted">
                {unit.lessons.map(l => typeof l === 'string' ? l.replace(' (Interactive)', '') : l.title).join(', ')}.
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
