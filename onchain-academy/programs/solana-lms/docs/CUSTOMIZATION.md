# Customization

This guide covers how to customize the Superteam Academy platform—theming, adding languages, and extending gamification.

## Theme Customization

### Colors

The platform uses CSS variables for theming. Edit `apps/lms/app/globals.css`:

```css
:root {
  /* Primary (brand color) */
  --primary: 142 86% 56%; /* Solana green */
  --primary-foreground: 0 0% 0%;

  /* Secondary */
  --secondary: 240 5% 96% 10%;
  --secondary-foreground: 240 5% 96%;

  /* Background */
  --background: 0 0% 100%; /* Light mode */
  --foreground: 240 10% 4%;

  /* Dark mode */
  --dark-background: 240 10% 4%;
  --dark-foreground: 240 5% 96%;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 240 5% 96%;
}
```

### Typography

Font configuration in `apps/lms/app/layout.tsx`:

```tsx
import { Space_Grotesk, Inter } from "next/font/google";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
```

### Component Styling

Components use Tailwind CSS with semantic classes:

```tsx
// Using theme colors
<div className="bg-primary text-primary-foreground">
  Brand colored background
</div>

<div className="bg-muted text-muted-foreground">
  Subtle background
</div>

<div className="bg-accent text-accent-foreground">
  Accent elements
</div>
```

### Logo & Branding

Update the logo in `apps/lms/components/layouts/navbar.tsx`:

```tsx
// Replace the SVG with your custom logo
<Link href="/">
  <YourLogoComponent />
</Link>
```

## Adding Languages

### 1. Add Translation Strings

Edit `apps/lms/lib/i18n/translations.json`:

```json
{
  "newlang": {
    "common": {
      "loading": "Loading...",
      "save": "Save"
    },
    "nav": {
      "courses": "Courses"
    }
  }
}
```

### 2. Register the Language

In `apps/lms/lib/i18n/index.tsx`:

```tsx
const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "pt", name: "Português", dir: "ltr" },
  { code: "newlang", name: "New Language", dir: "ltr" }, // Add here
];
```

### 3. Update Language Switcher

The language switcher automatically renders based on available translations.

### 4. Add CMS Localization

In Sanity, create localized content:

1. Create documents with matching language codes
2. Use consistent slugs across languages

## Extending Gamification

### Adding New Achievements

Edit `packages/learning-service/src/mock-impl.ts`:

```typescript
// Add to getAllAchievementDefinitions()
{
  id: "new_achievement",
  name: "New Achievement",
  description: "Description of how to earn",
  icon: "new_achievement",
},
```

### Custom XP Rewards

Modify lesson XP in Sanity or adjust in code:

```typescript
// In lesson completion logic
const xpMultiplier = difficulty === "advanced" ? 2 : 1;
const xpReward = baseXP * xpMultiplier;
```

### Achievement Triggers

Add new triggers in `checkAchievements()`:

```typescript
// Example: Complete 10 lessons
if (progress.completedLessons.length >= 10) {
  await this.unlockAchievement({
    userId,
    achievementId: "lesson_master",
  });
}

// Example: Complete 5 courses
if (completedCourses >= 5) {
  await this.unlockAchievement({
    userId,
    achievementId: "dedicated_learner",
  });
}
```

### Streak Milestones

Adjust streak milestones:

```typescript
const streakMilestones: Record<number, string> = {
  3: "streak_beginner", // 3-day streak
  7: "week_warrior", // Existing
  14: "two_week_champion", // 2-week streak
  30: "monthly_master", // Existing
  50: "half_century", // 50-day streak
  100: "consistency_king", // Existing
};
```

### Level Formula Customization

Modify the level calculation:

```typescript
// Current: Level = floor(sqrt(xp / 100))
// Alternative: Linear levels every 500 XP
function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

// Alternative: Exponential
function calculateLevel(xp: number): number {
  return Math.floor(Math.log10(xp + 1) * 2) + 1;
}
```

### Adding New Achievement Icons

1. Add icon to `apps/lms/lib/helper.tsx`:

```typescript
export const ICONS = {
  // Existing icons...
  new_achievement: YourIconComponent,
};
```

2. Use in achievement tiles:

```tsx
const Icon = ICONS[achievement.id];
return <Icon className="..." />;
```

## Service Layer Extension

### Creating Custom Implementations

Implement `LearningProgressService` for custom backends:

```typescript
import type { LearningProgressService } from "./interfaces";

class MyCustomService implements LearningProgressService {
  async getProgress({ userId, courseId }) {
    // Fetch from your backend
    const response = await fetch(`/api/progress/${userId}/${courseId}`);
    return response.json();
  }

  async completeLesson(payload) {
    // Send to your backend
    const response = await fetch("/api/complete-lesson", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.json();
  }

  // ... implement all interface methods
}
```

### Switching Implementations

In `apps/lms/lib/queries/index.ts`:

```typescript
import { learningService } from "@workspace/learning-service";

// Use mock (default)
// import { learningService } from './mock-impl';

// Use custom
// import { MyCustomService } from './custom-impl';
// const learningService = new MyCustomService();
```

## UI Component Extensions

### Adding New Dashboard Cards

Create a new component in `apps/lms/components/home/`:

```tsx
// components/home/stat-card.tsx
export function StatCard({ icon, label, value, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-3">{icon}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
```

### Custom Course Cards

Edit `apps/lms/components/course/course-card.tsx` to add:

- Custom badges
- Progress indicators
- Action buttons

## Performance Optimization

### Code Splitting

Next.js automatically splits code. For manual optimization:

```tsx
// Lazy load heavy components
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@/components/monaco-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
```

### Image Optimization

Use Next.js Image component:

```tsx
import Image from "next/image";

<Image
  src={course.thumbnail}
  alt={course.title}
  width={800}
  height={450}
  className="object-cover"
/>;
```

## Deployment Considerations

### Environment-Specific Configs

```env
# Development
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Production
NEXT_PUBLIC_SOLANA_NETWORK=mainnet
```

### Build Optimization

```bash
# Analyze bundle
pnpm build --analyze

# Production build
pnpm --filter lms build
```
