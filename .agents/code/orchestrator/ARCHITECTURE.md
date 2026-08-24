# Phyne Orchestrator Architecture

This document outlines the architecture and workflow of the custom multi-agent orchestrator (`generate_lesson.py`) used to mass-produce AP Physics C lessons for Phyne.

## Overview

The orchestrator leverages the Google Antigravity Python SDK to create a robust, iterative "AI Factory." Unlike a single-prompt approach, this multi-agent system separates concerns (Planning, Reviewing, Developing, and QA) to ensure that generated lessons strictly adhere to our pedagogical philosophy of "Strategic Over-Preparation."

## The Multi-Agent Pipeline

The generation process is divided into four distinct phases, running sequentially.

### Phase 1: Planner
- **Agent Prompt:** `planner_prompt.txt`
- **Goal:** Draft the initial curriculum structure.
- **Process:** The Planner agent reads the AP Physics C CED and the HRK textbook. It constructs a highly rigorous lesson plan that is 15-20% harder than the AP exam. It explicitly includes "Interleaved Synthesis Challenges" to combat student memory decay.
- **Output:** A strict JSON structure outlining the lesson nodes, visualization requirements, and 10-15 practice problems.

### Phase 1.5: Curriculum Reviewer
- **Agent Prompt:** `reviewer_prompt.txt`
- **Goal:** Adversarial alignment and double-checking.
- **Process:** This agent acts as a strict gatekeeper *before* any code is written. It takes the Planner's JSON output, cross-references it again with the CED and HRK, and ensures no concepts are introduced prematurely (e.g., ensuring the Dot Product isn't taught in Unit 1).
- **Output:** A finalized, hardened JSON lesson plan.

### Phase 2: Developer (with Integrated Debugging)
- **Agent Prompt:** `developer_prompt.txt`
- **Goal:** Write the React UI and Question Bank code.
- **Process:** 
  1. Executes `npm run create-lesson` to scaffold the files.
  2. Writes the lesson UI in `page.tsx` and the practice problems in `questions.tsx`.
  3. Adheres to strict physics constraints: Instantaneous derivative recalculations on drag, singularities protection, "No Walls of Text", strict `<InlineMath>` formatting, and the Zero Local Storage policy.
  4. Runs `npx tsc --noEmit` and fixes its own TypeScript errors in a loop before concluding its turn.

### Phase 3: QA & Iteration Loop
- **Agent Prompt:** `qa_prompt.txt`
- **Goal:** Enforce architectural and pedagogical compliance.
- **Process:** The Python script loads the raw generated code (`page.tsx` and `questions.tsx`) from the disk and injects it directly into the QA agent's context. The QA agent checks for:
  - Usage of `<QuestionRenderer />` (no hardcoded problems).
  - Proper fallback implementation of `AutoScrubber` for MathJax (`time` vs `mathTime`).
  - Strict naming conventions (`Problem X: [Title]`).
  - Correct distribution of 7 `lesson-dedicated` problems and a final Beast Question.
- **The Loop:** If QA finds issues, it outputs "FAIL" with a list of fixes. The Python script routes this critique directly back to the Developer agent to fix. This loop repeats up to **10 times** until the code earns a "PASS" from QA.

## Usage

To generate a new lesson, run the orchestrator script from the command line:

```bash
python generate_lesson.py --unit kinematics --lesson 1d-motion --title "1D Motion: Velocity and Acceleration"
```

## Why This Architecture Wins

A single zero-shot prompt (like `new_lesson_prompt.md`) forces one LLM to juggle curriculum design, React code generation, TypeScript compliance, and strict architectural rules simultaneously. This often leads to dropped constraints or hallucinations. 

By splitting the workflow into **isolated roles** and forcing an **adversarial feedback loop (up to 10 retries)**, the factory guarantees that the final code output is highly aligned with the Phyne pedagogy and fundamentally sound.
