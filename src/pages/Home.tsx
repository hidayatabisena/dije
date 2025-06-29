import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';
import MoodSelector from '../components/MoodSelector';
import Playlist from '../components/Playlist';
import Player from '../components/Player';
import ThemeToggle from '../components/ThemeToggle';
import { useMoodPlaylist } from '../hooks/useMoodPlaylist';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { getMoodQuote } from '../utils/moodMap';

const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const { playlist, loading, fetchPlaylist } = useMoodPlaylist();
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    play, 
    pause, 
    next, 
    previous, 
    shuffle,
    seek,
    setVolume,
    formatTime
  } = useAudioPlayer(playlist);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    fetchPlaylist(mood);
  };

  const handleLogoClick = () => {
    // Reset the app state and refresh
    setSelectedMood('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moodQuote = selectedMood ? getMoodQuote(selectedMood) : '';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-rose-500/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-fuchsia-500/20 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group cursor-pointer"
            aria-label="Go to home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-all duration-200">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
              VibeMixer
            </h1>
          </motion.button>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <section className="text-center py-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <span className="text-pink-600 dark:text-pink-300 font-medium">AI-Powered Music Discovery</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Let AI Be Your DJ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Tell us your mood, and we'll create the perfect playlist to match your vibe. 
              Discover new music that speaks to your soul.
            </p>
            
            {/* Audio Demo Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full text-sm text-gray-600 dark:text-gray-300"
            >
              <span>🎵</span>
              <span>Demo includes playable audio samples</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Mood Selection */}
        <section className="px-6 mb-12">
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        </section>

        {/* Mood Quote */}
        {moodQuote && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 mb-8"
          >
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg italic text-gray-600 dark:text-gray-300 glass p-6 rounded-2xl">
                "{moodQuote}"
              </p>
            </div>
          </motion.section>
        )}

        {/* Playlist */}
        {selectedMood && (
          <section className="px-6 mb-32">
            <Playlist 
              playlist={playlist} 
              loading={loading} 
              onTrackSelect={play}
              currentTrack={currentTrack}
              mood={selectedMood}
            />
          </section>
        )}

        {/* Audio Player */}
        {currentTrack && (
          <Player
            track={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onPlay={play}
            onPause={pause}
            onNext={next}
            onPrevious={previous}
            onShuffle={shuffle}
            onSeek={seek}
            onVolumeChange={setVolume}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
};

export default Home;