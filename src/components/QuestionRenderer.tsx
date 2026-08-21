import React, { useMemo } from 'react';
import { Question } from '@/types/questions';
import MathInteractiveProblem from './MathInteractiveProblem';
import { useProgress } from './ProgressProvider';

interface QuestionRendererProps {
  question: Question;
  category?: 'lessons' | 'daily';
  onComplete?: (points: number) => void;
}

export default function QuestionRenderer({ question, category = 'lessons', onComplete }: QuestionRendererProps) {
  const { progress, loading, answerQuestion, saveQuestionState } = useProgress();

  const [params, setParams] = React.useState<any>(null);

  // Generate or load sticky parameters once progress is fully loaded
  React.useEffect(() => {
    if (loading || params) return;

    const savedState = progress?.question_states?.[question.id] as any;
    
    if (savedState?.params) {
      // Load sticky params from Supabase
      setParams(savedState.params);
    } else {
      // Generate new params and save them to Supabase so they survive refreshes
      const generatedParams = question.generateParams ? question.generateParams() : {};
      setParams(generatedParams);
      
      if (Object.keys(generatedParams).length > 0) {
        saveQuestionState(question.id, { ...(savedState || {}), params: generatedParams });
      }
    }
  }, [loading, progress, params, question, saveQuestionState]);

  const savedState = progress?.question_states?.[question.id];

  const handleComplete = async (points: number) => {
    // Sync points to Supabase
    await answerQuestion(question.id, points, category);
    if (onComplete) onComplete(points);
  };

  const handleStateChange = async (state: { userInput: string; attempts: number; status: 'idle' | 'loading_pyodide' | 'checking' | 'correct' | 'incorrect' | 'error' | 'gave_up'; pointsAwarded: number }) => {
    await saveQuestionState(question.id, state);
  };

  if (!params) {
    return (
      <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <div className="animate-pulse" style={{ width: '100%', height: '100px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
      </div>
    );
  }

  const correctExpression = typeof question.correctExpression === 'function'
    ? question.correctExpression(params)
    : question.correctExpression;

  const variables = typeof question.variables === 'function'
    ? question.variables(params)
    : question.variables;

  return (
    <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
      <MathInteractiveProblem
        prompt={question.renderPrompt(params)}
        correctExpression={correctExpression}
        variables={variables}
        hintContent={question.renderHint ? question.renderHint(params) : undefined}
        isBeastQuestion={question.isBeastQuestion}
        onComplete={handleComplete}
        initialUserInput={savedState?.userInput}
        initialAttempts={savedState?.attempts}
        initialStatus={savedState?.status as any}
        initialPointsAwarded={savedState?.pointsAwarded}
        onStateChange={handleStateChange}
      >
        <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
          {question.renderExplanation(params)}
        </div>
      </MathInteractiveProblem>
    </div>
  );
}
