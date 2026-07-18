import React from 'react';

export default function MechanicsModule() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Mechanics Module</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Curriculum spanning from September to December.
      </p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>September: Kinematics & Dynamics</h2>
          <p>Interactive Build: "Drag Force Differential" — FBD creation to variable separation.</p>
        </div>
        
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>October: Energy & Momentum</h2>
          <p>Interactive Build: "Energy Landscape" — deriving F = -dU/dx and 2D collision logic trees.</p>
        </div>
        
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>November: Rotational Mechanics</h2>
          <p>Interactive Build: "Rolling Without Slipping" decision matrices and cross-product trainers.</p>
        </div>
        
        <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <h2>December: Gravitation & Oscillations</h2>
          <p>Interactive Build: Physical pendulum derivation scaffolding.</p>
        </div>
      </div>
    </main>
  );
}
