# Superteam Academy

An open-source, interactive learning management system (LMS) for Solana development education. Build production-ready Solana dApps through gamified courses with on-chain credentials.

## Overview

Superteam Academy is a decentralized learning platform where developers:

- Learn Solana development through interactive, project-based courses
- Earn XP (soulbound Token-2022 tokens) for completing lessons
- Receive verifiable Metaplex Core NFT credentials for course completion
- Track progress with streaks, achievements, and leaderboards

## Tech Stack

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| **Frontend**    | Next.js 14+ (App Router), React 19, TypeScript  |
| **Styling**     | Tailwind CSS, shadcn/ui                         |
| **State**       | TanStack Query (React Query)                    |
| **Code Editor** | Monaco Editor                                   |
| **CMS**         | Sanity.io (Headless)                            |
| **Blockchain**  | Solana, Anchor 0.31+                            |
| **Tokens**      | Token-2022 (NonTransferable, PermanentDelegate) |
| **Credentials** | Metaplex Core NFTs                              |
| **Wallet**      | Solana Wallet Adapter                           |

## Project Structure

```
superteam-academy/
├── apps/
│   ├── web/           # Landing page (public)
│   ├── lms/           # Learning platform (authenticated)
│   └── admin/         # Sanity Studio (CMS)
├── packages/
│   ├── learning-service/   # Gamification service interface
│   ├── sanity-client/      # CMS client
│   ├── ui/                # Shared UI components
│   ├── eslint-config/
│   └── typescript-config/
├── docs/                   # Documentation
└── wallets/                # Keypairs (gitignored)
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Solana CLI 1.18+ (for local development)
- Sanity CLI (for CMS management)

### Installation

```bash
# Clone the repository
git clone https://github.com/solanabr/superteam-academy.git
cd superteam-academy

# Install dependencies
pnpm install

# Build shared packages
pnpm build
```

### Environment Variables

Create `.env.local` in `apps/lms/`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# Solana (Devnet)
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Optional: Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

Create `.env.local` in `apps/admin/`:

```env
# Sanity Studio
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your_write_token
```

### Running the Development Server

```bash
# Start all apps in parallel
pnpm dev

# Or start individual apps:
pnpm --filter web dev      # Landing page: http://localhost:3000
pnpm --filter lms dev      # LMS: http://localhost:3001
pnpm --filter admin dev    # CMS: http://localhost:3002
```

## Features

### Learning Platform

- **Course Catalog** - Browse and filter courses by difficulty, track, duration
- **Lesson View** - Split-pane with content + Monaco code editor
- **Code Challenges** - Interactive coding with test case validation
- **Progress Tracking** - Per-course progress with lesson completion bitmap

### Gamification

- **XP System** - Soulbound Token-2022 tokens (Level = floor(sqrt(xp / 100)))
- **Streaks** - Daily activity tracking with milestone rewards
- **Achievements** - Badges for progress, streaks, and skills
- **Leaderboard** - Global rankings by XP (weekly/monthly/all-time)

### Credentials

- **NFT Badges** - Metaplex Core NFTs for course completion
- **On-Chain Verification** - Credentials verifiable on Solana Explorer

### Internationalization

- **Supported Languages**: English (EN), Spanish (ES), Portuguese (PT)
- **Localized Content**: UI strings and course content

## Deployment

### Vercel (Frontend)

```bash
# Deploy web app
cd apps/web
vercel deploy --prod

# Deploy LMS
cd apps/lms
vercel deploy --prod
```

### Sanity (CMS)

```bash
cd apps/admin
sanity deploy
```

### Solana Program

```bash
# Build the Anchor program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet (requires confirmation)
anchor deploy --provider.cluster mainnet
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and data flow
- [CMS Guide](./docs/CMS_GUIDE.md) - Managing courses and content
- [Customization](./docs/CUSTOMIZATION.md) - Theming and extensions
- [Integration](./docs/INTEGRATION.md) - On-chain program integration

## License

MIT License - See LICENSE file for details.
