'use client';

import React, { useState, useEffect } from 'react';
import { Mafs, Coordinates, Point, Plot, useMovablePoint, Theme, Line, Vector } from 'mafs';
import { InlineMath, BlockMath } from '@/components/Math';
import QuestionRenderer from '@/components/QuestionRenderer';
import { kinematicsQuestions } from '@/questions/kinematics';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import AutoScrubber from '@/components/AutoScrubber';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function DisplacementVelocityAndAcceleration() {
  // Node 1 state
  const point1 = useMovablePoint([2, 0], {
    constrain: "horizontal"
  });
  const debouncedPoint1X = useDebounce(point1.x, 300);

  // Node 2 state (Tangent Line)
  const [dt, setDt] = useState(2);
  const t1 = 2; // fixed t0
  const posFunc = (t: number) => 0.5 * t * t;
  const velFunc = (t: number) => t;

  const x1 = posFunc(t1);
  const t2 = t1 + dt;
  const x2 = posFunc(t2);

  // Math state (Node 2)
  const mathDt = useDebounce(dt, 300);
  const mathT2 = t1 + mathDt;
  const mathX2 = posFunc(mathT2);

  // Node 3 state (Stacked Graphs)
  const [time, setTime] = useState(0);
  const xFunc = (t: number) => -0.5 * Math.pow(t - 3, 3) + 2 * t;
  const vFunc = (t: number) => -1.5 * Math.pow(t - 3, 2) + 2;
  const aFunc = (t: number) => -3 * (t - 3);

  // Node 4 state (Area under curve)
  const pointT1 = useMovablePoint([1, 0], { constrain: "horizontal" });
  const pointT2 = useMovablePoint([4, 0], { constrain: "horizontal" });
  const actB1 = Math.min(pointT1.x, pointT2.x);
  const actB2 = Math.max(pointT1.x, pointT2.x);
  const vAreaFunc = (t: number) => t;

  const graphMaxX = Math.max(6, actB2) + 1;
  const graphMinX = Math.min(-1, actB1) - 1;

  // Math state (Node 4)
  const mathActB1 = useDebounce(actB1, 300);
  const mathActB2 = useDebounce(actB2, 300);

  const lessonNodes = [
    {
      id: 'displacement',
      title: 'Position and Displacement',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. Position and Displacement</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              In kinematics, <strong>position</strong>, denoted as <InlineMath math="x" /> or <InlineMath math="\vec{r}" />, tells us where an object is located relative to a chosen origin.{' '}
              <strong>Displacement</strong>, <InlineMath math="\Delta x" />, is the <em>change</em> in that position. It depends only on the initial and final states, not the path taken.
            </p>
            <BlockMath math="\Delta x = x_f - x_i" />
            <p className="text-body-md" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              Drag the point below to change its final position and see how displacement is a vector pointing from the origin to the new location.
            </p>
            <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border)' }}>
              <Mafs height={200} viewBox={{ y: [-2, 2], x: [-5, 5] }}>
                <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={false} />
                <Vector tail={[0, 0]} tip={[point1.x, 0]} color={Theme.blue} />
                {point1.element}
              </Mafs>
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <span className="text-body-md">Position: <InlineMath math={`x = ${debouncedPoint1X.toFixed(1)} \\text{ m}`} /></span>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      id: 'velocity',
      title: 'Velocity as a Derivative',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>2. Velocity as a Derivative</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              <strong>Average velocity</strong> is defined as displacement divided by the time interval: <InlineMath math="v_{avg} = \frac{\Delta x}{\Delta t}" />.{' '}
              Geometrically, this is the slope of the <strong>secant line</strong> connecting two points on a position-time graph.
            </p>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              As we shrink the time interval (<InlineMath math="\Delta t \to 0" />), the secant line approaches the <strong>tangent line</strong>. The slope of this tangent line is the <strong>instantaneous velocity</strong>. This is the definition of a derivative!
            </p>
            <BlockMath math="v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt}" />
            <p className="text-body-md" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              Adjust the <InlineMath math="\Delta t" /> slider below to see the secant line (average velocity) converge to the tangent line (instantaneous velocity).
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
              <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Mafs viewBox={{ x: [-1, 6], y: [-1, 10] }}>
                  <Coordinates.Cartesian />
                  <Plot.OfX y={posFunc} color={Theme.blue} />
                  
                  {/* Tangent line (instantaneous) */}
                  <Plot.OfX y={(x) => velFunc(t1) * (x - t1) + x1} color={Theme.green} style="dashed" />
                  
                  {/* Secant line (average) */}
                  {dt !== 0 && (
                    <Plot.OfX y={(x) => ((x2 - x1) / dt) * (x - t1) + x1} color={Theme.red} />
                  )}
                  
                  <Point x={t1} y={x1} color={Theme.foreground} />
                  {dt !== 0 && <Point x={t2} y={x2} color={Theme.red} />}
                </Mafs>
              </div>
              <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  <InlineMath math="\Delta t" /> = {mathDt.toFixed(2)} s
                </label>
                <input 
                  type="range" 
                  min="0.01" max="4" step="0.01" 
                  value={dt} 
                  onChange={(e) => setDt(parseFloat(e.target.value))}
                  style={{ width: '100%', marginBottom: '1.5rem' }} 
                />
                
                <div>
                  <span className="text-secondary text-body-sm" style={{ color: 'var(--red)' }}>Average Velocity (Secant)</span>
                  <BlockMath math={`v_{avg} = \\frac{${mathX2.toFixed(1)} - ${x1.toFixed(1)}}{${mathDt.toFixed(2)}} = ${((mathX2 - x1)/mathDt).toFixed(2)} \\text{ m/s}`} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Inst. Velocity (Tangent)</span>
                  <BlockMath math={`v = \\frac{dx}{dt}\\bigg|_{t=${t1}} = ${velFunc(t1).toFixed(2)} \\text{ m/s}`} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      id: 'acceleration',
      title: 'Acceleration as the Second Derivative',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>3. Acceleration as the Second Derivative</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Just as velocity is the rate of change of position, <strong>acceleration</strong> is the rate of change of velocity. By taking another derivative, we find that acceleration is the <em>second derivative</em> of position.
            </p>
            <BlockMath math="a = \frac{dv}{dt} = \frac{d^2x}{dt^2}" />
            <p className="text-body-md" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              Scrub the time slider below. Notice how the graphs align vertically:
              <br/>- When <InlineMath math="v = 0" />, <InlineMath math="x" /> has a local maximum or minimum.
              <br/>- When <InlineMath math="a = 0" />, <InlineMath math="v" /> has a local maximum or minimum (an inflection point on <InlineMath math="x" />).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#111', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'white', minWidth: '80px' }}>Time: {time.toFixed(1)}s</span>
                <AutoScrubber 
                  min={0} max={6} step={0.1} 
                  value={time} 
                  onChange={setTime}
                  speedMultiplier={0.5}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="x(t)" /></div>
                  <Mafs height={200} viewBox={{ x: [0, 6], y: [-5, 15] }}>
                    <Coordinates.Cartesian xAxis={{ lines: false, labels: () => "" }} yAxis={{ lines: false, labels: () => "" }} />
                    <Plot.OfX y={xFunc} color={Theme.blue} />
                    <Point x={time} y={xFunc(time)} color={Theme.foreground} />
                  </Mafs>
                </div>

                <div style={{ background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="v(t)" /></div>
                  <Mafs height={200} viewBox={{ x: [0, 6], y: [-15, 5] }}>
                    <Coordinates.Cartesian xAxis={{ lines: false, labels: () => "" }} yAxis={{ lines: false, labels: () => "" }} />
                    <Plot.OfX y={vFunc} color={Theme.green} />
                    <Point x={time} y={vFunc(time)} color={Theme.foreground} />
                  </Mafs>
                </div>

                <div style={{ background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="a(t)" /></div>
                  <Mafs height={200} viewBox={{ x: [0, 6], y: [-10, 10] }}>
                    <Coordinates.Cartesian xAxis={{ lines: false, labels: () => "" }} yAxis={{ lines: false, labels: () => "" }} />
                    <Plot.OfX y={aFunc} color={Theme.red} />
                    <Point x={time} y={aFunc(time)} color={Theme.foreground} />
                  </Mafs>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      id: 'integrals',
      title: 'The Integral Relationship',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>4. The Integral Relationship</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Since <InlineMath math="v = \frac{dx}{dt}" />, we can rearrange this to <InlineMath math="dx = v \, dt" />. If we integrate both sides, we find that the displacement is the <strong>area under the velocity-time curve</strong>.
            </p>
            <BlockMath math="\Delta x = \int_{t_1}^{t_2} v(t) \, dt" />
            <p className="text-body-md" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              Drag the two time bounds below to see how the area under the velocity graph corresponds to the total displacement.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
              <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Mafs viewBox={{ x: [graphMinX, graphMaxX], y: [graphMinX, graphMaxX] }}>
                  <Coordinates.Cartesian />
                  <Plot.OfX y={vAreaFunc} color={Theme.green} />
                  <Plot.Inequality 
                    y={{ 
                      '<=': (x) => (x >= actB1 && x <= actB2) ? Math.max(vAreaFunc(x), 0) : 0,
                      '>=': (x) => (x >= actB1 && x <= actB2) ? Math.min(vAreaFunc(x), 0) : 0
                    }}
                    color={Theme.blue} 
                  />
                  {pointT1.element}
                  {pointT2.element}
                  <Line.Segment point1={[pointT1.x, 0]} point2={[pointT1.x, vAreaFunc(pointT1.x)]} style="dashed" color={Theme.foreground} />
                  <Line.Segment point1={[pointT2.x, 0]} point2={[pointT2.x, vAreaFunc(pointT2.x)]} style="dashed" color={Theme.foreground} />
                </Mafs>
              </div>
              <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <span className="text-secondary text-body-sm">Bounds</span>
                    <BlockMath math={`t_1 = ${mathActB1.toFixed(1)} \\text{ s}, t_2 = ${mathActB2.toFixed(1)} \\text{ s}`} />
                  </div>
                  <div>
                    <span className="text-secondary text-body-sm" style={{ color: 'var(--blue)' }}>Displacement (Area)</span>
                    <BlockMath math={`\\Delta x = \\int_{${mathActB1.toFixed(1)}}^{${mathActB2.toFixed(1)}} t \\, dt = ${ (0.5 * mathActB2 * mathActB2 - 0.5 * mathActB1 * mathActB1).toFixed(2) } \\text{ m}`} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      id: 'kinematic-equations',
      title: 'Kinematic Equations for Constant Acceleration',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>5. Kinematic Equations for Constant Acceleration</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              If we assume that acceleration is <strong>constant</strong> (a very common scenario, such as an object in free fall), we can evaluate the integrals to derive the standard kinematic equations.
            </p>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Starting with <InlineMath math="a(t) = a" /> (a constant):
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <BlockMath math="v(t) = \int a \, dt = at + C_1" />
              <p className="text-body-md" style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>At <InlineMath math="t=0" />, <InlineMath math="v(0) = v_0" />, so <InlineMath math="C_1 = v_0" />.</p>
              <BlockMath math="v(t) = v_0 + at" />
            </div>
            
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Now we integrate velocity to find position:
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
              <BlockMath math="x(t) = \int (v_0 + at) \, dt = v_0t + \frac{1}{2}at^2 + C_2" />
              <p className="text-body-md" style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>At <InlineMath math="t=0" />, <InlineMath math="x(0) = x_0" />, so <InlineMath math="C_2 = x_0" />.</p>
              <BlockMath math="x(t) = x_0 + v_0t + \frac{1}{2}at^2" />
            </div>
            
            <p className="text-body-md" style={{ marginTop: '1.5rem' }}>
              By algebraically eliminating time <InlineMath math="t" /> from the two equations above, we get the final key equation:
            </p>
            <BlockMath math="v^2 = v_0^2 + 2a(x - x_0)" />
          </section>
        </div>
      )
    },
    {
      id: 'practice',
      title: 'Master Practice',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>6. Master Practice</h2>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              Test your understanding of calculus-based kinematics with the following problems. Remember, if acceleration is not constant, you <strong>cannot</strong> use the Big 5 equations; you must use integration and differentiation!
            </p>
            {kinematicsQuestions
              .filter(q => q.tags.includes('lesson-dedicated') && q.tags.includes('displacement-velocity-and-acceleration'))
              .map(question => (
                <QuestionRenderer key={question.id} question={question} />
              ))}
          </section>
        </div>
      )
    }
  ];

  return (
    <LessonNodeLayout 
      nodes={lessonNodes} 
      lessonId="displacement-velocity-and-acceleration" 
      unitId="kinematics" 
    />
  );
}
