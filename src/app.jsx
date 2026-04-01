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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
