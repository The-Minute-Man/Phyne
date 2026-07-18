import React from 'react';

export default function Engine1Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Engine 1: Scaffolding & Support</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Backend logic designed to prevent student frustration and cognitive overload.
      </p>
      <ul style={{ marginTop: '2rem', listStyle: 'none' }}>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Hint Cascade System:</strong> Progressive hints for complex problems.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Why It's Wrong Engine:</strong> Interactive decision trees that catch common mistakes.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Calculus Training Wheels:</strong> Modular math refreshers.
        </li>
      </ul>
    </main>
  );
}
