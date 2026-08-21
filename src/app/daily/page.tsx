'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useProgress } from '@/components/ProgressProvider';
import QuestionRenderer from '@/components/QuestionRenderer';
import { allQuestions } from '@/questions';
import { Lock } from 'lucide-react';

// Seeded PRNG to ensure the same 5 questions are generated for the entire day
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export default function DailyQuestionPage() {
  const { progress, loading, completeDailySet } = useProgress();
  const [completedLocalIds, setCompletedLocalIds] = useState<Set<string>>(new Set());
  const [hasCompletedSet, setHasCompletedSet] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const hasCompletedDaily = progress?.last_daily_completed === today || hasCompletedSet;

  // Filter pool and pick 5 questions based on today's seed
  const dailyQuestions = useMemo(() => {
    if (!progress) return [];

    // Filter rules:
    // 1. User must have completed a lesson that matches one of the question's tags
    // 2. We exclude 'lesson-dedicated' homework questions
    const eligibleQuestions = allQuestions.filter(q => {
      if (q.tags.includes('lesson-dedicated')) return false;
      return q.tags.some(tag => progress.completed_lessons.includes(tag));
    });

    if (eligibleQuestions.length === 0) return [];

    // Generate seed for today
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed = today.charCodeAt(i) + ((seed << 5) - seed);
    }
    const rand = mulberry32(Math.abs(seed));

    // Fisher-Yates shuffle with seeded PRNG
    const shuffled = [...eligibleQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 5);
  }, [progress, today]);

  // Check completion
  useEffect(() => {
    if (dailyQuestions.length > 0 && completedLocalIds.size === dailyQuestions.length && !hasCompletedDaily) {
      completeDailySet().then(() => {
        setHasCompletedSet(true);
      });
    }
  }, [completedLocalIds, dailyQuestions, hasCompletedDaily, completeDailySet]);

  if (loading) {
    return <div className="container section-padding flex justify-center"><div className="animate-spin text-accent">Loading...</div></div>;
  }

  // Fallback if no lessons completed
  if (dailyQuestions.length === 0 && !hasCompletedDaily) {
    return (
      <div className="container section-padding">
        <ScrollReveal>
          <div className="problem-panel flex flex-col items-center text-center justify-center min-h-[400px]" style={{ padding: '4rem 2rem' }}>
            <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              <Lock size={64} className="text-muted" />
            </div>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>No Questions Unlocked Yet</h2>
            <p className="text-muted text-body-lg" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              The daily practice adapts to your progress. Complete your first lesson on the Roadmap to start unlocking daily questions!
            </p>
            <Link href="/roadmap" className="btn-primary">
              Go to Roadmap
            </Link>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <ScrollReveal>
        <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-display-md" style={{ marginBottom: '0.5rem' }}>
              Daily Practice
            </h1>
            <p className="text-body-lg text-muted">
              Solve {dailyQuestions.length} questions across topics you've covered.
            </p>
          </div>
        </header>
      </ScrollReveal>

      {hasCompletedDaily ? (
        <ScrollReveal delay={0.2}>
          <div className="problem-panel flex flex-col items-center text-center justify-center min-h-[300px]" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>You're all done for today!</h2>
            <p className="text-muted text-body-lg" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              Great job! Come back tomorrow for a new set of challenges.
            </p>
            <Link href="/home" className="btn-primary">
              Return to Dashboard
            </Link>
          </div>
        </ScrollReveal>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>{completedLocalIds.size}</span> / {dailyQuestions.length} Completed
          </div>

          {dailyQuestions.map((question, i) => (
            <ScrollReveal delay={i * 0.1} key={question.id}>
              <div style={{ opacity: completedLocalIds.has(question.id) ? 0.6 : 1, transition: 'opacity 0.3s ease' }}>
                <QuestionRenderer 
                  question={question} 
                  category="daily" 
                  onComplete={(points) => {
                    if (points > 0) {
                      setCompletedLocalIds(prev => {
                        const next = new Set(prev);
                        next.add(question.id);
                        return next;
                      });
                    }
                  }} 
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
