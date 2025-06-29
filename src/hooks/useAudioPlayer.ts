import { useState, useCallback, useRef, useEffect } from 'react';
import { Track } from '../types/music';

export const useAudioPlayer = (playlist: Track[]) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;
    
    // Audio event listeners
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      // Auto-play next track when current track ends
      next();
    };
    
    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview_url || '';
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const play = useCallback((track?: Track) => {
    if (track) {
      // New track selected - update everything
      setCurrentTrack(track);
      const index = playlist.findIndex(t => t.id === track.id);
      setCurrentIndex(index >= 0 ? index : 0);
      setIsPlaying(true);
    } else {
      // Resume current track - only change playing state
      setIsPlaying(true);
    }
  }, [playlist]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    
    if (nextTrack) {
      setCurrentIndex(nextIndex);
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  }, [playlist, currentIndex]);

  const previous = useCallback(() => {
    if (playlist.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    const prevTrack = playlist[prevIndex];
    
    if (prevTrack) {
      setCurrentIndex(prevIndex);
      setCurrentTrack(prevTrack);
      setIsPlaying(true);
    }
  }, [playlist, currentIndex]);

  const shuffle = useCallback(() => {
    if (playlist.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const randomTrack = playlist[randomIndex];
    
    if (randomTrack) {
      setCurrentIndex(randomIndex);
      setCurrentTrack(randomTrack);
      setIsPlaying(true);
    }
  }, [playlist]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolumeLevel = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const formatTime = useCallback((time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
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
    setVolume: setVolumeLevel,
    formatTime
  };
};