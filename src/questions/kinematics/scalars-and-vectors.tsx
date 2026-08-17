import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';

export const scalarsAndVectorsQuestions: Question[] = [
  {
    id: 'sv-1',
    tags: ['kinematics', 'scalars-and-vectors', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Maximum Difference</h3>
        <p className="text-body-md">
          If <InlineMath math="\vec{a}" /> and <InlineMath math="\vec{b}" /> are two vectors with magnitudes <InlineMath math="a" /> and <InlineMath math="b" />, what is the <strong>maximum possible magnitude</strong> of their difference, <InlineMath math="\vec{a} - \vec{b}" />? Enter your answer in terms of <InlineMath math="a" /> and <InlineMath math="b" />.
        </p>
      </>
    ),
    correctExpression: 'a + b',
    variables: ['a', 'b'],
    renderHint: () => 'Hint: Subtraction is just adding the negative. How does reversing the direction of vector b affect the resultant?',
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          Vector subtraction <InlineMath math="\vec{a} - \vec{b}" /> is equivalent to adding the flipped vector: <InlineMath math="\vec{a} + (-\vec{b})" />.
          The maximum magnitude of a vector sum occurs when the two vectors point in the <em>exact same direction</em>.
          For <InlineMath math="\vec{a}" /> and <InlineMath math="-\vec{b}" /> to point in the same direction, <InlineMath math="\vec{a}" /> and <InlineMath math="\vec{b}" /> must initially point in <strong>opposite directions</strong> (anti-parallel).
          When anti-parallel, the magnitude of their difference is simply the sum of their individual magnitudes: <InlineMath math="a + b" />.
        </p>
      </div>
    )
  },
  {
    id: 'sv-2',
    tags: ['kinematics', 'scalars-and-vectors', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 2: City Grid Navigation (HRK Ex. 5)</h3>
        <p className="text-body-md">
          A person desires to reach a destination that is a straight-line distance <InlineMath math="D" /> away, in a direction <InlineMath math="\theta" /> degrees North of East. However, she must travel along streets that go strictly North-South and East-West. What is the <strong>minimum distance</strong> she could travel to reach her destination? Enter your answer in terms of <InlineMath math="D" /> and <InlineMath math="\theta" />.
          <br /><span className="text-muted text-sm">(Note: For math evaluation, assume <InlineMath math="\theta" /> is in radians so you can just type <code>D * cos(theta) ...</code>)</span>
        </p>
      </>
    ),
    correctExpression: 'D * cos(theta) + D * sin(theta)',
    variables: ['D', 'theta'],
    renderHint: () => 'Hint: The shortest path on a strictly orthogonal grid involves traveling the total required horizontal distance and the total required vertical distance.',
    renderExplanation: () => (
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
    )
  },
  {
    id: 'sv-3',
    tags: ['kinematics', 'scalars-and-vectors', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 3: Finding the Resultant (HRK Ex. 2)</h3>
        <p className="text-body-md">
          A person walks in the following pattern: <InlineMath math="3.1 \text{ km}" /> North, then <InlineMath math="2.4 \text{ km}" /> West, and finally <InlineMath math="5.2 \text{ km}" /> South.
          What is the <strong>magnitude</strong> of the final displacement vector? Enter a number (or a formula evaluating to the number).
        </p>
      </>
    ),
    correctExpression: 'sqrt((2.4)^2 + (5.2 - 3.1)^2)',
    variables: [],
    renderHint: () => 'Hint: Find the total distance traveled in the East-West direction and the North-South direction first, then apply the Pythagorean theorem.',
    renderExplanation: () => (
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
    )
  },
  {
    id: 'sv-4',
    tags: ['kinematics', 'scalars-and-vectors', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 4: Symbolic Vector Magnitude</h3>
        <p className="text-body-md">
          Let <InlineMath math="\vec{v}_1 = x\hat{i} + y\hat{j}" /> and <InlineMath math="\vec{v}_2 = -y\hat{i} + x\hat{j}" />.
          Write the algebraic expression for the <strong>magnitude</strong> of their resultant sum <InlineMath math="\vec{v}_{sum} = \vec{v}_1 + \vec{v}_2" />. Enter your answer in terms of <InlineMath math="x" /> and <InlineMath math="y" />.
        </p>
      </>
    ),
    correctExpression: 'sqrt((x-y)^2 + (y+x)^2)',
    variables: ['x', 'y'],
    renderHint: () => 'Hint: Group the terms with i-hat together and the terms with j-hat together before finding the magnitude.',
    renderExplanation: () => (
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
    )
  },
  {
    id: 'sv-5',
    tags: ['kinematics', 'scalars-and-vectors', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 5: Relative Vectors</h3>
        <p className="text-body-md">
          Particle 1 is located at position vector <InlineMath math="\vec{r}_1 = x_1\hat{i} + y_1\hat{j}" />.
          Particle 2 is located at position vector <InlineMath math="\vec{r}_2 = x_2\hat{i} + y_2\hat{j}" />.
          What is the <strong>x-component</strong> of the vector that points <em>from</em> Particle 1 <em>to</em> Particle 2? Enter your answer in terms of <InlineMath math="x_1" /> and <InlineMath math="x_2" />.
        </p>
      </>
    ),
    correctExpression: 'x_2 - x_1',
    variables: ['x_1', 'x_2'],
    renderHint: () => 'Hint: A relative vector pointing from A to B is always defined as the final position minus the initial position.',
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          A relative displacement vector pointing from point A to point B is defined as:
        </p>
        <BlockMath math="\Delta \vec{r} = \vec{r}_{final} - \vec{r}_{initial} = \vec{r}_2 - \vec{r}_1" />
        <p className="text-body-md">
          The x-component of this vector is simply the final x position minus the initial x position: <InlineMath math="x_2 - x_1" />.
        </p>
      </div>
    )
  },
  {
    id: 'sv-6',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-pool'],
    generateParams: () => {
      // Example of random parameterization for daily questions
      const vx = Math.floor(Math.random() * 40) - 50; // negative
      const vy = Math.floor(Math.random() * 40) + 10; // positive
      return { vx, vy };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Magnitude from Components</h3>
        <p className="text-body-md">
          The x-component of a certain vector is <InlineMath math={`${params.vx}`} /> units and the y-component is <InlineMath math={`+${params.vy}`} /> units.
          What is the magnitude of the vector? Enter a number (or a mathematical expression that evaluates to the number).
        </p>
      </>
    ),
    correctExpression: (params) => `sqrt((${params.vx})^2 + (${params.vy})^2)`,
    variables: [],
    renderHint: () => 'Hint: Even if a component is negative, its square will be positive. Use the Pythagorean theorem.',
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">
          The magnitude of any vector <InlineMath math="\vec{v} = v_x\hat{i} + v_y\hat{j}" /> is given by the Pythagorean theorem:
        </p>
        <BlockMath math="v = \sqrt{v_x^2 + v_y^2}" />
        <BlockMath math={`v = \\sqrt{(${params.vx})^2 + (${params.vy})^2} = \\sqrt{${params.vx * params.vx} + ${params.vy * params.vy}} = \\sqrt{${params.vx * params.vx + params.vy * params.vy}}`} />
      </div>
    )
  },
  {
    id: 'sv-7',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-pool'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Scalar Multiplication</h3>
        <p className="text-body-md">
          If a vector <InlineMath math="\vec{v} = x\hat{i} + y\hat{j}" /> is multiplied by a negative scalar constant <InlineMath math="-c" /> (where <InlineMath math="c > 0" />), what is the <strong>magnitude</strong> of the new vector? Enter your answer algebraically in terms of <InlineMath math="x" />, <InlineMath math="y" />, and <InlineMath math="c" />.
          <br /><span className="text-muted text-sm">(Note: Assume <InlineMath math="c" /> is positive. The magnitude must be positive!)</span>
        </p>
      </>
    ),
    correctExpression: 'c * sqrt(x^2 + y^2)',
    variables: ['x', 'y', 'c'],
    renderHint: () => 'Hint: A scalar multiplies the magnitude directly, but it doesn\'t change the Pythagorean relationship of the components inside.',
    renderExplanation: () => (
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
    )
  },
  {
    id: 'sv-daily-1',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Vector Operations</h3>
        <p className="text-body-md">
          Given <InlineMath math="\vec{A} = 4\hat{i} - 2\hat{j}" /> and <InlineMath math="\vec{B} = -1\hat{i} + 5\hat{j}" />, what is the magnitude of <InlineMath math="\vec{A} + \vec{B}" />?
        </p>
      </>
    ),
    correctExpression: 'sqrt(18)',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">First, find the sum vector: <InlineMath math="(4-1)\hat{i} + (-2+5)\hat{j} = 3\hat{i} + 3\hat{j}" />.</p>
        <p className="text-body-md">The magnitude is <InlineMath math="\sqrt{3^2 + 3^2} = \sqrt{18}" />.</p>
      </div>
    )
  },
  {
    id: 'sv-daily-2',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Scaling Vectors</h3>
        <p className="text-body-md">
          If <InlineMath math="\vec{v} = 3\hat{i} - 4\hat{j}" />, what is the length of <InlineMath math="-2\vec{v}" />?
        </p>
      </>
    ),
    correctExpression: '10',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The original length is <InlineMath math="\sqrt{3^2 + (-4)^2} = 5" />. Scaling by -2 changes the direction but scales the magnitude by a factor of 2. Thus, the new length is <InlineMath math="2 \times 5 = 10" />.</p>
      </div>
    )
  },
  {
    id: 'sv-daily-3',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Dot Product Intro</h3>
        <p className="text-body-md">
          What is the dot product of <InlineMath math="\vec{u} = 2\hat{i} + 3\hat{j}" /> and <InlineMath math="\vec{v} = -1\hat{i} + 4\hat{j}" />? (Hint: Multiply corresponding components and add).
        </p>
      </>
    ),
    correctExpression: '10',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The dot product is <InlineMath math="(2)(-1) + (3)(4) = -2 + 12 = 10" />.</p>
      </div>
    )
  },
  {
    id: 'sv-daily-4',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Unit Vectors</h3>
        <p className="text-body-md">
          Find the scalar <InlineMath math="c" /> such that the vector <InlineMath math="\vec{w} = c\hat{i} + 0.8\hat{j}" /> is a unit vector (magnitude exactly 1). Assume <InlineMath math="c" /> is positive.
        </p>
      </>
    ),
    correctExpression: '0.6',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">We need <InlineMath math="\sqrt{c^2 + 0.8^2} = 1" />. Squaring both sides gives <InlineMath math="c^2 + 0.64 = 1" />. Thus <InlineMath math="c^2 = 0.36" />, so <InlineMath math="c = 0.6" />.</p>
      </div>
    )
  },
  {
    id: 'sv-daily-5',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Practice: Displacements</h3>
        <p className="text-body-md">
          A robot moves <InlineMath math="5" /> meters North, then <InlineMath math="12" /> meters West. What is its total displacement from the origin? (Express as magnitude).
        </p>
      </>
    ),
    correctExpression: '13',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The total displacement is the hypotenuse of the 5-12 right triangle: <InlineMath math="\sqrt{5^2 + (-12)^2} = 13" /> meters.</p>
      </div>
    )
  },
  {
    id: 'sv-new-1',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>HRK Concept: Cross Product Magnitude</h3>
        <p className="text-body-md">
          If <InlineMath math="\vec{a}" /> and <InlineMath math="\vec{b}" /> have magnitudes of <InlineMath math="3" /> and <InlineMath math="4" /> respectively, and the angle between them is <InlineMath math="30^\circ" />, what is the magnitude of their cross product <InlineMath math="|\vec{a} \times \vec{b}|" />?
        </p>
      </>
    ),
    correctExpression: '6',
    variables: [],
    renderHint: () => 'Hint: The magnitude of a cross product is given by |a||b|sin(theta).',
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The magnitude is <InlineMath math="|\vec{a}||\vec{b}|\sin(\theta) = 3 \times 4 \times \sin(30^\circ) = 12 \times 0.5 = 6" />.</p>
      </div>
    )
  },
  {
    id: 'sv-new-2',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>HRK Concept: 3D Vector Angle</h3>
        <p className="text-body-md">
          A vector is given by <InlineMath math="\vec{v} = 1\hat{i} + \sqrt{2}\hat{j} + 1\hat{k}" />. What is the angle (in degrees) that this vector makes with the positive z-axis?
        </p>
      </>
    ),
    correctExpression: '60',
    variables: [],
    renderHint: () => 'Hint: Use the dot product with the k-hat unit vector, or use the direction cosine cos(theta) = v_z / |v|.',
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">First, find the magnitude: <InlineMath math="|\vec{v}| = \sqrt{1^2 + (\sqrt{2})^2 + 1^2} = \sqrt{1 + 2 + 1} = \sqrt{4} = 2" />.</p>
        <p className="text-body-md">The direction cosine with the z-axis is <InlineMath math="\cos(\theta) = v_z / |\vec{v}| = 1 / 2" />.</p>
        <p className="text-body-md">Therefore, <InlineMath math="\theta = \arccos(0.5) = 60^\circ" />.</p>
      </div>
    )
  },
  {
    id: 'sv-new-3',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>HRK Concept: Relative Velocity Vector Subtraction</h3>
        <p className="text-body-md">
          Car A is traveling East at <InlineMath math="30" /> m/s (<InlineMath math="\vec{v}_A = 30\hat{i}" />). Car B is traveling North at <InlineMath math="40" /> m/s (<InlineMath math="\vec{v}_B = 40\hat{j}" />). What is the magnitude of the velocity of Car A <em>relative</em> to Car B?
        </p>
      </>
    ),
    correctExpression: '50',
    variables: [],
    renderHint: () => 'Hint: Relative velocity v_{A/B} = v_A - v_B.',
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The velocity of A relative to B is <InlineMath math="\vec{v}_{AB} = \vec{v}_A - \vec{v}_B = 30\hat{i} - 40\hat{j}" />.</p>
        <p className="text-body-md">The magnitude is <InlineMath math="\sqrt{30^2 + (-40)^2} = \sqrt{900 + 1600} = \sqrt{2500} = 50" /> m/s.</p>
      </div>
    )
  },
  {
    id: 'sv-new-4',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>HRK Concept: Vector Algebra Equation</h3>
        <p className="text-body-md">
          Given <InlineMath math="\vec{A} = 2\hat{i} - \hat{j}" /> and <InlineMath math="\vec{B} = -\hat{i} + 3\hat{j}" />, find the x-component of the vector <InlineMath math="\vec{C}" /> that satisfies the equation <InlineMath math="2\vec{A} - 3\vec{B} + \vec{C} = 0" />.
        </p>
      </>
    ),
    correctExpression: '-7',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Solve for <InlineMath math="\vec{C}" /> algebraically: <InlineMath math="\vec{C} = 3\vec{B} - 2\vec{A}" />.</p>
        <p className="text-body-md">For the x-component: <InlineMath math="C_x = 3(B_x) - 2(A_x) = 3(-1) - 2(2) = -3 - 4 = -7" />.</p>
      </div>
    )
  },
  {
    id: 'sv-new-5',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Unit Vector Construction</h3>
        <p className="text-body-md">
          If <InlineMath math="\vec{r} = 6\hat{i} - 8\hat{j}" />, what is the y-component of the <em>unit vector</em> pointing in the same direction as <InlineMath math="\vec{r}" />?
        </p>
      </>
    ),
    correctExpression: '-0.8',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">First, find the magnitude: <InlineMath math="|\vec{r}| = \sqrt{6^2 + (-8)^2} = 10" />.</p>
        <p className="text-body-md">To find the unit vector, divide each component by the magnitude: <InlineMath math="\hat{r} = \frac{6}{10}\hat{i} - \frac{8}{10}\hat{j} = 0.6\hat{i} - 0.8\hat{j}" />.</p>
      </div>
    )
  },
  {
    id: 'sv-new-6',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Orthogonal Vectors</h3>
        <p className="text-body-md">
          For what value of <InlineMath math="k" /> are the vectors <InlineMath math="\vec{A} = 2\hat{i} + 3\hat{j}" /> and <InlineMath math="\vec{B} = k\hat{i} - 4\hat{j}" /> orthogonal (perpendicular)?
        </p>
      </>
    ),
    correctExpression: '6',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">Two vectors are orthogonal if their dot product is zero: <InlineMath math="\vec{A} \cdot \vec{B} = 0" />.</p>
        <p className="text-body-md">Calculating the dot product: <InlineMath math="(2)(k) + (3)(-4) = 0" />.</p>
        <p className="text-body-md">Therefore, <InlineMath math="2k - 12 = 0 \implies k = 6" />.</p>
      </div>
    )
  },
  {
    id: 'sv-new-7',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    generateParams: () => {
      const L1 = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const L2 = Math.floor(Math.random() * 5) + 3;
      return { L1, L2 };
    },
    renderPrompt: (params) => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Daily Displacement</h3>
        <p className="text-body-md">
          You walk <InlineMath math={`${params.L1}`} /> km East, then <InlineMath math={`${params.L2}`} /> km North, and finally <InlineMath math={`${params.L1}`} /> km West. What is your net displacement magnitude?
        </p>
      </>
    ),
    correctExpression: (params) => `${params.L2}`,
    variables: [],
    renderExplanation: (params) => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The East and West displacements cancel each other out (<InlineMath math={`+${params.L1} - ${params.L1} = 0`} />).</p>
        <p className="text-body-md">You are left with only the North displacement, so the magnitude is exactly <InlineMath math={`${params.L2}`} /> km.</p>
      </div>
    )
  },
  {
    id: 'sv-new-8',
    tags: ['kinematics', 'scalars-and-vectors', 'daily-practice'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Scalar Projection</h3>
        <p className="text-body-md">
          What is the scalar projection (the component) of vector <InlineMath math="\vec{A} = 3\hat{i} + 4\hat{j}" /> along the x-axis?
        </p>
      </>
    ),
    correctExpression: '3',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The scalar projection of a vector along an axis is simply the component corresponding to that axis. For the x-axis, this is the <InlineMath math="\hat{i}" /> component, which is 3.</p>
      </div>
    )
  }
];
