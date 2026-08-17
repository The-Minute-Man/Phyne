import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';

export const _1dMotionQuestions: Question[] = [
  {
    id: '1d-motion-hw-1',
    tags: ['kinematics', '1d-motion', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Placeholder</h3>
        <p className="text-body-md">
          Calculate the placeholder value for <InlineMath math="x" />.
        </p>
      </>
    ),
    correctExpression: '42',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The answer is always 42.</p>
      </div>
    )
  }
];
