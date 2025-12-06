'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Wand2, X } from 'lucide-react';

interface AIScriptGeneratorProps {
  onScriptGenerated: (script: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Script templates and enhancements
const SCRIPT_TEMPLATES = {
  introduction: {
    name: 'Introduction/Welcome',
    template: (topic: string, tone: string) => 
      `[Opening]\nHey everyone, welcome! Today we're diving into ${topic}.\n\n[Hook]\nYou might be wondering why ${topic} matters - and trust me, by the end of this, you'll see exactly why it's so important.\n\n[Preview]\nHere's what we're going to cover:\n- First, we'll look at the basics\n- Then, we'll explore some key insights\n- Finally, I'll share my top tips\n\n[Transition]\nSo let's jump right in!\n\n[Note: Adjust tone to be ${tone}]`,
    
  },
  tutorial: {
    name: 'Tutorial/How-To',
    template: (topic: string, tone: string) => 
      `[Title Card]\nHow to ${topic} - Step by Step Guide\n\n[Introduction]\nIn this tutorial, I'm going to show you exactly how to ${topic}. Whether you're a beginner or looking to level up your skills, this guide has got you covered.\n\n[Step 1]\nLet's start with the first step...\n[Explain the foundational concept here]\n\n[Step 2]\nNext, we need to...\n[Build on the previous step]\n\n[Step 3]\nNow for the important part...\n[This is where the magic happens]\n\n[Pro Tips]\nHere are some insider tips that'll save you time:\n- Tip 1: [Add your insight]\n- Tip 2: [Add your insight]\n\n[Conclusion]\nAnd that's how you ${topic}! If you found this helpful, let me know in the comments.\n\n[Note: Keep the tone ${tone}]`,
  },
  product: {
    name: 'Product Review/Demo',
    template: (topic: string, tone: string) => 
      `[Opening Shot]\nIs ${topic} worth it? Let's find out!\n\n[First Impressions]\nWhen I first got my hands on this, here's what I noticed...\n[Describe initial thoughts]\n\n[Features Overview]\nLet's talk about what makes this stand out:\n- Feature 1: [Describe]\n- Feature 2: [Describe]\n- Feature 3: [Describe]\n\n[Real-World Use]\nI've been using this for [timeframe], and here's my honest experience...\n[Share genuine experiences]\n\n[Pros]\n✓ [Advantage 1]\n✓ [Advantage 2]\n\n[Cons]\n✗ [Drawback 1]\n✗ [Drawback 2]\n\n[Verdict]\nSo, should you get ${topic}? Here's my final take...\n\n[Note: Maintain a ${tone} approach throughout]`,
  },
  story: {
    name: 'Story/Vlog',
    template: (topic: string, tone: string) => 
      `[Hook - Start with action]\n[Begin mid-scene to capture attention]\n\n[Context]\nSo here's the story about ${topic}...\n[Set the scene]\n\n[Rising Action]\nThings started to get interesting when...\n[Build tension]\n\n[Climax]\nAnd then, the moment came...\n[The peak of your story]\n\n[Resolution]\nAfter everything, here's how it all worked out...\n[Wrap up the narrative]\n\n[Reflection]\nLooking back, what I learned from ${topic} is...\n[Share your takeaway]\n\n[Call to Action]\nHave you ever experienced something like this? Drop a comment!\n\n[Note: Tell the story in a ${tone} way]`,
  },
  educational: {
    name: 'Educational/Explainer',
    template: (topic: string, tone: string) => 
      `[Attention Grabber]\nDid you know that ${topic}? Let me explain...\n\n[The Problem/Question]\nMany people wonder about ${topic}, and it's actually more fascinating than you might think.\n\n[Background]\nTo understand this, we first need to know...\n[Provide context]\n\n[Main Explanation]\nHere's how ${topic} actually works:\n\n1. [First key point]\n   - [Supporting detail]\n\n2. [Second key point]\n   - [Supporting detail]\n\n3. [Third key point]\n   - [Supporting detail]\n\n[Real-World Applications]\nThis matters because...\n[Connect to practical uses]\n\n[Summary]\nSo to recap, ${topic} is all about...\n[Brief summary]\n\n[Engagement]\nWhat questions do you have about ${topic}?\n\n[Note: Present in a ${tone} manner]`,
  },
};

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual & Friendly' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'educational', label: 'Educational' },
  { value: 'conversational', label: 'Conversational' },
];

const DURATION_OPTIONS = [
  { value: 'short', label: 'Short (1-2 min)', words: 150 },
  { value: 'medium', label: 'Medium (3-5 min)', words: 400 },
  { value: 'long', label: 'Long (8-10 min)', words: 800 },
];

export default function AIScriptGenerator({
  onScriptGenerated,
  isOpen,
  onClose,
}: AIScriptGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof SCRIPT_TEMPLATES>('introduction');
  const [tone, setTone] = useState('professional');
  const [duration, setDuration] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [keyPoints, setKeyPoints] = useState('');

  const generateScript = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with smart template-based generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const template = SCRIPT_TEMPLATES[selectedTemplate];
    let script = template.template(topic, tone);
    
    // Add key points if provided
    if (keyPoints.trim()) {
      const points = keyPoints.split('\n').filter(p => p.trim());
      const pointsSection = points.map((point, i) => `\n[Key Point ${i + 1}]\n${point.trim()}`).join('\n');
      script = script.replace('[Transition]', `[Your Key Points]${pointsSection}\n\n[Transition]`);
    }
    
    // Add duration-based pacing notes
    const durationConfig = DURATION_OPTIONS.find(d => d.value === duration);
    const pacingNote = `\n\n---\n[Pacing Guide]\nTarget duration: ${durationConfig?.label}\nRecommended word count: ~${durationConfig?.words} words\nCurrent word count: ${script.split(/\s+/).length} words\nSpeak at a natural pace, about 130-150 words per minute for ${tone} delivery.\n---`;
    
    script += pacingNote;
    
    onScriptGenerated(script);
    setIsGenerating(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Script Generator</h2>
              <p className="text-sm text-gray-400">Create professional scripts in seconds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              What&apos;s your video about?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Building a successful YouTube channel"
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Script Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(SCRIPT_TEMPLATES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key as keyof typeof SCRIPT_TEMPLATES)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedTemplate === key
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone & Style
            </label>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    tone === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDuration(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    duration === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Key Points to Include (optional)
            </label>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="Enter key points, one per line..."
              rows={3}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={generateScript}
            disabled={!topic.trim() || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Script
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
