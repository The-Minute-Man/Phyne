import React from 'react';

export default function ElectromagnetismModule() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Electricity & Magnetism Module</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Curriculum spanning from January to March.
      </p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>January: Electrostatics</h2>
          <p>Interactive Build: "Gauss's Law Architect" and charge density integral simulators.</p>
        </div>
        
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>February: Circuits & Magnetostatics</h2>
          <p>Interactive Build: RC circuit differential equations; Biot-Savart vector setup tools.</p>
        </div>
        
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>March: Electromagnetism</h2>
          <p>Interactive Build: Faraday's / Lenz's Law simulators for predicting induced current direction.</p>
        </div>
      </div>
    </main>
  );
}
