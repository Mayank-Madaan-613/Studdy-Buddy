import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className = "", disabled=false }) => {
  const base = "px-4 py-2 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary hover:bg-indigo-600 text-white shadow-indigo-500/25",
    secondary: "bg-secondary hover:bg-teal-500 text-white shadow-teal-500/25",
    outline: "border-2 border-slate-700 hover:bg-slate-800 text-slate-300",
    ghost: "hover:bg-slate-800 text-slate-400 hover:text-white shadow-none",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};
