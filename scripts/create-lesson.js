const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error("Usage: npm run create-lesson <unitSlug> <lessonSlug> \"Lesson Title\"");
  console.error("Example: npm run create-lesson kinematics 1d-motion \"1D Motion: Velocity and Acceleration\"");
  process.exit(1);
}

const [unitSlug, lessonSlug, lessonTitle] = args;

// Helper to write file safely
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(filePath)) {
    console.warn(`[WARN] File already exists, skipping: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[CREATED] ${filePath}`);
}

// 1. Create page.tsx
let componentName = lessonSlug.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
if (/^\d/.test(componentName)) componentName = '_' + componentName;
const pageContent = `'use client';

import React from 'react';
import LessonNodeLayout from '@/components/LessonNodeLayout';
import QuestionRenderer from '@/components/QuestionRenderer';
import { ${unitSlug}Questions } from '@/questions/${unitSlug}';

export default function ${componentName}() {
  const lessonNodes = [
    {
      id: 'intro',
      title: 'Introduction',
      content: (
        <div style={{ paddingTop: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>1. Introduction to ${lessonTitle}</h2>
            <p className="text-body-md">
              Welcome to the lesson on ${lessonTitle}. In this section, we will explore the fundamental concepts...
            </p>
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
              Test your understanding with the following problems.
            </p>
            {${unitSlug}Questions
              .filter(q => q.tags.includes('lesson-dedicated') && q.tags.includes('${lessonSlug}'))
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
      lessonId="${lessonSlug}" 
      unitId="${unitSlug}" 
    />
  );
}
`;

writeFile(path.join(process.cwd(), `src/app/learn/${unitSlug}/${lessonSlug}/page.tsx`), pageContent);

// 2. Create question file
let questionVarName = lessonSlug.split('-').map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Questions';
if (/^\d/.test(questionVarName)) questionVarName = '_' + questionVarName;
const questionContent = `import React from 'react';
import { InlineMath, BlockMath } from '@/components/Math';
import { Question } from '@/types/questions';

export const ${questionVarName}: Question[] = [
  {
    id: '${lessonSlug}-hw-1',
    tags: ['${unitSlug}', '${lessonSlug}', 'lesson-dedicated'],
    renderPrompt: () => (
      <>
        <h3 className="text-body-lg" style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>Problem 1: Placeholder</h3>
        <p className="text-body-md">
          Calculate the placeholder value for <InlineMath math="x" />.
        </p>
      </>
    ),
    correctExpression: '42',
    variables: [],
    renderExplanation: () => (
      <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '2px solid var(--border)' }}>
        <p className="text-body-md">The answer is always 42.</p>
      </div>
    )
  }
];
`;

writeFile(path.join(process.cwd(), `src/questions/${unitSlug}/${lessonSlug}.tsx`), questionContent);

// 3. Update or create index.ts
const indexPath = path.join(process.cwd(), `src/questions/${unitSlug}/index.ts`);
if (!fs.existsSync(indexPath)) {
  const indexContent = `import { Question } from '@/types/questions';
import { ${questionVarName} } from './${lessonSlug}';

export const ${unitSlug}Questions: Question[] = [
  ...${questionVarName}
];
`;
  writeFile(indexPath, indexContent);
} else {
  let content = fs.readFileSync(indexPath, 'utf-8');
  if (!content.includes(`./${lessonSlug}`)) {
    const importStatement = `import { ${questionVarName} } from './${lessonSlug}';\n`;
    content = importStatement + content;
    
    // Inject into the array
    const arrayMatch = content.match(/export const \w+Questions:\s*Question\[\]\s*=\s*\[([\s\S]*?)\];/);
    if (arrayMatch) {
      const innerArray = arrayMatch[1];
      let newInner = innerArray.trimEnd();
      if (newInner.length > 0 && !newInner.endsWith(',')) {
        newInner += ',';
      }
      newInner += `\n  ...${questionVarName}\n`;
      content = content.replace(arrayMatch[1], `\n${newInner}`);
    }
    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log(`[UPDATED] ${indexPath}`);
  } else {
    console.warn(`[WARN] Import for ${lessonSlug} already exists in ${indexPath}`);
  }
}

// 4. Update src/questions/index.ts
const globalIndexPath = path.join(process.cwd(), 'src/questions/index.ts');
if (fs.existsSync(globalIndexPath)) {
  let content = fs.readFileSync(globalIndexPath, 'utf-8');
  if (!content.includes(`./${unitSlug}`)) {
    const importStatement = `import { ${unitSlug}Questions } from './${unitSlug}';\n`;
    content = importStatement + content;
    
    const arrayMatch = content.match(/export const allQuestions:\s*Question\[\]\s*=\s*\[([\s\S]*?)\];/);
    if (arrayMatch) {
      const innerArray = arrayMatch[1];
      let newInner = innerArray.trimEnd();
      if (newInner.length > 0 && !newInner.endsWith(',')) {
        newInner += ',';
      }
      // Remove any commented placeholders
      newInner = newInner.replace(/\s*\/\/.*add future units here/g, '');
      newInner += `\n  ...${unitSlug}Questions,\n  // ...add future units here\n`;
      content = content.replace(arrayMatch[1], `\n${newInner}`);
    }
    fs.writeFileSync(globalIndexPath, content, 'utf-8');
    console.log(`[UPDATED] ${globalIndexPath}`);
  }
}

console.log(`\n🎉 Lesson '${lessonTitle}' successfully scaffolded!`);
console.log(`Navigate to src/app/learn/${unitSlug}/${lessonSlug}/page.tsx to begin building.\n`);
