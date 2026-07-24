import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { combinedUnits } from '@/data/curriculum';

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
                <span style={{ fontWeight: 600 }}>Kinematics</span>
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
            
            {['Mechanics', 'Electricity & Magnetism', 'AP Skills'].map((courseName) => (
              <details open key={courseName}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                    {courseName}
                  </h3>
                </summary>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                  
                  {combinedUnits.filter(u => u.course === courseName).map((unit, i) => (
                    <details key={i}>
                      <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>{unit.unitTitle}</summary>
                      <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                        {unit.lessons.map((lesson, j) => {
                          const title = typeof lesson === 'string' ? lesson : lesson.title;
                          const displayTitle = typeof lesson === 'string' ? title.replace(' (Interactive)', '') : title;
                          const isInteractive = typeof lesson === 'string' ? title.includes('(Interactive)') : lesson.isInteractive;
                          return (
                            <li key={j} style={{ marginBottom: '0.25rem' }}>
                              {displayTitle}
                              {isInteractive && (
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', padding: '0.1rem 0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '4px', fontWeight: 600 }}>Interactive</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  ))}

                </div>
              </details>
            ))}

          </div>
        </section>

      </div>
    </div>
  );
}
