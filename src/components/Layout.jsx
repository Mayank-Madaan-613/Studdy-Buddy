import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';

const Layout = ({ children, view, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Icons.Home },
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'pomodoro', label: 'Timer', icon: Icons.Timer },
    { id: 'habits', label: 'Habits', icon: Icons.Checklist },
    { id: 'chat', label: 'AI Chat', icon: Icons.Chat },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-slate-100 flex overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 glass-panel border-r border-slate-700/50 z-10 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 text-white font-bold text-xl">
            S
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            StudySpace
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto w-full relative">
          {navItems.map((item) => (
             <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                view === item.id 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {view === item.id && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-slate-800/80 border border-slate-700 rounded-xl z-0" 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${view === item.id ? 'text-primary' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col relative z-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden glass-panel border-b border-slate-700/50 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <h1 className="text-lg font-bold text-white">StudySpace</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg">
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-panel border-b border-slate-700/50 absolute top-[73px] left-0 w-full z-20 overflow-hidden"
            >
              <nav className="p-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setView(item.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      view === item.id ? 'bg-primary/20 text-primary' : 'text-slate-300'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full">
          <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
