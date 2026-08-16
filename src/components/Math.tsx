'use client';

import dynamic from 'next/dynamic';

// Disable SSR for MathJax to prevent hydration mismatches where the server and client render different math DOM nodes
const MathJax = dynamic(
  () => import('better-react-mathjax').then((mod) => mod.MathJax),
  { ssr: false }
);

export function InlineMath({ math }: { math: string }) {
  return <MathJax inline>{"\\(" + math + "\\)"}</MathJax>;
}

export function BlockMath({ math }: { math: string }) {
  return <MathJax>{"\\[" + math + "\\]"}</MathJax>;
}
