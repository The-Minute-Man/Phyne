# Skill: Interactive Physics Component Rules

## Component Architecture
- All components must be built using React/Next.js and the `mafs` library for 2D, or `three.js` (React Three Fiber) for 3D graphs.
- Visual parameters must be tied to a reactive state engine (e.g., React `useState`).

## State-to-Math Dynamic Binding
- If a user interacts with or drags an object, recalculate all derivative equations instantly.
- *Example:* Dragging a position marker on a custom function curve must instantly adjust the vector arrow representing the derivative slope at that exact point.

## Safety & Boundaries
- Constrain all drag inputs. Users must never be allowed to pull UI vectors, masses, or charges completely off-screen or into mathematical singularities (e.g., dividing by zero when distance $r \to 0$).