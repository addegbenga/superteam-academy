'use client'

import { useQuery } from '@tanstack/react-query'
import { learningService } from '@workspace/learning-service'
import { queryKeys } from '@/lib/query-keys'

type Timeframe = 'weekly' | 'monthly' | 'alltime'

export function useLeaderboard(timeframe: Timeframe = 'alltime') {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.leaderboard.byTimeframe(timeframe),
    queryFn: () => learningService.getLeaderboard(timeframe),
    staleTime: 30 * 1000, // 30 seconds
  })

  return {
    entries: data || [],
    isLoading,
    error,
  }
}