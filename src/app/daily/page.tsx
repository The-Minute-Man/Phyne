import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function DailyQuestionPage() {
  return (
    <div className="container section-padding">
      <ScrollReveal>
        <header style={{ marginBottom: '4rem' }}>
          <h1 className="text-display-md" style={{ marginBottom: '0.5rem' }}>
            Daily Question
          </h1>
          <p className="text-body-lg text-muted">
            Test your knowledge with a random question from our question pools.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="problem-panel flex flex-col items-center text-center justify-center min-h-[300px]">
          <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>Coming Soon</h2>
          <p className="text-muted text-body-lg" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            The global question pool is currently being populated. Once lessons are filled with question banks, un-used questions will appear here for your daily challenge!
          </p>
          <Link href="/home" className="btn-secondary">
            Return to Dashboard
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
