import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './views/Home';
import DashboardView from './views/Dashboard';
import PomodoroView from './views/Pomodoro';
import HabitsView from './views/Habits';
import ChatView from './views/Chat';

const App = () => {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView setView={setView} />;
      case 'dashboard':
        return <DashboardView />;
      case 'pomodoro':
        return <PomodoroView />;
      case 'habits':
        return <HabitsView />;
      case 'chat':
        return <ChatView />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <Layout view={view} setView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
