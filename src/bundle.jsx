const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.Motion;


// 1. Shared Components
const Card = ({ children, className = "", onClick }) => (
  <motion.div 
    whileHover={onClick ? { scale: 1.02 } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    className={`glass-panel rounded-2xl p-6 shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const Button = ({ children, onClick, variant = 'primary', className = "", disabled=false }) => {
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

// 2. Icons
const Icons = {
  Home: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  Dashboard: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Timer: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Checklist: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>,
  Chat: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
  Menu: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>,
  X: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Play: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>,
  Pause: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>,
  Refresh: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
  Send: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
  Sparkles: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.428-1.428L13.5 18.75l1.178-.394a2.25 2.25 0 001.428-1.428l.394-1.183.394 1.183a2.25 2.25 0 001.428 1.428l1.178.394-1.178.394a2.25 2.25 0 00-1.428 1.428z" /></svg>,
  Plus: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  ArrowRight: ({ className="" }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
};

// 3. Layout Component
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-700/50 z-10 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 text-white font-bold text-xl">S</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">StudySpace</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto w-full relative">
          {navItems.map((item) => (
             <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${view === item.id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              {view === item.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-800/80 border border-slate-700 rounded-xl z-0" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${view === item.id ? 'text-primary' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Area */}
      <div className="flex-1 flex flex-col relative z-0 h-screen overflow-hidden">
        <header className="md:hidden glass-panel border-b border-slate-700/50 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">S</div>
            <h1 className="text-lg font-bold text-white">StudySpace</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg">{mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}</button>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden glass-panel border-b border-slate-700/50 absolute top-[73px] left-0 w-full z-20 overflow-hidden">
              <nav className="p-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => { setView(item.id); setMobileMenuOpen(false); }} className={`flex items-center gap-3 p-3 rounded-xl ${view === item.id ? 'bg-primary/20 text-primary' : 'text-slate-300'}`}>
                    <item.icon className="w-5 h-5" />{item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full">
          <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
            <AnimatePresence mode="wait">
              <motion.div key={view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full">
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

// 4. View Components
const HomeView = ({ setView }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 py-10">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 max-w-2xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[100px] -z-10 rounded-full"></div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Icons.Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Meet your new AI study partner</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Supercharge your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Study Sessions</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-slate-400">
              Track your habits, manage your time, and get AI-powered insights all in one beautifully designed workspace.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button onClick={() => setView('dashboard')} className="px-8 py-4 text-lg rounded-full">Go to Dashboard <Icons.ArrowRight className="w-5 h-5 ml-2" /></Button>
              <Button variant="outline" onClick={() => setView('pomodoro')} className="px-8 py-4 text-lg rounded-full hover:bg-white hover:text-slate-900 border-slate-600">Try the Timer</Button>
          </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16 z-10">
          {[
              { title: "Smart Dashboard", desc: "Track your study hours and visualize your progress effortlessly.", icon: Icons.Dashboard, color: "text-blue-400", bg: "bg-blue-500/10" },
              { title: "Pomodoro Timer", desc: "Stay focused with customizable work and break intervals.", icon: Icons.Timer, color: "text-rose-400", bg: "bg-rose-500/10" },
              { title: "Habit Tracker", desc: "Build lasting habits with daily checklists and streak tracking.", icon: Icons.Checklist, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 100 }} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-3xl border border-slate-700/50 hover:border-slate-500/80 transition-all shadow-xl hover:shadow-primary/10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}><feature.icon className={`w-7 h-7 ${feature.color}`} /></div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
          ))}
      </div>
  </div>
);

const DashboardView = () => {
  const [timeframe, setTimeframe] = useState('This Week');
  const [showAllActivities, setShowAllActivities] = useState(false);

  const dataThisWeek = [
      { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 4.5 }, { name: 'Wed', hours: 3 },
      { name: 'Thu', hours: 5 }, { name: 'Fri', hours: 1.5 }, { name: 'Sat', hours: 6 }, { name: 'Sun', hours: 4 },
  ];
  const dataLastWeek = [
      { name: 'Mon', hours: 3 }, { name: 'Tue', hours: 2 }, { name: 'Wed', hours: 6 },
      { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 2.5 }, { name: 'Sat', hours: 1 }, { name: 'Sun', hours: 5 },
  ];
  const data = timeframe === 'This Week' ? dataThisWeek : dataLastWeek;

  const activities = [
      { title: "React Fundamentals", type: "studying", time: "2h ago", duration: "1h 30m" },
      { title: "Daily Habit: Reading", type: "habit", time: "5h ago" },
      { title: "Math Assignment", type: "studying", time: "Yesterday", duration: "45m" },
      { title: "CSS Grid Concepts", type: "studying", time: "2 days ago", duration: "2h" },
      { title: "Data Structures", type: "studying", time: "3 days ago", duration: "4h 15m" },
      { title: "Daily Habit: Exercise", type: "habit", time: "3 days ago" },
  ];
  const displayedActivities = showAllActivities ? activities : activities.slice(0, 4);

  const toggleActivities = () => setShowAllActivities(!showAllActivities);

  return (
      <div className="space-y-6 pt-2 pb-10">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div><h2 className="text-3xl font-bold text-white">Dashboard</h2><p className="text-slate-400 mt-1">Welcome back! Here's your study progress.</p></div>
              <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span className="text-sm font-semibold text-emerald-100">On a 5-day streak 🔥</span>
              </div>
          </header>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-900/60 to-slate-900/80 border-indigo-500/30 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
                  <div className="flex items-start justify-between relative z-10">
                      <div><p className="text-indigo-200 text-sm font-medium mb-1">Total Study Hours</p><h3 className="text-4xl font-bold text-white">26.0<span className="text-xl text-indigo-300/70 ml-1">h</span></h3></div>
                      <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/20"><Icons.Timer className="w-6 h-6 text-indigo-400" /></div>
                  </div>
              </Card>
              <Card className="bg-gradient-to-br from-teal-900/60 to-slate-900/80 border-teal-500/30 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl group-hover:bg-teal-500/30 transition-all"></div>
                  <div className="flex items-start justify-between relative z-10">
                      <div><p className="text-teal-200 text-sm font-medium mb-1">Tasks Completed</p><h3 className="text-4xl font-bold text-white">14</h3></div>
                      <div className="p-3 bg-teal-500/20 rounded-xl border border-teal-500/20"><Icons.Checklist className="w-6 h-6 text-teal-400" /></div>
                  </div>
              </Card>
              <Card className="bg-gradient-to-br from-rose-900/60 to-slate-900/80 border-rose-500/30 sm:col-span-2 md:col-span-1 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                  <div className="flex items-start justify-between relative z-10">
                      <div><p className="text-rose-200 text-sm font-medium mb-1">Focus Score</p><h3 className="text-4xl font-bold text-white">92<span className="text-xl text-rose-300/70 ml-1">%</span></h3></div>
                      <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/20"><Icons.Sparkles className="w-6 h-6 text-rose-400" /></div>
                  </div>
              </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
                  <Card className="h-full">
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white">Study Overview</h3>
                          <select 
                            value={timeframe} 
                            onChange={(e) => setTimeframe(e.target.value)} 
                            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-slate-300 cursor-pointer"
                          >
                            <option value="This Week">This Week</option>
                            <option value="Last Week">Last Week</option>
                          </select>
                      </div>
                      <div className="h-72 w-full mt-8 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-6">
                          {data.map((item, i) => {
                              const heightPercentage = Math.max((item.hours / 8) * 100, 5);
                              return (
                                  <div key={`${timeframe}-${i}`} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg pointer-events-none border border-slate-700 whitespace-nowrap shadow-xl z-20 font-medium">
                                          {item.hours}h
                                      </div>
                                      <motion.div 
                                          initial={{ height: 0 }}
                                          animate={{ height: `${heightPercentage}%` }}
                                          transition={{ type: "spring", stiffness: 60, damping: 12, delay: i * 0.1 }}
                                          className="w-full max-w-[40px] bg-primary hover:bg-indigo-400 rounded-t-xl transition-colors relative cursor-pointer shadow-lg shadow-indigo-500/20"
                                      >
                                          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-t-xl pointer-events-none"></div>
                                      </motion.div>
                                      <span className="text-xs md:text-sm font-semibold text-slate-400 mt-4">{item.name}</span>
                                  </div>
                              );
                          })}
                      </div>
                  </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                  <Card className="h-full">
                      <h3 className="text-lg font-semibold mb-6 flex items-center justify-between text-white">
                        Recent Activity
                        <button onClick={toggleActivities} className="text-sm font-medium text-primary hover:text-indigo-400 transition-colors">
                          {showAllActivities ? 'Show Less' : 'View All'}
                        </button>
                      </h3>
                      <div className="space-y-4">
                          {displayedActivities.map((act, i) => (
                              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
                                  <div className={`p-2.5 rounded-xl ${act.type === 'studying' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
                                      {act.type === 'studying' ? <Icons.Timer className="w-4 h-4" /> : <Icons.Checklist className="w-4 h-4" />}
                                  </div>
                                  <div className="flex-1 min-w-0"><h4 className="text-sm font-medium text-slate-200 truncate">{act.title}</h4><p className="text-xs text-slate-500">{act.time}</p></div>
                                  {act.duration && <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/50">{act.duration}</span>}
                              </motion.div>
                          ))}
                      </div>
                  </Card>
              </motion.div>
          </div>
      </div>
  );
};

