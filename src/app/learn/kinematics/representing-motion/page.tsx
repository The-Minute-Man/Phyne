'use client';

import React, { useState } from 'react';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import QuestionRenderer from '@/components/QuestionRenderer';
import { kinematicsQuestions } from '@/content/questions/kinematics';
import { InlineMath, BlockMath } from '@/components/Math';
import { Mafs, Coordinates, Plot, Point, Theme, Text, Line, useTransformContext } from 'mafs';
import AutoScrubber from '@/components/AutoScrubber';
import 'mafs/core.css';
import 'mafs/font.css';

function KinematicsGraphsInteractive() {
  const [time, setTime] = useState(0);

  // Position, Velocity, Acceleration functions
  const x = (t: number) => Math.pow(t, 3) / 3 - 2 * Math.pow(t, 2) + 3 * t;
  const v = (t: number) => Math.pow(t, 2) - 4 * t + 3;
  const a = (t: number) => 2 * t - 4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '2rem 0', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px' }}>
      <div>
        <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Interactive Kinematics (x, v, a)</h3>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          Watch how the particle's position <InlineMath math="x(t)" />, velocity <InlineMath math="v(t)" />, and acceleration <InlineMath math="a(t)" /> evolve. 
          Notice that when <InlineMath math="v(t) = 0" />, the position graph has a horizontal tangent (turning point), and when <InlineMath math="a(t) = 0" />, the velocity graph has a horizontal tangent.
        </p>
        <div style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>
          <AutoScrubber 
            value={time} 
            min={0} 
            max={5} 
            step={0.02} 
            onChange={setTime} 
            speedMultiplier={0.5}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem', fontFamily: 'monospace' }}>
            t = {time.toFixed(2)} s
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Position Graph */}
        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Position x(t)</h4>
          <Mafs height={250} viewBox={{ x: [0, 5], y: [-2, 7] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian xAxis={{ lines: 1, labels: (n) => (n % 1 === 0 ? n : '') }} yAxis={{ lines: 2, labels: (n) => (n % 2 === 0 ? n : '') }} />
            <Plot.OfX y={(t) => x(t)} color={Theme.blue} />
            <Point x={time} y={x(time)} color={Theme.blue} />
            <Line.Segment p1={[time, -2]} p2={[time, x(time)]} style={{ strokeDasharray: "4,4" }} color={Theme.foreground} opacity={0.3} />
            <Text x={time} y={x(time) + 0.8} attach="n">
              {`x = ${x(time).toFixed(2)}`}
            </Text>
          </Mafs>
        </div>

        {/* Velocity Graph */}
        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Velocity v(t)</h4>
          <Mafs height={250} viewBox={{ x: [0, 5], y: [-3, 9] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian xAxis={{ lines: 1, labels: (n) => (n % 1 === 0 ? n : '') }} yAxis={{ lines: 2, labels: (n) => (n % 2 === 0 ? n : '') }} />
            <Plot.OfX y={(t) => v(t)} color={Theme.green} />
            <Point x={time} y={v(time)} color={Theme.green} />
            <Line.Segment p1={[time, -3]} p2={[time, v(time)]} style={{ strokeDasharray: "4,4" }} color={Theme.foreground} opacity={0.3} />
            <Text x={time} y={v(time) + 1} attach="n">
              {`v = ${v(time).toFixed(2)}`}
            </Text>
          </Mafs>
        </div>

        {/* Acceleration Graph */}
        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Acceleration a(t)</h4>
          <Mafs height={250} viewBox={{ x: [0, 5], y: [-5, 7] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian xAxis={{ lines: 1, labels: (n) => (n % 1 === 0 ? n : '') }} yAxis={{ lines: 2, labels: (n) => (n % 2 === 0 ? n : '') }} />
            <Plot.OfX y={(t) => a(t)} color={Theme.red} />
            <Point x={time} y={a(time)} color={Theme.red} />
            <Line.Segment p1={[time, -5]} p2={[time, a(time)]} style={{ strokeDasharray: "4,4" }} color={Theme.foreground} opacity={0.3} />
            <Text x={time} y={a(time) + 1} attach="n">
              {`a = ${a(time).toFixed(2)}`}
            </Text>
          </Mafs>
        </div>
      </div>
    </div>
  );
}

export default function RepresentingMotion() {
  const lessonNodes = [
    {
      id: 'intro',
      title: 'Graphing Kinematics',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. Representing Motion Graphically</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              One of the most powerful ways to understand the motion of an object is to visualize its position, velocity, and acceleration over time. 
              By charting these values on a graph, the mathematical relationships of calculus—derivatives and integrals—become visually intuitive.
            </p>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              In AP Physics C, you must be completely fluent in translating between <InlineMath math="x(t)" />, <InlineMath math="v(t)" />, and <InlineMath math="a(t)" /> graphs. The fundamental relationships are:
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Derivatives (Slopes)</h4>
                <BlockMath math="v = \frac{dx}{dt}" />
                <BlockMath math="a = \frac{dv}{dt} = \frac{d^2x}{dt^2}" />
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Integrals (Areas)</h4>
                <BlockMath math="\Delta x = \int_{t_0}^{t_1} v \, dt" />
                <BlockMath math="\Delta v = \int_{t_0}^{t_1} a \, dt" />
              </div>
            </div>
            
            <KinematicsGraphsInteractive />

            <h3 className="text-body-lg" style={{ marginTop: '3rem', marginBottom: '1rem' }}>Key Graphical Connections</h3>
            <ul className="text-body-md" style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong>Zero Velocity:</strong> When the <InlineMath math="v(t)" /> graph crosses the time axis (i.e., <InlineMath math="v=0" />), the object is momentarily at rest, indicating a turning point in the <InlineMath math="x(t)" /> graph (a local maximum or minimum).</li>
              <li><strong>Zero Acceleration:</strong> When the <InlineMath math="a(t)" /> graph crosses the time axis, the object has reached a maximum or minimum velocity (an inflection point on the <InlineMath math="x(t)" /> graph).</li>
              <li><strong>Speeding Up vs Slowing Down:</strong> An object is <em>speeding up</em> if <InlineMath math="v" /> and <InlineMath math="a" /> have the same sign (both positive or both negative). It is <em>slowing down</em> if they have opposite signs.</li>
            </ul>
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
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>2. Practice Problems</h2>
            <p className="text-body-md" style={{ marginBottom: '2rem' }}>
              These problems will rigorously test your ability to read graphs, apply calculus, and translate physical scenarios into mathematical representations.
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
