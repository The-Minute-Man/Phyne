'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export interface ProgressState {
  completed_lessons: string[];
  completed_units: string[];
  node_progress: Record<string, { completed: number[]; current: number }>;
  completed_questions: string[];
  grades: { tests: number; quizzes: number; lessons: number; daily: number };
  daily_streak: number;
  best_streak: number;
  last_daily_completed: string | null;
  question_states: Record<string, { userInput: string; attempts: number; status: string; pointsAwarded: number }>;
}

interface ProgressContextType {
  progress: ProgressState | null;
  loading: boolean;
  refreshProgress: () => Promise<void>;
  markNodeCompleted: (lessonId: string, nodeId: number) => Promise<void>;
  markLessonCompleted: (lessonId: string, unitId: string) => Promise<void>;
  answerQuestion: (questionId: string, points: number, category: 'lessons' | 'daily') => Promise<void>;
  completeDailySet: () => Promise<void>;
  saveQuestionState: (questionId: string, state: { userInput: string; attempts: number; status: string; pointsAwarded: number }) => Promise<void>;
}

const defaultState: ProgressState = {
  completed_lessons: [],
  completed_units: [],
  node_progress: {},
  completed_questions: [],
  grades: { tests: 0, quizzes: 0, lessons: 0, daily: 0 },
  daily_streak: 0,
  best_streak: 0,
  last_daily_completed: null,
  question_states: {}
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      } else {
        // Fallback for unauthenticated or DB not ready
        setProgress(defaultState);
      }
    } catch (err) {
      console.error("Failed to fetch progress", err);
      setProgress(defaultState);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleProgressUpdate = useCallback(async (action: string, payload: any) => {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload })
      });
      if (res.ok) {
        const updates = await res.json();
        if (updates.success) {
          setProgress(prev => {
            if (!prev) return prev;
            return { ...prev, ...updates };
          });
        }
      }
    } catch (err) {
      console.error(`Failed to update progress: ${action}`, err);
    }
  }, []);

  const markNodeCompleted = useCallback(async (lessonId: string, nodeId: number) => {
    // Optimistic update
    setProgress(prev => {
      if (!prev) return prev;
      const nodeProg = { ...prev.node_progress };
      if (!nodeProg[lessonId]) {
        nodeProg[lessonId] = { completed: [], current: nodeId };
      }
      if (!nodeProg[lessonId].completed.includes(nodeId)) {
        nodeProg[lessonId].completed.push(nodeId);
      }
      nodeProg[lessonId].current = nodeId;
      return { ...prev, node_progress: nodeProg };
    });
    
    await handleProgressUpdate('complete_node', { lessonId, nodeId });
  }, [handleProgressUpdate]);

  const markLessonCompleted = useCallback(async (lessonId: string, unitId: string) => {
    await handleProgressUpdate('complete_lesson', { lessonId, unitId });
  }, [handleProgressUpdate]);

  const answerQuestion = useCallback(async (questionId: string, points: number, category: 'lessons' | 'daily') => {
    await handleProgressUpdate('answer_question', { questionId, points, category });
  }, [handleProgressUpdate]);

  const completeDailySet = useCallback(async () => {
    await handleProgressUpdate('complete_daily_set', {});
  }, [handleProgressUpdate]);

  const saveQuestionState = useCallback(async (questionId: string, state: { userInput: string; attempts: number; status: string; pointsAwarded: number }) => {
    // Optimistic update
    setProgress(prev => {
      if (!prev) return prev;
      const qStates = { ...prev.question_states, [questionId]: state };
      return { ...prev, question_states: qStates };
    });
    await handleProgressUpdate('save_question_state', { questionId, state });
  }, [handleProgressUpdate]);

  return (
    <ProgressContext.Provider value={{ 
      progress, 
      loading, 
      refreshProgress: fetchProgress,
      markNodeCompleted,
      markLessonCompleted,
      answerQuestion,
      completeDailySet,
      saveQuestionState
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
