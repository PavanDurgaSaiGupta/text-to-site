# FitNimbus ⚡

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://PavanDurgaSaiGupta.github.io/text-to-site/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> **Fitness Reimagined.** Real-time camera motion analysis meets retro-brutalist simplicity. AI coaching, personalized hero workout protocols, gamified arena battles, and smart nutrition planning — all in one client-side powerhouse.

🔗 **Live Application**: [https://PavanDurgaSaiGupta.github.io/text-to-site/](https://PavanDurgaSaiGupta.github.io/text-to-site/)

---

## 📸 Key Features

### 1. 🤖 AI Coach & Real-Time Motion Analysis
- **Live Video Feed**: Direct camera integration via `react-webcam`.
- **Pixel-Difference Motion Tracking**: High-performance canvas frame sampling comparing consecutive video frames to calculate real-time movement velocity and workout intensity (0–100%).
- **Adaptive Coaching Feedback**: Real-time feedback cues (*"High activity detected!"*, *"Good movement!"*, *"Slow and steady"*, *"Hold position"*).
- **Interactive Timers & Controls**: Start, pause, reset, and log workout session duration and energy expenditure.

### 2. 🦸 Hero Workout Protocols
- **Iconic Pre-Configured Routines**:
  - **Saiyan Strength (Goku)**: High-volume explosive plyometrics and power training.
  - **Dark Knight Protocol (Batman)**: Functional combat conditioning, calisthenics, and core endurance.
  - **Stay Hard (David Goggins)**: Pure aerobic endurance, mental conditioning, and high-rep bodyweight mastery.
  - **One Punch (Saitama)**: The legendary 100 pushups, 100 situps, 100 squats, 10km daily protocol.
- **Detailed Breakdowns**: Exercise sets, reps, training philosophies, warm-up protocols, and recovery guides.

### 3. ✨ "Become Your Hero" — AI Custom Plan Generator
- Describe any fictional or real hero, athlete, or personal archetype in natural language.
- Generates customized routines, workout splits, dietary advice, and training ethos via the **Google Gemini API**.
- One-click saving to `localStorage` with persistence across browser sessions.

### 4. 🥊 Battle Arena & Gamification
- Dynamic leaderboard rankings, XP progression, and level-up milestones.
- Daily challenges and quest tracking to turn physical consistency into an RPG loop.

### 5. 🥗 Intelligent Diet & Nutrition Planner
- Daily target calorie, protein, carbohydrate, and fat calculators based on body metrics.
- Meal logging, macro breakdown visualization with interactive charts, and hydration tracking.

### 6. 💬 Persistent Global AI Assistant
- Context-aware brutalist chatbot floating widget available across all app sections.
- Answers questions regarding exercises, nutritional advice, form cues, and platform navigation.

---

## 🛠️ Technology Stack Breakdown

| Category | Technologies / Libraries |
| :--- | :--- |
| **Core & Framework** | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) (`HashRouter` for zero-configuration static deployment) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (Accordion, Alert Dialog, Avatar, Dialog, Dropdown Menu, Popover, Progress, Slider, Tabs, Toast, Tooltip, etc.), [shadcn/ui](https://ui.shadcn.com/) |
| **Styling & Theming** | [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`, `clsx`, `tailwind-merge`, `class-variance-authority`, `next-themes` |
| **Icons & Media** | [Lucide React](https://lucide.dev/), [React Webcam](https://www.npmjs.com/package/react-webcam) |
| **Data & State Management** | [TanStack React Query v5](https://tanstack.com/query/latest), React Hooks, LocalStorage State Persistence |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), `@hookform/resolvers` |
| **Data Visualization** | [Recharts](https://recharts.org/) (Interactive Macro & Progress charts) |
| **AI & Backend Services** | [Google Gemini API](https://ai.google.dev/), [Supabase JS](https://supabase.com/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/), Radix Toast |
| **Deployment & Tooling** | [gh-pages](https://www.npmjs.com/package/gh-pages), ESLint, PostCSS, Autoprefixer |

---

## 📁 Repository Structure

```
text-to-site/
├── public/
│   ├── .nojekyll           # Prevents GitHub Pages Jekyll asset ignoring
│   ├── favicon.ico         # App favicon
│   ├── placeholder.svg     # UI placeholder asset
│   └── robots.txt          # Web crawler configuration
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication modal and forms
│   │   ├── features/       # Global chatbot, skeleton demos, AI tools
│   │   ├── navigation/     # Responsive navbar & mobile menu
│   │   ├── onboarding/     # Initial user profiling and questionnaire
│   │   └── ui/             # Reusable shadcn/Radix UI components
│   ├── hooks/
│   │   ├── useAIChat.tsx   # Hook for Gemini chat conversations
│   │   ├── useAuth.tsx     # Client auth state management
│   │   ├── useTheme.tsx    # Theme toggling and state hook
│   │   └── use-toast.ts    # Notification toast hook
│   ├── integrations/
│   │   └── supabase/       # Supabase client configuration
│   ├── lib/
│   │   └── utils.ts        # Class merging and general helper functions
│   ├── pages/
│   │   ├── AICoach.tsx        # Motion tracking & live camera analysis
│   │   ├── BattleArena.tsx    # Leaderboard & gamification
│   │   ├── BecomeYourHero.tsx # AI-generated custom hero workout plans
│   │   ├── Community.tsx      # Community feed and discussion
│   │   ├── Dashboard.tsx      # Central hub with quick metrics & shortcuts
│   │   ├── DietPlanner.tsx    # Macro calculator & nutrition tracker
│   │   ├── HeroWorkout.tsx    # Curated superhero training programs
│   │   ├── Index.tsx          # Main authenticated layout router
│   │   └── NotFound.tsx       # 404 page fallback
│   ├── App.tsx             # Root component with HashRouter & Providers
│   ├── main.tsx            # React DOM root render entrypoint
│   └── index.css           # Global Tailwind & design system token definitions
├── index.html              # HTML shell with meta tags & SEO
├── package.json            # Project dependencies & build/deploy scripts
├── tailwind.config.ts      # Tailwind color schemes & animations
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build config with base path for GitHub Pages
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) (or `yarn` / `pnpm` / `bun`)

### 1. Clone the Repository
```bash
git clone https://github.com/PavanDurgaSaiGupta/text-to-site.git
cd text-to-site
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:8080` (or the URL output in your terminal).

### 4. Build for Production
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

---

## 🌐 GitHub Pages Deployment

This repository is pre-configured for automated single-command GitHub Pages deployment using `gh-pages` and `HashRouter`:

```bash
npm run deploy
```

What this does under the hood:
1. Runs `npm run build` (`predeploy` hook) to bundle optimized assets into `dist/`.
2. Pushes the `dist/` directory contents directly to the `gh-pages` branch on GitHub.
3. Serves the app at `https://PavanDurgaSaiGupta.github.io/text-to-site/`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ⚡ by [Pavan Durga Sai Gupta](https://github.com/PavanDurgaSaiGupta).
