import type { PublicKey } from '@solana/web3.js'

export interface Progress {
  courseId: string
  completedLessons: number[]
  completionPercentage: number
  xpEarned: number
  startedAt: Date
  lastActivityAt: Date
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakHistory: Date[]
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar?: string
  xp: number
  level: number
  rank: number
  streak: number
}

export interface Credential {
  id: string
  track: string
  level: number
  mintAddress: string
  metadata: {
    name: string
    image: string
    attributes: Array<{ trait_type: string; value: string }>
  }
  issuedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
}

/**
 * Service interface for learning progress and gamification
 * This abstraction allows swapping between mock (localStorage) and on-chain implementations
 */
export interface LearningProgressService {
  // Progress tracking
  getProgress(userId: string, courseId: string): Promise<Progress>
  completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void>
  enrollInCourse(userId: string, courseId: string): Promise<void>
  
  // XP & Leveling
  getXP(userId: string): Promise<number>
  getLevel(userId: string): Promise<number>
  addXP(userId: string, amount: number): Promise<void>
  
  // Streaks
  getStreak(userId: string): Promise<StreakData>
  
  // Leaderboard
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]>
  
  // Credentials (cNFTs)
  getCredentials(wallet: PublicKey): Promise<Credential[]>
  
  // Achievements
  getAchievements(userId: string): Promise<Achievement[]>
  unlockAchievement(userId: string, achievementId: string): Promise<void>
}