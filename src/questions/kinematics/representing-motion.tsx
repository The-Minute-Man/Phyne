import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';
import { Mafs, Coordinates, Plot, Point, Theme, Line, Polygon } from 'mafs';

export const representingMotionQuestions: Question[] = [
  // LESSON DEDICATED (7 Questions)
  {
    id: 'representing-motion-v2-hw-1',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const t1 = Math.floor(Math.random() * 2) + 2; // 2 to 3
      const t2 = t1 + Math.floor(Math.random() * 2) + 2; // t1+2 to t1+3
      const t3 = t2 + Math.floor(Math.random() * 2) + 2; // t2+2 to t2+3
      return { v1, t1, t2, t3 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Graphical Displacement</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The velocity-time graph of a particle is shown below. Calculate the total displacement of the particle from <InlineMath math="t = 0" /> to <InlineMath math={`t = ${params.t3} \\text{ s}`} />.
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t3 + 1], y: [-1, params.v1 + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Polygon 
              points={[[0,0], [params.t1, params.v1], [params.t2, params.v1], [params.t3, 0]]} 
              color={Theme.blue} 
            />
          </Mafs>
        </div>
      </>
    ),
    correctExpression: (params) => `${0.5 * params.t1 * params.v1 + (params.t2 - params.t1) * params.v1 + 0.5 * (params.t3 - params.t2) * params.v1}`,
    variables: [],
    renderExplanation: (params) => {
      const a1 = 0.5 * params.t1 * params.v1;
      const a2 = (params.t2 - params.t1) * params.v1;
      const a3 = 0.5 * (params.t3 - params.t2) * params.v1;
      return (
        <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
          <p className="text-body-md">Displacement is the area under the velocity-time curve. Break the shape into three parts:</p>
          <ul className="text-body-md" style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
            <li>Triangle 1 (0 to {params.t1}s): <InlineMath math={`\\frac{1}{2}(${params.t1})(${params.v1}) = ${a1}`} /></li>
            <li>Rectangle ({params.t1}s to {params.t2}s): <InlineMath math={`(${params.t2 - params.t1})(${params.v1}) = ${a2}`} /></li>
            <li>Triangle 2 ({params.t2}s to {params.t3}s): <InlineMath math={`\\frac{1}{2}(${params.t3 - params.t2})(${params.v1}) = ${a3}`} /></li>
          </ul>
          <p className="text-body-md" style={{ marginTop: '0.5rem' }}>Total Displacement = <InlineMath math={`${a1} + ${a2} + ${a3} = ${a1 + a2 + a3} \\text{ m}`} />.</p>
        </div>
      );
    }
  },
  {
    id: 'representing-motion-v2-hw-2',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * 4) + 4; // 4 to 7
      const v2 = -(Math.floor(Math.random() * 4) + 2); // -5 to -2
      const t1 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const t2 = t1 + Math.floor(Math.random() * 3) + 2; // t1+2 to t1+4
      return { v1, v2, t1, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 2: Distance vs. Displacement</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object moves along the x-axis with the velocity shown below. Notice that the graph crosses the time axis.
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t2 + 1], y: [params.v2 - 2, params.v1 + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Polygon points={[[0,0], [0, params.v1], [params.t1, 0]]} color={Theme.blue} />
            <Polygon points={[[params.t1, 0], [params.t2, params.v2], [params.t2, 0]]} color={Theme.red} />
          </Mafs>
        </div>
        <p className="text-body-md">
          Calculate the <strong>total distance</strong> traveled by the object from <InlineMath math="t = 0" /> to <InlineMath math={`t = ${params.t2} \\text{ s}`} />.
        </p>
      </>
    ),
    correctExpression: (params) => `${0.5 * params.t1 * params.v1 + 0.5 * (params.t2 - params.t1) * Math.abs(params.v2)}`,
    variables: [],
    renderExplanation: (params) => {
      const a1 = 0.5 * params.t1 * params.v1;
      const a2 = 0.5 * (params.t2 - params.t1) * Math.abs(params.v2);
      return (
        <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
          <p className="text-body-md">Total distance is the integral of the <em>absolute value</em> of velocity (speed). This means we sum the absolute areas of both triangles.</p>
          <ul className="text-body-md" style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
            <li>Forward distance (Blue Area): <InlineMath math={`\\frac{1}{2}(${params.t1})(${params.v1}) = ${a1}`} /></li>
            <li>Backward distance (Red Area): <InlineMath math={`\\frac{1}{2}(${params.t2 - params.t1})(|${params.v2}|) = ${a2}`} /></li>
          </ul>
          <p className="text-body-md" style={{ marginTop: '0.5rem' }}>Total Distance = <InlineMath math={`${a1} + ${a2} = ${a1 + a2} \\text{ m}`} />.</p>
          <p className="text-body-sm text-secondary" style={{ marginTop: '0.5rem' }}>Note: If asked for displacement, it would be {a1 - a2} m.</p>
        </div>
      );
    }
  },
  {
    id: 'representing-motion-v2-hw-3',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v0 = Math.floor(Math.random() * 10) + 10; // 10 to 19
      const v1 = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const t1 = Math.floor(Math.random() * 4) + 3; // 3 to 6
      return { v0, v1, t1 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 3: Finding Acceleration</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          Determine the acceleration of the object between <InlineMath math="t = 0" /> and <InlineMath math={`t = ${params.t1} \\text{ s}`} /> based on its velocity-time graph.
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [-1, params.t1 + 2], y: [-1, params.v0 + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 5 }} />
            <Line.Segment point1={[0, params.v0]} point2={[params.t1, params.v1]} color={Theme.green} />
            <Point x={0} y={params.v0} color={Theme.foreground} />
            <Point x={params.t1} y={params.v1} color={Theme.foreground} />
          </Mafs>
        </div>
      </>
    ),
    correctExpression: (params) => `${(params.v1 - params.v0) / params.t1}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Acceleration is the slope of the velocity-time graph.</p>
        <BlockMath math={`a = \\frac{\\Delta v}{\\Delta t} = \\frac{${params.v1} - ${params.v0}}{${params.t1} - 0} = \\frac{${params.v1 - params.v0}}{${params.t1}}`} />
        <p className="text-body-md">Acceleration = <InlineMath math={`${((params.v1 - params.v0) / params.t1).toFixed(3)} \\text{ m/s}^2`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-v2-hw-4',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const t_turn = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const x_max = Math.floor(Math.random() * 10) + 5; // 5 to 14
      return { t_turn, x_max };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 4: Turning Points</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The <strong>position-time</strong> graph of a moving object is shown below. At what time does the object momentarily stop and reverse its direction?
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t_turn * 2], y: [-2, params.x_max + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 2 }} />
            <Plot.OfX y={(x) => - (params.x_max / Math.pow(params.t_turn, 2)) * Math.pow(x - params.t_turn, 2) + params.x_max} color={Theme.blue} />
          </Mafs>
        </div>
      </>
    ),
    correctExpression: (params) => `${params.t_turn}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">An object reverses direction when its velocity changes sign. Since velocity is the slope of the position-time graph, we look for the point where the slope is zero (a horizontal tangent).</p>
        <p className="text-body-md">This occurs at the vertex (maximum) of the parabola, which corresponds to <InlineMath math={`t = ${params.t_turn} \\text{ s}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-v2-hw-5',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const v0 = Math.floor(Math.random() * 10) + 2; // 2 to 11
      const t = Math.floor(Math.random() * 4) + 3; // 3 to 6
      return { a, v0, t };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 5: From Acceleration to Velocity</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          The acceleration-time graph of a rocket is shown below. If the rocket has an initial velocity of <InlineMath math={`v_0 = ${params.v0} \\text{ m/s}`} />, what is its velocity at <InlineMath math={`t = ${params.t} \\text{ s}`} />?
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t + 2], y: [0, params.a + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Polygon points={[[0,0], [0, params.a], [params.t, params.a], [params.t, 0]]} color={Theme.red} />
          </Mafs>
        </div>
      </>
    ),
    correctExpression: (params) => `${params.v0 + params.a * params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The change in velocity (<InlineMath math="\Delta v" />) is the area under the acceleration-time graph.</p>
        <BlockMath math={`\\Delta v = \\text{Area} = (${params.a})(${params.t}) = ${params.a * params.t} \\text{ m/s}`} />
        <p className="text-body-md">Final velocity is initial velocity plus the change:</p>
        <BlockMath math={`v_f = v_0 + \\Delta v = ${params.v0} + ${params.a * params.t} = ${params.v0 + params.a * params.t} \\text{ m/s}`} />
      </div>
    )
  },
  {
    id: 'representing-motion-v2-hw-6',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    generateParams: () => {
      const v0 = -(Math.floor(Math.random() * 8) + 4); // -11 to -4
      const t1 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const v2 = Math.floor(Math.random() * 8) + 4; // 4 to 11
      const t2 = t1 + Math.floor(Math.random() * 3) + 2; // t1+2 to t1+4
      return { v0, t1, v2, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 6: Speeding Up vs Slowing Down</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          A particle's velocity-time graph is shown below. For how many total seconds is the particle <strong>slowing down</strong>?
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t2 + 1], y: [params.v0 - 2, params.v2 + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 2 }} />
            <Line.Segment point1={[0, params.v0]} point2={[params.t1, 0]} color={Theme.green} />
            <Line.Segment point1={[params.t1, 0]} point2={[params.t2, params.v2]} color={Theme.green} />
          </Mafs>
        </div>
      </>
    ),
    correctExpression: (params) => `${params.t1}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">An object is slowing down when its velocity and acceleration have <strong>opposite signs</strong>.</p>
        <ul className="text-body-md" style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
          <li>From <InlineMath math={`t = 0`} /> to <InlineMath math={`t = ${params.t1}`} />, velocity is negative (below axis) but acceleration (slope) is positive. Opposite signs means it is slowing down.</li>
          <li>From <InlineMath math={`t = ${params.t1}`} /> to <InlineMath math={`t = ${params.t2}`} />, velocity is positive and acceleration is positive. Same signs means it is speeding up.</li>
        </ul>
        <p className="text-body-md" style={{ marginTop: '0.5rem' }}>It slows down for exactly {params.t1} seconds.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-v2-hw-7-beast',
    tags: ['kinematics', 'representing-motion', 'lesson-dedicated'],
    isBeastQuestion: true,
    generateParams: () => {
      const a0 = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const t1 = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const t2 = t1 + Math.floor(Math.random() * 3) + 2; // t1+2 to t1+4
      return { a0, t1, t2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 7: The Graphical Beast (Extra Credit)</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object starts from rest at the origin (<InlineMath math="v_0 = 0, x_0 = 0" />). Its <strong>acceleration-time</strong> graph is shown below.
        </p>
        <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
          <Mafs height={250} viewBox={{ x: [0, params.t2 + 1], y: [-1, params.a0 + 2] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Polygon points={[[0,0], [0, params.a0], [params.t1, params.a0], [params.t1, 0]]} color={Theme.red} />
            <Line.Segment point1={[params.t1, 0]} point2={[params.t2, 0]} color={Theme.red} weight={4} />
          </Mafs>
        </div>
        <p className="text-body-md">
          Calculate the final position of the object at <InlineMath math={`t = ${params.t2} \\text{ s}`} />. (Hint: you must construct the velocity graph in your mind first!)
        </p>
      </>
    ),
    correctExpression: (params) => {
      // Phase 1 (0 to t1): constant accel a0
      // v1 = a0 * t1
      // x1 = 0.5 * a0 * t1^2
      // Phase 2 (t1 to t2): zero accel (constant velocity v1)
      // v2 = v1
      // dx2 = v1 * (t2 - t1)
      // x2 = x1 + dx2
      const v1 = params.a0 * params.t1;
      const x1 = 0.5 * params.a0 * Math.pow(params.t1, 2);
      const x2 = x1 + v1 * (params.t2 - params.t1);
      return `${x2}`;
    },
    variables: [],
    renderExplanation: (params) => {
      const v1 = params.a0 * params.t1;
      const x1 = 0.5 * params.a0 * Math.pow(params.t1, 2);
      const dx2 = v1 * (params.t2 - params.t1);
      return (
        <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
          <p className="text-body-md">This requires a double integration geometrically.</p>
          <p className="text-body-md"><strong>Step 1: Velocity Graph</strong></p>
          <ul className="text-body-md" style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
            <li>From <InlineMath math={`t=0`} /> to <InlineMath math={`${params.t1}`} />, acceleration is a constant {params.a0}. Velocity increases linearly from 0 to <InlineMath math={`v = (${params.a0})(${params.t1}) = ${v1} \\text{ m/s}`} />.</li>
            <li>From <InlineMath math={`t=${params.t1}`} /> to <InlineMath math={`${params.t2}`} />, acceleration is 0. Velocity is constant at {v1} m/s.</li>
          </ul>
          <p className="text-body-md" style={{ marginTop: '1rem' }}><strong>Step 2: Position (Area under Velocity)</strong></p>
          <ul className="text-body-md" style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
            <li>Area of triangle from <InlineMath math={`t=0`} /> to <InlineMath math={`${params.t1}`} />: <InlineMath math={`\\frac{1}{2}(${params.t1})(${v1}) = ${x1} \\text{ m}`} />.</li>
            <li>Area of rectangle from <InlineMath math={`t=${params.t1}`} /> to <InlineMath math={`${params.t2}`} />: <InlineMath math={`(${params.t2 - params.t1})(${v1}) = ${dx2} \\text{ m}`} />.</li>
          </ul>
          <p className="text-body-md" style={{ marginTop: '0.5rem' }}>Total Position = <InlineMath math={`${x1} + ${dx2} = ${x1 + dx2} \\text{ m}`} />.</p>
        </div>
      );
    }
  },

  // DAILY PRACTICE (3 Questions)
  {
    id: 'representing-motion-v2-daily-1',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const a = Math.floor(Math.random() * 4) + 2; 
      const t = Math.floor(Math.random() * 3) + 2;
      return { a, t };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object has a constant velocity of <InlineMath math={`${params.a} \\text{ m/s}`} /> for <InlineMath math={`${params.t} \\text{ s}`} />. What is its displacement over this interval, calculated geometrically?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.a * params.t}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The velocity-time graph is a horizontal line forming a rectangle. Area = <InlineMath math={`\\text{base} \\times \\text{height} = ${params.t} \\times ${params.a} = ${params.a * params.t} \\text{ m}`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-v2-daily-2',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * 10) + 5; 
      const t1 = Math.floor(Math.random() * 3) + 2;
      return { v1, t1 };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object starts from rest and its velocity increases linearly, reaching <InlineMath math={`${params.v1} \\text{ m/s}`} /> at <InlineMath math={`t = ${params.t1} \\text{ s}`} />. What is its acceleration?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.v1 / params.t1}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Acceleration is the slope of the v-t graph: <InlineMath math={`a = \\frac{\\Delta v}{\\Delta t} = \\frac{${params.v1} - 0}{${params.t1} - 0} = ${(params.v1 / params.t1).toFixed(3)} \\text{ m/s}^2`} />.</p>
      </div>
    )
  },
  {
    id: 'representing-motion-v2-daily-3',
    tags: ['kinematics', 'representing-motion', 'daily-practice'],
    generateParams: () => {
      const v1 = Math.floor(Math.random() * -6) - 2; // -8 to -2
      const a1 = Math.floor(Math.random() * -4) - 1; // -5 to -1
      return { v1, a1 };
    },
    renderPrompt: (params) => (
      <>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          An object has a velocity of <InlineMath math={`${params.v1} \\text{ m/s}`} /> and an acceleration of <InlineMath math={`${params.a1} \\text{ m/s}^2`} />. Is the object speeding up or slowing down? Enter 1 for speeding up, 0 for slowing down.
        </p>
      </>
    ),
    correctExpression: (params) => `1`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Because velocity and acceleration have the <strong>same sign</strong> (both are negative), the object is speeding up in the negative direction.</p>
      </div>
    )
  }
];
