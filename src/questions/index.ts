import { Question } from '@/types/questions';
import { kinematicsQuestions } from './kinematics';

// Export a single unified array of all questions across the entire platform
// Used for global features like Daily Questions and random practice tests
export const allQuestions: Question[] = [
  ...kinematicsQuestions,
  // ...add future units here
];
