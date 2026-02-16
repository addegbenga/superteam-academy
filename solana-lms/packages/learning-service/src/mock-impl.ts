// import type { PublicKey } from '@solana/web3.js'
// import type { 
//   LearningProgressService, 
//   Progress, 
//   StreakData, 
//   LeaderboardEntry,
//   Credential,
//   Achievement
// } from './interfaces.js'

// // Level formula from requirements: Level = floor(sqrt(xp / 100))
// function calculateLevel(xp: number): number {
//   return Math.floor(Math.sqrt(xp / 100))
// }

// /**
//  * Mock implementation using localStorage
//  * This will be replaced with on-chain implementation later
//  */
// export class MockLearningService implements LearningProgressService {
//   private storage = typeof window !== 'undefined' ? window.localStorage : null

//   private getKey(prefix: string, ...parts: string[]): string {
//     return `${prefix}_${parts.join('_')}`
//   }

//   async getProgress(userId: string, courseId: string): Promise<Progress> {
//     const key = this.getKey('progress', userId, courseId)
//     const stored = this.storage?.getItem(key)
    
//     if (stored) {
//       const data = JSON.parse(stored)
//       return {
//         ...data,
//         startedAt: new Date(data.startedAt),
//         lastActivityAt: new Date(data.lastActivityAt)
//       }
//     }
    
//     return {
//       courseId,
//       completedLessons: [],
//       completionPercentage: 0,
//       xpEarned: 0,
//       startedAt: new Date(),
//       lastActivityAt: new Date(),
//     }
//   }

//   async completeLesson(
//     userId: string, 
//     courseId: string, 
//     lessonIndex: number
//   ): Promise<void> {
//     const progress = await this.getProgress(userId, courseId)
    
//     if (!progress.completedLessons.includes(lessonIndex)) {
//       progress.completedLessons.push(lessonIndex)
//       progress.lastActivityAt = new Date()
      
//       // Award XP (configurable per lesson - hardcoded for now)
//       const xpReward = 50
//       progress.xpEarned += xpReward
      
//       // Save progress
//       const key = this.getKey('progress', userId, courseId)
//       this.storage?.setItem(key, JSON.stringify(progress))
      
//       // Update total XP
//       await this.addXP(userId, xpReward)
      
//       // Update streak
//       await this.updateStreak(userId)
      
//       // Check for achievements
//       await this.checkAchievements(userId, progress)
//     }
//   }

//   async enrollInCourse(userId: string, courseId: string): Promise<void> {
//     const progress = await this.getProgress(userId, courseId)
//     // Progress is automatically created if it doesn't exist
//     const key = this.getKey('progress', userId, courseId)
//     this.storage?.setItem(key, JSON.stringify(progress))
//   }

//   async getXP(userId: string): Promise<number> {
//     const key = this.getKey('xp', userId)
//     const stored = this.storage?.getItem(key)
//     return stored ? parseInt(stored) : 0
//   }

//   async getLevel(userId: string): Promise<number> {
//     const xp = await this.getXP(userId)
//     return calculateLevel(xp)
//   }

//   async addXP(userId: string, amount: number): Promise<void> {
//     const currentXP = await this.getXP(userId)
//     const newXP = currentXP + amount
//     const key = this.getKey('xp', userId)
//     this.storage?.setItem(key, String(newXP))
//   }

//   async getStreak(userId: string): Promise<StreakData> {
//     const key = this.getKey('streak', userId)
//     const stored = this.storage?.getItem(key)
    
//     if (stored) {
//       const data = JSON.parse(stored)
//       return {
//         ...data,
//         lastActivityDate: new Date(data.lastActivityDate),
//         streakHistory: data.streakHistory.map((d: string) => new Date(d))
//       }
//     }
    
//     return {
//       currentStreak: 0,
//       longestStreak: 0,
//       lastActivityDate: new Date(),
//       streakHistory: []
//     }
//   }

//   private async updateStreak(userId: string): Promise<void> {
//     const streak = await this.getStreak(userId)
//     const today = new Date().toDateString()
//     const lastActivity = streak.lastActivityDate.toDateString()
    
//     if (today !== lastActivity) {
//       const yesterday = new Date()
//       yesterday.setDate(yesterday.getDate() - 1)
      
//       if (lastActivity === yesterday.toDateString()) {
//         // Continue streak
//         streak.currentStreak++
//       } else {
//         // Reset streak
//         streak.currentStreak = 1
//       }
      
//       streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak)
//       streak.lastActivityDate = new Date()
//       streak.streakHistory.push(new Date())
      
//       const key = this.getKey('streak', userId)
//       this.storage?.setItem(key, JSON.stringify(streak))
      
