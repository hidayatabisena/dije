import { Track } from '../types/music';
import { mockTracks } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMoodPlaylist = async (mood: string): Promise<Track[]> => {
  // Simulate API call delay
  await delay(1500);

  // Check if we have API keys in environment
  const hasSpotifyKey = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  
  if (hasSpotifyKey) {
    // TODO: Implement actual Spotify API integration
    // For now, return mock data even if API key is present
    return getMockPlaylistForMood(mood);
  }

  // Fallback to mock data
  return getMockPlaylistForMood(mood);
};

const getMockPlaylistForMood = (mood: string): Track[] => {
  // Filter mock tracks based on mood
  const moodMap: Record<string, string[]> = {
    happy: ['upbeat', 'energetic', 'positive'],
    sad: ['melancholic', 'slow', 'emotional'],
    energetic: ['high-energy', 'workout', 'pump-up'],
    calm: ['relaxing', 'peaceful', 'ambient'],
    romantic: ['love', 'intimate', 'romantic'],
    focused: ['instrumental', 'concentration', 'study'],
    nostalgic: ['throwback', 'classic', 'memories'],
    chill: ['laid-back', 'easy-going', 'mellow']
  };

  const moodTags = moodMap[mood] || ['general'];
  
  // Shuffle and return a subset of tracks
  const shuffled = [...mockTracks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
};

// Placeholder for future Spotify API integration
export const authenticateSpotify = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify API credentials not configured');
  }

  // TODO: Implement Spotify OAuth flow
  console.log('Spotify authentication would happen here');
};