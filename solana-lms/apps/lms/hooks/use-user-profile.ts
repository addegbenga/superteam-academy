'use client'

import { useQueries } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { learningService } from '@workspace/learning-service'
import { queryKeys } from '@/lib/query-keys'

export function useUserProfile() {
  const { publicKey } = useWallet()
  const userId = publicKey?.toString() || ''

  // Fetch all user data in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: queryKeys.user.xp(userId),
        queryFn: () => learningService.getXP(userId),
        enabled: !!userId,
      },
      {
        queryKey: queryKeys.user.level(userId),
        queryFn: () => learningService.getLevel(userId),
        enabled: !!userId,
      },
      {
        queryKey: queryKeys.user.streak(userId),
        queryFn: () => learningService.getStreak(userId),
        enabled: !!userId,
      },
      {
        queryKey: queryKeys.user.achievements(userId),
        queryFn: () => learningService.getAchievements(userId),
        enabled: !!userId,
      },
      {
        queryKey: queryKeys.user.credentials(userId),
        queryFn: () => (publicKey ? learningService.getCredentials(publicKey) : []),
        enabled: !!publicKey,
      },
    ],
  })

  const [xpQuery, levelQuery, streakQuery, achievementsQuery, credentialsQuery] = queries

  const xp = xpQuery.data || 0
  const level = levelQuery.data || 0
  const streak = streakQuery.data
  const achievements = achievementsQuery.data || []
  const credentials = credentialsQuery.data || []

  const isLoading = queries.some((q) => q.isLoading)

  // Calculate XP progress for next level
  const xpForNextLevel = (level + 1) ** 2 * 100
  const xpInCurrentLevel = xp - level ** 2 * 100
  const xpProgress = (xpInCurrentLevel / (xpForNextLevel - level ** 2 * 100)) * 100

  return {
    userId,
    xp,
    level,
    streak,
    achievements,
    credentials,
    isLoading,
    xpForNextLevel,
    xpProgress: Math.min(Math.max(xpProgress, 0), 100),
    isLoggedIn: !!userId,
  }
}