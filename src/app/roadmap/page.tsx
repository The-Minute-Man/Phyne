import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RoadmapPlanner from '@/components/RoadmapPlanner';
import Link from 'next/link';

const combinedUnits = [
  // Mechanics
  { course: 'Mechanics', unitTitle: 'Unit 1: Kinematics', lessons: ['1D & 2D Motion', 'Projectile Motion', 'Drag Force Differential (Interactive)'] },
  { course: 'Mechanics', unitTitle: "Unit 2: Newton's Laws", lessons: ['Free Body Diagrams', 'Friction & Circular Motion'] },
  { course: 'Mechanics', unitTitle: 'Unit 3: Work, Energy, Power', lessons: ['Work-Energy Theorem', 'Energy Landscapes (Interactive)'] },
  { course: 'Mechanics', unitTitle: 'Unit 4: Systems of Particles', lessons: ['Center of Mass', 'Linear Momentum & Collisions'] },
  { course: 'Mechanics', unitTitle: 'Unit 5: Rotation', lessons: ['Torque & Rotational Inertia', 'Rolling Without Slipping (Interactive)'] },
  { course: 'Mechanics', unitTitle: 'Unit 6: Oscillations', lessons: ['Simple Harmonic Motion', 'Physical Pendulums (Interactive)'] },
  { course: 'Mechanics', unitTitle: 'Unit 7: Gravitation', lessons: ["Kepler's Laws & Orbits"] },
  
  // E&M
  { course: 'Electricity & Magnetism', unitTitle: 'Unit 1: Electrostatics', lessons: ['Electric Charge & Force', "Electric Fields & Gauss's Law (Interactive)"] },
  { course: 'Electricity & Magnetism', unitTitle: 'Unit 2: Conductors & Capacitors', lessons: ['Electrostatic Potential', 'Dielectrics'] },
  { course: 'Electricity & Magnetism', unitTitle: 'Unit 3: Electric Circuits', lessons: ['Current & Resistance', 'RC Differential Equations (Interactive)'] },
  { course: 'Electricity & Magnetism', unitTitle: 'Unit 4: Magnetic Fields', lessons: ['Magnetic Force', 'Biot-Savart Builders (Interactive)'] },
  { course: 'Electricity & Magnetism', unitTitle: 'Unit 5: Electromagnetism', lessons: ["Faraday & Lenz's Law (Interactive)", 'Inductance'] }
];

export default async function CombinedRoadmap() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const initialStart = user.user_metadata?.roadmap_start || null;
  const initialEnd = user.user_metadata?.roadmap_end || null;

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
        initialEnd={initialEnd} 
      />
    </div>
  );
}
