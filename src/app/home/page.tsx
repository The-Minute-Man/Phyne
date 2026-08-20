import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { combinedUnits } from '@/data/curriculum';
import ScrollReveal from '@/components/ScrollReveal';
import { calculateOverallGrade, getLetterGrade } from '@/utils/grading';

export default async function LearnerHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Extract name from metadata or fallback to email
  const fullName = user.user_metadata?.full_name || 'Student';

  // Fetch actual user progress
  const { data: progressData } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();

  let overallPercentage = 0;
  let letterGrade = 'N/A';

  if (progressData?.question_states) {
    let totalEarned = 0;
    let totalPossible = 0;
    
    // Each completed question is out of 7 points max
    const qStates = progressData.question_states;
    for (const key in qStates) {
      const state = qStates[key];
      if (['correct', 'gave_up'].includes(state.status)) {
        totalEarned += (state.pointsAwarded || 0);
        totalPossible += 7;
      }
    }

    if (totalPossible > 0) {
      overallPercentage = Math.round((totalEarned / totalPossible) * 100);
      letterGrade = getLetterGrade(overallPercentage);
    }
  }
  
  // Last active lesson
  const lastActiveLessonPath = user.user_metadata?.last_lesson || '/learn/kinematics/scalars-and-vectors';

  return (
    <div className="container section-padding" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
        
        {/* Left Side: Header, Grade, Continue */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <ScrollReveal>
            <header>
              <h1 className="text-display-md" style={{ marginBottom: '0.5rem' }}>
                Welcome, <span style={{ color: 'var(--accent)' }}>{fullName}</span>
              </h1>
              <p className="text-body-lg text-muted">
                Pick up where you left off in your physics journey.
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col">
              <span className="text-display-lg" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '5rem', lineHeight: '1' }}>
                {letterGrade}
              </span>
              <span className="text-body-lg text-muted" style={{ marginTop: '0.5rem', fontWeight: 500, fontSize: '1.5rem' }}>
                {overallPercentage}%
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href={lastActiveLessonPath} className="btn-primary hover-lift" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', width: '100%', maxWidth: '250px' }}>
                Continue
              </Link>
              <Link href="/daily" className="btn-secondary hover-lift" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', width: '100%', maxWidth: '250px' }}>
                Daily Questions
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Roadmap */}
        <div style={{ flex: '0 1 550px', width: '100%' }}>
          <ScrollReveal delay={0.3}>
            <section className="glass-panel">
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <Link href="/roadmap" className="btn-secondary hover-lift" style={{ textDecoration: 'none', display: 'inline-block', width: '100%', textAlign: 'center', color: '#10b981' }} title="Click for full planner">
                  Curriculum Roadmap
                </Link>
              </div>
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
                          <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{unit.unitTitle}</span>
                            <Link href={`/learn/${unit.slug}`} className="hover-lift text-muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Open</Link>
                          </summary>
                          <ul className="text-body-sm text-muted" style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                            {unit.lessons.map((lesson, j) => {
                              const title = typeof lesson === 'string' ? lesson : lesson.title;
                              const displayTitle = typeof lesson === 'string' ? title.replace(' (Interactive)', '') : title;
                              return (
                                <li key={j} style={{ marginBottom: '0.25rem' }}>
                                  {displayTitle}
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
    </div>
  );
}
