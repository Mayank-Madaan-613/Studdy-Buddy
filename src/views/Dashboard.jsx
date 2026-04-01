const DashboardView = () => {
    const data = [
        { name: 'Mon', hours: 2 },
        { name: 'Tue', hours: 4.5 },
        { name: 'Wed', hours: 3 },
        { name: 'Thu', hours: 5 },
        { name: 'Fri', hours: 1.5 },
        { name: 'Sat', hours: 6 },
        { name: 'Sun', hours: 4 },
    ];

    return (
        <div className="space-y-6 pt-2 pb-10">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                    <p className="text-slate-400 mt-1">Welcome back! Here's your study progress.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                    <span className="text-sm font-semibold text-emerald-100">On a 5-day streak 🔥</span>
                </div>
            </header>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                <Card className="bg-gradient-to-br from-indigo-900/60 to-slate-900/80 border-indigo-500/30 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <p className="text-indigo-200 text-sm font-medium mb-1">Total Study Hours</p>
                            <h3 className="text-4xl font-bold text-white">26.0<span className="text-xl text-indigo-300/70 ml-1">h</span></h3>
                        </div>
                        <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/20"><Icons.Timer className="w-6 h-6 text-indigo-400" /></div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-teal-900/60 to-slate-900/80 border-teal-500/30 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl group-hover:bg-teal-500/30 transition-all"></div>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <p className="text-teal-200 text-sm font-medium mb-1">Tasks Completed</p>
                            <h3 className="text-4xl font-bold text-white">14</h3>
                        </div>
                        <div className="p-3 bg-teal-500/20 rounded-xl border border-teal-500/20"><Icons.Checklist className="w-6 h-6 text-teal-400" /></div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-rose-900/60 to-slate-900/80 border-rose-500/30 sm:col-span-2 md:col-span-1 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <p className="text-rose-200 text-sm font-medium mb-1">Focus Score</p>
                            <h3 className="text-4xl font-bold text-white">92<span className="text-xl text-rose-300/70 ml-1">%</span></h3>
                        </div>
                        <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/20"><Icons.Sparkles className="w-6 h-6 text-rose-400" /></div>
                    </div>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Study Overview</h3>
                            <select className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-slate-300 outline-none">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                        cursor={{fill: '#1e293b', opacity: 0.6}}
                                        itemStyle={{ color: '#818cf8' }}
                                    />
                                    <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <Card className="h-full">
                        <h3 className="text-lg font-semibold mb-6 flex items-center justify-between text-white">
                            Recent Activity
                            <button className="text-sm font-medium text-primary hover:text-indigo-400 transition-colors">View All</button>
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: "React Fundamentals", type: "studying", time: "2h ago", duration: "1h 30m" },
                                { title: "Daily Habit: Reading", type: "habit", time: "5h ago" },
                                { title: "Math Assignment", type: "studying", time: "Yesterday", duration: "45m" },
                                { title: "Daily Habit: Exercise", type: "habit", time: "Yesterday" },
                                { title: "CSS Grid Concepts", type: "studying", time: "2 days ago", duration: "2h" },
                            ].map((act, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
                                    <div className={`p-2.5 rounded-xl ${act.type === 'studying' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
                                        {act.type === 'studying' ? <Icons.Timer className="w-4 h-4" /> : <Icons.Checklist className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-slate-200 truncate">{act.title}</h4>
                                        <p className="text-xs text-slate-500">{act.time}</p>
                                    </div>
                                    {act.duration && (
                                        <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/50">
                                            {act.duration}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
