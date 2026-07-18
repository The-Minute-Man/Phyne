import React from 'react';

export default function Engine3Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Engine 3: Media Curation Hub</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Targeted, bite-sized delivery of rigorous university-level material.
      </p>
      <ul style={{ marginTop: '2rem', listStyle: 'none' }}>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Textbook Excerpt Digitizer:</strong> Clean, focused text selections highlighting core derivations.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>MIT OCW Micro-Clips:</strong> Embedded timestamps of specific conceptual leaps or demonstrations.
        </li>
      </ul>
    </main>
  );
}
