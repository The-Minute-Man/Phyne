import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';

export const representingMotionQuestions: Question[] = [
  // LESSON DEDICATED (7 Questions)
  {
    id: 'representing-motion-hw-1',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
      const t = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { a, b, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Instantaneous Acceleration</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The position of a particle moving along the x-axis is given by the function:
        </p>
        <BlockMath math={`x(t) = ${params.a}t^3 - ${params.b}t^2 + 4t`} />
        <p className="text-body-md">
          Calculate the instantaneous acceleration of the particle at <InlineMath math={`t = ${params.t} \\text{ s}`} />.
        </p>
      </>
    ),
    correctExpression: (params) => `${6 * params.a * params.t - 2 * params.b}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Acceleration is the second derivative of position with respect to time.</p>
        <BlockMath math={`v(t) = \\frac{dx}{dt} = ${3 * params.a}t^2 - ${2 * params.b}t + 4`} />
        <BlockMath math={`a(t) = \\frac{dv}{dt} = ${6 * params.a}t - ${2 * params.b}`} />
        <p className="text-body-md">Evaluating at <InlineMath math={`t = ${params.t}`} />:</p>
        <BlockMath math={`a(${params.t}) = ${6 * params.a}(${params.t}) - ${2 * params.b} = ${6 * params.a * params.t - 2 * params.b} \\text{ m/s}^2`} />
      </div>
    )
  },
  {
    id: 'representing-motion-hw-2',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v0 = Math.floor(Math.random() * 10) + 10; // 10 to 19
      const k = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const t = Math.floor(Math.random() * 4) + 2; // 2 to 5
      return { v0, k, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 2: Integration for Displacement</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          A rocket sled on a straight track has a velocity given by:
        </p>
        <BlockMath math={`v(t) = ${params.v0} + ${params.k}t^2`} />
        <p className="text-body-md">
          What is the total displacement of the sled from <InlineMath math="t = 0" /> to <InlineMath math={`t = ${params.t} \\text{ s}`} />?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.v0 * params.t + (params.k * Math.pow(params.t, 3)) / 3}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Displacement is the integral of velocity over time.</p>
        <BlockMath math={`\\Delta x = \\int_{0}^{${params.t}} (${params.v0} + ${params.k}t^2) \\, dt`} />
        <BlockMath math={`\\Delta x = \\left[ ${params.v0}t + \\frac{${params.k}}{3}t^3 \\right]_0^{${params.t}}`} />
        <p className="text-body-md">Evaluating the bounds yields <InlineMath math={`${(params.v0 * params.t + (params.k * Math.pow(params.t, 3)) / 3).toFixed(3)} \\text{ m}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-hw-3',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const alpha = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const beta = Math.floor(Math.random() * 6) + 4; // 4 to 9
      return { alpha, beta };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 3: Turning Points</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The position of a particle is given by <InlineMath math={`x(t) = \\frac{${params.alpha}}{3}t^3 - \\frac{${params.beta}}{2}t^2`} /> for <InlineMath math="t > 0" />.
        </p>
        <p className="text-body-md">
          At what time <InlineMath math="t" /> does the particle momentarily stop (change direction)?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.beta / params.alpha}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The particle momentarily stops when its velocity is zero.</p>
        <BlockMath math={`v(t) = \\frac{dx}{dt} = ${params.alpha}t^2 - ${params.beta}t`} />
        <p className="text-body-md">Setting <InlineMath math="v(t) = 0" /> gives <InlineMath math={`t(${params.alpha}t - ${params.beta}) = 0`} />.</p>
        <p className="text-body-md">Since <InlineMath math="t > 0" />, the turning point is at <InlineMath math={`t = \\frac{${params.beta}}{${params.alpha}} = ${(params.beta / params.alpha).toFixed(3)} \\text{ s}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-hw-4',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const t = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { a, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 4: Average vs Instantaneous</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The position of an object is <InlineMath math={`x(t) = ${params.a}t^2`} />. 
        </p>
        <p className="text-body-md">
          Calculate the magnitude of the difference between its instantaneous velocity at <InlineMath math={`t = ${params.t} \\text{ s}`} /> and its average velocity over the interval from <InlineMath math="t = 0" /> to <InlineMath math={`t = ${params.t} \\text{ s}`} />.
        </p>
      </>
    ),
    correctExpression: (params) => `${2 * params.a * params.t - (params.a * params.t * params.t) / params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">First, find instantaneous velocity:</p>
        <BlockMath math={`v(t) = \\frac{dx}{dt} = ${2 * params.a}t \\implies v(${params.t}) = ${2 * params.a * params.t}`} />
        <p className="text-body-md">Next, find average velocity over <InlineMath math={`[0, ${params.t}]`} />:</p>
        <BlockMath math={`v_{\\text{avg}} = \\frac{x(${params.t}) - x(0)}{${params.t} - 0} = \\frac{${params.a}(${params.t})^2}{${params.t}} = ${params.a * params.t}`} />
        <p className="text-body-md">The difference is <InlineMath math={`|${2 * params.a * params.t} - ${params.a * params.t}| = ${params.a * params.t} \\text{ m/s}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-hw-5',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const c = Math.floor(Math.random() * 6) + 4; // 4 to 9
      const t = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { c, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 5: Non-Constant Acceleration</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The acceleration of a particle is given by <InlineMath math={`a(t) = ${params.c} \\sqrt{t}`} />. 
          If the particle starts from rest at the origin, what is its position at <InlineMath math={`t = ${params.t} \\text{ s}`} />?
        </p>
      </>
    ),
    correctExpression: (params) => `${(4/15) * params.c * Math.pow(params.t, 2.5)}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Integrate acceleration to find velocity (starting from rest, <InlineMath math="v(0)=0" />):</p>
        <BlockMath math={`v(t) = \\int ${params.c} t^{1/2} \\, dt = \\frac{${params.c}}{1.5} t^{3/2} = ${((params.c)/1.5).toFixed(3)} t^{3/2}`} />
        <p className="text-body-md">Integrate velocity to find position (starting from origin, <InlineMath math="x(0)=0" />):</p>
        <BlockMath math={`x(t) = \\int \\frac{${params.c}}{1.5} t^{3/2} \\, dt = \\frac{${params.c}}{1.5 \\times 2.5} t^{5/2} = \\frac{4}{15}(${params.c}) t^{5/2}`} />
        <p className="text-body-md">Evaluating at <InlineMath math={`t = ${params.t}`} /> gives <InlineMath math={`${((4/15) * params.c * Math.pow(params.t, 2.5)).toFixed(3)} \\text{ m}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-hw-6',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const v2 = Math.floor(Math.random() * -5) - 3; // -8 to -3
      const t1 = Math.floor(Math.random() * 2) + 2; // 2 to 3
      const t2 = t1 + Math.floor(Math.random() * 3) + 2; // t1+2 to t1+4
      return { v1, v2, t1, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 6: Area Under the Curve</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object moves with a constant velocity of <InlineMath math={`${params.v1} \\text{ m/s}`} /> for <InlineMath math={`${params.t1} \\text{ s}`} />. 
          Then, it instantaneously changes its velocity to a constant <InlineMath math={`${params.v2} \\text{ m/s}`} /> for another <InlineMath math={`${params.t2 - params.t1} \\text{ s}`} /> (until <InlineMath math={`t = ${params.t2}`} />).
        </p>
        <p className="text-body-md">
          Calculate the <strong>total distance</strong> traveled (not displacement) by the object from <InlineMath math="t = 0" /> to <InlineMath math={`t = ${params.t2}`} />.
        </p>
      </>
    ),
    correctExpression: (params) => `${Math.abs(params.v1) * params.t1 + Math.abs(params.v2) * (params.t2 - params.t1)}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Total distance is the integral of the <em>absolute value</em> of velocity (speed).</p>
        <BlockMath math={`d = \\int |v| \\, dt = |${params.v1}|(${params.t1}) + |${params.v2}|(${params.t2 - params.t1})`} />
        <p className="text-body-md">Calculating the absolute areas: <InlineMath math={`${Math.abs(params.v1) * params.t1} + ${Math.abs(params.v2) * (params.t2 - params.t1)} = ${Math.abs(params.v1) * params.t1 + Math.abs(params.v2) * (params.t2 - params.t1)} \\text{ m}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-hw-7-beast',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    isBeastQuestion: true,
    generateParams: () => {
      const alpha = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const beta = Math.floor(Math.random() * 3) + 4; // 4, 5, 6
      return { alpha, beta };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 7: The Calculus Beast (Extra Credit)</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The velocity of a particle moving along the x-axis is described by the equation <InlineMath math={`v(t) = ${params.alpha}t^3 - ${params.beta}t^2`} />.
        </p>
        <p className="text-body-md">
          Determine the velocity of the particle at the exact moment its acceleration is momentarily zero (excluding <InlineMath math="t=0" /> if applicable).
        </p>
      </>
    ),
    correctExpression: (params) => {
      // a(t) = 3*alpha*t^2 - 2*beta*t
      // a(t) = 0 => t = (2*beta) / (3*alpha)
      const t_zero = (2 * params.beta) / (3 * params.alpha);
      const v_at_zero = params.alpha * Math.pow(t_zero, 3) - params.beta * Math.pow(t_zero, 2);
      return `${v_at_zero}`;
    },
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">First, find the expression for acceleration by differentiating velocity:</p>
        <BlockMath math={`a(t) = \\frac{dv}{dt} = ${3 * params.alpha}t^2 - ${2 * params.beta}t`} />
        <p className="text-body-md">Set <InlineMath math="a(t) = 0" /> to find the time:</p>
        <BlockMath math={`t(${3 * params.alpha}t - ${2 * params.beta}) = 0`} />
        <p className="text-body-md">The non-zero time is <InlineMath math={`t = \\frac{${2 * params.beta}}{${3 * params.alpha}} = ${((2 * params.beta) / (3 * params.alpha)).toFixed(3)} \\text{ s}`} />.</p>
        <p className="text-body-md">Now, plug this time back into the velocity equation:</p>
        <BlockMath math={`v(${((2 * params.beta) / (3 * params.alpha)).toFixed(3)}) = ${params.alpha}(${((2 * params.beta) / (3 * params.alpha)).toFixed(3)})^3 - ${params.beta}(${((2 * params.beta) / (3 * params.alpha)).toFixed(3)})^2`} />
        <p className="text-body-md">This yields <InlineMath math={`${(params.alpha * Math.pow((2 * params.beta) / (3 * params.alpha), 3) - params.beta * Math.pow((2 * params.beta) / (3 * params.alpha), 2)).toFixed(3)} \\text{ m/s}`} />.</p>
      </div>
    )
  },

  // DAILY PRACTICE (3 Questions)
  {
    id: 'representing-motion-daily-1',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 5) + 2; 
      const b = Math.floor(Math.random() * 5) + 2;
      return { a, b };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          If <InlineMath math={`v(t) = ${params.a}t - ${params.b}`} />, what is the change in position (displacement) between <InlineMath math="t=1" /> and <InlineMath math="t=3" />?
        </p>
      </>
    ),
    correctExpression: (params) => `${(params.a * 9) / 2 - params.b * 3 - ((params.a * 1) / 2 - params.b * 1)}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Integrate <InlineMath math="v(t)" /> from 1 to 3:</p>
        <BlockMath math={`\\int_1^3 (${params.a}t - ${params.b}) \\, dt = \\left[ \\frac{${params.a}}{2}t^2 - ${params.b}t \\right]_1^3`} />
      </div>
    )
  },
  {
    id: 'representing-motion-daily-2',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const v0 = Math.floor(Math.random() * 10) + 5; 
      const t = Math.floor(Math.random() * 3) + 2;
      return { v0, t };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object's acceleration is constant at <InlineMath math="-9.8 \\text{ m/s}^2" />. If its initial velocity is <InlineMath math={`${params.v0} \\text{ m/s}`} />, what is its velocity at <InlineMath math={`t=${params.t} \\text{ s}`} />?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.v0 - 9.8 * params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Use the kinematic equation <InlineMath math="v = v_0 + at" />:</p>
        <BlockMath math={`v = ${params.v0} + (-9.8)(${params.t}) = ${(params.v0 - 9.8 * params.t).toFixed(3)} \\text{ m/s}`} />
      </div>
    )
  },
  {
    id: 'representing-motion-daily-3',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 4) + 1;
      const b = Math.floor(Math.random() * 3) + 1;
      return { a, b };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          Given <InlineMath math={`x(t) = ${params.a}t^4 + ${params.b}t^2`} />, find the acceleration at <InlineMath math="t = 2 \\text{ s}" />.
        </p>
      </>
    ),
    correctExpression: (params) => `${12 * params.a * 4 + 2 * params.b}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Take the second derivative:</p>
        <BlockMath math={`v(t) = ${4 * params.a}t^3 + ${2 * params.b}t`} />
        <BlockMath math={`a(t) = ${12 * params.a}t^2 + ${2 * params.b}`} />
        <p className="text-body-md">Evaluating at <InlineMath math="t=2" /> gives <InlineMath math={`${12 * params.a * 4 + 2 * params.b} \\text{ m/s}^2`} />.</p>
      </div>
    )
  }
];
