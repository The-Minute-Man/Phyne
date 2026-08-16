# Interactive Lessons & Question Pools

This document outlines the standard operating procedures, architectural patterns, and grading rules for building interactive physics lessons in Phyne. Any new lesson added to the curriculum must adhere to these guidelines.

## 1. Lesson Content & Pedagogy

Every lesson must be a comprehensive learning module, not just a list of text. When building a lesson page (`src/app/learn/[unitSlug]/[lessonSlug]/page.tsx` or dynamic content files), it must contain:
- **Explanations & Theory**: Clear, concise explanations of the physical phenomena and formulas.
- **Interactables & Visualizations**: Use dynamic components, sliders, and interactive simulations to allow students to build an intuitive understanding of the physics.
- **HRK Questions**: Lessons must include practice problems sourced directly from the **Halliday, Resnick, Krane (HRK)** textbook. You can find these reference materials in the `resources` folder in the project root. Ensure you adapt them to be interactive and use our components.

## 2. Lesson Component Structure & UI

When constructing the UI for a lesson:
- **No Redundant Headers**: Do not include a hardcoded white `<h1>` or `<header>` at the top of the lesson questions page, as this was explicitly removed to keep the interface clean.
- **Problem Isolation Panels**: All interactive math problems must be encapsulated within a `<div className="problem-panel">`. This provides a consistent glass-morphism aesthetic, subtle elevation, and an accent top-border.
- **MathInteractiveProblem**: Always use the `MathInteractiveProblem.tsx` component for practice problems.

## 3. Dynamic Question Pools & Parameterization

Every lesson must be backed by a **large question pool**:
- **Dynamic Parameterization**: Questions should dynamically randomize variable values and coefficients (e.g., using `Math.random()`) so that the underlying concept is tested with distinct numeric problems each time.
- **Lesson Reset Mechanic**: Use the `useLessonState()` hook. When a lesson is restarted, it should increment the `attemptId` and clear error history, forcing React to remount the problem components and generate new random variables.
- **Global Daily Questions**: A lesson should only select a subset of questions from its large pool for the user to solve during the lesson. The **leftover (unused)** questions from these pools are aggregated globally to fuel the **Daily Questions** feature on the dashboard (`/daily`). 

## 4. Grading & Point Mechanics

The platform uses a strict attempt-based grading system for all interactive problems. `MathInteractiveProblem` already handles this logic natively, but you must be aware of the rules when designing the lesson state:

### Standard Scoring
- **1st Try**: 7 / 7 points
- **2nd Try**: 5 / 7 points
- **3rd Try**: 3 / 7 points
- **4+ Tries**: 1 / 7 points
- **Give Up**: 0 points (immediately reveals the solution to the student).

### Hint System
- The **Hint** button must *only* become available to the student after they have answered incorrectly at least once. 

### Beast Questions (Extra Credit)
- You can designate a problem as a "Beast Question" by passing `isBeastQuestion={true}` to `MathInteractiveProblem`.
- Beast questions are significantly harder and act as extra credit. 
- They are **always worth exactly 7 points**, no matter how many attempts the student takes to get it right. 

## 5. Platform-Wide Grading Weights

For context on how these points feed into the overall student grade, the centralized grading calculator (`src/utils/grading.ts`) weighs categories as follows:
- **Tests**: 50%
- **Quizzes**: 20%
- **Lesson Questions**: 20% (Where the points from `MathInteractiveProblem` go)
- **Daily Questions**: 10%

Letter grades strictly follow standard brackets:
- A: >= 92.50%
- A-: 89.50% - 92.49%
- B+: 86.50% - 89.49%
- B: 82.50% - 86.49%
- B-: 79.50% - 82.49%
- C+: 76.50% - 79.49%
- C: 72.50% - 76.49%
- C-: 69.50% - 72.49%
- D+: 66.50% - 69.49%
- D: 59.50% - 66.49%
- F: < 59.50%
