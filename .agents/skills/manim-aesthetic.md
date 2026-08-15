# Skill: Manim Aesthetic Guidelines

## Core Objective
Ensure all visual interactive mathematics and physics components mimic the visual design language of the Manim animation library.

## Typography
- All variables, equations, and numbers must be rendered using LaTeX styling via KaTeX.
- Main font face for mathematical indicators: "Computer Modern".

## Color Palette (Dark Mode Default)
- **Background**: Absolute Dark (`#000000` or `#111111`)
- **Vectors / Velocities**: Cyan (`#87CEEB` or `#00FFFF`)
- **Forces / Accelerations**: Yellow (`#FFFF00` or `#F0E68C`)
- **Electric Fields / Positive Charges**: Bright Red / Coral (`#FF6B6B`)
- **Magnetic Fields / Negative Charges**: Royal Blue (`#4169E1`)
- **Graphs / Trajectories**: Muted Green or White lines with low opacity grids.

## Motion & Easing
- Do not use linear animations.
- Every moving visual element must apply a `cubic-bezier(0.25, 1, 0.5, 1)` or custom physics-based spring behavior.