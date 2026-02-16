"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { queryBuilder } from "@workspace/sanity-client";
import { learningService } from "@workspace/learning-service";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export function useCourse(slug: string) {
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();
  const userId = publicKey?.toString() || "";

  // Fetch course from Sanity
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery({
    queryKey: queryKeys.courses.detail(slug),
    queryFn: () => queryBuilder.getCourseBySlug(slug),
    enabled: !!slug,
  });

  // Fetch user progress
  const {
    data: progress,
    isLoading: progressLoading,
    error: progressError,
  } = useQuery({
    queryKey: queryKeys.progress.course(userId, course?._id || ""),
    queryFn: () => learningService.getProgress(userId, course!._id),
    enabled: !!userId && !!course?._id,
  });

  // Enroll mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !course) {
        throw new Error("Must be logged in and course must be loaded");
      }
      return learningService.enrollInCourse(userId, course._id);
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({
        queryKey: queryKeys.progress.course(userId, course!._id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.detail(slug),
      });
      toast.success("Successfully enrolled!");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to enroll");
    },
  });

  const isEnrolled =
    progress !== undefined && progress.completedLessons.length >= 0;
  const isCompleted = progress?.completionPercentage === 100;
  const canReview = isCompleted;

  return {
    // Data
    course,
    progress,

    // Loading states
    isLoading: courseLoading || progressLoading,
    error: courseError || progressError,

    // Derived states
    isEnrolled,
    isCompleted,
    canReview,

    // Actions
    enroll: enrollMutation.mutate,
    isEnrolling: enrollMutation.isPending,
  };
}

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: () => queryBuilder.getCourses(),
  });
};

export const useGetCourseById = (slug:string) => {
  return useQuery({
    queryKey: queryKeys.courses.detail(slug),
    queryFn: () => queryBuilder.getCourseBySlug(slug),
    enabled: !!slug
  });
};
