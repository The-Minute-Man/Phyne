# Phyne: Project Context & Architecture

This document serves as the absolute ground truth for the **Phyne** project. AI agents must review this context before making architectural or design decisions.

## 1. Project Purpose
**Phyne** is a premium, highly interactive educational web application designed to teach AP Physics C (Mechanics and Electricity & Magnetism). The curriculum data structure is rigorously aligned with the official 2024-2025 AP Physics C Course and Exam Descriptions (CEDs), covering everything from Kinematics to Maxwell's Equations.

## 2. Technology Stack
- **Framework:** Next.js (App Router)
- **Frontend:** React, TypeScript
- **Styling:** Custom Vanilla CSS with utility classes (no Tailwind unless explicitly requested).
- **Backend & Database:** Supabase
- **Interactive Visuals:** `mafs` (for 2D interactive physics graphs) and `three.js` / React Three Fiber (for 3D visualizations).

## 3. Core Architectural Rules

### A. Zero Local Storage Policy
Absolutely **NO `localStorage`** is permitted. Because Phyne is a learning platform, users must be able to switch between laptops, tablets, and phones without losing data, progress, or preferences.
- *Implementation:* All user preferences (e.g., Theme selections) and learning progress must be synced to Supabase (e.g., within `auth.user.user_metadata` or dedicated tables) via Server Actions.

### B. Native Content Loading Architecture & Scaffolding
To ensure structural consistency and maximum performance, lesson content is scaffolded directly as native Next.js routes, while mathematical problem data is decoupled into a centralized registry.
- **Routing Engine:** Each lesson is a dedicated Next.js page (e.g., `src/app/learn/[unitSlug]/[lessonSlug]/page.tsx`). We do NOT use dynamic FS imports for lesson UIs.
- **Question Registry:** `src/questions/[unitSlug]/[lessonSlug].tsx`
- *How it works:* New lessons must be created using the `npm run create-lesson` script. This script automatically generates the boilerplate UI page, creates the isolated question bank, and wires the new questions into the global `allQuestions` registry (used by Daily Questions). This ensures perfect type safety and Next.js static optimizations.

### C. Interactive Physics Components
(See `physics-component-rules.md` for full details).
- Visual parameters must be tied to a reactive state engine (e.g., `useState`).
- Dragging objects must trigger instantaneous derivative equation recalculations.
- Mathematical singularities (e.g., dividing by zero) and screen bounds must be strictly protected against during drag interactions.

## 4. UI/UX Design System
Phyne is designed to feel incredibly premium and engaging to keep students focused.
- **Glassmorphism:** Heavy use of transparent, blurred panels (`backdrop-filter`).
- **Multi-Color Theme System:** Driven purely by CSS variables in `globals.css` and a `[data-theme]` attribute on the `<html>` tag to prevent FOUC. The app supports Dark, Light, Blue, Green, Purple, Red, and Tan themes.
- **Animations:** Subtle pulse glows, hover-lift effects, and scroll-reveal transitions are standard across all UI elements.

## 5. Curriculum Structure Location
The absolute master source of truth for all units, lessons, and course structure is located at:
**`src/data/curriculum.ts`**
Any additions to the course outline, new modules, or structural updates to the curriculum must be made in this file. It drives the navigation, syllabus, and dynamic routing validation.

## 6. Pedagogical Philosophy & Success Guarantee
Phyne is designed not just to teach, but to **guarantee a 5** on the AP exam. We achieve this through a philosophy of **"Strategic Over-Preparation"**:

### The "Harder than the Test" Approach
- **Hyper-Rigorous Problem Sets:** The internal practice problems and interactive sandboxes are designed to be 15-20% more mathematically and conceptually demanding than actual AP exam questions. 
- **The Goal:** By conditioning students to solve multi-step, complex integrations and advanced physical scenarios, the actual AP test will feel slow, straightforward, and easy by comparison.

### Knowledge Retention (Avoiding the Unit 1 to Unit 14 Memory Decay)
To ensure students do not forget Kinematics (Unit 1) by the time they reach Inductance (Unit 14), Phyne employs the following architectural techniques:
- **Interleaved Synthesis Challenges:** Practice modules do not just test current unit concepts. A magnetism problem might unexpectedly require the student to calculate a rotational moment of inertia or apply conservation of mechanical energy to solve.
- **Spaced Repetition & Daily Reviews:** The app tracks which core concepts the student hasn't used in a while and dynamically surfaces a "Daily Review" — a short set of 3-5 questions generated exclusively from past lessons they've already completed, ensuring old neural pathways remain active.
- **Visual Mental Models:** Because our `mafs` and `three.js` components build strong, intuitive *visual* memories of abstract concepts (like visualizing a vector field), students rely less on rote memorization and more on geometric intuition, which lasts longer in long-term memory.