const PomodoroView = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
      let interval = null;
      if (isActive && timeLeft > 0) interval = setInterval(() => setTimeLeft(time => time - 1), 1000);
      else if (timeLeft === 0) setIsActive(false);
      return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addTime = () => setTimeLeft(t => t + 5 * 60);

  const handleMode = (newMode) => {
      setMode(newMode);
      setIsActive(false);
      if (newMode === 'focus') setTimeLeft(25 * 60);
      if (newMode === 'shortBreak') setTimeLeft(5 * 60);
      if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); handleMode(mode); };

  const radius = 130;
  const circumference = radius * 2 * Math.PI;
  const totalTime = mode === 'focus' ? 25*60 : mode === 'shortBreak' ? 5*60 : 15*60;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] py-6 w-full max-w-3xl mx-auto">
          <header className="w-full mb-10 text-center"><h2 className="text-3xl font-bold text-white mb-2">Focus Session</h2><p className="text-slate-400">Minimize distractions and tackle your tasks.</p></header>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex items-center justify-center pb-8">
              <div className="flex gap-2 p-1.5 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl">
                  <button onClick={() => handleMode('focus')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'focus' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>Focus (25m)</button>
                  <button onClick={() => handleMode('shortBreak')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'shortBreak' ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>Short Break (5m)</button>
                  <button onClick={() => handleMode('longBreak')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'longBreak' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>Long Break (15m)</button>
              </div>
          </motion.div>

          <Card className="w-full flex flex-col items-center py-12 px-6 border-slate-700/50 bg-slate-900/50 relative overflow-hidden">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] -z-10 transition-colors duration-1000 ${isActive ? (mode === 'focus' ? 'bg-primary/20' : 'bg-secondary/20') : 'bg-transparent'}`}></div>
              
              <div className="relative w-80 h-80 flex items-center justify-center mb-12 drop-shadow-2xl">
                  <svg className="w-full h-full -rotate-90 top-0 left-0 absolute" viewBox="0 0 280 280">
                      <circle cx="140" cy="140" r="130" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
                      <circle cx="140" cy="140" r="130" stroke="currentColor" strokeWidth="8" fill="none" className={mode === 'focus' ? 'text-primary' : mode === 'shortBreak' ? 'text-secondary' : 'text-indigo-400'} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                  </svg>
                  <div className="flex flex-col items-center">
                      <h2 className="text-7xl font-black text-white tracking-wider leading-none drop-shadow-md tabular-nums">{formatTime(timeLeft)}</h2>
                      <p className="mt-4 text-slate-400 uppercase tracking-[0.3em] font-bold text-xs">{mode === 'focus' ? 'Stay Focused' : 'Take a Break'}</p>
                  </div>
              </div>

              <div className="flex items-center gap-8">
                  <button onClick={resetTimer} className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shadow-md"><Icons.Refresh className="w-6 h-6" /></button>
                  <button onClick={toggleTimer} className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30' : mode === 'focus' ? 'bg-primary hover:bg-indigo-500 shadow-primary/30' : 'bg-secondary hover:bg-teal-500 shadow-secondary/30'} shadow-xl group`}>
                      <Icons.Play className={`w-10 h-10 text-white transition-transform group-hover:scale-110 ${isActive ? 'hidden' : 'block ml-2'}`} />
                      <Icons.Pause className={`w-10 h-10 text-white transition-transform group-hover:scale-110 ${isActive ? 'block' : 'hidden'}`} />
                  </button>
                  <button onClick={addTime} title="Add 5 Minutes" className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shadow-md active:bg-slate-600 active:scale-95"><Icons.Plus className="w-6 h-6" /></button>
              </div>
          </Card>
      </div>
  );
};

