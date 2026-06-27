# 🎓 StudySpace (Study-Buddy)

An elegant, glassmorphic productivity dashboard designed to supercharge your study sessions. StudySpace brings together essential study tools—including a Pomodoro timer, habit tracker, progress analytics, and a mock AI study tutor—into a unified, modern web workspace.

Built with a sleek dark-mode UI, smooth animations, and zero-install client-side routing, this application runs entirely in the browser with minimal overhead.

---

## ✨ Features

### 📊 Smart Dashboard
- **Activity Metrics:** Monitor your Total Study Hours (26h), Tasks Completed (14), Focus Score (92%), and active study streak (5 days) at a glance.
- **Interactive Progress Chart:** Visual weekly overview of study hours with hover details and interactive timeframe switching (*This Week* vs. *Last Week*).
- **Recent Activity Feed:** Log and review your recent study topics, focus session durations, and habit milestones.

### ⏱️ Pomodoro Timer
- **Session Presets:** Quickly toggle between Focus (25m), Short Break (5m), and Long Break (15m) sessions.
- **Visual Timer Ring:** Circular progress indicator driven by smooth SVG stroke-dashoffset transitions.
- **Timer Controls:** Easily play, pause, or reset your sessions, or add an extra 5 minutes with a single click.

### 📅 Habit Tracker
- **Consistency Streaks:** Track daily habit consistency with streak indicators and weekly target goals.
- **Weekly Checklists:** Toggle daily completion states (Sunday to Saturday) directly on interactive habit cards.
- **Dynamic Habit Management:** Add custom habits or delete them on the fly.
- **AI Insights:** Receive contextual study advice and habit-building suggestions (such as habit stacking).

### 💬 AI Tutor Chat (StudyBot)
- **Interactive Chat Interface:** Ask questions or get mock-explanations of complex topics.
- **Automated Context Responses:** StudyBot responds dynamically to key topics (e.g., React, Pomodoro, help, greeting keywords) with helpful guides.
- **Smooth Layout:** Clean conversational interface featuring automated scroll-to-bottom and typing indicators.

---

## 🛠️ Technology Stack & Libraries

StudySpace is designed as a standalone, high-performance static frontend application powered by modern CDN-delivered libraries:

- **Core Library:** [React](https://react.dev/) (v18) for component-based state and view management.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom color palette (Indigo/Teal/Slate) and a backdrop blur glassmorphic theme.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for state-transition animations, slide-overs, and hover/active states.
- **Icons:** Inline SVG Icons designed with [Heroicons](https://heroicons.com/) style.
- **Typography:** [Inter Font Family](https://fonts.google.com/specimen/Inter) via Google Fonts.

---

## 📁 Project Structure

```text
STUDY-BUDDY/
├── src/
│   ├── views/
│   │   ├── Home.jsx         # Welcome view with feature highlights
│   │   ├── Dashboard.jsx    # Analytics dashboard and metrics
│   │   ├── Pomodoro.jsx     # Focus session Pomodoro timer
│   │   ├── Habits.jsx       # Interactive habit tracking cards
│   │   └── Chat.jsx         # StudyBot AI Chat window component
│   ├── app.jsx              # Main App component & router
│   ├── shared.jsx           # Global layout, custom buttons, cards, & SVG icons
│   ├── bundle.jsx           # Concatenated production-ready app bundle
│   ├── index.html           # Core HTML entry point loading CDN resources
│   ├── favicon.jpg          # Application icon
│   └── Dockerfile           # Nginx Alpine container packaging
└── README.md                # Project documentation
```

---

## 🚀 Getting Started
Since StudySpace runs entirely client-side, you can open the project directly in your browser without any installation:
1. use the link: https://study-app-700816126722.us-central1.run.app/
2. Interact with the application immediately!



## 🔧 Architecture & Customization

- **State Management:** All state—including active views, habit checklists, and timer counts—is managed via standard React hooks (`useState`, `useEffect`, `useRef`).
- **CDN Scripts:** Production bundles use babel-standalone in development. For production optimizations, you can bundle dependencies using Webpack/Vite or serve compiled JS directly.
- **Tailwind Configurations:** Custom colors (`primary`, `secondary`, `dark`, `card`) and font configurations are defined inline inside the header tag of `src/index.html`.

---

