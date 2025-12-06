# Prompt Buddy - AI Teleprompter

An AI-powered teleprompter application that works seamlessly on both mobile and desktop devices. Create, edit, and deliver your scripts with ease using intelligent AI features.

## ✨ AI-Powered Features

### 🎤 Voice-Paced Scrolling
The teleprompter automatically adjusts scroll speed to match your natural speaking pace using the Web Speech API. No more fumbling with speed controls - just speak naturally and the prompter follows along.

### 🗣️ Voice Commands
Control your teleprompter completely hands-free with voice commands:
- **"Pause"** - Pause scrolling
- **"Resume"** / **"Play"** - Resume scrolling
- **"Stop"** - Stop and reset to beginning
- **"Faster"** - Increase scroll speed
- **"Slower"** - Decrease scroll speed

### 🤖 AI Script Generator
Generate professional scripts instantly with our AI-powered script generator:
- **Multiple Script Types**: Introduction, Tutorial, Product Review, Story/Vlog, Educational
- **Tone Control**: Professional, Casual, Enthusiastic, Educational, Conversational
- **Duration Targeting**: Short (1-2 min), Medium (3-5 min), Long (8-10 min)
- **Custom Key Points**: Include specific topics you want covered

## Core Features

- 📝 **Script Editor** - Write or paste your script with an intuitive text editor
- 🎬 **Smooth Scrolling** - Auto-scrolling text with adjustable speed
- 🔠 **Font Size Control** - Adjust text size for optimal readability
- 🪞 **Mirror Mode** - Flip text horizontally for traditional teleprompter setups
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🌙 **Dark Theme** - Easy on the eyes during recording sessions
- ⏯️ **Play/Pause Controls** - Simple controls to manage your presentation

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/keruru-amuri/prompt-buddy.git
cd prompt-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page with teleprompter
├── components/
│   ├── AIFeaturesPanel.tsx    # AI features control panel
│   ├── AIScriptGenerator.tsx  # AI script generation modal
│   ├── Controls.tsx           # Play/pause and settings controls
│   ├── Header.tsx             # Application header
│   ├── Teleprompter.tsx       # Main teleprompter display
│   ├── TextEditor.tsx         # Script input editor
│   └── VoiceControlPanel.tsx  # Voice control settings
└── hooks/
    └── useSpeechRecognition.ts  # Speech recognition hook for voice features
```

## Usage

### Basic Usage
1. **Enter your script**: Type or paste your script in the text editor at the top
2. **Adjust settings**: Click the settings icon to access speed and font size controls
3. **Start scrolling**: Press the play button to begin auto-scrolling
4. **Pause anytime**: Click pause to stop and resume later
5. **Reset**: Use the reset button to return to the beginning

### Using AI Features
1. **Expand AI Panel**: Click the "AI Features" panel at the bottom to expand it
2. **Generate a Script**: Click "AI Script Generator" to create a new script with AI assistance
3. **Enable Voice Pacing**: Toggle "Voice Pacing" to have the scroll speed automatically adjust to your speaking pace
4. **Enable Voice Commands**: Toggle "Voice Commands" to control the teleprompter hands-free
5. **Grant Microphone Access**: When prompted, allow microphone access for voice features to work

### Browser Compatibility
Voice features (Voice Pacing and Voice Commands) require a browser that supports the Web Speech API:
- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Safari (macOS/iOS)
- ⚠️ Firefox (limited support)

## Responsive Design

The application is fully responsive and adapts to different screen sizes:
- **Mobile**: Optimized touch controls and compact layout
- **Tablet**: Balanced layout with accessible controls
- **Desktop**: Full-featured experience with expanded settings

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npx vercel
```

Or deploy to any platform that supports Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

