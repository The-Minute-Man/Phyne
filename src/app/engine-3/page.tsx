import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Engine3Dashboard() {
  return (
    <main className="container section-padding">
      <ScrollReveal>
        <h1 className="text-display-md">Engine 3: Media Curation Hub</h1>
        <p className="text-body-lg text-muted" style={{ marginTop: '1rem' }}>
          Targeted, bite-sized delivery of rigorous university-level material.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <ul className="flex flex-col gap-md" style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Textbook Excerpt Digitizer:</strong> Clean, focused text selections highlighting core derivations.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>MIT OCW Micro-Clips:</strong> Embedded timestamps of specific conceptual leaps or demonstrations.
          </li>
        </ul>
      </ScrollReveal>
    </main>
  );
}
