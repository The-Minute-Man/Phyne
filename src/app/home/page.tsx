import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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
            Course Goals & Sub-steps
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                AP Physics C: Mechanics
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 1:</span> Kinematics (Drag Force Differential)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 2:</span> Newton's Laws of Motion</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 3:</span> Work, Energy, and Power (Energy Landscapes)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 4:</span> Systems of Particles & Linear Momentum</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 5:</span> Rotation (Rolling Without Slipping)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 6:</span> Oscillations (Physical Pendulums)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 7:</span> Gravitation</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#10b981', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                AP Physics C: E&M
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 1:</span> Electrostatics (Gauss's Law Architect)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 2:</span> Conductors, Capacitors, Dielectrics</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 3:</span> Electric Circuits (RC Differential Equations)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 4:</span> Magnetic Fields (Biot-Savart Builders)</li>
                <li><span style={{ color: 'var(--text-primary)' }}>Unit 5:</span> Electromagnetism (Faraday & Lenz's Law)</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