const HabitsView = () => {
  const [habits, setHabits] = useState([
      { id: 1, name: 'Read 30 mins', currentStreak: 5, target: 7, category: 'Learning', history: [true, true, true, true, true, false, false] },
      { id: 2, name: 'Exercise', currentStreak: 2, target: 5, category: 'Health', history: [false, true, true, false, false, false, false] },
      { id: 3, name: 'Meditation', currentStreak: 14, target: 14, category: 'Wellness', history: [true, true, true, true, true, true, true] },
  ]);
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const getCategoryColor = (cat) => {
      const colors = { 'Learning': 'text-blue-400 bg-blue-500/10 border-blue-500/20', 'Health': 'text-rose-400 bg-rose-500/10 border-rose-500/20', 'Wellness': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'};
      return colors[cat] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };

  const toggleHistory = (habitId, dayIndex) => {
      setHabits(habits.map(h => {
          if (h.id === habitId) {
              const newHistory = [...h.history];
              newHistory[dayIndex] = !newHistory[dayIndex];
              const newStreak = newHistory.filter(Boolean).length; 
              return { ...h, history: newHistory, currentStreak: newStreak };
          }
          return h;
      }));
  };

  const addHabit = () => {
      const name = prompt("Enter new habit name:");
      if (name) {
          setHabits([...habits, { id: Date.now(), name, currentStreak: 0, target: 7, category: 'Learning', history: Array(7).fill(false) }]);
      }
  };

  const deleteHabit = (id) => {
      if(confirm("Delete this habit?")) setHabits(habits.filter(h => h.id !== id));
  };

  return (
      <div className="space-y-8 pt-4 pb-10 max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div><h2 className="text-3xl font-bold text-white">Habit Tracker</h2><p className="text-slate-400 mt-1">Build better habits, one day at a time.</p></div>
              <Button onClick={addHabit} className="rounded-xl px-5"><Icons.Plus className="w-5 h-5 mr-2" /> New Habit</Button>
          </header>

          <div className="grid grid-cols-1 gap-4">
              {habits.map((habit, idx) => (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} key={habit.id}>
                      <Card className="border border-slate-700/50 hover:border-slate-500/50 transition-all flex flex-col lg:flex-row gap-6 lg:items-center justify-between bg-slate-800/20">
                          <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white max-w-[150px] sm:max-w-[200px] truncate" title={habit.name}>{habit.name}</h3>
                                <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${getCategoryColor(habit.category)}`}>{habit.category}</span>
                                <button onClick={() => deleteHabit(habit.id)} className="ml-auto text-slate-500 hover:text-rose-500 transition-colors p-1"><Icons.X className="w-5 h-5" /></button>
                              </div>
                              <div className="flex items-center gap-4 text-sm mt-3">
                                  <span className="flex items-center gap-1.5 text-orange-400 font-semibold bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">🔥 {habit.currentStreak} Day Streak</span>
                                  <span className="text-slate-400 font-medium bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Goal: {habit.target} days/wk</span>
                              </div>
                          </div>
                          <div className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                              {habit.history.map((status, i) => (
                                  <div key={i} className="flex flex-col items-center gap-2">
                                      <span className="text-xs font-semibold text-slate-500">{days[i]}</span>
                                      <button onClick={() => toggleHistory(habit.id, i)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${status ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_4px_15px_-3px_rgba(16,185,129,0.3)] border-none shrink-0' : 'bg-slate-800/80 border border-slate-700 text-transparent hover:border-slate-500 shrink-0'}`}>{status && <Icons.Checklist className="w-6 h-6" />}</button>
                                  </div>
                              ))}
                          </div>
                      </Card>
                  </motion.div>
              ))}
          </div>
      </div>
  );
};

