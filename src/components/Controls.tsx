'use client';

import { Play, Pause, RotateCcw, Settings, Type, Gauge, FlipHorizontal } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  mirrorMode: boolean;
  onMirrorToggle: () => void;
  showSettings: boolean;
  onToggleSettings: () => void;
}

export default function Controls({
  isPlaying,
  onPlayPause,
  onReset,
  speed,
  onSpeedChange,
  fontSize,
  onFontSizeChange,
  mirrorMode,
  onMirrorToggle,
  showSettings,
  onToggleSettings,
}: ControlsProps) {
  return (
    <div className="w-full bg-gray-900 border-t border-gray-700 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* Main Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onPlayPause}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" />
            )}
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={onToggleSettings}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-colors ${
              showSettings
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-700 sm:pl-4">
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm hidden sm:inline">Speed</span>
              <input
                type="range"
                min="1"
                max="20"
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="w-20 sm:w-24 accent-green-500"
              />
              <span className="text-white text-sm w-8">{speed}x</span>
            </div>

            {/* Font Size Control */}
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm hidden sm:inline">Size</span>
              <input
                type="range"
                min="16"
                max="72"
                value={fontSize}
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="w-20 sm:w-24 accent-blue-500"
              />
              <span className="text-white text-sm w-10">{fontSize}px</span>
            </div>

            {/* Mirror Mode */}
            <button
              onClick={onMirrorToggle}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                mirrorMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              aria-label="Toggle mirror mode"
            >
              <FlipHorizontal className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Mirror</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
