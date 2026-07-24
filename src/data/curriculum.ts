export interface Lesson {
  title: string;
  isInteractive?: boolean;
}

export interface Unit {
  course: 'Mechanics' | 'Electricity & Magnetism' | 'AP Skills' | 'AP Exam Prep';
  unitTitle: string;
  lessons: Lesson[] | string[];
  isExamPrep?: boolean;
}

export const combinedUnits: Unit[] = [
  // Mechanics
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 1: Kinematics', 
    lessons: [
      { title: '1D & 2D Motion' }, 
      { title: 'Vectors & Graphical Analysis' }, 
      { title: 'Reference Frames & Relative Motion' }, 
      { title: 'Projectile Motion' }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 2: Force and Translational Dynamics', 
    lessons: [
      { title: 'Systems & Center of Mass' },
      { title: 'Free Body Diagrams' }, 
      { title: 'Friction & Circular Motion' }, 
      { title: 'Spring Forces' },
      { title: 'Interacting Systems' }, 
      { title: 'Gravitational Force' },
      { title: 'Drag Forces & Terminal Velocity', isInteractive: true }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 3: Work, Energy, and Power', 
    lessons: [
      { title: 'Work-Energy Theorem' }, 
      { title: 'Conservation of Energy' }, 
      { title: 'Power & Potential Energy Functions' }, 
      { title: 'Energy Landscapes', isInteractive: true }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 4: Linear Momentum', 
    lessons: [
      { title: 'Impulse & Momentum' }, 
      { title: 'Conservation of Linear Momentum' },
      { title: '1D & 2D Collisions' }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 5: Torque and Rotational Dynamics', 
    lessons: [
      { title: 'Rotational Kinematics' }, 
      { title: 'Torque & Rotational Inertia' }, 
      { title: "Newton's Second Law in Rotational Form" }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 6: Energy and Momentum of Rotating Systems', 
    lessons: [
      { title: 'Rotational Kinetic Energy' }, 
      { title: 'Torque & Work' },
      { title: 'Angular Momentum & Conservation' }, 
      { title: 'Rolling Without Slipping' }, 
      { title: 'Motion of Orbiting Satellites' }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 7: Oscillations', 
    lessons: [
      { title: 'Simple Harmonic Motion' }, 
      { title: 'Mass-Spring Systems' }, 
      { title: 'Energy in SHM' }, 
      { title: 'Physical Pendulums', isInteractive: true }
    ] 
  },
  
  // E&M
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 8: Electric Charges, Fields, and Gauss’s Law', 
    lessons: [
      { title: 'Electric Charge & Force' }, 
      { title: 'Conservation of Charge' },
      { title: 'Electric Fields' }, 
      { title: 'Continuous Charge Distributions' },
      { title: 'Electric Flux' },
      { title: "Gauss's Law", isInteractive: true }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 9: Electric Potential', 
    lessons: [
      { title: 'Electric Potential Energy' }, 
      { title: 'Electric Potential' }, 
      { title: 'Conservation of Electric Energy' }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 10: Conductors and Capacitors', 
    lessons: [
      { title: 'Electrostatics with Conductors' }, 
      { title: 'Redistribution of Charge' },
      { title: 'Capacitors' }, 
      { title: 'Dielectrics' }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 11: Electric Circuits', 
    lessons: [
      { title: 'Electric Current' }, 
      { title: 'Resistance & Power' }, 
      { title: "Kirchhoff's Laws" }, 
      { title: 'RC Circuits' }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 12: Magnetic Fields and Electromagnetism', 
    lessons: [
      { title: 'Magnetic Fields & Moving Charges' }, 
      { title: "Biot-Savart Law" }, 
      { title: "Ampère's Law" }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 13: Electromagnetic Induction', 
    lessons: [
      { title: 'Magnetic Flux' }, 
      { title: "Faraday & Lenz's Law", isInteractive: true }, 
      { title: 'Induced Currents & Magnetic Forces' },
      { title: 'Inductance & LR/LC Circuits' }
    ] 
  },

  // Additional AP Prep (Non-CED topics)
  { 
    course: 'AP Skills', 
    unitTitle: 'Unit 14: Advanced AP Skills', 
    lessons: [
      { title: 'Data Linearization & Error Analysis' }, 
      { title: 'Setting up Differential Equations' }, 
      { title: 'Qualitative/Quantitative Translation' },
      { title: 'Binomial Approximations' }
    ] 
  },

  // AP Exam Preparation (April 1 - May 10)
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 1', isExamPrep: true, lessons: ['Days 1-3: Mechanics & E&M FRQs', 'Days 4-7: Topic 1-2 MCQs & Review'] },
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 2', isExamPrep: true, lessons: ['Days 8-10: Mechanics & E&M FRQs', 'Days 11-14: Topic 3-4 MCQs & Review'] },
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 3', isExamPrep: true, lessons: ['Days 15-17: Mechanics & E&M FRQs', 'Days 18-21: Topic 5-6 MCQs & Review'] },
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 4', isExamPrep: true, lessons: ['Days 22-24: Mechanics & E&M FRQs', 'Days 25-28: Topic 7 MCQs & Full Practice'] },
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 5', isExamPrep: true, lessons: ['Days 29-31: Full Mock Exam (Mechanics)', 'Days 32-35: Full Mock Exam (E&M)'] },
  { course: 'AP Exam Prep', unitTitle: 'Exam Prep: Week 6', isExamPrep: true, lessons: ['Days 36-39: Final Review & Weak Areas', 'Day 40: Rest & Readiness'] },
];
