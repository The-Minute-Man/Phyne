'use client';

import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { getPyodide, checkEquivalenceSympy } from '@/lib/pyodide';
import { AlertCircle, CheckCircle2, HelpCircle, XCircle, Loader2 } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': any;
    }
  }
}

interface MathInteractiveProblemProps {
  /** The question prompt to display */
  prompt: ReactNode;
  /** The correct mathematical expression (e.g. "a * (b + c)") */
  correctExpression: string;
  /** Array of variable names used in the expression (e.g. ["a", "b", "c"]) */
  variables?: string[];
  /** Optional content to reveal after the user gets it correct (like an accordion with the solution) */
  children?: ReactNode;

  /** Optional hint content to show after 1 wrong attempt */
  hintContent?: ReactNode;
  /** Is this an extra credit "beast" question? */
  isBeastQuestion?: boolean;
  /** Callback fired when the problem is completed (correct or gave up) */
  onComplete?: (points: number) => void;

  initialUserInput?: string;
  initialAttempts?: number;
  initialStatus?: 'idle' | 'loading_pyodide' | 'checking' | 'correct' | 'incorrect' | 'error' | 'gave_up';
  initialPointsAwarded?: number | null;
  onStateChange?: (state: { userInput: string; attempts: number; status: 'idle' | 'loading_pyodide' | 'checking' | 'correct' | 'incorrect' | 'error' | 'gave_up'; pointsAwarded: number }) => void;
}

