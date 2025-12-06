'use client';

import { Brain, Sparkles, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import VoiceControlPanel from './VoiceControlPanel';

interface AIFeaturesPanelProps {
  // Voice pacing props
  isVoicePacingEnabled: boolean;
  onToggleVoicePacing: () => void;
  isListening: boolean;
  speakingRate: number;
  isSupported: boolean;
  error: string | null;
  // Voice commands props
  voiceCommandsEnabled: boolean;
  onToggleVoiceCommands: () => void;
  // AI Script generator
  onOpenScriptGenerator: () => void;
}

const VOICE_COMMAND_LIST = [
  { command: 'pause', description: 'Pause scrolling' },
  { command: 'resume / play', description: 'Resume scrolling' },
  { command: 'stop', description: 'Stop and reset' },
  { command: 'faster', description: 'Increase scroll speed' },
  { command: 'slower', description: 'Decrease scroll speed' },
];

export default function AIFeaturesPanel({
  isVoicePacingEnabled,
  onToggleVoicePacing,
  isListening,
  speakingRate,
  isSupported,
  error,
  voiceCommandsEnabled,
  onToggleVoiceCommands,
  onOpenScriptGenerator,
}: AIFeaturesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommandHelp, setShowCommandHelp] = useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-t border-purple-500/30">
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-left"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">AI Features</span>
          {(isVoicePacingEnabled || voiceCommandsEnabled) && (
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-purple-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-purple-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Feature Description */}
          <p className="text-xs text-gray-400">
            Enhance your teleprompter experience with AI-powered features
          </p>

          {/* Voice Controls */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Mic className="w-4 h-4 text-green-400" />
              <span>Voice Control</span>
            </div>
            <VoiceControlPanel
              isVoicePacingEnabled={isVoicePacingEnabled}
              onToggleVoicePacing={onToggleVoicePacing}
              isListening={isListening}
              speakingRate={speakingRate}
              isSupported={isSupported}
              error={error}
              voiceCommandsEnabled={voiceCommandsEnabled}
              onToggleVoiceCommands={onToggleVoiceCommands}
            />

            {/* Voice Commands Help */}
            {voiceCommandsEnabled && (
              <div className="mt-2">
                <button
                  onClick={() => setShowCommandHelp(!showCommandHelp)}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showCommandHelp ? 'Hide commands' : 'Show available voice commands'}
                </button>
                {showCommandHelp && (
                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                    {VOICE_COMMAND_LIST.map((cmd) => (
                      <div key={cmd.command} className="flex items-center gap-2 text-gray-400">
                        <code className="px-1.5 py-0.5 bg-gray-800 rounded text-purple-300">
                          &quot;{cmd.command}&quot;
                        </code>
                        <span>- {cmd.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Script Generator Button */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Content Creation</span>
            </div>
            <button
              onClick={onOpenScriptGenerator}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              AI Script Generator
            </button>
          </div>

          {/* Feature Info */}
          <div className="pt-2 border-t border-gray-700/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
              <div className="flex items-start gap-2">
                <span className="text-green-400">●</span>
                <span><strong>Voice Pacing:</strong> Scroll speed adjusts to your speaking pace</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400">●</span>
                <span><strong>Voice Commands:</strong> Control the teleprompter hands-free</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
