import React from 'react';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"
      >
        <Home />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;