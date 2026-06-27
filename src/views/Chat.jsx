import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';

const ChatView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm StudyBot, your AI tutor. I can help you understand concepts, plan your study schedule, or summarize your notes. What's on your mind today?" },
    { role: 'user', text: "Can you explain the difference between CSS Grid and Flexbox?" },
    { role: 'assistant', text: "**Flexbox** is designed for one-dimensional layouts (a single row or column). **CSS Grid** is built for two-dimensional layouts (rows AND columns simultaneously)." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Simulate typing delay & response parsing
    setTimeout(() => {
      let response = "That's an interesting question!";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('hello') || lower.includes('hi')) {
        response = "Hello! How can I help you study today?";
      } else if (lower.includes('react')) {
        response = "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.";
      } else if (lower.includes('pomodoro')) {
        response = "The Pomodoro Technique is a time management method. It uses a timer to break work into intervals, typically 25 minutes in length, separated by short breaks.";
      } else if (lower.includes('help')) {
        response = "I can answer questions about programming, study techniques, or help summarize notes. Just ask!";
      } else if (lower.includes('grid') || lower.includes('flexbox')) {
        response = "As mentioned, use Flexbox when aligning elements in a single row or column (like headers or lists). Use CSS Grid for complex, multi-row, multi-column page layouts.";
      } else {
        response = `I'm an AI study tutor! You mentioned: "${userMsg}". Since I'm running locally in your browser, I don't have a real backend server connected, but in a production setup, I would connect to a LLM API to give you a detailed explanation!`;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm("Clear chat history?")) {
      setMessages([
        { role: 'assistant', text: "Hi there! Chat history cleared. What study topic can I assist you with now?" }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] max-w-4xl mx-auto pb-4 pt-2 overflow-hidden">
      <header className="mb-6 flex shrink-0 items-center justify-between glass-panel p-4 rounded-2xl mx-1 border border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Icons.Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">AI Tutor</h2>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">Online</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
            title="Clear Chat"
          >
            <Icons.Refresh className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto w-full px-2 space-y-6 flex flex-col no-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 mr-3 mt-1 border border-indigo-500/30">
                <Icons.Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            )}
            <div className={`max-w-[85%] md:max-w-[75%] p-5 text-sm md:text-base ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-2xl rounded-tr-sm shadow-md' 
                : 'bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 text-slate-200 rounded-2xl rounded-tl-sm shadow-md'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="shrink-0 mt-4 relative mx-1">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or request a summary..." 
          className="w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white rounded-2xl pl-5 pr-16 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className={`absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm ${
            input.trim() ? 'bg-primary hover:bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Icons.Send className="w-5 h-5 -ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatView;
