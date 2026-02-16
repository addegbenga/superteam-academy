'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { queryKeys } from '@/lib/query-keys'
import { toast } from 'sonner'

interface ReviewData {
  rating: number
  content?: string
}

export function useReview(courseId: string) {
  const { publicKey } = useWallet()
  const queryClient = useQueryClient()
  const userId = publicKey?.toString() || ''

  // Fetch existing review
  const { data: existingReview } = useQuery({
    queryKey: queryKeys.reviews.byUser(userId, courseId),
    queryFn: async () => {
      const response = await fetch(
        `/api/courses/review?courseId=${courseId}&userId=${userId}`
      )
      if (!response.ok) return null
      const data = await response.json()
      return data.review
    },
    enabled: !!userId && !!courseId,
  })

  // Submit review mutation
  const submitMutation = useMutation({
    mutationFn: async (data: ReviewData) => {
      if (!userId) {
        throw new Error('Must be logged in to review')
      }

      const response = await fetch('/api/courses/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          userId,
          userName: userId.substring(0, 8),
          rating: data.rating,
          content: data.content,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit review')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byUser(userId, courseId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byCourse(courseId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.detail(courseId),
      })

      toast.success('Review submitted successfully!')
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review')
    },
  })

  return {
    existingReview,
    submitReview: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
  }
}