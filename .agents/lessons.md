# Interactive Lessons & Question Pools

This document outlines the standard operating procedures, architectural patterns, and grading rules for building interactive physics lessons in Phyne. Any new lesson added to the curriculum must adhere to these guidelines.

## 1. Lesson Creation Workflow (Scaffolding)

To ensure structural consistency across the application, you must NEVER create a lesson entirely from scratch manually. Always use the built-in lesson scaffold script.

From the project root, run:
```bash
npm run create-lesson <unitSlug> <lessonSlug> "Lesson Title"
```
**Example:** `npm run create-lesson kinematics 1d-motion "1D Motion: Velocity and Acceleration"`

This script automatically:
1. Generates the lesson's standard UI page (`src/app/learn/[unit]/[lesson]/page.tsx`).
2. Generates the lesson's standard question bank file (`src/questions/[unit]/[lesson].tsx`).
3. Wires up the new question bank to both the local unit `index.ts` and global `src/questions/index.ts`.

## 2. Lesson Content & Pedagogy

Every lesson must be a comprehensive learning module, not just a list of text. When building a lesson page (`src/app/learn/[unitSlug]/[lessonSlug]/page.tsx` or dynamic content files), it must contain:
- **Explanations & Theory**: Clear, concise explanations of the physical phenomena and formulas.
- **Interactables & Visualizations**: Use dynamic components, sliders, and interactive simulations to allow students to build an intuitive understanding of the physics.
- **HRK Questions**: Lessons must include practice problems sourced directly from the **Halliday, Resnick, Krane (HRK)** textbook. You can find these reference materials in the `resources` folder in the project root. Ensure you adapt them to be interactive and use our components.

## 3. Lesson Component Structure & UI

When constructing the UI for a lesson:
- **Problem Isolation Panels**: Handled automatically by `QuestionRenderer.tsx`.
- **QuestionRenderer**: Always use the `QuestionRenderer.tsx` component to render practice problems imported from the centralized question registry.

## 4. Dynamic Question Pools & Parameterization

Every lesson must be backed by a **large question pool**:
- **Centralized Question Registry**: Do NOT hardcode problems in lesson files. Instead, define questions in the `src/questions/` directory using the `Question` interface (`src/types/questions.ts`).
- **File Architecture**: Questions must be logically separated. Create a folder for the unit (e.g., `src/questions/kinematics/`), and place questions for a specific lesson in their own file (e.g., `scalars-and-vectors.tsx`).
- **Global Indexing**: Every unit folder must have an `index.ts` file that exports all of its lesson questions, which are then aggregated into the master `allQuestions` array in `src/questions/index.ts`.
- **Dynamic Parameterization**: Questions should dynamically randomize variable values and coefficients via the `generateParams` function in the `Question` object so that the underlying concept is tested with distinct numeric problems each time.
- **Tagging & Routing**: Questions must be appropriately tagged:
  - `lesson-dedicated`: Tags the question as "homework" strictly for use at the bottom of the corresponding lesson page.
  - `daily-practice`: Tags the question for use in the adaptive Daily Questions (`/daily`) feature. Daily Questions draw 5 random questions across all covered lessons but explicitly exclude `lesson-dedicated` questions to prevent homework repetition.
- **Progress Tracking Integration**: Rendering a question using `QuestionRenderer` automatically syncs the user's points to Supabase via the `ProgressProvider`. Do not manage lesson state or attempts manually. 

## 5. Grading & Point Mechanics

The platform uses a strict attempt-based grading system for all interactive problems. `QuestionRenderer` handles this logic natively by wrapping `MathInteractiveProblem`, syncing directly to the global progress state.

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

## 6. Platform-Wide Grading Weights

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
