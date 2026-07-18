import React from 'react';

export default function Engine4Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Engine 4: AP Testing & Strategy Engine</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Specialized mode unlocked near exam time focused entirely on the College Board format.
      </p>
      <ul style={{ marginTop: '2rem', listStyle: 'none' }}>
        <li style={{ marginBottom: '1rem' }}>
          <strong>"Speed-Run" MCQ Trainers:</strong> Pattern recognition drills relying on dimensional analysis and limiting cases.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>FRQ Rubric Simulators:</strong> Interactive grading exercises where the student acts as the College Board grader.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Endurance Mode:</strong> Timed, strict simulation exams with scaffolding and hints completely disabled.
        </li>
      </ul>
    </main>
  );
}
