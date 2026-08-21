import { combinedUnits } from '@/data/curriculum';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import fs from 'fs';
import path from 'path';

export default async function LessonPage(
  props: { params: Promise<{ unitSlug: string, lessonSlug: string }> }
) {
  const params = await props.params;
  const unit = combinedUnits.find(u => u.slug === params.unitSlug);

  if (!unit) {
    notFound();
  }

  // Determine if it's a quiz or a lesson
  const isQuiz = params.lessonSlug === 'concept-quiz-2';

  let lessonTitle = '';
  if (isQuiz) {
    lessonTitle = 'Concept Quiz';
  } else {
    // Find the specific lesson
    const foundLesson = unit.lessons.find((lesson) => {
      const title = typeof lesson === 'string' ? lesson : lesson.title;
      const displayTitle = title.replace(' (Interactive)', '');
      const slug = displayTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return slug === params.lessonSlug;
    });

    if (!foundLesson) {
      notFound();
    }

    lessonTitle = typeof foundLesson === 'string' ? foundLesson.replace(' (Interactive)', '') : foundLesson.title.replace(' (Interactive)', '');
  }

  // Content files have been migrated to native Next.js routes.
  // If a user hits this dynamic route, it means the lesson hasn't been built natively yet.

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <ScrollReveal>
        <div style={{ marginBottom: '2rem' }}>
          <Link href={`/learn/${unit.slug}`} className="text-muted flex items-center gap-sm hover-lift" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to {unit.unitTitle}
          </Link>
        </div>
      </ScrollReveal>

      {/* Removed lesson heading as requested */}

      <ScrollReveal delay={0.2}>
          <div style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {isQuiz ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem', opacity: 0.8 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>Quiz Locked</h2>
                <p className="text-body-lg text-muted" style={{ maxWidth: '400px', marginBottom: '2rem' }}>
                  This is a placeholder for the interactive quiz module.
                </p>
                <button className="btn-primary" style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Start Quiz</button>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem', opacity: 0.5 }}><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>Content Locked</h2>
                <p className="text-body-lg text-muted" style={{ maxWidth: '500px', marginBottom: '2rem' }}>
                  This is a placeholder for the lesson video, text content, and interactive simulations. 
                </p>
                <Link href={`/learn/${unit.slug}`} className="btn-secondary">Return to Module Overview</Link>
              </>
            )}
          </div>
        </ScrollReveal>
    </div>
  );
}
