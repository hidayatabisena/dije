export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
  preview_url?: string;
  spotify_url?: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface PlaylistResponse {
  tracks: Track[];
  mood: string;
  total: number;
}