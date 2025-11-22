# Lords Hub Customer Side

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hamidtalib567-7897s-projects/v0-lords-hub-customer-side)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/kbo5WX6dOaN)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project set up

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lords-hub-customer-side
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

   You can find these values in your Firebase Console > Project Settings > General

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates `out` directory for static export)
- `npm start` - Start production server (Note: not used with static export)
- `npm run lint` - Run ESLint

### Deployment to Firebase Hosting

1. Build the Next.js app:
```bash
npm run build
```

2. Deploy to Firebase Hosting:
```bash
firebase deploy --only hosting
```

The app will be built as static files in the `out` directory, which Firebase Hosting will serve.

## Deployment

Your project is live at:

**[https://vercel.com/hamidtalib567-7897s-projects/v0-lords-hub-customer-side](https://vercel.com/hamidtalib567-7897s-projects/v0-lords-hub-customer-side)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/kbo5WX6dOaN](https://v0.app/chat/kbo5WX6dOaN)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
