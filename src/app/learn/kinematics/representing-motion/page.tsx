'use client';

import React, { useState } from 'react';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import QuestionRenderer from '@/components/QuestionRenderer';
import { kinematicsQuestions } from '@/questions/kinematics';
import { InlineMath, BlockMath } from '@/components/Math';
import { Mafs, Coordinates, Plot, Point, Theme, Line } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';

// --- Node 1: Tangent Tracer ---
function TangentTracer() {
  const [time, setTime] = useState(0);
  const [mathTime, setMathTime] = useState(0);
  const x = (t: number) => Math.pow(t, 3) / 3 - 2 * Math.pow(t, 2) + 3 * t + 1;
  const v = (t: number) => Math.pow(t, 2) - 4 * t + 3;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="x(t)" /> Position</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-1, 3] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={x} color={Theme.blue} />
            <Point x={time} y={x(time)} color={Theme.foreground} />
            <Plot.OfX y={(x_val) => v(time) * (x_val - time) + x(time)} color={Theme.green} style="dashed" />
            <Line.Segment point1={[time, -1]} point2={[time, x(time)]} style="dashed" opacity={0.3} />
          </Mafs>
        </div>
        
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="v(t)" /> Velocity</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-2, 4] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={v} color={Theme.green} />
            <Point x={time} y={v(time)} color={Theme.foreground} />
            <Line.Segment point1={[time, 0]} point2={[time, v(time)]} style="dashed" color={Theme.foreground} />
            <Line.Segment point1={[time, 4]} point2={[time, v(time)]} style="dashed" opacity={0.3} />
          </Mafs>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="range" 
            min="0" 
            max="4.5" 
            step="0.05" 
            value={time} 
            onChange={(e) => setTime(parseFloat(e.target.value))} 
            onPointerUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            onKeyUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            <InlineMath math={`t = ${mathTime.toFixed(2)} \\text{ s}`} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--blue)' }}>Position (Height)</span>
            <BlockMath math={`x = ${x(mathTime).toFixed(2)} \\text{ m}`} />
          </div>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Velocity (Slope)</span>
            <BlockMath math={`v = ${v(mathTime).toFixed(2)} \\text{ m/s}`} />
          </div>
        </div>
        <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', lineHeight: 1.5 }}>
          Notice how the green tangent line on the position graph perfectly matches the height of the velocity graph. 
          When the tangent line is horizontal, <InlineMath math="v = 0" />.
        </p>
      </div>
    </div>
  );
}

// --- Node 2: Area Accumulator (Displacement vs Distance) ---
function AreaAccumulator() {
  const [time, setTime] = useState(0);
  const [mathTime, setMathTime] = useState(0);
  
  const v = (t: number) => 2 - t;
  const disp = (t: number) => 2 * t - 0.5 * t * t;
  const dist = (t: number) => t <= 2 ? (2 * t - 0.5 * t * t) : (2 + 0.5 * Math.pow(t - 2, 2));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="v(t)" /> Velocity (Area)</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-3, 3] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={v} color={Theme.green} />
            <Plot.Inequality 
              y={{ 
                '<=': (x_val) => (x_val <= time && x_val <= 2) ? v(x_val) : 0,
                '>=': (x_val) => 0
              }}
              color={Theme.blue} 
            />
            <Plot.Inequality 
              y={{ 
                '>=': (x_val) => (x_val <= time && x_val > 2) ? v(x_val) : 0,
                '<=': (x_val) => 0
              }}
              color={Theme.red} 
            />
            <Line.Segment point1={[time, 0]} point2={[time, v(time)]} style="dashed" color={Theme.foreground} />
          </Mafs>
        </div>

        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}>Accumulated Values</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-1, 5] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={dist} color={Theme.yellow} style="dashed" />
            <Plot.OfX y={disp} color={Theme.blue} />
            <Point x={time} y={disp(time)} color={Theme.blue} />
            <Point x={time} y={dist(time)} color={Theme.yellow} />
          </Mafs>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="range" 
            min="0" 
            max="4.5" 
            step="0.05" 
            value={time} 
            onChange={(e) => setTime(parseFloat(e.target.value))} 
            onPointerUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            onKeyUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            <InlineMath math={`t = ${mathTime.toFixed(2)} \\text{ s}`} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--blue)' }}>Displacement (Net Area)</span>
            <BlockMath math={`\\Delta x = ${disp(mathTime).toFixed(2)} \\text{ m}`} />
          </div>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--yellow)' }}>Total Distance (<InlineMath math="\int |v|dt" />)</span>
            <BlockMath math={`d = ${dist(mathTime).toFixed(2)} \\text{ m}`} />
          </div>
        </div>
        <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', lineHeight: 1.5 }}>
          <strong>Blue area</strong> represents forward displacement (+). <br/><br/>
          <strong>Red area</strong> represents backward displacement (-).<br/><br/>
          Notice how the total distance (yellow dashed line) strictly increases, while displacement drops when area becomes negative!
        </p>
      </div>
    </div>
  );
}

