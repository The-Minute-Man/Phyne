'use client';

import React, { useState } from 'react';
import { Mafs, Coordinates, Vector, Theme, useMovablePoint } from 'mafs';
import { InlineMath, BlockMath } from '@/components/Math';
import QuestionRenderer from '@/components/QuestionRenderer';
import { kinematicsQuestions } from '@/questions/kinematics';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line as ThreeLine, Sphere, Grid } from '@react-three/drei';
import * as THREE from 'three';

// 3D Component
const Vector3DVisualization = ({ time }: { time: number }) => {
  const x = time;
  const y = 4 - Math.pow(time - 2, 2);
  const z = 2;

  // Create path points from t=0 to current time
  const points: THREE.Vector3[] = [];
  for (let t = 0; t <= time; t += 0.1) {
    points.push(new THREE.Vector3(t, 4 - Math.pow(t - 2, 2), 2));
  }
  if (points.length === 0) points.push(new THREE.Vector3(0, 0, 2)); // fallback

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />

      {/* Axes */}
      <Grid infiniteGrid fadeDistance={20} sectionColor="#444" cellColor="#222" />
      <axesHelper args={[5]} />

      {/* Path Trace */}
      {points.length > 1 && (
        <ThreeLine points={points} color="orange" lineWidth={3} />
      )}

      {/* Particle */}
      <Sphere position={[x, y, z]} args={[0.15, 16, 16]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      {/* Vectors to projections */}
      {/* x-y plane projection */}
      <ThreeLine points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)]} color="red" dashed />
      <ThreeLine points={[new THREE.Vector3(x, y, 0), new THREE.Vector3(x, y, z)]} color="red" dashed />
      {/* position vector */}
      <ThreeLine points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]} color="cyan" lineWidth={2} />
    </>
  );
};

