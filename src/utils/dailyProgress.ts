// Note: These functions act as server-side or mock database utilities for daily questions
import { calculateOverallGrade } from './grading';

export interface UserProgress {
  userId: string;
  lastCompletedDate: string | null;
  currentStreak: number;
  bestStreak: number;
  dailyScores: number[];
  lessonsScore: number;
  quizzesScore: number;
  testsScore: number;
}

/**
 * Validates if the user can play the daily question (has not completed it today).
 */
export function canPlayDailyQuestion(progress: UserProgress, currentDateStr: string): boolean {
  if (!progress.lastCompletedDate) return true;
  return progress.lastCompletedDate !== currentDateStr;
}

/**
 * Updates the user's progress after answering a daily question.
 */
export function updateDailyProgress(
  progress: UserProgress,
  currentDateStr: string,
  pointsAwarded: number,
  isCorrect: boolean
): UserProgress {
  if (progress.lastCompletedDate === currentDateStr) {
    // Already completed today
    return progress;
  }

  let newStreak = progress.currentStreak;
  
  if (isCorrect) {
    if (progress.lastCompletedDate) {
      const lastDate = new Date(progress.lastCompletedDate);
      const currDate = new Date(currentDateStr);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
  } else {
    // Break streak if failed, or maybe keep it? Usually streak requires completion or correct answer.
    // Assuming you need to answer correctly to maintain/build a streak.
    newStreak = 0;
  }

  const updatedScores = [...progress.dailyScores, pointsAwarded];

  return {
    ...progress,
    lastCompletedDate: currentDateStr,
    currentStreak: newStreak,
    bestStreak: Math.max(newStreak, progress.bestStreak),
    dailyScores: updatedScores,
  };
}

/**
 * Averages out daily scores to a 100-point scale for grading.
 */
export function getDailyAverageScore(progress: UserProgress): number {
  if (progress.dailyScores.length === 0) return 0;
  
  const total = progress.dailyScores.reduce((acc, score) => acc + score, 0);
  const maxPossible = progress.dailyScores.length * 7; // Assuming 7 points max per standard daily question
  
  return (total / maxPossible) * 100;
}
