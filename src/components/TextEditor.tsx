'use client';

import { FileText, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SAMPLE_SCRIPT = `Welcome to Prompt Buddy - Your AI-Powered Teleprompter!

This is a sample script to help you get started. You can edit this text or paste your own script.

Here are some tips for using the teleprompter:

1. Adjust the scroll speed using the speed slider in the controls.

2. Change the font size to make the text easier to read.

3. Use mirror mode if you're using a teleprompter mirror setup.

4. Press the play button to start scrolling, and pause to stop.

5. Hit the reset button to go back to the beginning.

Good luck with your presentation!`;

export default function TextEditor({
  text,
  onTextChange,
  isExpanded,
  onToggleExpand,
}: TextEditorProps) {
  const [showSampleButton, setShowSampleButton] = useState(!text);

  const handleLoadSample = () => {
    onTextChange(SAMPLE_SCRIPT);
    setShowSampleButton(false);
  };

  const handleClear = () => {
    onTextChange('');
    setShowSampleButton(true);
  };

  return (
    <div className={`bg-gray-800 border-b border-gray-700 transition-all duration-300 ${
      isExpanded ? 'flex-1 min-h-[200px]' : 'h-auto'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 text-sm font-medium">Script Editor</span>
        </div>
        <div className="flex items-center gap-2">
          {showSampleButton && (
            <button
              onClick={handleLoadSample}
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Load Sample
            </button>
          )}
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            aria-label="Clear text"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={onToggleExpand}
            className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            aria-label={isExpanded ? 'Collapse editor' : 'Expand editor'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Text Area */}
      {isExpanded && (
        <div className="p-3 sm:p-4 h-full">
          <textarea
            value={text}
            onChange={(e) => {
              onTextChange(e.target.value);
              if (e.target.value) {
                setShowSampleButton(false);
              } else {
                setShowSampleButton(true);
              }
            }}
            placeholder="Enter your script here..."
            className="w-full h-full min-h-[150px] bg-gray-900 text-white border border-gray-700 rounded-lg p-3 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      )}
    </div>
  );
}
