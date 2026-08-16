/**
 * Calculates the overall grade percentage based on component scores.
 * 
 * Weights:
 * - Tests: 50%
 * - Quizzes: 20%
 * - Lesson Questions: 20%
 * - Daily Questions: 10%
 */
export function calculateOverallGrade(scores: {
  tests: number; // 0 to 100
  quizzes: number;
  lessons: number;
  daily: number;
}): number {
  const weighted = 
    (scores.tests * 0.50) +
    (scores.quizzes * 0.20) +
    (scores.lessons * 0.20) +
    (scores.daily * 0.10);
    
  return Number(weighted.toFixed(2));
}

/**
 * Maps a percentage score to a standard letter grade.
 * 
 * Cutoffs:
 * A: >= 92.50%
 * A-: 89.50% <= Score < 92.50%
 * B+: 86.50% <= Score < 89.50%
 * B: 82.50% <= Score < 86.50%
 * B-: 79.50% <= Score < 82.50%
 * C+: 76.50% <= Score < 79.50%
 * C: 72.50% <= Score < 76.50%
 * C-: 69.50% <= Score < 72.50%
 * D+: 66.50% <= Score < 69.50%
 * D: 59.50% <= Score < 66.50%
 * F: < 59.50%
 */
export function getLetterGrade(score: number): string {
  if (score >= 92.50) return 'A';
  if (score >= 89.50) return 'A-';
  if (score >= 86.50) return 'B+';
  if (score >= 82.50) return 'B';
  if (score >= 79.50) return 'B-';
  if (score >= 76.50) return 'C+';
  if (score >= 72.50) return 'C';
  if (score >= 69.50) return 'C-';
  if (score >= 66.50) return 'D+';
  if (score >= 59.50) return 'D';
  return 'F';
}
