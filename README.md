# The Prompt

Create a complete web app using React and Vite for an AI-powered DJ that mixes music based on the user’s mood. The app should:

➡️ TECH & FRAMEWORK
- Use React + Vite as the front-end framework.
- TailwindCSS for responsive, mobile-friendly styling.
- Include Framer Motion for subtle animations.
- Include a favicon and appropriate Open Graph meta tags.

➡️ FEATURES
- Let users select or input their current **mood** (emoji selector).
- Based on the mood, fetch and display a dynamic playlist (use a mock JSON or public music API placeholder with BYO API key integration).
- Display album art, track title, artist name, and duration.
- Provide basic audio player controls (play, pause, skip).
- Include a "shuffle" button to remix suggestions based on similar moods.

➡️ CONFIG / ENV
- Include support for `.env` with a placeholder for a BYO (bring-your-own) API key.
- Fallback to static JSON for development if API key is not present.

➡️ UI/UX
- Mobile-first responsive layout.
- Hero section with title: "VibeMixer – Let AI Be Your DJ"
- Mood input and playlist visible on the same screen.
- Display a short mood-based quote or vibe message under the playlist.
- Include smooth transitions between mood changes and playlist refreshes.

➡️ META
- Add favicon (use any placeholder icon).
- Include Open Graph tags: title, description, image, and URL.
- Add meta tags for responsive mobile support and social sharing optimization.

➡️ STRUCTURE
- Organize components into folders: components/, pages/, hooks/, assets/
- Provide a utils file for API and mood mapping logic.

➡️ BONUS
- Add a "Save to Spotify" button (non-functional placeholder).
- Light/dark mode toggle.

Name the project folder `vibemixer-ai`.

Example output directory:

```bash
vibemixer-ai/
├── index.html
├── vite.config.ts
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   │   └── MoodSelector.tsx
│   │   └── Player.tsx
│   │   └── Playlist.tsx
│   ├── hooks/
│   │   └── useMoodPlaylist.ts
│   ├── pages/
│   │   └── Home.tsx
│   ├── utils/
│   │   └── api.ts
│   │   └── moodMap.ts
│   ├── styles/
│   │   └── index.css (Tailwind)
├── .env.example
├── package.json
├── README.md
```

---
# VibeMixer - AI-Powered DJ 🎵

VibeMixer is a beautiful, AI-powered music discovery app that creates personalized playlists based on your current mood. Built with React, Vite, and Tailwind CSS, it features a modern glassmorphism design with smooth animations.

![Screenshot 1](https://res.cloudinary.com/moyadev/image/upload/v1751208150/maia/Brave_Browser_at_09.38_PM_nqrgbm.jpg)

![Screenshot 2](https://res.cloudinary.com/moyadev/image/upload/v1751208168/maia/Brave_Browser_at_09.38_PM_2_uf9v9i.jpg)

![Screenshot 3](https://res.cloudinary.com/moyadev/image/upload/v1751208167/maia/Brave_Browser_at_09.39_PM_fvolga.jpg)

![Screenshot 4](https://res.cloudinary.com/moyadev/image/upload/v1751208170/maia/Brave_Browser_at_09.39_PM_2_ri3n2s.jpg)

## Features ✨

- **Mood-Based Playlists**: Select your current mood and get AI-curated playlists
- **Beautiful UI**: Modern glassmorphism design with smooth Framer Motion animations
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Audio Player**: Full-featured player with play, pause, skip, and shuffle controls
- **Spotify Integration**: Ready for Spotify API integration (placeholder implemented)
- **Progressive Web App**: Optimized for mobile with proper meta tags

## Tech Stack 🛠️

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibemixer-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys to the `.env` file:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Integration 🔌

VibeMixer is designed to work with the Spotify Web API for real music data. Currently, it uses mock data for development.

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get your Client ID and Client Secret
4. Add them to your `.env` file
5. The app will automatically use real Spotify data when API keys are configured

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── MoodSelector.tsx
│   ├── Player.tsx
│   ├── Playlist.tsx
│   └── ThemeToggle.tsx
├── hooks/              # Custom React hooks
│   ├── useAudioPlayer.ts
│   ├── useMoodPlaylist.ts
│   └── useTheme.tsx
├── pages/              # Page components
│   └── Home.tsx
├── types/              # TypeScript type definitions
│   └── music.ts
├── utils/              # Utility functions
│   ├── api.ts
│   ├── moodMap.ts
│   └── mockData.ts
└── styles/             # Global styles
    └── index.css
```

## Moods Available 🎭

- **Happy** 😊 - Upbeat & Joyful
- **Sad** 😢 - Melancholic & Reflective
- **Energetic** ⚡ - High Energy & Pumped
- **Calm** 🧘 - Peaceful & Relaxing
- **Romantic** 💕 - Love & Intimacy
- **Focused** 🎯 - Concentration & Study
- **Nostalgic** 🌅 - Memories & Throwbacks
- **Chill** 🌊 - Laid-back & Mellow

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Images from [Pexels](https://pexels.com) for album art placeholders
- Icons from [Lucide React](https://lucide.dev)
- Design inspiration from modern music streaming apps

---

**VibeMixer** - Let AI be your DJ! 🎵✨