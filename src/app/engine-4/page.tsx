import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Engine4Dashboard() {
  return (
    <main className="container section-padding">
      <ScrollReveal>
        <h1 className="text-display-md">Engine 4: AP Testing & Strategy Engine</h1>
        <p className="text-body-lg text-muted" style={{ marginTop: '1rem' }}>
          Specialized mode unlocked near exam time focused entirely on the College Board format.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <ul className="flex flex-col gap-md" style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>"Speed-Run" MCQ Trainers:</strong> Pattern recognition drills relying on dimensional analysis and limiting cases.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>FRQ Rubric Simulators:</strong> Interactive grading exercises where the student acts as the College Board grader.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Endurance Mode:</strong> Timed, strict simulation exams with scaffolding and hints completely disabled.
          </li>
        </ul>
      </ScrollReveal>
    </main>
  );
}
