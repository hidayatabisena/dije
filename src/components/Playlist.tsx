import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Heart, ExternalLink } from 'lucide-react';
import { Track } from '../types/music';

interface PlaylistProps {
  playlist: Track[];
  loading: boolean;
  onTrackSelect: (track: Track) => void;
  currentTrack?: Track;
  mood: string;
}

const Playlist: React.FC<PlaylistProps> = ({ 
  playlist, 
  loading, 
  onTrackSelect, 
  currentTrack,
  mood 
}) => {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Curating your perfect playlist...
            </span>
          </div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 glass rounded-xl animate-pulse">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Your {mood} Playlist
          </h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors">
              <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Save to Spotify</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {playlist.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 cursor-pointer group hover:bg-white/20 dark:hover:bg-gray-700/30 ${
                currentTrack?.id === track.id ? 'bg-white/30 dark:bg-gray-700/40' : ''
              }`}
              onClick={() => onTrackSelect(track)}
            >
              <div className="relative">
                <img 
                  src={track.albumArt} 
                  alt={track.album}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {track.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 truncate">
                  {track.artist}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {track.album}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{track.duration}</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Playlist;