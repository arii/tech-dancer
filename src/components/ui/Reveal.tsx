import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { animation } from '@/styles/design-tokens';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number | string;
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = animation.revealDistance
}: RevealProps) {
  const getTransformValue = (dir: 'x' | 'y') => {
    if (direction === 'none') return 0;

    const isNegative = (dir === 'x' && direction === 'right') || (dir === 'y' && direction === 'down');
    const isRelevant = (dir === 'x' && (direction === 'left' || direction === 'right')) ||
                        (dir === 'y' && (direction === 'up' || direction === 'down'));

    if (!isRelevant) return 0;

    if (typeof distance === 'number') {
      return isNegative ? -distance : distance;
    }

    // Handle CSS variable strings like var(--reveal-distance)
    return isNegative ? `calc(-1 * ${distance})` : distance;
  };

  const variants = {
    hidden: {
      opacity: 0,
      x: getTransformValue('x'),
      y: getTransformValue('y'),
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
      animate="visible"
      variants={variants}
      transition={{
        duration,
        delay,
        ease: animation.ease as readonly number[],
      }}
    >
      {children}
    </motion.div>
  );
}
