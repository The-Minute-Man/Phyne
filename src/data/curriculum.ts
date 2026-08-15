export interface Lesson {
  title: string;
  isInteractive?: boolean;
}

export interface Unit {
  course: 'Mechanics' | 'Electricity & Magnetism' | 'AP Skills' | 'AP Exam Prep';
  unitTitle: string;
  lessons: (Lesson | string)[];
  isExamPrep?: boolean;
}

export const combinedUnits: Unit[] = [
  // Mechanics
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 1: Kinematics', 
    lessons: [
      'Scalars and Vectors', 
      'Displacement, Velocity, and Acceleration', 
      'Representing Motion', 
      'Reference Frames and Relative Motion', 
      { title: 'Motion in Two or Three Dimensions (Interactive)', isInteractive: true }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 2: Force and Translational Dynamics', 
    lessons: [
      'Systems and Center of Mass', 
      'Forces and Free-Body Diagrams', 
      "Newton's Third Law", 
      "Newton's First Law", 
      "Newton's Second Law", 
      'Gravitational Force', 
      'Kinetic and Static Friction', 
      'Spring Forces', 
      'Resistive Forces', 
      { title: 'Circular Motion (Interactive)', isInteractive: true }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 3: Work, Energy, and Power', 
    lessons: [
      'Translational Kinetic Energy', 
      'Work', 
      'Potential Energy', 
      'Conservation of Energy', 
      { title: 'Power (Interactive)', isInteractive: true }
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 4: Linear Momentum', 
    lessons: [
      'Linear Momentum', 
      'Change in Momentum and Impulse', 
      'Conservation of Linear Momentum', 
      'Elastic and Inelastic Collisions'
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 5: Torque and Rotational Dynamics', 
    lessons: [
      'Rotational Kinematics', 
      'Connecting Linear and Rotational Motion', 
      'Torque', 
      'Rotational Inertia', 
      "Rotational Equilibrium and Newton's First Law in Rotational Form", 
      "Newton's Second Law in Rotational Form"
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 6: Energy and Momentum of Rotating Systems', 
    lessons: [
      'Rotational Kinetic Energy', 
      'Torque and Work', 
      'Angular Momentum and Angular Impulse', 
      'Conservation of Angular Momentum', 
      'Rolling', 
      'Motion of Orbiting Satellites'
    ] 
  },
  { 
    course: 'Mechanics', 
    unitTitle: 'Unit 7: Oscillations', 
    lessons: [
      'Defining Simple Harmonic Motion (SHM)', 
      'Frequency and Period of SHM', 
      'Representing and Analyzing SHM', 
      'Energy of Simple Harmonic Oscillators', 
      { title: 'Simple and Physical Pendulums (Interactive)', isInteractive: true }
    ] 
  },

  // E&M
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 8: Electric Charges, Fields, and Gauss’s Law', 
    lessons: [
      'Electric Charge and Electric Force', 
      'Conservation of Electric Charge and the Process of Charging', 
      'Electric Fields', 
      'Electric Fields of Charge Distributions', 
      'Electric Flux', 
      { title: "Gauss's Law (Interactive)", isInteractive: true }
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 9: Electric Potential', 
    lessons: [
      'Electric Potential Energy', 
      'Electric Potential', 
      'Conservation of Electric Energy'
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 10: Conductors and Capacitors', 
    lessons: [
      'Electrostatics with Conductors', 
      'Redistribution of Charge between Conductors', 
      'Capacitors', 
      'Dielectrics'
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 11: Electric Circuits', 
    lessons: [
      'Electric Current', 
      'Simple Circuits', 
      "Resistance, Resistivity, and Ohm's Law", 
      'Electric Power', 
      'Compound Direct Current Circuits', 
      "Kirchhoff's Loop Rule", 
      "Kirchhoff's Junction Rule", 
      'Resistor-Capacitor (RC) Circuits'
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 12: Magnetic Fields and Electromagnetism', 
    lessons: [
      'Magnetic Fields', 
      'Magnetism and Moving Charges', 
      'Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law', 
      "Ampere's Law"
    ] 
  },
  { 
    course: 'Electricity & Magnetism', 
    unitTitle: 'Unit 13: Electromagnetic Induction', 
    lessons: [
      'Magnetic Flux', 
      'Electromagnetic Induction', 
      'Induced Currents and Magnetic Forces', 
      'Inductance', 
      'Circuits with Resistors and Inductors (LR Circuits)', 
      { title: 'Circuits with Capacitors and Inductors (LC Circuits) (Interactive)', isInteractive: true }
    ] 
  },

  // Additional AP Prep
  { 
    course: 'AP Skills', 
    unitTitle: 'Unit 14: Advanced AP Skills', 
    lessons: [
      'Data Linearization & Error Analysis', 
      'Setting up Differential Equations', 
      'Qualitative/Quantitative Translation', 
      'Binomial Approximations'
    ] 
  },
  { 
    course: 'AP Exam Prep', 
    unitTitle: 'AP Exam Preparation (April 1 - May 10)', 
    lessons: [
      '6 weeks of daily Mechanics & E&M FRQs, targeted topical MCQs, and full-length mock exams leading up to test day.'
    ], 
    isExamPrep: true 
  }
];
