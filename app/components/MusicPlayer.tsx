'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load the custom song from public/song.mpeg
    const audio = new Audio('/song.mpeg');
    audio.loop = true;
    audio.preload = 'auto';

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play restricted or failed:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold transition-all duration-300 ${
        isPlaying
          ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-md shadow-rose-200/60 scale-105'
          : 'border-stone-300 bg-white/90 text-stone-700 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50'
      } backdrop-blur-md active:scale-95`}
      aria-label={isPlaying ? 'Pause song' : 'Play song'}
    >
      {isPlaying ? (
        <>
          <div className="flex h-3.5 items-end gap-0.5">
            <span className="w-0.5 animate-[music-bar_0.8s_ease-in-out_infinite] rounded-full bg-rose-600" style={{ height: '70%' }} />
            <span className="w-0.5 animate-[music-bar_0.8s_ease-in-out_infinite_0.2s] rounded-full bg-rose-600" style={{ height: '100%' }} />
            <span className="w-0.5 animate-[music-bar_0.8s_ease-in-out_infinite_0.4s] rounded-full bg-rose-600" style={{ height: '40%' }} />
          </div>
          <span className="tracking-wide">Playing Song ♪</span>
        </>
      ) : (
        <>
          <Music size={14} className="text-stone-500 transition-transform group-hover:scale-110 group-hover:text-rose-600" />
          <span className="tracking-wide">Play Song ♪</span>
        </>
      )}
    </button>
  );
}