export default function ScalarsAndVectors() {
  // 2D Vector State
  const point = useMovablePoint([4, 3]);
  const drag_x = point.x;
  const drag_y = point.y;

  const [mathPoint, setMathPoint] = React.useState([4, 3]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setMathPoint([drag_x, drag_y]);
    }, 150);
    return () => clearTimeout(handler);
  }, [drag_x, drag_y]);

  const math_x = mathPoint[0];
  const math_y = mathPoint[1];

  const mag = Math.sqrt(math_x * math_x + math_y * math_y).toFixed(2);
  const theta = (Math.atan2(math_y, math_x) * (180 / Math.PI)).toFixed(1);

  // 3D Time State
  const [time, setTime] = useState(0);

  const lessonNodes = [
    {
      id: 'intuition',
      title: 'Intuition of Space',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. The Intuition of Space</h2>
            <div>
              <AnimatedText 
                as="p" 
                className="text-body-md" 
                style={{ fontStyle: 'italic', marginBottom: '1rem' }}
                text="&quot;Imagine you're standing in the middle of a vast, featureless salt flat. I hand you a radio and tell you, 'Walk exactly 10 meters, then stop.' What is the immediate problem?&quot;"
              />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
                <p className="text-body-md" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                  You know <em>how far</em> to walk, but you have absolutely no idea <em>which way</em> to go. A number by itself—a <strong>scalar</strong> like distance, mass, or temperature—is incomplete when describing movement. We need a new mathematical object that encodes both &apos;how much&apos; and &apos;which way&apos; simultaneously. We call this a <strong>vector</strong>.
                </p>
                <p className="text-body-md">
                  By overlaying a coordinate grid on space, we can break any complex, diagonal movement into entirely independent, fundamental steps (e.g., East and North). You have successfully decoupled the dimensions. This is the absolute superpower of vectors: <strong>breaking the complex into the simple.</strong>
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      )
    },

    {
      id: 'deconstructor',
      title: 'Vector Deconstructor',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>2. The Vector Deconstructor</h2>
        <p className="text-body-md" style={{ marginBottom: '1.5rem' }}>
          Drag the head of vector <InlineMath math="\vec{A}" /> below. Notice how the horizontal and vertical components react completely independently of one another.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
          <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <Mafs height={400}>
              <Coordinates.Cartesian />
              {/* x-component */}
              <Vector tail={[0, 0]} tip={[drag_x, 0]} color={Theme.red} />
              {/* y-component */}
              <Vector tail={[drag_x, 0]} tip={[drag_x, drag_y]} color={Theme.blue} />
              {/* Main Vector */}
              <Vector tail={[0, 0]} tip={[drag_x, drag_y]} color={Theme.foreground} />
              {point.element}
            </Mafs>
          </div>

          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)'
          }}>
            <h3 className="text-body-lg" style={{ marginBottom: '1rem' }}>Live Math</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span className="text-secondary text-body-sm">Vector Components</span>
                <BlockMath math={`\\vec{A} = ${math_x.toFixed(1)}\\hat{i} + ${math_y.toFixed(1)}\\hat{j}`} />
              </div>
              <div>
                <span className="text-secondary text-body-sm">Magnitude (Length)</span>
                <BlockMath math={`|\\vec{A}| = \\sqrt{(${math_x.toFixed(1)})^2 + (${math_y.toFixed(1)})^2} = ${mag}`} />
              </div>
              <div>
                <span className="text-secondary text-body-sm">Direction (Angle)</span>
                <BlockMath math={`\\theta = \\tan^{-1}\\left(\\frac{${math_y.toFixed(1)}}{${math_x.toFixed(1)}}\\right) = ${theta}^\\circ`} />
              </div>
            </div>
          </div>
        </div>
          </section>
        </div>
      )
    },
    {
      id: 'calculus',
      title: 'Calculus Bridge',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>3. The Calculus Bridge: Time-Dependent Vectors</h2>
        <p className="text-body-md" style={{ marginBottom: '1rem' }}>
          In standard physics, vectors are static. In AP Physics C, space is dynamic. If an object is moving, its position vector changes as a function of time, <InlineMath math="t" />:
        </p>
        <BlockMath math="\vec{r}(t) = x(t)\hat{i} + y(t)\hat{j} + z(t)\hat{k}" />
        <p className="text-body-md" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Because <InlineMath math="\hat{i}" />, <InlineMath math="\hat{j}" />, and <InlineMath math="\hat{k}" /> are constants (they never change length or direction), taking the derivative of a vector with respect to time becomes astonishingly simple: you just take the derivative of the scalar functions in front of them.
        </p>
        <BlockMath math="\frac{d}{dt}\vec{r}(t) = \frac{dx}{dt}\hat{i} + \frac{dy}{dt}\hat{j} + \frac{dz}{dt}\hat{k}" />
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '1rem' }}>
          <p className="text-body-md" style={{ textAlign: 'center', fontWeight: 600 }}>
            This proves mathematically that motion in the x, y, and z directions are entirely independent of one another.
          </p>
        </div>
          </section>
        </div>
      )
    },
    {
      id: '3dpath',
      title: '3D Time-Evolving Path',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>4. 3D Time-Evolving Path</h2>
        <p className="text-body-md" style={{ marginBottom: '1.5rem' }}>
          Scrub the time slider to see a particle trace a 3D path. The cyan vector is the position vector <InlineMath math="\vec{r}(t)" />. Note how it is composed of its shadows (projections) on the axes.
        </p>
        <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', height: '400px', position: 'relative' }}>
          <Canvas camera={{ position: [5, 5, 5] }}>
            <Vector3DVisualization time={time} />
          </Canvas>
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '80%', background: 'rgba(0,0,0,0.7)', padding: '1rem', borderRadius: '8px', backdropFilter: 'blur(5px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white' }}>Time <InlineMath math="t" />: {time.toFixed(1)}s</span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.1"
                value={time}
                onChange={(e) => setTime(parseFloat(e.target.value))}
                style={{ flex: 1, cursor: 'pointer' }}
              />
            </div>
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
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>5. HRK Master Practice</h2>
        <p className="text-body-md" style={{ marginBottom: '2rem' }}>
          The following problems are adapted from the rigorous pedagogical standards of <em>Resnick, Halliday, and Krane</em> (Chapter 2: Vectors). Enter your answers algebraically using the variables provided, or numerically if no variables are given. You can use standard math syntax like <code>*</code>, <code>+</code>, <code>/</code>, <code>^</code>, and <code>sqrt()</code>.
        </p>

        {kinematicsQuestions
          .filter(q => q.tags.includes('lesson-dedicated') && q.tags.includes('scalars-and-vectors'))
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
      lessonId="scalars-and-vectors" 
      unitId="kinematics" 
    />
  );
}
