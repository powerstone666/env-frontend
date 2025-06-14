import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <Router>
      <div
        className="dark min-h-screen w-full bg-background text-foreground font-sans flex flex-col overflow-y-hidden" 
        style={{ minHeight: '100vh', width: '100vw' , overflowY: "hidden"}}
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;