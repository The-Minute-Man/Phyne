import { combinedUnits } from '@/data/curriculum';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { createClient } from '@/utils/supabase/server';
import { allQuestions } from '@/questions';

export default async function LearnerUnitPage(
  props: { params: Promise<{ unitSlug: string }> }
) {
  const params = await props.params;
  const unit = combinedUnits.find(u => u.slug === params.unitSlug);

  if (!unit) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let completedLessons: string[] = [];
  let questionStates: any = {};
  if (user) {
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('completed_lessons, question_states')
      .eq('user_id', user.id)
      .single();
    if (progressData?.completed_lessons) {
      completedLessons = progressData.completed_lessons;
    }
    if (progressData?.question_states) {
      questionStates = progressData.question_states;
    }
  }

  return (
    <div className="container section-padding">
      <ScrollReveal>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/home" className="text-muted flex items-center gap-sm hover-lift" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Dashboard
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <header style={{ marginBottom: '3rem' }}>
          <span className="text-body-sm text-accent" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {unit.course}
          </span>
          <h1 className="text-display-md" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            {unit.unitTitle}
          </h1>
          <p className="text-body-lg text-muted">
            Master the concepts, apply the formulas, and test your knowledge.
          </p>
        </header>
      </ScrollReveal>

      <div className="grid gap-lg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        
        {/* Lessons List */}
        <ScrollReveal delay={0.2}>
          <section className="glass-panel" style={{ height: '100%' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Lessons
            </h2>
            <div className="flex flex-col gap-sm">
              {(() => {
                const elements: React.ReactNode[] = [];
                const totalLessons = unit.lessons.length;
                const quiz1Index = Math.floor(totalLessons / 3) - 1;
                const quiz2Index = Math.floor((totalLessons * 2) / 3) - 1;
                
                unit.lessons.forEach((lesson, index) => {
                  const title = typeof lesson === 'string' ? lesson : lesson.title;
                  const displayTitle = title.replace(' (Interactive)', '');
                  const lessonSlug = displayTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  
                  const isCompleted = completedLessons.includes(lessonSlug);
                  
                  let lessonScoreText = '';
                  if (isCompleted) {
                    const lessonQuestions = allQuestions.filter(q => q.tags?.includes(lessonSlug) && q.tags?.includes(unit.slug));
                    let earned = 0;
                    let possible = 0;
                    for (const q of lessonQuestions) {
                      const state = questionStates[q.id];
                      if (state && ['correct', 'gave_up'].includes(state.status)) {
                        earned += (state.pointsAwarded || 0);
                        possible += 7;
                      }
                    }
                    if (possible > 0) {
                      lessonScoreText = `${Math.round((earned / possible) * 100)}%`;
                    }
                  }
                  
                  elements.push(
                    <Link 
                      key={`lesson-${index}`} 
                      href={`/learn/${unit.slug}/${lessonSlug}`} 
                      className="flex justify-between items-center hover-lift" 
                      style={{ 
                        padding: '1rem', 
                        backgroundColor: isCompleted ? 'rgba(52, 211, 153, 0.05)' : 'var(--bg-secondary)', 
                        borderRadius: '8px', 
                        border: isCompleted ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid var(--border)',
                        textDecoration: 'none',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <div className="flex items-center gap-sm">
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: isCompleted ? '2px solid var(--accent)' : '2px solid var(--border)', 
                          backgroundColor: isCompleted ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          {isCompleted && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          )}
                        </div>
                        <span style={{ fontWeight: 500, color: isCompleted ? 'var(--accent)' : 'inherit' }}>
                          {displayTitle} {isCompleted && lessonScoreText && <span style={{ opacity: 0.8, marginLeft: '0.5rem', fontSize: '0.9em' }}>({lessonScoreText})</span>}
                        </span>
                      </div>
                    </Link>
                  );

                  if (index === Math.max(0, quiz1Index)) {
                    elements.push(
                      <Link 
                        key="quiz-1" 
                        href={`/learn/${unit.slug}/concept-quiz-1`} 
                        className="flex justify-between items-center hover-lift" 
                        style={{ 
                          padding: '1rem', 
                          backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                          borderRadius: '8px', 
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          textDecoration: 'none',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <div className="flex items-center gap-sm">
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          </div>
                          <span style={{ fontWeight: 500, color: '#3b82f6' }}>Concept Quiz 1</span>
                        </div>
                      </Link>
                    );
                  }

                  if (index === Math.max(0, quiz2Index) && index !== quiz1Index) {
                    elements.push(
                      <Link 
                        key="quiz-2" 
                        href={`/learn/${unit.slug}/concept-quiz-2`} 
                        className="flex justify-between items-center hover-lift" 
                        style={{ 
                          padding: '1rem', 
                          backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                          borderRadius: '8px', 
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          textDecoration: 'none',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <div className="flex items-center gap-sm">
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          </div>
                          <span style={{ fontWeight: 500, color: '#3b82f6' }}>Concept Quiz 2</span>
                        </div>
                      </Link>
                    );
                  }
                });

                return elements;
              })()}
            </div>
          </section>
        </ScrollReveal>

        {/* Assessments */}
        <ScrollReveal delay={0.3}>
          <section className="flex flex-col gap-lg">

            <div className="glass-panel" style={{ border: '1px solid var(--accent)' }}>
              <h2 className="text-display-sm" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Unit Test</h2>
              <p className="text-body-sm text-muted" style={{ marginBottom: '1.5rem' }}>
                A comprehensive exam covering all lessons in this unit. AP-style questions included.
              </p>
              <Link href="#" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Start Unit Test
              </Link>
            </div>

          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
