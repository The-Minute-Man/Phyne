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

  // Subtraction State
  const pointA = useMovablePoint([-2, 3]);
  const pointB = useMovablePoint([3, 2]);

  const [mathSubA, setMathSubA] = React.useState([-2, 3]);
  const [mathSubB, setMathSubB] = React.useState([3, 2]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setMathSubA([pointA.x, pointA.y]);
      setMathSubB([pointB.x, pointB.y]);
    }, 150);
    return () => clearTimeout(handler);
  }, [pointA.x, pointA.y, pointB.x, pointB.y]);

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
      id: 'unit-vectors',
      title: 'Unit Vectors',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>3. Unit Vectors: Pure Direction</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Sometimes we only care about the <em>direction</em> of a vector, and want to strip away its magnitude. We do this by creating a <strong>unit vector</strong>, which has a length of exactly 1.
            </p>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              To find the unit vector <InlineMath math="\hat{u}" /> in the direction of any vector <InlineMath math="\vec{v}" />, we simply divide the vector by its own magnitude:
            </p>
            <BlockMath math="\hat{u} = \frac{\vec{v}}{|\vec{v}|}" />
            <p className="text-body-md" style={{ marginTop: '1rem' }}>
              This is why the standard basis vectors are called <InlineMath math="\hat{i}" />, <InlineMath math="\hat{j}" />, and <InlineMath math="\hat{k}" /> — the "hat" symbol specifically denotes that they are unit vectors!
            </p>
          </section>
        </div>
      )
    },
    {
      id: 'vector-subtraction',
      title: 'Relative Vectors',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>4. Vector Subtraction & Relative Motion</h2>
            <p className="text-body-md" style={{ marginBottom: '1rem' }}>
              Vector subtraction is just adding a negative vector: <InlineMath math="\vec{A} - \vec{B} = \vec{A} + (-\vec{B})" />. Geometrically, this means flipping the direction of <InlineMath math="\vec{B}" /> and placing it tail-to-tip with <InlineMath math="\vec{A}" />.
            </p>
            <p className="text-body-md" style={{ marginBottom: '1.5rem' }}>
              In AP Physics, vector subtraction is critical for <strong>relative velocity</strong>. If Car A is moving at <InlineMath math="\vec{v}_A" /> and Car B is moving at <InlineMath math="\vec{v}_B" />, the velocity of A <em>relative to</em> B is <InlineMath math="\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B" />.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
              <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Mafs height={400}>
                  <Coordinates.Cartesian />
                  {/* Vector A */}
                  <Vector tail={[0, 0]} tip={[pointA.x, pointA.y]} color={Theme.blue} />
                  {/* Vector B */}
                  <Vector tail={[0, 0]} tip={[pointB.x, pointB.y]} color={Theme.red} />
                  
                  {/* -B Vector attached to A's tip (Tail-to-tip method) */}
                  <Vector tail={[pointA.x, pointA.y]} tip={[pointA.x - pointB.x, pointA.y - pointB.y]} color={Theme.red} svgLineProps={{ strokeDasharray: "10, 10" }} />
                  
                  {/* Resultant A - B from origin */}
                  <Vector tail={[0, 0]} tip={[pointA.x - pointB.x, pointA.y - pointB.y]} color={Theme.green} svgLineProps={{ strokeDasharray: "10, 10" }} />
                  
                  {/* Relative Vector A/B (from B to A) showing translation invariance */}
                  <Vector tail={[pointB.x, pointB.y]} tip={[pointA.x, pointA.y]} color={Theme.green} />
                  
                  {pointA.element}
                  {pointB.element}
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
                    <span className="text-secondary text-body-sm" style={{ color: 'var(--blue)' }}>Vector A (Blue)</span>
                    <BlockMath math={`\\vec{A} = ${mathSubA[0].toFixed(1)}\\hat{i} + ${mathSubA[1].toFixed(1)}\\hat{j}`} />
                  </div>
                  <div>
                    <span className="text-secondary text-body-sm" style={{ color: 'var(--red)' }}>Vector B (Red)</span>
                    <BlockMath math={`\\vec{B} = ${mathSubB[0].toFixed(1)}\\hat{i} + ${mathSubB[1].toFixed(1)}\\hat{j}`} />
                  </div>
                  <div>
                    <span className="text-secondary text-body-sm" style={{ color: 'var(--green)' }}>Resultant A - B (Green)</span>
                    <BlockMath math={`\\vec{A} - \\vec{B} = ${(mathSubA[0] - mathSubB[0]).toFixed(1)}\\hat{i} + ${(mathSubA[1] - mathSubB[1]).toFixed(1)}\\hat{j}`} />
                  </div>
                  <p className="text-body-sm text-secondary" style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>
                    Notice the two red and two green vectors! The second red vector is <InlineMath math="-\vec{B}" />, attached to the tip of <InlineMath math="\vec{A}" />.
                    <br /><br />
                    The green resultant connects the origin to this new tip. But notice how it has the <em>exact same length and direction</em> as the vector pointing from <InlineMath math="\vec{B}" /> to <InlineMath math="\vec{A}" />.
                    <br /><br />
                    <strong style={{color: 'white'}}>Crucial Rule:</strong> A vector is defined ONLY by its magnitude and direction. <strong>It doesn't matter where a vector begins in space.</strong> Because both green arrows have the same length and point in the same direction, they are the <em>exact same mathematical vector</em>.
                  </p>
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
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>5. The Calculus Bridge: Time-Dependent Vectors</h2>
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
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>6. 3D Time-Evolving Path</h2>
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
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>7. Master Practice</h2>
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