export default function MathInteractiveProblem({
  prompt,
  correctExpression,
  variables = [],
  children,
  hintContent,
  isBeastQuestion = false,
  onComplete,
  initialUserInput = '',
  initialAttempts = 0,
  initialStatus = 'idle',
  initialPointsAwarded = null,
  onStateChange
}: MathInteractiveProblemProps) {
  const [userInput, setUserInput] = useState(initialUserInput);
  const [status, setStatus] = useState<'idle' | 'loading_pyodide' | 'checking' | 'correct' | 'incorrect' | 'error' | 'gave_up'>(initialStatus);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(initialAttempts);
  const [showHint, setShowHint] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(initialPointsAwarded);
  const [isMathliveLoaded, setIsMathliveLoaded] = useState(false);
  const mfRef = useRef<any>(null);
  const calculatePoints = (failedAttempts: number) => {
    if (isBeastQuestion) return 7; // Always 7 points for beast questions
    
    if (failedAttempts === 0) return 7;
    if (failedAttempts === 1) return 5;
    if (failedAttempts === 2) return 3;
    return 1;
  };

  useEffect(() => {
    // Preload pyodide in the background
    getPyodide().catch(console.error);
  }, []);

  useEffect(() => {
    // Dynamically import mathlive so it doesn't break SSR
    import('mathlive').then((mathlive) => {
      if (mathlive.MathfieldElement) {
        mathlive.MathfieldElement.fontsDirectory = 'https://cdn.jsdelivr.net/npm/mathlive@0.110.0/fonts';
        mathlive.MathfieldElement.soundsDirectory = 'https://cdn.jsdelivr.net/npm/mathlive@0.110.0/sounds';
      }
      setIsMathliveLoaded(true);
    }).catch(console.error);
  }, []);

  // Update transient state from parent if it loads asynchronously
  useEffect(() => {
    if (initialAttempts !== undefined) setAttempts(initialAttempts);
    if (initialStatus) setStatus(initialStatus);
    if (initialPointsAwarded !== null) setPointsAwarded(initialPointsAwarded);
  }, [initialAttempts, initialStatus, initialPointsAwarded]);

  // Synchronize math-field value when mathlive loads or state shifts from parent
  useEffect(() => {
    const mf = mfRef.current;
    if (mf && isMathliveLoaded) {
      const currentVal = mf.getValue('ascii-math');
      const targetVal = initialUserInput || '';
      if (currentVal !== targetVal) {
        mf.setValue(targetVal, { format: 'ascii-math' });
        setUserInput(targetVal);
      }
    }
  }, [isMathliveLoaded, initialUserInput]);

  // Track state changes and report back to parent (autosave/debounce)
  const lastStateRef = useRef<string>('');
  useEffect(() => {
    if (!onStateChange) return;

    const stateStr = JSON.stringify({ userInput, attempts, status, pointsAwarded });
    if (lastStateRef.current === stateStr) return;
    lastStateRef.current = stateStr;

    const timeoutId = setTimeout(() => {
      onStateChange({
        userInput,
        attempts,
        status,
        pointsAwarded: pointsAwarded || 0
      });
    }, status === 'correct' || status === 'gave_up' ? 0 : 1000);

    return () => clearTimeout(timeoutId);
  }, [userInput, attempts, status, pointsAwarded, onStateChange]);

  useEffect(() => {
    const mf = mfRef.current;
    if (!mf) return;

    const handleInput = (e: any) => {
      // Extract the ascii-math representation to send to SymPy
      setUserInput(e.target.getValue('ascii-math'));
      if (status === 'incorrect' || status === 'error') setStatus('idle');
    };

    const handleFocusOut = () => {
      // Prevent the math field from staying fully highlighted when clicking away
      mf.executeCommand('clearSelection');
    };

    mf.addEventListener('input', handleInput);
    mf.addEventListener('focusout', handleFocusOut);
    return () => {
      mf.removeEventListener('input', handleInput);
      mf.removeEventListener('focusout', handleFocusOut);
    };
  }, [mfRef, isMathliveLoaded, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setStatus('checking');
    setErrorMessage('');

    try {
      const isEquivalent = await checkEquivalenceSympy(userInput, correctExpression);

      if (typeof isEquivalent === 'string') {
        setStatus('error');
        setErrorMessage(isEquivalent.replace('ERROR:', '').trim());
      } else if (isEquivalent === true) {
        setStatus('correct');
        const pts = calculatePoints(attempts);
        setPointsAwarded(pts);
        if (onComplete) onComplete(pts);
      } else {
        setStatus('incorrect');
        setAttempts(prev => prev + 1);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to initialize math engine. Please wait or refresh.');
    }
  };

  const handleGiveUp = () => {
    setStatus('gave_up');
    setPointsAwarded(0);
    if (onComplete) onComplete(0);
  };

  return (
    <div className="problem-panel">
      <style>{`
        body {
          --keyboard-background: var(--background, #121212);
          --keycap-background: rgba(255, 255, 255, 0.05);
          --keycap-background-hover: rgba(255, 255, 255, 0.1);
          --keycap-text: white;
          --keycap-secondary-text: rgba(255, 255, 255, 0.5);
          --keyboard-toolbar-text-color: white;
          --primary-color: #ffffff;
          --primary: #ffffff;
        }
        math-field {
          --keyboard-toggle-color: white !important;
          --primary-color: white !important;
          --primary: white !important;
          --text-color: white !important;
        }
        math-field::part(virtual-keyboard-toggle) {
          color: white !important;
          fill: white !important;
          stroke: white !important;
        }
        math-field::part(menu-toggle) {
          color: white !important;
          fill: white !important;
          stroke: white !important;
        }
      `}</style>
      <div className="mb-6">
        {prompt}
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div className="flex flex-col mb-2" style={{ gap: '1rem' }}>
          <label htmlFor="math-input" className="text-sm font-medium text-text-secondary mb-1">
            Your Answer:
          </label>
          <div className="flex" style={{ gap: '2rem', alignItems: 'flex-start', flexDirection: 'row' }}>
            <div style={{ flex: 1, minHeight: '48px' }}>
              {isMathliveLoaded ? (
                <math-field
                  ref={mfRef}
                  style={{ 
                    width: '100%', 
                    fontSize: '1.2rem', 
                    minHeight: '38px',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius)', 
                    border: '1px solid var(--border)', 
                    backgroundColor: 'rgba(255,255,255,0.03)', 
                    color: 'inherit',
                    outline: 'none',
                    '--caret-color': 'white',
                    '--selection-background-color': 'rgba(255, 255, 255, 0.2)',
                    '--contains-highlight-background-color': 'transparent'
                  } as React.CSSProperties}
                  disabled={status === 'correct' || status === 'gave_up' ? true : undefined}
                />
              ) : (
                <div style={{ width: '100%', minHeight: '38px', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center' }}>
                  <Loader2 size={16} className="animate-spin text-muted" style={{ marginRight: '8px' }} />
                  <span className="text-muted text-sm">Loading math editor...</span>
                </div>
              )}
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
                disabled={!userInput.trim() || status === 'correct' || status === 'gave_up' || status === 'checking'}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {status === 'checking' ? <><Loader2 size={16} className="animate-spin" /> Checking</> : 'Check'}
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
