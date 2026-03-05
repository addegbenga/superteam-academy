import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/components/providers/query-client";
import { courseQueries } from "@/lib/queries";
import { CourseGrid } from "@/components/course";
import { Suspense } from "react";
import { CoursesGridSkeleton } from "@workspace/ui/components/loading";
import { CourseHeader } from "@/components/course/course-filter";

export default async function CoursePage({
  searchParams,
}: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const language = resolvedSearchParams.language as string;
  const query = (resolvedSearchParams.q as string) ?? "";
  const difficulties = resolvedSearchParams.difficulty
    ? Array.isArray(resolvedSearchParams.difficulty)
      ? resolvedSearchParams.difficulty
      : [resolvedSearchParams.difficulty]
    : [];
  const tracks = resolvedSearchParams.track
    ? Array.isArray(resolvedSearchParams.track)
      ? resolvedSearchParams.track
      : [resolvedSearchParams.track]
    : [];

  const queryClient = getQueryClient();

  // Single prefetch covers both browsing and filtered/searched states
  queryClient.prefetchQuery(
    courseQueries.search(language, query, { difficulties, tracks }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <CourseHeader />
        <Suspense fallback={<CoursesGridSkeleton />}>
          <CourseGrid />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
