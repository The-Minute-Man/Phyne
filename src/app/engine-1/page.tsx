import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Engine1Dashboard() {
  return (
    <main className="container section-padding">
      <ScrollReveal>
        <h1 className="text-display-md">Engine 1: Scaffolding & Support</h1>
        <p className="text-body-lg text-muted" style={{ marginTop: '1rem' }}>
          Backend logic designed to prevent student frustration and cognitive overload.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <ul className="flex flex-col gap-md" style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Hint Cascade System:</strong> Progressive hints for complex problems.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Why It's Wrong Engine:</strong> Interactive decision trees that catch common mistakes.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Calculus Training Wheels:</strong> Modular math refreshers.
          </li>
        </ul>
      </ScrollReveal>
    </main>
  );
}
