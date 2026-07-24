import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RoadmapPlanner from '@/components/RoadmapPlanner';
import Link from 'next/link';
import { combinedUnits } from '@/data/curriculum';

export default async function CombinedRoadmap() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const initialStart = user.user_metadata?.roadmap_start || null;

  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Link href="/home" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </Link>
      </div>
      <RoadmapPlanner 
        courseTitle="AP Physics C" 
        units={combinedUnits} 
        initialStart={initialStart} 
      />
    </div>
  );
}
