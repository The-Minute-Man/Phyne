'use client';

import React, { useState } from 'react';
import { Mafs, Coordinates, Vector, Theme, useMovablePoint } from 'mafs';
import { InlineMath, BlockMath } from '@/components/Math';
import MathInteractiveProblem from '@/components/MathInteractiveProblem';
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

        {/* Problem 1 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Maximum Difference</h3>
              <p className="text-body-md">
                If <InlineMath math="\vec{a}" /> and <InlineMath math="\vec{b}" /> are two vectors with magnitudes <InlineMath math="a" /> and <InlineMath math="b" />, what is the <strong>maximum possible magnitude</strong> of their difference, <InlineMath math="\vec{a} - \vec{b}" />? Enter your answer in terms of <InlineMath math="a" /> and <InlineMath math="b" />.
              </p>
            </>
          }
          correctExpression="a + b"
          variables={['a', 'b']}
          hintContent="Hint: Subtraction is just adding the negative. How does reversing the direction of vector b affect the resultant?"
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                Vector subtraction <InlineMath math="\vec{a} - \vec{b}" /> is equivalent to adding the flipped vector: <InlineMath math="\vec{a} + (-\vec{b})" />.
                The maximum magnitude of a vector sum occurs when the two vectors point in the <em>exact same direction</em>.
                For <InlineMath math="\vec{a}" /> and <InlineMath math="-\vec{b}" /> to point in the same direction, <InlineMath math="\vec{a}" /> and <InlineMath math="\vec{b}" /> must initially point in <strong>opposite directions</strong> (anti-parallel).
                When anti-parallel, the magnitude of their difference is simply the sum of their individual magnitudes: <InlineMath math="a + b" />.
              </p>
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

        {/* Problem 2 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 2: City Grid Navigation (HRK Ex. 5)</h3>
              <p className="text-body-md">
                A person desires to reach a destination that is a straight-line distance <InlineMath math="D" /> away, in a direction <InlineMath math="\theta" /> degrees North of East. However, she must travel along streets that go strictly North-South and East-West. What is the <strong>minimum distance</strong> she could travel to reach her destination? Enter your answer in terms of <InlineMath math="D" /> and <InlineMath math="\theta" />.
                <br /><span className="text-muted text-sm">(Note: For math evaluation, assume <InlineMath math="\theta" /> is in radians so you can just type <code>D * cos(theta) ...</code>)</span>
              </p>
            </>
          }
          correctExpression="D * cos(theta) + D * sin(theta)"
          variables={['D', 'theta']}
          hintContent="Hint: The shortest path on a strictly orthogonal grid involves traveling the total required horizontal distance and the total required vertical distance."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                The shortest path on a strictly orthogonal (Manhattan) grid is to travel the total required horizontal distance (East) and the total required vertical distance (North).
                No diagonal shortcuts are allowed!
              </p>
              <BlockMath math="\text{Distance East} = D \cos(\theta)" />
              <BlockMath math="\text{Distance North} = D \sin(\theta)" />
              <p className="text-body-md">
                Total grid distance traveled is simply the sum of the absolute components:
              </p>
              <BlockMath math="L = D\cos(\theta) + D\sin(\theta)" />
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

        {/* Problem 3 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 3: Finding the Resultant (HRK Ex. 2)</h3>
              <p className="text-body-md">
                A person walks in the following pattern: <InlineMath math="3.1 \text{ km}" /> North, then <InlineMath math="2.4 \text{ km}" /> West, and finally <InlineMath math="5.2 \text{ km}" /> South.
                What is the <strong>magnitude</strong> of the final displacement vector? Enter a number (or a formula evaluating to the number).
              </p>
            </>
          }
          correctExpression="sqrt((2.4)^2 + (5.2 - 3.1)^2)"
          variables={[]}
          hintContent="Hint: Find the total distance traveled in the East-West direction and the North-South direction first, then apply the Pythagorean theorem."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                First, break the journey into Cartesian components (East is +x, North is +y):
              </p>
              <ul className="text-body-md" style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
                <li>Leg 1: <InlineMath math="3.1\hat{j}" /></li>
                <li>Leg 2: <InlineMath math="-2.4\hat{i}" /></li>
                <li>Leg 3: <InlineMath math="-5.2\hat{j}" /></li>
              </ul>
              <p className="text-body-md">
                Sum the components:
              </p>
              <BlockMath math="\vec{s} = -2.4\hat{i} + (3.1 - 5.2)\hat{j} = -2.4\hat{i} - 2.1\hat{j}" />
              <p className="text-body-md">
                Calculate the magnitude using the Pythagorean theorem:
              </p>
              <BlockMath math="|\vec{s}| = \sqrt{(-2.4)^2 + (-2.1)^2} = \sqrt{5.76 + 4.41} = \sqrt{10.17} \approx 3.189 \text{ km}" />
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

        {/* Problem 4 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 4: Symbolic Vector Magnitude</h3>
              <p className="text-body-md">
                Let <InlineMath math="\vec{v}_1 = x\hat{i} + y\hat{j}" /> and <InlineMath math="\vec{v}_2 = -y\hat{i} + x\hat{j}" />.
                Write the algebraic expression for the <strong>magnitude</strong> of their resultant sum <InlineMath math="\vec{v}_{sum} = \vec{v}_1 + \vec{v}_2" />. Enter your answer in terms of <InlineMath math="x" /> and <InlineMath math="y" />.
              </p>
            </>
          }
          correctExpression="sqrt((x-y)^2 + (y+x)^2)"
          variables={['x', 'y']}
          hintContent="Hint: Group the terms with i-hat together and the terms with j-hat together before finding the magnitude."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                First, calculate the sum by adding the <InlineMath math="\hat{i}" /> components together and the <InlineMath math="\hat{j}" /> components together:
              </p>
              <BlockMath math="\vec{v}_{sum} = (x - y)\hat{i} + (y + x)\hat{j}" />
              <p className="text-body-md">
                Then, apply the magnitude formula:
              </p>
              <BlockMath math="|\vec{v}_{sum}| = \sqrt{(x - y)^2 + (x + y)^2}" />
              <p className="text-body-md">
                <em>Bonus Intuition:</em> If you expand the terms inside the square root, you get <InlineMath math="x^2 - 2xy + y^2 + x^2 + 2xy + y^2 = 2x^2 + 2y^2" />.
                This simplifies beautifully to <InlineMath math="\sqrt{2(x^2 + y^2)}" />. Notice that <InlineMath math="\vec{v}_1" /> and <InlineMath math="\vec{v}_2" /> are perpendicular vectors of identical magnitude <InlineMath math="\sqrt{x^2+y^2}" />. By geometric addition, their resultant forms the hypotenuse of an isosceles right triangle, which is always <InlineMath math="\sqrt{2}" /> times the leg length!
              </p>
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

        {/* Problem 5 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 5: Relative Vectors</h3>
              <p className="text-body-md">
                Particle 1 is located at position vector <InlineMath math="\vec{r}_1 = x_1\hat{i} + y_1\hat{j}" />.
                Particle 2 is located at position vector <InlineMath math="\vec{r}_2 = x_2\hat{i} + y_2\hat{j}" />.
                What is the <strong>x-component</strong> of the vector that points <em>from</em> Particle 1 <em>to</em> Particle 2? Enter your answer in terms of <InlineMath math="x_1" /> and <InlineMath math="x_2" />.
              </p>
            </>
          }
          correctExpression="x_2 - x_1"
          variables={['x_1', 'x_2']}
          hintContent="Hint: A relative vector pointing from A to B is always defined as the final position minus the initial position."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                A relative displacement vector pointing from point A to point B is defined as:
              </p>
              <BlockMath math="\Delta \vec{r} = \vec{r}_{final} - \vec{r}_{initial} = \vec{r}_2 - \vec{r}_1" />
              <p className="text-body-md">
                The x-component of this vector is simply the final x position minus the initial x position: <InlineMath math="x_2 - x_1" />.
              </p>
            </div>
          </div>
        </MathInteractiveProblem>
        </div>
        {/* Problem 6 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 6: Magnitude from Components (HRK Ex. 4)</h3>
              <p className="text-body-md">
                The x-component of a certain vector is <InlineMath math="-25" /> units and the y-component is <InlineMath math="+43" /> units.
                What is the magnitude of the vector? Enter a number (or a mathematical expression that evaluates to the number).
              </p>
            </>
          }
          correctExpression="sqrt((-25)^2 + 43^2)"
          variables={[]}
          hintContent="Hint: Even if a component is negative, its square will be positive. Use the Pythagorean theorem."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                The magnitude of any vector <InlineMath math="\vec{v} = v_x\hat{i} + v_y\hat{j}" /> is given by the Pythagorean theorem:
              </p>
              <BlockMath math="v = \sqrt{v_x^2 + v_y^2}" />
              <BlockMath math="v = \sqrt{(-25)^2 + (43)^2} = \sqrt{625 + 1849} = \sqrt{2474} \approx 49.7" />
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

        {/* Problem 7 */}
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <MathInteractiveProblem
          prompt={
            <>
              <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 7: Scalar Multiplication</h3>
              <p className="text-body-md">
                If a vector <InlineMath math="\vec{v} = x\hat{i} + y\hat{j}" /> is multiplied by a negative scalar constant <InlineMath math="-c" /> (where <InlineMath math="c > 0" />), what is the <strong>magnitude</strong> of the new vector? Enter your answer algebraically in terms of <InlineMath math="x" />, <InlineMath math="y" />, and <InlineMath math="c" />.
                <br /><span className="text-muted text-sm">(Note: Assume <InlineMath math="c" /> is positive. The magnitude must be positive!)</span>
              </p>
            </>
          }
          correctExpression="c * sqrt(x^2 + y^2)"
          variables={['x', 'y', 'c']}
          hintContent="Hint: A scalar multiplies the magnitude directly, but it doesn't change the Pythagorean relationship of the components inside."
        >
          <div style={{ marginTop: '1rem' }} className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: 600 }}>Explanation</div>
            <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
              <p className="text-body-md">
                Multiplying the vector by <InlineMath math="-c" /> yields <InlineMath math="-cx\hat{i} - cy\hat{j}" />.
              </p>
              <p className="text-body-md">
                The magnitude is then:
              </p>
              <BlockMath math="\sqrt{(-cx)^2 + (-cy)^2} = \sqrt{c^2x^2 + c^2y^2}" />
              <p className="text-body-md">
                We can factor out <InlineMath math="c^2" /> from the terms inside the square root:
              </p>
              <BlockMath math="\sqrt{c^2(x^2 + y^2)} = c\sqrt{x^2 + y^2}" />
              <p className="text-body-md">
                Notice that the negative sign disappears completely because magnitude measures <em>length</em>, which is always positive. The scalar <InlineMath math="c" /> simply scales the length of the vector by a factor of <InlineMath math="c" />.
              </p>
            </div>
          </div>
        </MathInteractiveProblem>
        </div>

          </section>
        </div>
      )
    }
  ];

  return (
    <LessonNodeLayout nodes={lessonNodes} />
  );
}
