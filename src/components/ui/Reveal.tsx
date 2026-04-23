import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { animation } from '@/styles/design-tokens';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = animation.revealDistance
}: RevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: animation.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
