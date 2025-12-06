'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import TextEditor from '@/components/TextEditor';
import Teleprompter from '@/components/Teleprompter';
import Controls from '@/components/Controls';

export default function Home() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [fontSize, setFontSize] = useState(32);
  const [mirrorMode, setMirrorMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isEditorExpanded, setIsEditorExpanded] = useState(true);
  const [resetKey, setResetKey] = useState(0);

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
    </div>
  );
}
