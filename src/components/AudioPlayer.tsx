'use client';

import { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  label?: string;
}

export function AudioPlayer({ src, label = 'もう一度聞く' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <div>
      <audio ref={audioRef} src={src} onEnded={handleEnded} preload="auto" />
      <button
        onClick={play}
        disabled={isPlaying}
        className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-blue-500 text-white rounded-2xl text-lg font-medium active:scale-95 transition-transform disabled:opacity-60"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          {isPlaying ? (
            <>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </>
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
        {isPlaying ? '再生中...' : label}
      </button>
    </div>
  );
}
