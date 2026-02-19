import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CourseDetail from "@/components/course/course-detail";
import { getQueryClient } from "@/components/providers/query-client";
import { courseQueries } from "@/lib/queries";
import { Suspense } from "react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const resolvedParams = await params;
  const queryClient = getQueryClient();
  const courseId = resolvedParams.courseId as string;

  // Prefetch on server
  await queryClient.prefetchQuery(courseQueries.bySlug(courseId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <CourseDetail />
      </Suspense>
    </HydrationBoundary>
  );
}
