import { useState, useCallback } from 'react';

export interface LessonState {
  attemptId: number;
  completed: boolean;
  score: number;
}

/**
 * Hook to manage the state of an interactive lesson, allowing resets and score tracking.
 */
export function useLessonState() {
  const [lessonState, setLessonState] = useState<LessonState>({
    attemptId: 0,
    completed: false,
    score: 0,
  });

  const resetLesson = useCallback(() => {
    setLessonState(prev => ({
      attemptId: prev.attemptId + 1, // Incrementing attemptId can trigger remounting of components for dynamic parameterization
      completed: false,
      score: 0,
    }));
  }, []);

  const completeLesson = useCallback((finalScore: number) => {
    setLessonState(prev => ({
      ...prev,
      completed: true,
      score: finalScore,
    }));
  }, []);

  return {
    ...lessonState,
    resetLesson,
    completeLesson,
  };
}
