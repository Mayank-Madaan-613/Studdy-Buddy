const HomeView = ({ setView }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 py-10">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="space-y-6 max-w-2xl relative"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[100px] -z-10 rounded-full"></div>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
                >
                    <Icons.Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Meet your new AI study partner</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white"
                >
                    Supercharge your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Study Sessions</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-slate-400"
                >
                    Track your habits, manage your time, and get AI-powered insights all in one beautifully designed workspace.
                </motion.p>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-6"
                >
                    <Button onClick={() => setView('dashboard')} className="px-8 py-4 text-lg rounded-full">
                        Go to Dashboard <Icons.ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" onClick={() => setView('pomodoro')} className="px-8 py-4 text-lg rounded-full hover:bg-white hover:text-slate-900 border-slate-600">
                        Try the Timer
                    </Button>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16 z-10">
                {[
                    { title: "Smart Dashboard", desc: "Track your study hours and visualize your progress effortlessly.", icon: Icons.Dashboard, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { title: "Pomodoro Timer", desc: "Stay focused with customizable work and break intervals.", icon: Icons.Timer, color: "text-rose-400", bg: "bg-rose-500/10" },
                    { title: "Habit Tracker", desc: "Build lasting habits with daily checklists and streak tracking.", icon: Icons.Checklist, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 100 }}
                        whileHover={{ y: -5 }}
                        className="glass-panel p-8 rounded-3xl border border-slate-700/50 hover:border-slate-500/80 transition-all shadow-xl hover:shadow-primary/10"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
