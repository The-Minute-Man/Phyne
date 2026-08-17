import { _1dMotionQuestions } from './1d-motion';
import { Question } from '@/types/questions';
import { scalarsAndVectorsQuestions } from './scalars-and-vectors';

// Export all kinematics questions combined
export const kinematicsQuestions: Question[] = [

  ...scalarsAndVectorsQuestions,
  // Add other lesson questions here as they are created,
  ..._1dMotionQuestions
];