// --- Node 3: Velocity Tangent Tracer ---
function VelocityTangentTracer() {
  const [time, setTime] = useState(0);
  const [mathTime, setMathTime] = useState(0);
  
  const v = (t: number) => -Math.pow(t, 2) + 4 * t;
  const a = (t: number) => -2 * t + 4;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="v(t)" /> Velocity</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-2, 5] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={v} color={Theme.green} />
            <Point x={time} y={v(time)} color={Theme.foreground} />
            <Plot.OfX y={(x_val) => a(time) * (x_val - time) + v(time)} color={Theme.red} style="dashed" />
            <Line.Segment point1={[time, -2]} point2={[time, v(time)]} style="dashed" opacity={0.3} />
          </Mafs>
        </div>
        
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="a(t)" /> Acceleration</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-5, 5] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={a} color={Theme.red} />
            <Point x={time} y={a(time)} color={Theme.foreground} />
            <Line.Segment point1={[time, 0]} point2={[time, a(time)]} style="dashed" color={Theme.foreground} />
            <Line.Segment point1={[time, 5]} point2={[time, a(time)]} style="dashed" opacity={0.3} />
          </Mafs>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="range" 
            min="0" 
            max="4.5" 
            step="0.05" 
            value={time} 
            onChange={(e) => setTime(parseFloat(e.target.value))} 
            onPointerUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            onKeyUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            <InlineMath math={`t = ${mathTime.toFixed(2)} \\text{ s}`} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Velocity (Height)</span>
            <BlockMath math={`v = ${v(mathTime).toFixed(2)} \\text{ m/s}`} />
          </div>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--red)' }}>Acceleration (Slope)</span>
            <BlockMath math={`a = ${a(mathTime).toFixed(2)} \\text{ m/s}^2`} />
          </div>
        </div>
        <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', lineHeight: 1.5 }}>
          The red tangent line on the velocity graph perfectly matches the height of the acceleration graph. 
          When <InlineMath math="a = 0" />, velocity is at a maximum or minimum.
        </p>
      </div>
    </div>
  );
}

// --- Node 4: Acceleration Area Accumulator ---
function VelocityAreaAccumulator() {
  const [time, setTime] = useState(0);
  const [mathTime, setMathTime] = useState(0);
  
  const a = (t: number) => 2 - t;
  const deltaV = (t: number) => 2 * t - 0.5 * t * t;
  const v = (t: number) => -1 + deltaV(t);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="a(t)" /> Acceleration (Area)</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-3, 3] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={a} color={Theme.red} />
            <Plot.Inequality 
              y={{ 
                '<=': (x_val) => (x_val <= time && x_val <= 2) ? a(x_val) : 0,
                '>=': (x_val) => 0
              }}
              color={Theme.green} 
            />
            <Plot.Inequality 
              y={{ 
                '>=': (x_val) => (x_val <= time && x_val > 2) ? a(x_val) : 0,
                '<=': (x_val) => 0
              }}
              color={Theme.orange} 
            />
            <Line.Segment point1={[time, 0]} point2={[time, a(time)]} style="dashed" color={Theme.foreground} />
          </Mafs>
        </div>

        <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid #333' }}><InlineMath math="v(t)" /> Velocity</div>
          <Mafs height={250} viewBox={{ x: [0, 4.5], y: [-3, 3] }}>
            <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
            <Plot.OfX y={v} color={Theme.green} />
            <Point x={time} y={v(time)} color={Theme.green} />
            <Line.Segment point1={[0, -1]} point2={[time, -1]} style="dashed" opacity={0.3} color={Theme.foreground} />
            <Point x={0} y={-1} color={Theme.foreground} />
            <Line.Segment point1={[time, -1]} point2={[time, v(time)]} style="dashed" color={Theme.green} />
          </Mafs>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="range" 
            min="0" 
            max="4.5" 
            step="0.05" 
            value={time} 
            onChange={(e) => setTime(parseFloat(e.target.value))} 
            onPointerUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            onKeyUp={(e) => setMathTime(parseFloat(e.currentTarget.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            <InlineMath math={`t = ${mathTime.toFixed(2)} \\text{ s}`} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Change in Velocity (<InlineMath math="\Delta v" />)</span>
            <BlockMath math={`\\Delta v = ${deltaV(mathTime).toFixed(2)} \\text{ m/s}`} />
          </div>
          <div>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--foreground)' }}>Initial Velocity (<InlineMath math="v_0" />)</span>
            <BlockMath math={`v_0 = -1.00 \\text{ m/s}`} />
          </div>
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Final Velocity (<InlineMath math="v_f = v_0 + \Delta v" />)</span>
            <BlockMath math={`v_f = ${v(mathTime).toFixed(2)} \\text{ m/s}`} />
          </div>
        </div>
        <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', lineHeight: 1.5 }}>
          The area under the acceleration graph gives <InlineMath math="\Delta v" />. 
          You must add this area to the initial velocity to find the current velocity!
        </p>
      </div>
    </div>
  );
}

