import { useState, useCallback } from 'react';
import { Track } from '../types/music';
import { generateMoodPlaylist } from '../utils/api';

export const useMoodPlaylist = () => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylist = useCallback(async (mood: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const tracks = await generateMoodPlaylist(mood);
      setPlaylist(tracks);
    } catch (err) {
      setError('Failed to generate playlist');
      console.error('Error fetching playlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    playlist,
    loading,
    error,
    fetchPlaylist
  };
};