import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { combinedUnits } from '@/data/curriculum';
import ScrollReveal from '@/components/ScrollReveal';

export default async function LearnerHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Extract name from metadata or fallback to email
  const fullName = user.user_metadata?.full_name || 'Student';

  return (
    <div className="container section-padding">
      <ScrollReveal>
        <header style={{ marginBottom: '4rem' }}>
          <h1 className="text-display-md" style={{ marginBottom: '0.5rem' }}>
            Welcome, <span style={{ color: 'var(--accent)' }}>{fullName}</span>
          </h1>
          <p className="text-body-lg text-muted">
            Pick up where you left off in your physics journey.
          </p>
        </header>
      </ScrollReveal>

      <div className="grid grid-auto-fit gap-lg">
        
        {/* Active Modules */}
        <ScrollReveal delay={0.2}>
          <section className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Active Modules
            </h2>
            <div className="flex flex-col gap-md">
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Kinematics</span>
                  <span className="text-body-sm text-muted">0%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
                </div>
              </div>
            </div>
            <button className="btn-primary md-w-full" style={{ marginTop: '1.5rem', width: '100%' }}>Start Module</button>
          </section>
        </ScrollReveal>

        {/* Curriculum Roadmap */}
        <ScrollReveal delay={0.3}>
          <section className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <Link href="/roadmap" style={{ color: '#10b981', textDecoration: 'none' }} className="hover-lift" title="Click for full planner">
                Curriculum Roadmap
              </Link>
            </h2>
            <div className="flex flex-col gap-lg">
              
              {['Mechanics', 'Electricity & Magnetism', 'AP Skills'].map((courseName) => (
                <details open key={courseName}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                      {courseName}
                    </h3>
                  </summary>
                  <div className="flex flex-col gap-sm" style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', marginTop: '0.75rem' }}>
                    
                    {combinedUnits.filter(u => u.course === courseName).map((unit, i) => (
                      <details key={i}>
                        <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)' }}>{unit.unitTitle}</summary>
                        <ul className="text-body-sm text-muted" style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
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
        </ScrollReveal>

      </div>
    </div>
  );
}
