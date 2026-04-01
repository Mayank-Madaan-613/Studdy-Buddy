const PomodoroView = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus | shortBreak | longBreak

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Could play sound here in real app
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === 'focus') setTimeLeft(25 * 60);
        if (newMode === 'shortBreak') setTimeLeft(5 * 60);
        if (newMode === 'longBreak') setTimeLeft(15 * 60);
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        handleMode(mode);
    };

    const radius = 130;
    const circumference = radius * 2 * Math.PI;
    const totalTime = mode === 'focus' ? 25*60 : mode === 'shortBreak' ? 5*60 : 15*60;
    const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] py-6 w-full max-w-3xl mx-auto">
            <header className="w-full mb-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Focus Session</h2>
                <p className="text-slate-400">Minimize distractions and tackle your tasks.</p>
            </header>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex items-center justify-center pb-8"
            >
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
                        <circle 
                            cx="140" cy="140" r="130" 
                            stroke="currentColor" strokeWidth="8" fill="none" 
                            className={mode === 'focus' ? 'text-primary' : mode === 'shortBreak' ? 'text-secondary' : 'text-indigo-400'} 
                            strokeLinecap="round" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={strokeDashoffset} 
                            style={{ transition: 'stroke-dashoffset 1s linear' }} 
                        />
                    </svg>
                    <div className="flex flex-col items-center">
                        <h2 className="text-7xl font-black text-white tracking-wider leading-none drop-shadow-md tabular-nums">{formatTime(timeLeft)}</h2>
                        <p className="mt-4 text-slate-400 uppercase tracking-[0.3em] font-bold text-xs">{mode === 'focus' ? 'Stay Focused' : 'Take a Break'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <button onClick={resetTimer} className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shadow-md">
                        <Icons.Refresh className="w-6 h-6" />
                    </button>
                    
                    <button onClick={toggleTimer} className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30' : mode === 'focus' ? 'bg-primary hover:bg-indigo-500 shadow-primary/30' : 'bg-secondary hover:bg-teal-500 shadow-secondary/30'} shadow-xl group`}>
                        <Icons.Play className={`w-10 h-10 text-white transition-transform group-hover:scale-110 ${isActive ? 'hidden' : 'block ml-2'}`} />
                        <Icons.Pause className={`w-10 h-10 text-white transition-transform group-hover:scale-110 ${isActive ? 'block' : 'hidden'}`} />
                    </button>
                    
                    <button className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shadow-md">
                        <Icons.Plus className="w-6 h-6" />
                    </button>
                </div>
            </Card>
        </div>
    );
};
