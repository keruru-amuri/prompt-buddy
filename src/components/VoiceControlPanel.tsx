'use client';

import { Mic, MicOff, Volume2, Gauge, AlertCircle } from 'lucide-react';

interface VoiceControlPanelProps {
  isVoicePacingEnabled: boolean;
  onToggleVoicePacing: () => void;
  isListening: boolean;
  speakingRate: number;
  isSupported: boolean;
  error: string | null;
  voiceCommandsEnabled: boolean;
  onToggleVoiceCommands: () => void;
}

export default function VoiceControlPanel({
  isVoicePacingEnabled,
  onToggleVoicePacing,
  isListening,
  speakingRate,
  isSupported,
  error,
  voiceCommandsEnabled,
  onToggleVoiceCommands,
}: VoiceControlPanelProps) {
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg text-sm text-gray-400">
        <AlertCircle className="w-4 h-4" />
        <span>Voice features not supported in this browser</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Voice Pacing Toggle */}
      <button
        onClick={onToggleVoicePacing}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isVoicePacingEnabled
            ? 'bg-green-600 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
        aria-label={isVoicePacingEnabled ? 'Disable voice pacing' : 'Enable voice pacing'}
      >
        {isListening ? (
          <Mic className="w-4 h-4 animate-pulse" />
        ) : (
          <MicOff className="w-4 h-4" />
        )}
        <span className="text-sm">Voice Pacing</span>
      </button>

      {/* Voice Commands Toggle */}
      <button
        onClick={onToggleVoiceCommands}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          voiceCommandsEnabled
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
        aria-label={voiceCommandsEnabled ? 'Disable voice commands' : 'Enable voice commands'}
      >
        <Volume2 className="w-4 h-4" />
        <span className="text-sm">Voice Commands</span>
      </button>

      {/* Speaking Rate Display */}
      {isVoicePacingEnabled && isListening && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg">
          <Gauge className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-300">
            {speakingRate > 0 ? `${speakingRate} WPM` : 'Listening...'}
          </span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 rounded-lg text-sm text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
