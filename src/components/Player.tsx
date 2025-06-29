import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from 'lucide-react';
import { Track } from '../types/music';

interface PlayerProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  formatTime: (time: number) => string;
}

const Player: React.FC<PlayerProps> = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onShuffle,
  onSeek,
  onVolumeChange,
  formatTime
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  if (!track || !track.albumArt) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    onSeek(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = clickX / width;
    onVolumeChange(newVolume);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="glass border-t border-white/20 dark:border-gray-600/30 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar - Full Width */}
          <div className="mb-4">
            <div 
              className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1 cursor-pointer hover:h-2 transition-all duration-200"
              onClick={handleProgressClick}
            >
              <div 
                className="bg-pink-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="relative w-14 h-14 flex-shrink-0">
                <img 
                  src={track.albumArt} 
                  alt={`${track.album} by ${track.artist}`}
                  className="w-full h-full rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {track.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4">
                <button onClick={onShuffle} className="player-control" aria-label="Shuffle">
                  <Shuffle className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                </button>
                <button onClick={onPrevious} className="player-control" aria-label="Previous track">
                  <SkipBack className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
                <button 
                  onClick={handlePlayPause}
                  className="player-control bg-pink-500 hover:bg-pink-600 text-white w-12 h-12"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
                <button onClick={onNext} className="player-control" aria-label="Next track">
                  <SkipForward className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
                <div className="relative">
                  <button 
                    className="player-control" 
                    aria-label="Volume"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    )}
                  </button>
                  
                  {/* Volume Slider */}
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <div className="glass p-2 rounded-lg">
                        <div 
                          className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
                          onClick={handleVolumeClick}
                        >
                          <div 
                            className="bg-pink-500 h-full rounded-full"
                            style={{ width: `${volume * 100}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Time Display */}
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Side - Placeholder for future features */}
            <div className="flex-1 flex justify-end">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {track.preview_url ? '🎵 Playing' : '🔇 No audio'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;