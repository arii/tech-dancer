import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

console.log('motion.div:', typeof motion.div, (motion.div as any)._isMotionComponent);
console.log('NavLink:', typeof NavLink, (NavLink as any)._isMotionComponent);
