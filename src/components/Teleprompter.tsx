'use client';

import { useEffect, useRef } from 'react';

interface TeleprompterProps {
  text: string;
  isPlaying: boolean;
  speed: number;
  fontSize: number;
  mirrorMode: boolean;
}

export default function Teleprompter({
  text,
  isPlaying,
  speed,
  fontSize,
  mirrorMode,
}: TeleprompterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);
  const speedRef = useRef(speed);
  const isPlayingRef = useRef(isPlaying);

  // Keep refs in sync with props
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const scroll = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed > 16) { // ~60fps
        const scrollAmount = (speedRef.current * elapsed) / 100;
        scrollPositionRef.current += scrollAmount;
        if (containerRef.current) {
          containerRef.current.scrollTop = scrollPositionRef.current;
        }
        lastTimeRef.current = timestamp;
      }

      if (isPlayingRef.current) {
        animationRef.current = requestAnimationFrame(scroll);
      }
    };

    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(scroll);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full">
      {/* Reading guide line */}
      <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-red-500/50 z-10 pointer-events-none" />
      
      {/* Main teleprompter display */}
      <div
        ref={containerRef}
        className={`w-full h-full overflow-hidden bg-black text-white p-4 sm:p-8 ${
          mirrorMode ? 'scale-x-[-1]' : ''
        }`}
        style={{
          scrollBehavior: 'auto',
        }}
      >
        <div
          ref={textRef}
          className="whitespace-pre-wrap leading-relaxed max-w-4xl mx-auto pt-[25vh]"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.6,
          }}
        >
          {text || 'Enter your script in the editor above...'}
        </div>
        {/* Bottom padding to allow scrolling to the end */}
        <div className="h-[75vh]" />
      </div>

      {/* Gradient overlays for visual effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
