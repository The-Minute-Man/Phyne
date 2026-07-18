import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>AP Physics C</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>Interactive Learning Platform Architecture</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Core Engines Section */}
        <section style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)', background: 'var(--secondary)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Core Engines</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/engine-1" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Engine 1:</strong> Scaffolding & Support
            </Link>
            <Link href="/engine-2" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Engine 2:</strong> Interactive Concept Builders
            </Link>
            <Link href="/engine-3" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Engine 3:</strong> Media Curation Hub
            </Link>
            <Link href="/engine-4" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Engine 4:</strong> AP Testing Strategy
            </Link>
          </div>
        </section>

        {/* Development Roadmap Section */}
        <section style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)', background: 'var(--secondary)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Curriculum Modules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/modules/mechanics" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Phase 1:</strong> Mechanics (Sep-Dec)
            </Link>
            <Link href="/modules/electromagnetism" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'block' }}>
              <strong>Phase 2:</strong> E&M (Jan-Mar)
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
