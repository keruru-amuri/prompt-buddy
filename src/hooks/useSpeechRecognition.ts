'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface VoiceCommand {
  command: string;
  action: () => void;
}

interface UseSpeechRecognitionProps {
  onTranscript?: (transcript: string) => void;
  onSpeakingRateChange?: (wordsPerMinute: number) => void;
  voiceCommands?: VoiceCommand[];
  enabled?: boolean;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  speakingRate: number;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

// Helper to check if speech recognition is supported
function getIsSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Use useSyncExternalStore for SSR-safe support detection
function subscribeToNothing() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

export function useSpeechRecognition({
  onTranscript,
  onSpeakingRateChange,
  voiceCommands = [],
  enabled = false,
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speakingRate, setSpeakingRate] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // SSR-safe support detection
  const isSupported = useSyncExternalStore(subscribeToNothing, getIsSupported, getServerSnapshot);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const wordCountRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  // Process voice commands
  const processVoiceCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase().trim();
    
    for (const { command, action } of voiceCommands) {
      if (lowerText.includes(command.toLowerCase())) {
        action();
        return true;
      }
    }
    return false;
  }, [voiceCommands]);

  // Calculate speaking rate (words per minute)
  const calculateSpeakingRate = useCallback(() => {
    const now = Date.now();
    
    if (startTimeRef.current === 0) {
      startTimeRef.current = now;
      return 0;
    }

    const elapsedMinutes = (now - startTimeRef.current) / 60000;
    
    if (elapsedMinutes > 0 && wordCountRef.current > 0) {
      const wpm = Math.round(wordCountRef.current / elapsedMinutes);
      return wpm;
    }
    
    return 0;
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!enabled || !isSupported) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);
      
      // Check for voice commands
      if (finalTranscript) {
        processVoiceCommand(finalTranscript);
      }

      // Calculate speaking rate based on word count
      if (finalTranscript) {
        const words = finalTranscript.split(/\s+/).filter(w => w.length > 0);
        wordCountRef.current += words.length;
        
        const wpm = calculateSpeakingRate();
        if (wpm > 0) {
          setSpeakingRate(wpm);
          onSpeakingRateChange?.(wpm);
        }
      }

      onTranscript?.(currentTranscript);
    };

    recognition.onerror = () => {
      setError('Speech recognition error');
      setIsListening(false);
    };

    recognition.onend = () => {
      // Restart will be handled by the component if needed
      setIsListening(false);
    };

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      startTimeRef.current = Date.now();
      wordCountRef.current = 0;
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [enabled, isSupported, onTranscript, onSpeakingRateChange, processVoiceCommand, calculateSpeakingRate]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start();
        startTimeRef.current = Date.now();
        wordCountRef.current = 0;
      } catch {
        setError('Failed to start speech recognition');
      }
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    speakingRate,
    isSupported,
    error,
    startListening,
    stopListening,
  };
}