//       // Check for streak achievements
//       if (streak.currentStreak === 7) {
//         await this.unlockAchievement(userId, 'week_warrior')
//       } else if (streak.currentStreak === 30) {
//         await this.unlockAchievement(userId, 'monthly_master')
//       } else if (streak.currentStreak === 100) {
//         await this.unlockAchievement(userId, 'consistency_king')
//       }
//     }
//   }

//   async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]> {
//     // Mock data - in production, this would query an indexer (Helius DAS API)
//     // and read XP token balances from on-chain accounts
//     const mockEntries: LeaderboardEntry[] = [
//       {
//         userId: '1',
//         username: 'alice.sol',
//         xp: 5000,
//         level: calculateLevel(5000),
//         rank: 1,
//         streak: 15
//       },
//       {
//         userId: '2',
//         username: 'bob.sol',
//         xp: 3500,
//         level: calculateLevel(3500),
//         rank: 2,
//         streak: 7
//       },
//       {
//         userId: '3',
//         username: 'charlie.sol',
//         xp: 2800,
//         level: calculateLevel(2800),
//         rank: 3,
//         streak: 12
//       }
//     ]
    
//     return mockEntries
//   }

//   async getCredentials(wallet: PublicKey): Promise<Credential[]> {
//     // Stub - will query Metaplex Bubblegum cNFTs on Devnet
//     // In production: use Helius DAS API or Metaplex to fetch compressed NFTs
//     // Filter by collection and wallet address
    
//     // Mock data for now
//     return []
//   }

//   async getAchievements(userId: string): Promise<Achievement[]> {
//     const key = this.getKey('achievements', userId)
//     const stored = this.storage?.getItem(key)
    
//     if (stored) {
//       const ids = JSON.parse(stored) as string[]
//       return this.getAllAchievements().filter(a => ids.includes(a.id))
//     }
    
//     return []
//   }

//   async unlockAchievement(userId: string, achievementId: string): Promise<void> {
//     const achievements = await this.getAchievements(userId)
//     const ids = achievements.map(a => a.id)
    
//     if (!ids.includes(achievementId)) {
//       ids.push(achievementId)
//       const key = this.getKey('achievements', userId)
//       this.storage?.setItem(key, JSON.stringify(ids))
//     }
//   }

//   private async checkAchievements(userId: string, progress: Progress): Promise<void> {
//     // Check for "First Steps" achievement
//     if (progress.completedLessons.length === 1) {
//       await this.unlockAchievement(userId, 'first_steps')
//     }
    
//     // Check for "Course Completer"
//     // This would need course metadata to know total lesson count
//     // For now, assume 20 lessons per course
//     if (progress.completedLessons.length >= 20) {
//       await this.unlockAchievement(userId, 'course_completer')
//     }
//   }

//   private getAllAchievements(): Achievement[] {
//     return [
//       { id: 'first_steps', name: 'First Steps', description: 'Complete your first lesson', icon: '👣' },
//       { id: 'course_completer', name: 'Course Completer', description: 'Complete your first course', icon: '🎓' },
//       { id: 'week_warrior', name: 'Week Warrior', description: '7-day streak', icon: '🔥' },
//       { id: 'monthly_master', name: 'Monthly Master', description: '30-day streak', icon: '⚡' },
//       { id: 'consistency_king', name: 'Consistency King', description: '100-day streak', icon: '👑' },
//       { id: 'rust_rookie', name: 'Rust Rookie', description: 'Complete 5 Rust lessons', icon: '🦀' },
//       { id: 'anchor_expert', name: 'Anchor Expert', description: 'Complete the Anchor track', icon: '⚓' },
//       { id: 'early_adopter', name: 'Early Adopter', description: 'Join in the first month', icon: '🌟' },
//     ]
//   }
// }

// // Export singleton instance
// export const learningService = new MockLearningService()


import type { PublicKey } from '@solana/web3.js'
import type { 
  LearningProgressService, 
  Progress, 
  StreakData, 
  LeaderboardEntry,
  Credential,
  Achievement
} from './interfaces.js'

// Level formula from requirements: Level = floor(sqrt(xp / 100))
function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100))
}

/**
 * Mock implementation that simulates indexer responses
 * This makes it easy to swap with real indexer later
 */
export class MockLearningService implements LearningProgressService {
  private storage = typeof window !== 'undefined' ? window.localStorage : null
  private apiBase = '/api/courses'  // For Sanity updates

  private getKey(prefix: string, ...parts: string[]): string {
    return `${prefix}_${parts.join('_')}`
  }

  // ==================== PROGRESS ====================

