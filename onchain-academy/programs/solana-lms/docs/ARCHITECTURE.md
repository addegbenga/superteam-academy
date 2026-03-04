# Architecture

This document describes the system architecture, component structure, data flow, and service interfaces for Superteam Academy.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Next.js)                         │
├─────────────────────────────────────────────────────────────────┤
│  apps/web (Landing)  │  apps/lms (Learning Platform)          │
│  - Public pages      │  - Dashboard, Courses, Lessons        │
│  - Marketing         │  - Profile, Leaderboard                │
└──────────┬────────────┴─────────────────────────┬───────────────┘
           │                                     │
           ▼                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Service Layer (Learning Service)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Mock Impl   │  │ Solana Impl │  │ Future: Indexer Client  │ │
│  │ (localStorage)│ │ (On-chain) │  │ (Mainnet)              │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└──────────┬─────────────────────────────┬───────────────────────┘
           │                             │
           ▼                             ▼
┌─────────────────────┐      ┌──────────────────────────────────┐
│    Sanity CMS       │      │      Solana Blockchain          │
│  - Course content   │      │  - XP Token-2022 (soulbound)    │
│  - Lessons          │      │  - Credentials (cNFTs)         │
│  - Achievements     │      │  - Enrollment PDAs             │
└─────────────────────┘      └──────────────────────────────────┘
```

## Component Structure

### Apps

| App     | Port | Purpose                 |
| ------- | ---- | ----------------------- |
| `web`   | 3000 | Landing page, marketing |
| `lms`   | 3001 | Main learning platform  |
| `admin` | 3002 | Sanity Studio CMS       |

### Packages

| Package                       | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| `@workspace/learning-service` | Gamification service interface + implementations |
| `@workspace/sanity-client`    | Type-safe CMS client                             |
| `@workspace/ui`               | Shared shadcn/ui components                      |

## Data Flow

### Course Enrollment

```
User clicks "Enroll" →
  useCourse().enrollInCourse() →
  MockLearningService.enrollInCourse() →
  localStorage (progress_{userId}_{courseId})
  │
  └─> Server Action → Sanity (update enrollment count)
```

### Lesson Completion

```
User clicks "Complete" →
  useCourse().completeLesson() →
  MockLearningService.completeLesson() →
    1. Update localStorage progress
    2. Add XP (localStorage)
    3. Update streak
    4. Check achievements
    │
    └─> Server Action → Sanity (update completion count)
```

### XP & Leveling

- **XP**: Stored in localStorage (`xp_{userId}`)
- **Level Formula**: `Level = floor(sqrt(xp / 100))`
- **On-Chain Future**: XP token balance via Token-2022 ATA

## Service Interfaces

### LearningProgressService

Defined in `packages/learning-service/src/interfaces.ts`:

```typescript
interface LearningProgressService {
  // Progress
  getProgress(data: { userId: string; courseId: string }): Promise<Progress>;
  completeLesson(data: LessonPayload): Promise<CompleteLessonResult>;
  enrollInCourse(data: CoursePayload): Promise<EnrollResult>;

  // XP & Leveling
  getXP(data: { userId: string }): Promise<number>;
  getLevel(data: { userId: string }): Promise<number>;
  addXP(data: { userId: string; amount: number }): Promise<void>;

  // Streaks
  getStreak(userId: string): Promise<StreakData>;

  // Leaderboard
  getLeaderboard(data: {
    timeframe: "weekly" | "monthly" | "alltime";
  }): Promise<LeaderboardEntry[]>;

  // Credentials
  getCredentials(data: { wallet: PublicKey }): Promise<Credential[]>;

  // Achievements
  getAchievements(data: { userId: string }): Promise<Achievement[]>;
  unlockAchievement(data: {
    userId: string;
    achievementId: string;
  }): Promise<void>;
}
```

### Implementations

| Implementation | Location                                       | Description              |
| -------------- | ---------------------------------------------- | ------------------------ |
| Mock           | `packages/learning-service/src/mock-impl.ts`   | localStorage-based (dev) |
| Solana         | `packages/learning-service/src/solana-impl.ts` | On-chain (future)        |

## State Management

### React Query

All data fetching uses TanStack Query:

```typescript
// Query keys
const courseQueries = {
  all: ["courses"] as const,
  lists: () => [...courseQueries.all, "list"] as const,
  list: (filters: CourseFilters) =>
    [...courseQueries.lists(), filters] as const,
  bySlug: (slug: string, lang?: string) =>
    [...courseQueries.all, "slug", slug, lang] as const,
};
```

### Query Structure

| Query          | Source       | Caching  |
| -------------- | ------------ | -------- |
| Course list    | Sanity GROQ  | 5 min    |
| Course detail  | Sanity GROQ  | 5 min    |
| Lesson content | Sanity GROQ  | 5 min    |
| User progress  | localStorage | No cache |
| XP balance     | localStorage | No cache |
| Leaderboard    | Mock/API     | 1 min    |

## On-Chain Integration Points

### PDAs (Program Derived Addresses)

| PDA                  | Seeds                            | Description                |
| -------------------- | -------------------------------- | -------------------------- |
| `Config`             | `["config"]`                     | Platform configuration     |
| `Course`             | `["course", course_id]`          | On-chain course data       |
| `Enrollment`         | `["enrollment", user, course]`   | Per-user course progress   |
| `AchievementType`    | `["achievement", id]`            | Achievement definition     |
| `AchievementReceipt` | `["receipt", user, achievement]` | User's earned achievements |

### Instructions

| Instruction         | Description                   |
| ------------------- | ----------------------------- |
| `initialize`        | Set up platform config        |
| `create_course`     | Create on-chain course        |
| `enroll`            | Enroll user in course         |
| `complete_lesson`   | Mark lesson complete, mint XP |
| `finalize_course`   | Mark course complete          |
| `issue_credential`  | Mint credential NFT           |
| `claim_achievement` | Unlock achievement            |

### XP Token

- **Mint**: Token-2022 with NonTransferable extension
- **Metadata**: Soulbound, PermanentDelegate
- **Balance**: User's XP = token balance

### Credential NFT

- **Standard**: Metaplex Core
- **Attributes**: track, level, courses_completed, total_xp
- **Soulbinding**: PermanentFreezeDelegate

## Security Considerations

- **Wallet Validation**: All on-chain ops require signed transaction
- **CPI Verification**: Validate target program IDs in cross-program invocations
- **Arithmetic**: Use checked math for XP calculations
- **Bump Storage**: Canonical PDA bumps stored on initialization

## Performance Targets

| Metric     | Target  |
| ---------- | ------- |
| LCP        | < 2.5s  |
| FID        | < 100ms |
| CLS        | < 0.1   |
| Lighthouse | 90+     |

## Future Enhancements

- **Indexer**: Replace localStorage with on-chain indexer (Helius DAS API)
- **Backend**: Server Actions for write operations
- **Auth**: Google/GitHub OAuth integration
- **PWA**: Offline-capable learning
