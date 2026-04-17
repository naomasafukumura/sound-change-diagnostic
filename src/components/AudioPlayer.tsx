'use client';

import { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  label?: string;
  size?: 'lg' | 'sm';
}

export function AudioPlayer({ src, label = 'もう一度聞く', size = 'lg' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  return (
    <div>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} preload="auto" />
      <button
        onClick={play}
        disabled={isPlaying}
        className={`flex items-center justify-center gap-2.5 w-full font-bold rounded-xl active:scale-[0.98] transition-all disabled:opacity-60 ${
          size === 'lg'
            ? 'py-3.5 px-6 text-sm bg-[#0f172a] text-white'
            : 'py-2.5 px-4 text-sm bg-[#f1f5f9] text-[#475569]'
        }`}
      >
        {isPlaying ? (
          <span className="flex gap-[3px] items-end h-4">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] bg-current rounded-full"
                style={{
                  animation: `rec-pulse 0.6s ${i * 0.15}s infinite`,
                  height: `${6 + i * 4}px`,
                }}
              />
            ))}
          </span>
        ) : (
          <svg width={size === 'lg' ? 18 : 14} height={size === 'lg' ? 18 : 14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {isPlaying ? '再生中...' : label}
      </button>
    </div>
  );
}
