import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = "", onClick }) => (
  <motion.div 
    whileHover={onClick ? { scale: 1.02 } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    className={`glass-panel rounded-2xl p-6 shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);
