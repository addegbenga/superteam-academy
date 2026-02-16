"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { queryBuilder } from "@workspace/sanity-client";
import { learningService } from "@workspace/learning-service";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

interface UseLessonProgressProps {
  courseId: string;
  lessonSlug: string;
}

export function useLessonProgress({
  courseId,
  lessonSlug,
}: UseLessonProgressProps) {
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();
  const userId = publicKey?.toString() || "";

  // Fetch lesson from Sanity
  const {
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
  } = useQuery({
    queryKey: queryKeys.lessons.detail(lessonSlug),
    queryFn: () => queryBuilder.getLessonBySlug(lessonSlug),
    enabled: !!lessonSlug,
  });

  // Fetch course progress to check if lesson is completed
  const { data: progress } = useQuery({
    queryKey: queryKeys.progress.course(userId, courseId),
    queryFn: () => learningService.getProgress(userId, courseId),
    enabled: !!userId && !!courseId,
  });

  const isCompleted = lesson
    ? progress?.completedLessons.includes(lesson?.order || (0 as number))
    : false;

  // Complete lesson mutation
  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !lesson) {
        throw new Error("Must be logged in and lesson must be loaded");
      }
      return learningService.completeLesson(
        userId,
        courseId,
        lesson?.order || (0 as number),
      );
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.progress.course(userId, courseId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.xp(userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.level(userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.streak(userId),
      });

      const xp = lesson?.xpReward || 50;
      toast.success(`Lesson completed! +${xp} XP 🎉`);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to complete lesson",
      );
    },
  });

  return {
    lesson,
    isCompleted,
    isLoading: lessonLoading,
    error: lessonError,
    completeLesson: completeMutation.mutate,
    isCompleting: completeMutation.isPending,
  };
}
