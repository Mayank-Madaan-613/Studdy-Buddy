const HabitsView = () => {
    const [habits, setHabits] = useState([
        { id: 1, name: 'Read 30 mins', currentStreak: 5, target: 7, category: 'Learning', history: [true, true, true, true, true, false, false] },
        { id: 2, name: 'Exercise', currentStreak: 2, target: 5, category: 'Health', history: [false, true, true, false, false, false, false] },
        { id: 3, name: 'Meditation', currentStreak: 14, target: 14, category: 'Wellness', history: [true, true, true, true, true, true, true] },
        { id: 4, name: 'Review Notes', currentStreak: 1, target: 3, category: 'Study', history: [false, false, false, false, true, false, false] },
    ]);

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    const getCategoryColor = (cat) => {
        const colors = {
            'Learning': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            'Health': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
            'Wellness': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            'Study': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        };
        return colors[cat] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    };

    return (
        <div className="space-y-8 pt-4 pb-10 max-w-5xl mx-auto">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Habit Tracker</h2>
                    <p className="text-slate-400 mt-1">Build better habits, one day at a time.</p>
                </div>
                <Button className="rounded-xl px-5"><Icons.Plus className="w-5 h-5 mr-2" /> New Habit</Button>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {habits.map((habit, idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={habit.id}
                    >
                        <Card className="border border-slate-700/50 hover:border-slate-500/50 transition-all flex flex-col lg:flex-row gap-6 lg:items-center justify-between bg-slate-800/20">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{habit.name}</h3>
                                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${getCategoryColor(habit.category)}`}>
                                        {habit.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm mt-3">
                                    <span className="flex items-center gap-1.5 text-orange-400 font-semibold bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                                        🔥 {habit.currentStreak} Day Streak
                                    </span>
                                    <span className="text-slate-400 font-medium bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Goal: {habit.target} days/wk</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                                {habit.history.map((status, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-500">{days[i]}</span>
                                        <button 
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${status ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_4px_15px_-3px_rgba(16,185,129,0.3)] border-none shrink-0' : 'bg-slate-800/80 border border-slate-700 text-transparent hover:border-slate-500 shrink-0'}`}
                                        >
                                            {status && <Icons.Checklist className="w-6 h-6" />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-900/80 border-indigo-500/30 overflow-hidden relative mt-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-inner">
                            <Icons.Sparkles className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                AI Insights
                                <span className="bg-primary px-2 py-0.5 rounded text-xs font-bold text-white tracking-wider">NEW</span>
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                You've been remarkably consistent with Meditation for 2 weeks! Your Exercise routine has dropped recently. Tip: Try scheduling Exercise directly after your Meditation session to "stack" your habits and build stronger neurological links.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
