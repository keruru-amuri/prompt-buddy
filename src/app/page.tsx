'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import TextEditor from '@/components/TextEditor';
import Teleprompter from '@/components/Teleprompter';
import Controls from '@/components/Controls';
import AIFeaturesPanel from '@/components/AIFeaturesPanel';
import AIScriptGenerator from '@/components/AIScriptGenerator';
import { useSpeechRecognition, VoiceCommand } from '@/hooks/useSpeechRecognition';

export default function Home() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [fontSize, setFontSize] = useState(32);
  const [mirrorMode, setMirrorMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isEditorExpanded, setIsEditorExpanded] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  
  // AI Features state
  const [isVoicePacingEnabled, setIsVoicePacingEnabled] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [showScriptGenerator, setShowScriptGenerator] = useState(false);

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = useMemo(() => [
    { command: 'pause', action: () => setIsPlaying(false) },
    { command: 'stop', action: () => { setIsPlaying(false); setResetKey(prev => prev + 1); } },
    { command: 'resume', action: () => setIsPlaying(true) },
    { command: 'play', action: () => setIsPlaying(true) },
    { command: 'faster', action: () => setSpeed(prev => Math.min(prev + 2, 20)) },
    { command: 'slower', action: () => setSpeed(prev => Math.max(prev - 2, 1)) },
  ], []);

  // Speech recognition hook
  const {
    isListening,
    speakingRate,
    isSupported,
    error,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    voiceCommands: voiceCommandsEnabled ? voiceCommands : [],
    enabled: isVoicePacingEnabled || voiceCommandsEnabled,
    onSpeakingRateChange: (wpm) => {
      if (isVoicePacingEnabled && isPlaying) {
        // Convert speaking rate to scroll speed
        // Average speaking rate is 130-150 wpm, map this to comfortable reading speed
        const normalizedSpeed = Math.round((wpm / 150) * 5);
        const clampedSpeed = Math.max(1, Math.min(normalizedSpeed, 15));
        setSpeed(clampedSpeed);
      }
    },
  });

  // Handle voice pacing toggle
  const handleToggleVoicePacing = useCallback(() => {
    setIsVoicePacingEnabled(prev => {
      if (!prev) {
        startListening();
      } else if (!voiceCommandsEnabled) {
        stopListening();
      }
      return !prev;
    });
  }, [voiceCommandsEnabled, startListening, stopListening]);

  // Handle voice commands toggle
  const handleToggleVoiceCommands = useCallback(() => {
    setVoiceCommandsEnabled(prev => {
      if (!prev) {
        startListening();
      } else if (!isVoicePacingEnabled) {
        stopListening();
      }
      return !prev;
    });
  }, [isVoicePacingEnabled, startListening, stopListening]);

  // Stop listening when component unmounts or features disabled
  useEffect(() => {
    if (!isVoicePacingEnabled && !voiceCommandsEnabled) {
      stopListening();
    }
  }, [isVoicePacingEnabled, voiceCommandsEnabled, stopListening]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setResetKey((prev) => prev + 1);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleFontSizeChange = useCallback((newSize: number) => {
    setFontSize(newSize);
  }, []);

  const handleMirrorToggle = useCallback(() => {
    setMirrorMode((prev) => !prev);
  }, []);

  const handleToggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  const handleToggleEditor = useCallback(() => {
    setIsEditorExpanded((prev) => !prev);
  }, []);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleScriptGenerated = useCallback((script: string) => {
    setText(script);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Text Editor */}
      <TextEditor
        text={text}
        onTextChange={handleTextChange}
        isExpanded={isEditorExpanded}
        onToggleExpand={handleToggleEditor}
      />

      {/* Teleprompter Display */}
      <div className="flex-1 min-h-0">
        <Teleprompter
          key={resetKey}
          text={text}
          isPlaying={isPlaying}
          speed={speed}
          fontSize={fontSize}
          mirrorMode={mirrorMode}
        />
      </div>

      {/* AI Features Panel */}
      <AIFeaturesPanel
        isVoicePacingEnabled={isVoicePacingEnabled}
        onToggleVoicePacing={handleToggleVoicePacing}
        isListening={isListening}
        speakingRate={speakingRate}
        isSupported={isSupported}
        error={error}
        voiceCommandsEnabled={voiceCommandsEnabled}
        onToggleVoiceCommands={handleToggleVoiceCommands}
        onOpenScriptGenerator={() => setShowScriptGenerator(true)}
      />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        speed={speed}
        onSpeedChange={handleSpeedChange}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        mirrorMode={mirrorMode}
        onMirrorToggle={handleMirrorToggle}
        showSettings={showSettings}
        onToggleSettings={handleToggleSettings}
      />

      {/* AI Script Generator Modal */}
      <AIScriptGenerator
        isOpen={showScriptGenerator}
        onClose={() => setShowScriptGenerator(false)}
        onScriptGenerated={handleScriptGenerated}
      />
    </div>
  );
}
