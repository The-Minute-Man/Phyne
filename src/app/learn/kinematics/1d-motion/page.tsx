'use client';

import React from 'react';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import QuestionRenderer from '@/components/QuestionRenderer';
import { kinematicsQuestions } from '@/questions/kinematics';

export default function _1dMotion() {
  const lessonNodes = [
    {
      id: 'intro',
      title: 'Introduction',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. Introduction to 1D Motion: Velocity and Acceleration</h2>
            <p className="text-body-md">
              Welcome to the lesson on 1D Motion: Velocity and Acceleration. In this section, we will explore the fundamental concepts...
            </p>
          </section>
        </div>
      )
    },
    {
      id: 'practice',
      title: 'Master Practice',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>2. Practice Problems</h2>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              Test your understanding with the following problems.
            </p>
            {kinematicsQuestions
              .filter(q => q.tags.includes('lesson-dedicated') && q.tags.includes('1d-motion'))
              .map(question => (
                <QuestionRenderer key={question.id} question={question} />
              ))}
          </section>
        </div>
      )
    }
  ];

  return (
    <LessonNodeLayout 
      nodes={lessonNodes} 
      lessonId="1d-motion" 
      unitId="kinematics" 
    />
  );
}
