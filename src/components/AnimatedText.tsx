'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export default function AnimatedText({ text, className = "", delay = 0, as: Component = "p" }: AnimatedTextProps) {
  // Split text into words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.p
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.1rem" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
