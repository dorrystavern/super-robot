# Sight Word Flashcards

A React app for practicing Dolch sight words using your voice. Words are shown one at a time on a flashcard — the app listens via the browser's Speech Recognition API and automatically advances when you say the word correctly.

## Features

- **Pre-built word lists** for Kindergarten through 3rd grade (Dolch sight words)
- **Custom word lists** — enter any comma-separated words
- **Voice recognition** — say the word aloud to move to the next card
- **Text-to-speech** — hear the word pronounced on demand (Google US-en voice)
- **Score summary** — see which words were correct and which were skipped

> **Browser requirement:** Speech recognition requires **Chrome or Edge**. The app still works in other browsers — use the Skip button to advance through cards.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173/super-robot/](http://localhost:5173/super-robot/) in your browser.

### Build for production

```bash
npm run build
```

The output is written to `dist/`. You can preview the production build locally with:

```bash
npm run preview
```

## Deploying to GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the app whenever you push to `main`.

**One-time setup:**

1. Push your code to `main`
2. Go to your repository's **Settings → Pages**
3. Set the source to **Deploy from a branch**, select the `gh-pages` branch, and save

The app will be available at `https://<your-username>.github.io/super-robot/`.

## Project structure

```
src/
├── App.jsx                     # Root component — screen and game state
├── index.css                   # Global styles
├── main.jsx                    # React entry point
├── components/
│   ├── MenuScreen.jsx          # Word list selection and Play button
│   ├── FlashcardScreen.jsx     # Card display, speech recognition, controls
│   └── SummaryScreen.jsx       # Score results overlay
├── data/
│   └── wordLists.js            # Dolch word lists and utility functions
└── hooks/
    ├── useSpeechRecognition.js # Web Speech API recognition hook
    └── useSpeechSynthesis.js   # SpeechSynthesis hook (Google US-en voice)
```

## Word lists

| Grade | Source | Words |
|---|---|---|
| Kindergarten | Dolch Pre-Primer | 40 |
| 1st Grade | Dolch Primer | 52 |
| 2nd Grade | Dolch First Grade | 40 |
| 3rd Grade | Dolch Second Grade | 46 |