  async getProgress(userId: string, courseId: string): Promise<Progress> {
    // In production: indexer.getEnrollment(userId, courseId)
    const key = this.getKey('progress', userId, courseId)
    const stored = this.storage?.getItem(key)
    
    if (stored) {
      const data = JSON.parse(stored)
      return {
        ...data,
        startedAt: new Date(data.startedAt),
        lastActivityAt: new Date(data.lastActivityAt)
      }
    }
    
    return {
      courseId,
      completedLessons: [],
      completionPercentage: 0,
      xpEarned: 0,
      startedAt: new Date(),
      lastActivityAt: new Date(),
    }
  }

  async enrollInCourse(userId: string, courseId: string): Promise<void> {
    // In production: 
    // 1. Submit blockchain transaction (create Enrollment PDA)
    // 2. Wait for confirmation
    // 3. Call API to update Sanity stats
    
    // Mock: Create local progress
    const progress = await this.getProgress(userId, courseId)
    const key = this.getKey('progress', userId, courseId)
    this.storage?.setItem(key, JSON.stringify(progress))
    
    // Update Sanity stats (this stays the same in production)
    try {
      await fetch(`${this.apiBase}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          courseId, 
          userId,
          // In production, these come from wallet/auth
          userEmail: `${userId}@example.com`,
          userName: userId
        }),
      })
    } catch (error) {
      console.error('Failed to update Sanity enrollment:', error)
    }
  }

  async completeLesson(
    userId: string, 
    courseId: string, 
    lessonIndex: number
  ): Promise<void> {
    // In production:
    // 1. Submit blockchain transaction (update progress bitmap, mint XP)
    // 2. Wait for indexer to update
    // 3. Call API to update Sanity if course completed
    
    const progress = await this.getProgress(userId, courseId)
    
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex)
      progress.lastActivityAt = new Date()
      
      // Award XP (in production: blockchain mints tokens)
      const xpReward = 50
      progress.xpEarned += xpReward
      
      // Calculate completion percentage
      const totalLessons = 20 // TODO: Get from course metadata
      progress.completionPercentage = Math.round(
        (progress.completedLessons.length / totalLessons) * 100
      )
      
      // Save progress (in production: this is automatic via indexer)
      const key = this.getKey('progress', userId, courseId)
      this.storage?.setItem(key, JSON.stringify(progress))
      
      // Update total XP
      await this.addXP(userId, xpReward)
      
      // Update streak
      await this.updateStreak(userId)
      
      // Check for achievements
      await this.checkAchievements(userId, progress)
      
      // Update Sanity progress
      try {
        await fetch(`${this.apiBase}/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            courseId, 
            userId, 
            lessonId: lessonIndex.toString() 
          }),
        })
      } catch (error) {
        console.error('Failed to update Sanity progress:', error)
      }
      
      // Check if course completed
      if (progress.completionPercentage === 100) {
        await this.completeCourse(userId, courseId)
      }
    }
  }

  private async completeCourse(userId: string, courseId: string): Promise<void> {
    // In production: blockchain marks enrollment as complete
    // Call API to update Sanity stats
    try {
      await fetch(`${this.apiBase}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, userId }),
      })
    } catch (error) {
      console.error('Failed to update course completion:', error)
    }
  }

  // ==================== XP & LEVELING ====================

  async getXP(userId: string): Promise<number> {
    // In production: indexer.getXPBalance(userId)
    const key = this.getKey('xp', userId)
    const stored = this.storage?.getItem(key)
    return stored ? parseInt(stored) : 0
  }

  async getLevel(userId: string): Promise<number> {
    const xp = await this.getXP(userId)
    return calculateLevel(xp)
  }

  async addXP(userId: string, amount: number): Promise<void> {
    // In production: blockchain transaction mints XP tokens
    const currentXP = await this.getXP(userId)
    const newXP = currentXP + amount
    const key = this.getKey('xp', userId)
    this.storage?.setItem(key, String(newXP))
  }

  // ==================== STREAKS ====================

  async getStreak(userId: string): Promise<StreakData> {
    // In production: indexer.getStreak(userId)
    const key = this.getKey('streak', userId)
    const stored = this.storage?.getItem(key)
    
    if (stored) {
      const data = JSON.parse(stored)
      return {
        ...data,
        lastActivityDate: new Date(data.lastActivityDate),
        streakHistory: data.streakHistory.map((d: string) => new Date(d))
      }
    }
    
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date(),
      streakHistory: []
    }
  }

  private async updateStreak(userId: string): Promise<void> {
    // In production: blockchain updates streak on Learner PDA
    const streak = await this.getStreak(userId)
    const today = new Date().toDateString()
    const lastActivity = streak.lastActivityDate.toDateString()
    
    if (today !== lastActivity) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (lastActivity === yesterday.toDateString()) {
        streak.currentStreak++
      } else {
        streak.currentStreak = 1
      }
      
      streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak)
      streak.lastActivityDate = new Date()
      streak.streakHistory.push(new Date())
      
      const key = this.getKey('streak', userId)
      this.storage?.setItem(key, JSON.stringify(streak))
      
      // Check for streak achievements
      if (streak.currentStreak === 7) {
        await this.unlockAchievement(userId, 'week_warrior')
      } else if (streak.currentStreak === 30) {
        await this.unlockAchievement(userId, 'monthly_master')
      } else if (streak.currentStreak === 100) {
        await this.unlockAchievement(userId, 'consistency_king')
      }
    }
  }

  // ==================== LEADERBOARD ====================

  async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]> {
    // In production: indexer.getLeaderboard(timeframe)
    // Queries all XP token balances, sorts, and returns top users
    
    // Mock: Return simulated indexer response
    const mockEntries: LeaderboardEntry[] = [
      {
        userId: '1',
        username: 'alice.sol',
        xp: 5000,
        level: calculateLevel(5000),
        rank: 1,
        streak: 15
      },
      {
        userId: '2',
        username: 'bob.sol',
        xp: 3500,
        level: calculateLevel(3500),
        rank: 2,
        streak: 7
      },
      {
        userId: '3',
        username: 'charlie.sol',
        xp: 2800,
        level: calculateLevel(2800),
        rank: 3,
        streak: 12
      }
    ]
    
    return mockEntries
  }

  // ==================== CREDENTIALS ====================

  async getCredentials(wallet: PublicKey): Promise<Credential[]> {
    // In production: indexer.getAssetsByOwner(wallet)
    // Uses Helius DAS API to fetch cNFTs owned by wallet
    
    // Mock: Return empty for now
    // In real implementation, this would query:
    // const assets = await helius.das.getAssetsByOwner({
    //   ownerAddress: wallet.toBase58(),
    //   page: 1,
    // })
    // Filter by collection and return credential NFTs
    
    return []
  }

  // ==================== ACHIEVEMENTS ====================

  async getAchievements(userId: string): Promise<Achievement[]> {
    // In production: indexer.getAchievements(userId)
    // Reads bitmap from Learner PDA
    
    const key = this.getKey('achievements', userId)
    const stored = this.storage?.getItem(key)
    
    if (stored) {
      const ids = JSON.parse(stored) as string[]
      return this.getAllAchievements().filter(a => ids.includes(a.id))
    }
    
    return []
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<void> {
    // In production: blockchain transaction sets bit in achievement bitmap
    const achievements = await this.getAchievements(userId)
    const ids = achievements.map(a => a.id)
    
    if (!ids.includes(achievementId)) {
      ids.push(achievementId)
      const key = this.getKey('achievements', userId)
      this.storage?.setItem(key, JSON.stringify(ids))
    }
  }

  private async checkAchievements(userId: string, progress: Progress): Promise<void> {
    // Check for "First Steps" achievement
    if (progress.completedLessons.length === 1) {
      await this.unlockAchievement(userId, 'first_steps')
    }
    
    // Check for "Course Completer"
    if (progress.completionPercentage === 100) {
      await this.unlockAchievement(userId, 'course_completer')
    }
  }

  private getAllAchievements(): Achievement[] {
    // In production: These definitions come from Sanity
    // This just returns the shape/structure
    return [
      { 
        id: 'first_steps', 
        name: 'First Steps', 
        description: 'Complete your first lesson', 
        icon: '👣',
        // category: 'progress'
      },
      { 
        id: 'course_completer', 
        name: 'Course Completer', 
        description: 'Complete your first course', 
        icon: '🎓',
        // category: 'progress'
      },
      { 
        id: 'week_warrior', 
        name: 'Week Warrior', 
        description: '7-day streak', 
        icon: '🔥',
        // category: 'streaks'
      },
      { 
        id: 'monthly_master', 
        name: 'Monthly Master', 
        description: '30-day streak', 
        icon: '⚡',
        // category: 'streaks'
      },
      { 
        id: 'consistency_king', 
        name: 'Consistency King', 
        description: '100-day streak', 
        icon: '👑',
        // category: 'streaks'
      },
      { 
        id: 'rust_rookie', 
        name: 'Rust Rookie', 
        description: 'Complete 5 Rust lessons', 
        icon: '🦀',
        // category: 'skills'
      },
      { 
        id: 'anchor_expert', 
        name: 'Anchor Expert', 
        description: 'Complete the Anchor track', 
        icon: '⚓',
        // category: 'skills'
      },
      { 
        id: 'early_adopter', 
        name: 'Early Adopter', 
        description: 'Join in the first month', 
        icon: '🌟',
        // category: 'special'
      },
    ]
  }
}

// Export singleton instance
export const learningService = new MockLearningService()