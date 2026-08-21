import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';

export const displacementVelocityAndAccelerationQuestions: Question[] = [
  {
    id: 'dva-1',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const A = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const B = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const t = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { A, B, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Polynomial Derivative</h3>
        <p className="text-body-md">
          The position of a particle moving along the x-axis is given by the equation:
        </p>
        <BlockMath math={`x(t) = ${params.A}t^3 - ${params.B}t`} />
        <p className="text-body-md">
          What is the <strong>acceleration</strong> of the particle at <InlineMath math={`t = ${params.t}`} /> seconds? Enter your answer numerically.
        </p>
      </>
    ),
    correctExpression: (params) => `${6 * params.A * params.t}`,
    variables: [],
    renderHint: () => 'Hint: Acceleration is the second derivative of position with respect to time. Take the derivative twice, then plug in the time.',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          First, find velocity by taking the first derivative of position:
        </p>
        <BlockMath math={`v(t) = \\frac{dx}{dt} = 3(${params.A})t^2 - ${params.B} = ${3 * params.A}t^2 - ${params.B}`} />
        <p className="text-body-md">
          Next, find acceleration by taking the derivative of velocity (the second derivative of position):
        </p>
        <BlockMath math={`a(t) = \\frac{dv}{dt} = 2(${3 * params.A})t = ${6 * params.A}t`} />
        <p className="text-body-md">
          Finally, substitute <InlineMath math={`t = ${params.t}`} /> into the acceleration function:
        </p>
        <BlockMath math={`a(${params.t}) = ${6 * params.A}(${params.t}) = ${6 * params.A * params.t} \\text{ m/s}^2`} />
      </div>
    )
  },
  {
    id: 'dva-2',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const C = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const t1 = 0;
      const t2 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { C, t1, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 2: Double Integration</h3>
        <p className="text-body-md">
          A rocket starts from rest at the origin at time <InlineMath math="t = 0" />. Its acceleration along a straight track is given by:
        </p>
        <BlockMath math={`a(t) = ${params.C}t`} />
        <p className="text-body-md">
          Find the <strong>total displacement</strong> of the rocket from <InlineMath math={`t = ${params.t1}`} /> to <InlineMath math={`t = ${params.t2}`} /> seconds.
        </p>
      </>
    ),
    correctExpression: (params) => `(${params.C}/6)*(${params.t2})^3`,
    variables: [],
    renderHint: () => 'Hint: You must integrate acceleration to find velocity, and then integrate velocity to find position. Don\'t forget the constants of integration (initial conditions)!',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          Since the rocket starts from rest, <InlineMath math="v(0) = 0" />. Integrate acceleration to find velocity:
        </p>
        <BlockMath math={`v(t) = \\int a(t) \\, dt = \\int ${params.C}t \\, dt = \\frac{${params.C}}{2}t^2 + C_1`} />
        <p className="text-body-md">Since <InlineMath math="v(0) = 0" />, <InlineMath math="C_1 = 0" />. So, <InlineMath math={`v(t) = ${params.C / 2}t^2`} />.</p>
        <p className="text-body-md">
          Integrate velocity to find position. Since it starts at the origin, <InlineMath math="x(0) = 0" />:
        </p>
        <BlockMath math={`x(t) = \\int v(t) \\, dt = \\int \\frac{${params.C}}{2}t^2 \\, dt = \\frac{${params.C}}{6}t^3 + C_2`} />
        <p className="text-body-md">Since <InlineMath math="x(0) = 0" />, <InlineMath math="C_2 = 0" />. So, <InlineMath math={`x(t) = \\frac{${params.C}}{6}t^3`} />.</p>
        <p className="text-body-md">
          Substitute <InlineMath math={`t = ${params.t2}`} />:
        </p>
        <BlockMath math={`x(${params.t2}) = \\frac{${params.C}}{6}(${params.t2})^3 = ${Number((params.C * Math.pow(params.t2, 3) / 6).toFixed(3))} \\text{ m}`} />
      </div>
    )
  },
  {
    id: 'dva-3',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * 5) + 5; // 5 to 9
      const v2 = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const t1 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const t2 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { v1, v2, t1, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 3: Graph Analysis</h3>
        <p className="text-body-md">
          An object moves along the x-axis. For the first <InlineMath math={`${params.t1}`} /> seconds, it moves with a constant velocity of <InlineMath math={`+${params.v1}`} /> m/s. 
          For the next <InlineMath math={`${params.t2}`} /> seconds, it moves with a constant velocity of <InlineMath math={`-${params.v2}`} /> m/s.
        </p>
        <p className="text-body-md">
          What is the <strong>total displacement</strong> of the object over the entire <InlineMath math={`${params.t1 + params.t2}`} /> second interval?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.v1 * params.t1 - params.v2 * params.t2}`,
    variables: [],
    renderHint: () => 'Hint: Displacement is the signed area under the velocity-time graph. Areas below the time axis are negative.',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          Displacement is the integral of velocity, which is geometrically the area under the <InlineMath math="v-t" /> graph.
        </p>
        <p className="text-body-md">
          Area of the first part (rectangle above axis): <InlineMath math={`\\text{Area}_1 = v_1 \\Delta t_1 = (${params.v1})(${params.t1}) = ${params.v1 * params.t1} \\text{ m}`} />.
        </p>
        <p className="text-body-md">
          Area of the second part (rectangle below axis): <InlineMath math={`\\text{Area}_2 = v_2 \\Delta t_2 = (-${params.v2})(${params.t2}) = -${params.v2 * params.t2} \\text{ m}`} />.
        </p>
        <p className="text-body-md">
          Total displacement is the sum of these signed areas:
        </p>
        <BlockMath math={`\\Delta x = \\text{Area}_1 + \\text{Area}_2 = ${params.v1 * params.t1} + (-${params.v2 * params.t2}) = ${params.v1 * params.t1 - params.v2 * params.t2} \\text{ m}`} />
      </div>
    )
  },
  {
    id: 'dva-4',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const A = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const B = Math.floor(Math.random() * 5) + 3; // 3 to 7
      return { A, B };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 4: Turning Point</h3>
        <p className="text-body-md">
          A particle&apos;s position is given by the function <InlineMath math={`x(t) = ${params.A}t^2 - ${params.A * params.B * 2}t + 10`} />.
        </p>
        <p className="text-body-md">
          At what time <InlineMath math="t" /> does the particle <strong>reverse its direction</strong> of motion?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.B}`,
    variables: [],
    renderHint: () => 'Hint: A particle reverses direction when its velocity crosses zero. Find the velocity function and set it equal to zero.',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          The particle reverses direction when its velocity changes sign. This happens when the velocity is exactly zero.
        </p>
        <p className="text-body-md">
          First, find the velocity function by taking the derivative of position:
        </p>
        <BlockMath math={`v(t) = \\frac{dx}{dt} = 2(${params.A})t - ${params.A * params.B * 2} = ${2 * params.A}t - ${params.A * params.B * 2}`} />
        <p className="text-body-md">
          Set velocity equal to zero and solve for <InlineMath math="t" />:
        </p>
        <BlockMath math={`0 = ${2 * params.A}t - ${params.A * params.B * 2}`} />
        <BlockMath math={`${2 * params.A}t = ${params.A * params.B * 2}`} />
        <BlockMath math={`t = \\frac{${params.A * params.B * 2}}{${2 * params.A}} = ${params.B} \\text{ s}`} />
      </div>
    )
  },
  {
    id: 'dva-5',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const v0 = Math.floor(Math.random() * 10) + 15; // 15 to 24
      const a = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { v0, a };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 5: Constant Acceleration</h3>
        <p className="text-body-md">
          A car is traveling at <InlineMath math={`${params.v0}`} /> m/s when the driver suddenly applies the brakes, causing a constant deceleration of <InlineMath math={`${params.a}`} /> m/s<InlineMath math="^2" />.
        </p>
        <p className="text-body-md">
          What is the <strong>total stopping distance</strong> of the car?
        </p>
      </>
    ),
    correctExpression: (params) => `(${params.v0}^2)/(2*${params.a})`,
    variables: [],
    renderHint: () => 'Hint: You know the initial velocity, final velocity (zero), and acceleration. Which of the Big 5 kinematic equations relates these to displacement?',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          Since acceleration is constant, we can use the kinematic equation that does not involve time:
        </p>
        <BlockMath math="v_f^2 = v_i^2 + 2a\Delta x" />
        <p className="text-body-md">
          We know <InlineMath math={`v_f = 0`} />, <InlineMath math={`v_i = ${params.v0}`} />, and <InlineMath math={`a = -${params.a}`} />. Substitute these in:
        </p>
        <BlockMath math={`0^2 = (${params.v0})^2 + 2(-${params.a})\\Delta x`} />
        <BlockMath math={`0 = ${params.v0 * params.v0} - ${2 * params.a}\\Delta x`} />
        <BlockMath math={`\\Delta x = \\frac{${params.v0 * params.v0}}{${2 * params.a}} = ${Number(((params.v0 * params.v0) / (2 * params.a)).toFixed(3))} \\text{ m}`} />
      </div>
    )
  },
  {
    id: 'dva-6',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    generateParams: () => {
      const A = Math.floor(Math.random() * 4) + 2; 
      const B = Math.floor(Math.random() * 10) + 5;
      return { A, B };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 6: Matching Velocities</h3>
        <p className="text-body-md">
          Particle 1 moves such that its position is <InlineMath math={`x_1(t) = ${params.A}t^2 - t`} />.
          Particle 2 moves such that its position is <InlineMath math={`x_2(t) = ${params.B}t`} />.
        </p>
        <p className="text-body-md">
          At what time <InlineMath math="t" /> do both particles have the <strong>same velocity</strong>?
        </p>
      </>
    ),
    correctExpression: (params) => `(${params.B} + 1)/(2*${params.A})`,
    variables: [],
    renderHint: () => 'Hint: Find the velocity functions for both particles, set them equal to each other, and solve for t.',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          First, find the velocity functions for both particles by differentiating their position functions:
        </p>
        <BlockMath math={`v_1(t) = \\frac{dx_1}{dt} = ${2 * params.A}t - 1`} />
        <BlockMath math={`v_2(t) = \\frac{dx_2}{dt} = ${params.B}`} />
        <p className="text-body-md">
          Set the velocities equal and solve for <InlineMath math="t" />:
        </p>
        <BlockMath math={`v_1(t) = v_2(t)`} />
        <BlockMath math={`${2 * params.A}t - 1 = ${params.B}`} />
        <BlockMath math={`${2 * params.A}t = ${params.B + 1}`} />
        <BlockMath math={`t = \\frac{${params.B + 1}}{${2 * params.A}} = ${Number(((params.B + 1) / (2 * params.A)).toFixed(3))} \\text{ s}`} />
      </div>
    )
  },
  {
    id: 'dva-7',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'lesson-dedicated'],
    isBeastQuestion: true,
    generateParams: () => {
      const C = Math.floor(Math.random() * 4) + 2; 
      const x1 = Math.floor(Math.random() * 2) + 2; 
      return { C, x1 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 7: The Chain Rule (Beast Question)</h3>
        <p className="text-body-md">
          An object starts from rest at the origin <InlineMath math="x = 0" />. Its acceleration is given as a function of <strong>position</strong> (not time!) by:
        </p>
        <BlockMath math={`a(x) = ${params.C}x^2`} />
        <p className="text-body-md">
          What is the <strong>velocity</strong> of the object when it reaches position <InlineMath math={`x = ${params.x1}`} /> meters?
        </p>
      </>
    ),
    correctExpression: (params) => `sqrt((2*${params.C}/3)*(${params.x1})^3)`,
    variables: [],
    renderHint: () => 'Hint: You cannot integrate a(x) with respect to time directly. Use the chain rule identity: a = dv/dt = (dv/dx)(dx/dt) = v(dv/dx). This allows you to write a dx = v dv and integrate!',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          This is a classic differential equations trick used in AP Physics C. We know <InlineMath math="a = \frac{dv}{dt}" />. But we have <InlineMath math="a(x)" />, not <InlineMath math="a(t)" />. 
          Using the chain rule, we can rewrite acceleration:
        </p>
        <BlockMath math="a = \frac{dv}{dt} = \frac{dv}{dx} \frac{dx}{dt} = \frac{dv}{dx} v = v \frac{dv}{dx}" />
        <p className="text-body-md">
          Substitute our acceleration function into this identity:
        </p>
        <BlockMath math={`${params.C}x^2 = v \\frac{dv}{dx}`} />
        <p className="text-body-md">
          Separate the variables (move all <InlineMath math="x" /> terms to one side, <InlineMath math="v" /> terms to the other) and integrate. The object starts from rest at the origin, so bounds are from 0 to <InlineMath math={`v`} />, and 0 to <InlineMath math={`x`} />:
        </p>
        <BlockMath math={`\\int_0^{x} ${params.C}x^2 \\, dx = \\int_0^v v \\, dv`} />
        <BlockMath math={`\\frac{${params.C}}{3}x^3 = \\frac{1}{2}v^2`} />
        <BlockMath math={`v^2 = \\frac{${2 * params.C}}{3}x^3`} />
        <BlockMath math={`v = \\sqrt{\\frac{${2 * params.C}}{3}x^3}`} />
        <p className="text-body-md">
          Evaluate at <InlineMath math={`x = ${params.x1}`} />:
        </p>
        <BlockMath math={`v = \\sqrt{\\frac{${2 * params.C}}{3}(${params.x1})^3} = \\sqrt{\\frac{${2 * params.C * Math.pow(params.x1, 3)}}{3}} \\approx ${Number(Math.sqrt((2 * params.C * Math.pow(params.x1, 3)) / 3).toFixed(3))} \\text{ m/s}`} />
      </div>
    )
  },
  {
    id: 'dva-daily-1',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Reversing Direction</h3>
        <p className="text-body-md">
          A ball is thrown straight up. While it is traveling upward, its velocity is positive and its acceleration is negative. On the way down, its velocity is negative. What is the sign of its acceleration on the way down?
        </p>
        <p className="text-body-md">Enter <code>1</code> for Positive, <code>-1</code> for Negative, or <code>0</code> for Zero.</p>
      </>
    ),
    correctExpression: '-1',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Acceleration due to gravity is always directed downward, regardless of the object&apos;s direction of motion. Since upward was defined as positive, acceleration is negative (-9.8 m/s²) during the entire flight.</p>
      </div>
    )
  },
  {
    id: 'dva-daily-2',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'daily-practice'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 4) + 2; 
      const dt = Math.floor(Math.random() * 4) + 2; 
      return { a, dt };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Area under a-t graph</h3>
        <p className="text-body-md">
          An object undergoes a constant acceleration of <InlineMath math={`${params.a}`} /> m/s<InlineMath math="^2" /> for a duration of <InlineMath math={`${params.dt}`} /> seconds. What is the <strong>change in velocity</strong> of the object during this time?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.a * params.dt}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Change in velocity is the integral (area under) the acceleration-time graph. For a constant acceleration, it is simply a rectangle: <InlineMath math={`\\Delta v = a \\Delta t = (${params.a})(${params.dt}) = ${params.a * params.dt} \\text{ m/s}`} />.</p>
      </div>
    )
  },
  {
    id: 'dva-daily-3',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'daily-practice'],
    generateParams: () => {
      const A = Math.floor(Math.random() * 5) + 2; 
      const t = Math.floor(Math.random() * 3) + 2; 
      return { A, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Simple Derivative</h3>
        <p className="text-body-md">
          If <InlineMath math={`x(t) = ${params.A}t^2`} />, what is the velocity at <InlineMath math={`t = ${params.t}`} /> seconds?
        </p>
      </>
    ),
    correctExpression: (params) => `${2 * params.A * params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md"><InlineMath math={`v(t) = \\frac{dx}{dt} = 2(${params.A})t = ${2 * params.A}t`} />.</p>
        <p className="text-body-md"><InlineMath math={`v(${params.t}) = ${2 * params.A}(${params.t}) = ${2 * params.A * params.t}`} />.</p>
      </div>
    )
  },
  {
    id: 'dva-daily-4',
    tags: ['kinematics', 'displacement-velocity-and-acceleration', 'daily-practice'],
    generateParams: () => {
      const v = Math.floor(Math.random() * 10) + 10; 
      const t = Math.floor(Math.random() * 5) + 3; 
      return { v, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Constant Velocity</h3>
        <p className="text-body-md">
          A car travels at a constant velocity of <InlineMath math={`${params.v}`} /> m/s. How far does it travel in <InlineMath math={`${params.t}`} /> seconds?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.v * params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">For constant velocity, displacement is simply <InlineMath math={`\\Delta x = v \\Delta t = (${params.v})(${params.t}) = ${params.v * params.t} \\text{ m}`} />.</p>
      </div>
    )
  }
];
