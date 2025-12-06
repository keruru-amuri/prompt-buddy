# Prompt Buddy - AI Teleprompter

An AI-powered teleprompter application that works seamlessly on both mobile and desktop devices. Create, edit, and deliver your scripts with ease.

## Features

- 📝 **Script Editor** - Write or paste your script with an intuitive text editor
- 🎬 **Smooth Scrolling** - Auto-scrolling text with adjustable speed
- 🔠 **Font Size Control** - Adjust text size for optimal readability
- 🪞 **Mirror Mode** - Flip text horizontally for traditional teleprompter setups
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🌙 **Dark Theme** - Easy on the eyes during recording sessions
- ⏯️ **Play/Pause Controls** - Simple controls to manage your presentation

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
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
│   ├── Controls.tsx     # Play/pause and settings controls
│   ├── Header.tsx       # Application header
│   ├── Teleprompter.tsx # Main teleprompter display
│   └── TextEditor.tsx   # Script input editor
```

## Usage

1. **Enter your script**: Type or paste your script in the text editor at the top
2. **Adjust settings**: Click the settings icon to access speed and font size controls
3. **Start scrolling**: Press the play button to begin auto-scrolling
4. **Pause anytime**: Click pause to stop and resume later
5. **Reset**: Use the reset button to return to the beginning

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

