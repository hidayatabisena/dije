import { Mood } from '../types/music';

export const moods: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    description: 'Upbeat & Joyful',
    color: '#EC4899'
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    description: 'Melancholic & Reflective',
    color: '#BE185D'
  },
  {
    id: 'energetic',
    name: 'Energetic',
    emoji: '⚡',
    description: 'High Energy & Pumped',
    color: '#F43F5E'
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '🧘',
    description: 'Peaceful & Relaxing',
    color: '#F9A8D4'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    description: 'Love & Intimacy',
    color: '#DB2777'
  },
  {
    id: 'focused',
    name: 'Focused',
    emoji: '🎯',
    description: 'Concentration & Study',
    color: '#A21CAF'
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    emoji: '🌅',
    description: 'Memories & Throwbacks',
    color: '#C2410C'
  },
  {
    id: 'chill',
    name: 'Chill',
    emoji: '🌊',
    description: 'Laid-back & Mellow',
    color: '#F472B6'
  }
];

export const getMoodQuote = (moodId: string): string => {
  const quotes: Record<string, string> = {
    happy: "Life is better when you're dancing to your favorite song.",
    sad: "Sometimes the most beautiful music comes from the deepest emotions.",
    energetic: "Turn up the volume and let the energy flow through you.",
    calm: "In the silence between notes, peace is found.",
    romantic: "Love is the bridge between two hearts, built with melodies.",
    focused: "Great things never come from comfort zones, but good music helps.",
    nostalgic: "Music is the soundtrack to our memories, playing our story back to us.",
    chill: "Take it easy, let the rhythm guide your soul."
  };

  return quotes[moodId] || "Music speaks where words fail.";
};