'use client';

import { Mic2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-blue-600">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Prompt Buddy
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              AI-Powered Teleprompter
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 hidden sm:inline">
            v0.1.0
          </span>
        </div>
      </div>
    </header>
  );
}
