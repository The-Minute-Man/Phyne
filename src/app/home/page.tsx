import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LearnerHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Extract name from metadata or fallback to email
  const fullName = user.user_metadata?.full_name || 'Student';

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <header className="fade-in" style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '0.5rem' }}>
          Welcome, <span style={{ color: 'var(--accent)' }}>{fullName}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Pick up where you left off in your physics journey.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Active Modules */}
        <section className="glass-panel fade-in delay-1" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Active Modules
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>Kinematics & Dynamics</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>0%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Start Module</button>
        </section>

        {/* Curriculum Roadmap */}
        <section className="glass-panel fade-in delay-2" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <Link href="/roadmap" style={{ color: '#10b981', textDecoration: 'none' }} className="hover-lift" title="Click for full planner">
              Curriculum Roadmap
            </Link>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <details open>
              <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                  Mechanics
                </h3>
              </summary>
              <div style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                
                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 1: Kinematics</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>1D & 2D Motion</li>
                    <li>Projectile Motion</li>
                    <li>Drag Force Differential (Interactive)</li>
                  </ul>
                </details>
                
                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 2: Newton&apos;s Laws</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Free Body Diagrams</li>
                    <li>Friction & Circular Motion</li>
                  </ul>
                </details>
                
                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 3: Work, Energy, Power</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Work-Energy Theorem</li>
                    <li>Energy Landscapes (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 4: Systems of Particles</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Center of Mass</li>
                    <li>Linear Momentum & Collisions</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 5: Rotation</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Torque & Rotational Inertia</li>
                    <li>Rolling Without Slipping (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 6: Oscillations</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Simple Harmonic Motion</li>
                    <li>Physical Pendulums (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 7: Gravitation</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Kepler&apos;s Laws & Orbits</li>
                  </ul>
                </details>

              </div>
            </details>

            <details open>
              <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                  Electricity & Magnetism
                </h3>
              </summary>
              <div style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                
                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 1: Electrostatics</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Electric Charge & Force</li>
                    <li>Electric Fields & Gauss&apos;s Law (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 2: Conductors & Capacitors</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Electrostatic Potential</li>
                    <li>Dielectrics</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 3: Electric Circuits</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Current & Resistance</li>
                    <li>RC Differential Equations (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 4: Magnetic Fields</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Magnetic Force</li>
                    <li>Biot-Savart Builders (Interactive)</li>
                  </ul>
                </details>

                <details>
                  <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>Unit 5: Electromagnetism</summary>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <li>Faraday & Lenz&apos;s Law (Interactive)</li>
                    <li>Inductance</li>
                  </ul>
                </details>

              </div>
            </details>

          </div>
        </section>

      </div>
    </div>
  );
}
