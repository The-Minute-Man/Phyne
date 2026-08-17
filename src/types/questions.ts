import React, { ReactNode } from 'react';

export interface Question {
  id: string;
  tags: string[]; // e.g., 'lesson-dedicated', 'scalars-and-vectors', 'kinematics'
  isBeastQuestion?: boolean;
  
  // Optional generator for dynamic parameters
  generateParams?: () => Record<string, any>;
  
  // Renders the question prompt, given the dynamic parameters
  renderPrompt: (params: Record<string, any>) => ReactNode;
  
  // The correct expression string, or a function that returns it based on parameters
  correctExpression: string | ((params: Record<string, any>) => string);
  
  // Variables used in the correct expression
  variables: string[] | ((params: Record<string, any>) => string[]);
  
  // Optional hint
  renderHint?: (params: Record<string, any>) => ReactNode;
  
  // Full explanation shown after completion
  renderExplanation: (params: Record<string, any>) => ReactNode;
}
