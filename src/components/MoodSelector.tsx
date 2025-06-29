import React from 'react';
import { motion } from 'framer-motion';
import { moods } from '../utils/moodMap';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  selectedMood: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, selectedMood }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100"
      >
        How are you feeling today?
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood.id)}
            className={`mood-card text-center ${
              selectedMood === mood.id ? 'ring-2 ring-pink-500 bg-white/30 dark:bg-gray-700/40' : ''
            }`}
            style={{ 
              borderColor: selectedMood === mood.id ? mood.color : undefined,
              backgroundColor: selectedMood === mood.id ? `${mood.color}20` : undefined
            }}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{mood.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{mood.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;