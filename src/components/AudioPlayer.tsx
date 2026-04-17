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

  const reset = () => setIsPlaying(false);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(reset);
    setIsPlaying(true);
  };

  return (
    <div>
      <audio ref={audioRef} src={src} onEnded={reset} onError={reset} preload="auto" />
      <button
        onClick={play}
        disabled={isPlaying}
        className={`flex items-center justify-center gap-2.5 w-full font-bold rounded-2xl active:scale-[0.97] transition-all disabled:opacity-50 ${
          size === 'lg'
            ? 'py-4 text-[15px] text-white'
            : 'py-2.5 text-[13px] bg-[#EEF6FF] text-[#0483F0]'
        }`}
        style={size === 'lg' ? {
          background: 'linear-gradient(135deg, #0483F0 0%, #0066CC 100%)',
          boxShadow: '0 6px 20px -4px rgba(4, 131, 240, 0.3)',
        } : undefined}
      >
        {isPlaying ? (
          <span className="flex gap-[3px] items-end h-4">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-[3px] bg-current rounded-full"
                style={{
                  animation: `rec-pulse 0.5s ${i * 0.1}s infinite`,
                  height: `${4 + i * 3}px`,
                }}
              />
            ))}
          </span>
        ) : (
          <svg width={size === 'lg' ? 20 : 14} height={size === 'lg' ? 20 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        {isPlaying ? '再生中...' : label}
      </button>
    </div>
  );
}
