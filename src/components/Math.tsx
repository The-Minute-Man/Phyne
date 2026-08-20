'use client';

import dynamic from 'next/dynamic';

// Separate dynamic imports to provide different skeleton sizes for inline vs block math
const MathJaxInline = dynamic(
  () => import('better-react-mathjax').then((mod) => mod.MathJax),
  { 
    ssr: false,
    loading: () => <span className="inline-block rounded animate-pulse align-middle mx-1" style={{ backgroundColor: 'var(--border)', width: '2rem', height: '1rem' }} />
  }
);

const MathJaxBlock = dynamic(
  () => import('better-react-mathjax').then((mod) => mod.MathJax),
  { 
    ssr: false,
    loading: () => <div className="block rounded animate-pulse" style={{ backgroundColor: 'var(--border)', width: '100%', height: '3rem', margin: '1rem 0' }} />
  }
);

export function InlineMath({ math }: { math: string }) {
  return <MathJaxInline inline>{"\\(" + math + "\\)"}</MathJaxInline>;
}

export function BlockMath({ math }: { math: string }) {
  return <MathJaxBlock>{"\\[" + math + "\\]"}</MathJaxBlock>;
}
