---
name: generate_lesson
description: Mass-produces AP Physics C lessons using a strict multi-phase pedagogical workflow. Invoke this when the user asks to generate a new lesson.
---

# Generate Lesson Workflow

When the user asks you to generate a new lesson (e.g., `/generate_lesson kinematics 1d-motion "Title"`), you MUST execute the following 4 phases sequentially in your response loop. 

Before starting, use your tools to read `.agents/global_rules.json` to load the current values for `LESSON_DEDICATED_COUNT`, `BEAST_QUESTION_POINTS`, and `DIFFICULTY_BUMP`.

## Phase 1: Planning
You act as an expert Physics curriculum designer.
1. Read `src/data/curriculum.ts` to understand where this lesson fits.
2. Read the relevant sections of the AP Physics C CED and the HRK textbook found in `resources/`.
3. Draft a lesson plan that is `DIFFICULTY_BUMP` harder than the AP exam.
4. Ensure exactly 10-15 total practice problems. Exactly `LESSON_DEDICATED_COUNT` must be tagged `lesson-dedicated`, the rest tagged `daily-practice`.
5. You must include "Interleaved Synthesis Challenges".
6. The final question MUST be a "Beast Question" worth exactly `BEAST_QUESTION_POINTS` points.
7. Create the plan as a strict JSON artifact named `lesson_plan.json`. 

## Phase 1.5: Reviewing
You act as a Curriculum Alignment Checker.
1. Self-review the `lesson_plan.json` against the CED and HRK.
2. Ensure NO concepts are introduced prematurely. 
3. If you find flaws, revise the `lesson_plan.json` artifact until it is pedagogically perfect.

## Phase 2: Developing
You act as a Senior React Developer specializing in Mafs and React Three Fiber.
1. Scaffold the lesson using your terminal tool: `npm run create-lesson <unitSlug> <lessonSlug> "<Title>"`. **DO NOT run npm install or any other environment-altering commands.**
2. Read the gold-standard examples to learn internal APIs (`QuestionRenderer`, `AutoScrubber`, `generateParams`):
   - `src/app/learn/kinematics/scalars-and-vectors/page.tsx`
   - `src/questions/kinematics/scalars-and-vectors.tsx`
   - `src/app/learn/kinematics/displacement-velocity-and-acceleration/page.tsx`
   - `src/questions/kinematics/displacement-velocity-and-acceleration.tsx`
3. Write the UI code in `src/app/learn/<unit>/<lesson>/page.tsx`. Keep explanations concise.
4. Write the question code in `src/questions/<unit>/<lesson>.tsx`. 
5. STRICT CONSTRAINTS: 
   - Zero Local Storage policy.
   - Use `AutoScrubber` for time-based diagrams. (Exception: separate `time` and `mathTime` if the slider drives MathJax).
   - Wrap math in `<InlineMath math="x(t)" />` and format floats to 3 decimal places.
   - You MUST use `<QuestionRenderer />` to display the `lesson-dedicated` questions on the page. Do not write custom scoring logic. Pass `isBeastQuestion={true}` for the final beast question.

## Phase 3: QA Loop
You act as a strict Code Auditor.
1. Run a scoped TypeScript check using your terminal tool: 
   `npx tsc --noEmit src/app/learn/<unit>/<lesson>/page.tsx src/questions/<unit>/<lesson>.tsx`
2. If the TypeScript check fails, fix the code immediately and run the check again. Repeat this until it compiles with zero errors.
3. Once TS passes, perform a final self-audit against the constraints in Phase 2.
4. Conclude the workflow by presenting the final files to the user.
