'use client';

import React, { useState, ReactNode } from 'react';
import { evaluate } from 'mathjs';
import { AlertCircle, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

interface MathInteractiveProblemProps {
  /** The question prompt to display */
  prompt: ReactNode;
  /** The correct mathematical expression (e.g. "a * (b + c)") */
  correctExpression: string;
  /** Array of variable names used in the expression (e.g. ["a", "b", "c"]) */
  variables?: string[];
  /** Optional content to reveal after the user gets it correct (like an accordion with the solution) */
  children?: ReactNode;
  /** The number of random tests to perform to check algebraic equivalence */
  testCount?: number;
  /** Optional hint content to show after 1 wrong attempt */
  hintContent?: ReactNode;
  /** Is this an extra credit "beast" question? */
  isBeastQuestion?: boolean;
  /** Callback fired when the problem is completed (correct or gave up) */
  onComplete?: (points: number) => void;
}

export default function MathInteractiveProblem({
  prompt,
  correctExpression,
  variables = [],
  children,
  testCount = 5,
  hintContent,
  isBeastQuestion = false,
  onComplete
}: MathInteractiveProblemProps) {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect' | 'error' | 'gave_up'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(null);

  const calculatePoints = (failedAttempts: number) => {
    if (isBeastQuestion) return 7; // Always 7 points for beast questions
    
    if (failedAttempts === 0) return 7;
    if (failedAttempts === 1) return 5;
    if (failedAttempts === 2) return 3;
    return 1;
  };

  const checkEquivalence = (userExpr: string, correctExpr: string, vars: string[]) => {
    try {
      // If there are no variables, just evaluate once
      if (vars.length === 0) {
        const val1 = evaluate(userExpr);
        const val2 = evaluate(correctExpr);
        if (Math.abs(val1 - val2) > 1e-6) return false;
        return true;
      }

      // Check equivalence over multiple random values
      for (let i = 0; i < testCount; i++) {
        const scope: Record<string, number> = {};
        vars.forEach(v => {
          // Avoid 0 to prevent div by zero issues, stick to 1-10
          scope[v] = Math.random() * 9 + 1;
        });

        const val1 = evaluate(userExpr, scope);
        const val2 = evaluate(correctExpr, scope);

        if (typeof val1 !== 'number' || typeof val2 !== 'number') {
          throw new Error('Expression did not evaluate to a number.');
        }

        // Allow for floating point inaccuracies
        if (Math.abs(val1 - val2) > 1e-6) {
          return false;
        }
      }
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Invalid mathematical expression.');
      }
      return 'error';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setStatus('checking');
    setErrorMessage('');

    const isEquivalent = checkEquivalence(userInput, correctExpression, variables);

    if (isEquivalent === 'error') {
      setStatus('error');
    } else if (isEquivalent) {
      setStatus('correct');
      const pts = calculatePoints(attempts);
      setPointsAwarded(pts);
      if (onComplete) onComplete(pts);
    } else {
      setStatus('incorrect');
      setAttempts(prev => prev + 1);
    }
  };

  const handleGiveUp = () => {
    setStatus('gave_up');
    setPointsAwarded(0);
    if (onComplete) onComplete(0);
  };

  return (
    <div className="problem-panel">
      <div className="mb-6">
        {prompt}
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div className="flex flex-col gap-3">
          <label htmlFor="math-input" className="text-sm font-medium text-text-secondary">
            Your Answer:
          </label>
          <div className="flex" style={{ gap: '2rem', alignItems: 'flex-start', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <input
                id="math-input"
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  if (status === 'incorrect' || status === 'error') setStatus('idle');
                }}
                disabled={status === 'correct' || status === 'gave_up'}
                placeholder={variables.length > 0 ? `e.g., ${variables[0]} * 2` : "e.g., 42"}
                className="input-field font-mono"
              />
              {status === 'error' && (
                <p className="text-body-sm mt-2 flex items-center gap-sm" style={{ color: '#ef4444' }}>
                  <AlertCircle size={14} />
                  {errorMessage}
                </p>
              )}
              {status === 'incorrect' && (
                <p className="text-body-sm mt-2 flex items-center gap-sm" style={{ color: '#eab308' }}>
                  <AlertCircle size={14} />
                  Not quite right. Check your algebra and try again.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-md" style={{ minWidth: '140px' }}>
              <button
                type="submit"
                disabled={!userInput.trim() || status === 'correct' || status === 'gave_up'}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Check
              </button>
              
              {status !== 'correct' && status !== 'gave_up' && attempts > 0 && (
                <button
                  type="button"
                  onClick={handleGiveUp}
                  className="btn-secondary"
                  style={{ color: '#ef4444', borderColor: '#ef4444', width: '100%' }}
                >
                  Give Up
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {status !== 'correct' && status !== 'gave_up' && attempts >= 1 && hintContent && (
        <div style={{ marginBottom: '1rem' }}>
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="btn-secondary btn-sm"
              style={{ color: '#eab308', borderColor: '#eab308' }}
            >
              <HelpCircle size={16} style={{ marginRight: '0.5rem' }} /> Show Hint
            </button>
          ) : (
            <div style={{ 
              backgroundColor: 'rgba(234, 179, 8, 0.1)', 
              border: '1px solid rgba(234, 179, 8, 0.2)', 
              borderRadius: '8px', 
              padding: '1rem',
              fontSize: '0.9rem' 
            }}>
              <div style={{ fontWeight: 600, color: '#eab308', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={16} /> Hint
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {hintContent}
              </div>
            </div>
          )}
        </div>
      )}

      {(status === 'correct' || status === 'gave_up') && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ marginTop: '1.5rem' }}>
          <div className={`border rounded-lg p-4 mb-6 flex items-center justify-between gap-3 ${status === 'correct' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              {status === 'correct' ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <XCircle className="text-red-500" size={24} />
              )}
              <span className={`font-medium ${status === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {status === 'correct' ? 'Correct! Great job.' : 'You gave up. The solution is revealed below.'}
              </span>
            </div>
            <div className="font-bold text-lg">
              +{pointsAwarded} pts
              {isBeastQuestion && <span className="text-purple-400 text-sm ml-2">(Beast Mode!)</span>}
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