const ChatView = () => {
  const [messages, setMessages] = useState([
      { role: 'assistant', text: "Hi there! I'm StudyBot, your AI tutor. I can help you understand concepts, plan your study schedule, or summarize your notes. What's on your mind today?" },
      { role: 'user', text: "Can you explain the difference between CSS Grid and Flexbox?" },
      { role: 'assistant', text: "**Flexbox** is designed for one-dimensional layouts (a single row or column). **CSS Grid** is built for two-dimensional layouts (rows AND columns simultaneously)." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMsg = input.trim();
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setInput('');
      
      setTimeout(() => {
          let response = "That's an interesting question!";
          const lower = userMsg.toLowerCase();
          if(lower.includes('hello') || lower.includes('hi')) {
              response = "Hello! How can I help you study today?";
          } else if(lower.includes('react')) {
              response = "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.";
          } else if(lower.includes('pomodoro')) {
              response = "The Pomodoro Technique is a time management method. It uses a timer to break work into intervals, typically 25 minutes in length, separated by short breaks.";
          } else if(lower.includes('help')) {
              response = "I can answer questions about programming, study techniques, or help summarize notes. Just ask!";
          } else {
              response = `I'm an AI study tutor! You mentioned: "${userMsg}". Since I'm running locally in your browser, I don't have a real server to generate a human-like answer, but in the final app I would give you a highly detailed explanation right here!`;
          }
          setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      }, 1000);
  };

  return (
      <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] max-w-4xl mx-auto pb-4 pt-2">
          <header className="mb-6 flex shrink-0 items-center justify-between glass-panel p-4 rounded-2xl mx-1 border border-slate-700/50">
              <div className="flex items-center gap-4">
                  <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"><Icons.Sparkles className="w-6 h-6 text-white" /></div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                  </div>
                  <div><h2 className="text-xl font-bold text-white leading-tight">AI Tutor</h2><span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">Online</span></div>
              </div>
          </header>
          
          <div className="flex-1 overflow-y-auto w-full px-2 space-y-6 flex flex-col no-scrollbar">
              {messages.map((msg, i) => (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 mr-3 mt-1 border border-indigo-500/30"><Icons.Sparkles className="w-4 h-4 text-indigo-400" /></div>}
                      <div className={`max-w-[85%] md:max-w-[75%] p-5 text-sm md:text-base ${msg.role === 'user' ? 'bg-primary text-white rounded-2xl rounded-tr-sm shadow-md' : 'bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 text-slate-200 rounded-2xl rounded-tl-sm shadow-md'}`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      </div>
                  </motion.div>
              ))}
              <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="shrink-0 mt-4 relative mx-1">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white rounded-2xl pl-5 pr-16 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl" />
              <button type="submit" disabled={!input.trim()} className={`absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm ${input.trim() ? 'bg-primary hover:bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}><Icons.Send className="w-5 h-5 -ml-0.5" /></button>
          </form>
      </div>
  );
};

// 5. Main App Assembly
const App = () => {
  const [view, setView] = useState('home');

  const renderView = () => {
      switch (view) {
          case 'home': return <HomeView setView={setView} />;
          case 'dashboard': return <DashboardView />;
          case 'pomodoro': return <PomodoroView />;
          case 'habits': return <HabitsView />;
          case 'chat': return <ChatView />;
          default: return <HomeView setView={setView} />;
      }
  };

  return (
      <Layout view={view} setView={setView}>
          {renderView()}
      </Layout>
  );
};

// Start App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
