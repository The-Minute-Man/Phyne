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
          Welcome back, <span style={{ color: 'var(--accent)' }}>{fullName}</span>
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
                <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>45%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Continue Module</button>
        </section>

        {/* Recent Progress */}
        <section className="glass-panel fade-in delay-2" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Recent Activity
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
              <span>Completed "Drag Force Differential"</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></div>
              <span>Started "Energy Landscapes"</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></div>
              <span>Review: Free Body Diagrams</span>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