export default function RepresentingMotion() {
  const lessonNodes = [
    {
      id: 'tangent-tracer',
      title: 'From Position to Velocity',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. From Position to Velocity (Slopes)</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              The most fundamental graphical relationship in kinematics is that <strong>the slope of a position-time graph is velocity</strong>. 
              Because <InlineMath math="v = \frac{dx}{dt}" />, the steepness of the tangent line on an <InlineMath math="x-t" /> graph perfectly maps to the height of the <InlineMath math="v-t" /> graph.
            </p>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              Scrub the time slider below. Notice that when the object reaches its maximum position (a turning point), the slope is zero, meaning it must momentarily stop to turn around.
            </p>
            
            <TangentTracer />

          </section>
        </div>
      )
    },
    {
      id: 'area-accumulator',
      title: 'From Velocity to Displacement',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>2. From Velocity to Displacement (Areas)</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Going backwards, <strong>the area under a velocity-time graph is displacement</strong> (<InlineMath math="\Delta x = \int v \, dt" />). 
              If the velocity graph dips below the horizontal axis, the area is considered negative, meaning the object is moving backward.
            </p>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              <strong>Distance vs. Displacement:</strong> Displacement is the <em>net</em> area (positive areas cancel out negative areas). Total distance is the integral of the <em>absolute value</em> of velocity (speed), meaning you force all negative areas to be positive before adding them up.
            </p>
            
            <AreaAccumulator />

          </section>
        </div>
      )
    },
    {
      id: 'velocity-to-acceleration',
      title: 'From Velocity to Acceleration',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>3. From Velocity to Acceleration (Slopes)</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Just as velocity is the rate of change of position, <strong>acceleration is the rate of change of velocity</strong> (<InlineMath math="a = \frac{dv}{dt}" />). 
              The slope of a velocity-time graph gives the instantaneous acceleration.
            </p>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              Scrub the time slider below. When the velocity reaches a maximum, its slope is zero, meaning the acceleration is momentarily zero.
            </p>
            
            <VelocityTangentTracer />

          </section>
        </div>
      )
    },
    {
      id: 'acceleration-to-velocity',
      title: 'From Acceleration to Velocity',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>4. From Acceleration to Velocity (Areas)</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Going backwards, <strong>the area under an acceleration-time graph is the CHANGE in velocity</strong> (<InlineMath math="\Delta v = \int a \, dt" />). 
              It does NOT give you the final velocity directly. You must always add this area to the initial velocity: <InlineMath math="v_f = v_0 + \Delta v" />.
            </p>
            
            <VelocityAreaAccumulator />

          </section>
        </div>
      )
    },
    {
      id: 'concavity',
      title: 'Concavity & Acceleration',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>5. Concavity & Acceleration</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              The slope of a <InlineMath math="v-t" /> graph is acceleration. But how can we read acceleration directly from a position graph without looking at velocity? The answer is <strong>concavity</strong>.
            </p>
            <ul className="text-body-md" style={{ marginBottom: '2rem', paddingLeft: '2rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Concave Up (Holding Water):</strong> Acceleration is positive. The slope (velocity) is constantly increasing.</li>
              <li><strong>Concave Down (Spilling Water):</strong> Acceleration is negative. The slope (velocity) is constantly decreasing.</li>
            </ul>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--green)', textAlign: 'center', marginBottom: '1rem' }}>Concave Up (a &gt; 0)</h4>
                <Mafs height={200} viewBox={{ x: [-2, 2], y: [-1, 4] }}>
                  <Coordinates.Cartesian />
                  <Plot.OfX y={(x) => x*x} color={Theme.green} />
                </Mafs>
                <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  Even when moving left (x &lt; 0), the slope is getting less steep (less negative), meaning velocity is increasing.
                </p>
              </div>

              <div style={{ background: '#111', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--red)', textAlign: 'center', marginBottom: '1rem' }}>Concave Down (a &lt; 0)</h4>
                <Mafs height={200} viewBox={{ x: [-2, 2], y: [-4, 1] }}>
                  <Coordinates.Cartesian />
                  <Plot.OfX y={(x) => -x*x} color={Theme.red} />
                </Mafs>
                <p className="text-body-sm text-secondary" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  Even when moving right (x &lt; 0), the slope is getting less steep (less positive), meaning velocity is decreasing.
                </p>
              </div>
            </div>
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
              The following problems require you to apply visual calculus. You must read the graphs, calculate areas for integrals, and calculate slopes for derivatives.
            </p>
            {kinematicsQuestions
              .filter(q => q.tags.includes('lesson-dedicated') && q.tags.includes('representing-motion'))
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
      lessonId="representing-motion" 
      unitId="kinematics" 
    />
  );
}
