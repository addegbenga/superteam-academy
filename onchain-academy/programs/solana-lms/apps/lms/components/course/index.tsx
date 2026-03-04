"use client";
import { courseQueries } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Clock, Zap, AlertCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@workspace/ui/components/input";
import { Search, Filter } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCallback, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
const TRACKS = ["fundamentals", "defi", "nft", "gaming", "tooling"] as const;

// ─── Hook: shared URL param helpers ──────────────────────────────────────────

function useCourseParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const language = searchParams.get("lang") as string;
  const query = searchParams.get("q") ?? "";
  const difficulties = searchParams.getAll("difficulty");
  const tracks = searchParams.getAll("track");

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        params.delete(key);
        if (value === null) continue;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, router, pathname],
  );

  return { language, query, difficulties, tracks, updateParams };
}

// ─── CourseHeader ─────────────────────────────────────────────────────────────

export function CourseHeader() {
  const { t } = useI18n();
  const { query, difficulties, tracks, updateParams } = useCourseParams();

  const activeFilterCount = difficulties.length + tracks.length;

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParams({ q: value || null });
  }, 300);

  const toggleDifficulty = (value: string) => {
    const next = difficulties.includes(value)
      ? difficulties.filter((d) => d !== value)
      : [...difficulties, value];
    updateParams({ difficulty: next.length ? next : null });
  };

  const toggleTrack = (value: string) => {
    const next = tracks.includes(value)
      ? tracks.filter((t) => t !== value)
      : [...tracks, value];
    updateParams({ track: next.length ? next : null });
  };

  const clearFilters = () => updateParams({ difficulty: null, track: null });

  return (
    <div className="flex flex-col gap-6 mb-12">
      <div>
        <h1 className="text-3xl tracking-tighter font-bold mb-2">
          {t("courses.courseCatalog")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("courses.masterSolana")}
        </p>
      </div>

      <div className="flex w-full md:w-auto gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("courses.searchCourses")}
            defaultValue={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-11 bg-white/5 border-white/10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-white/10 h-11 bg-white/5"
            >
              <Filter className="w-4 h-4 mr-2" />
              {t("common.filter")}
              {activeFilterCount > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
            {DIFFICULTIES.map((d) => (
              <DropdownMenuCheckboxItem
                key={d}
                checked={difficulties.includes(d)}
                onCheckedChange={() => toggleDifficulty(d)}
                className="capitalize"
              >
                {d}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Track</DropdownMenuLabel>
            {TRACKS.map((track) => (
              <DropdownMenuCheckboxItem
                key={track}
                checked={tracks.includes(track)}
                onCheckedChange={() => toggleTrack(track)}
                className="capitalize"
              >
                {track}
              </DropdownMenuCheckboxItem>
            ))}
            {activeFilterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={clearFilters}
                  className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <Badge
              key={d}
              variant="secondary"
              className="gap-1 capitalize cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleDifficulty(d)}
            >
              {d} <X className="w-3 h-3" />
            </Badge>
          ))}
          {tracks.map((track) => (
            <Badge
              key={track}
              variant="secondary"
              className="gap-1 capitalize cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleTrack(track)}
            >
              {track} <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CourseGrid ───────────────────────────────────────────────────────────────

export function CourseGrid() {
  const { t } = useI18n();
  const { language, query, difficulties, tracks } = useCourseParams();

  const { data, isError, error, refetch, isFetching } = useQuery(
    courseQueries.search(language, query, { difficulties, tracks }),
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {t("courses.failedToLoadCourses")}
        </h2>
        <p className="text-muted-foreground truncate text-center mb-6 max-w-md">
          {error?.message || t("courses.somethingWentWrong")}
        </p>
        <Button onClick={() => refetch()} variant="default">
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }

  if (!isFetching && data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Search className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">No courses found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${
        isFetching ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
    >
      {data?.map((course) => (
        <Link
          key={course._id}
          href={`/course/${course.slug?.current}`}
          prefetch={true}
        >
          <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
            <div className="aspect-video h-44 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
              <Image
                width={200}
                height={200}
                src={course.thumbnail as any}
                alt={course?.slug?.source || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.difficulty && (
                <div className="absolute top-3 right-3 z-20">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 backdrop-blur-md border-white/10 capitalize text-xs"
                  >
                    {course.difficulty}
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-6 pb-0 flex flex-col flex-1">
              <h3 className="tracking-tight font-bold mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="grid pt-2.5 space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}hrs
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    <Zap className="w-3 h-3" /> {course.xpReward} XP
                  </span>
                  {course.track && (
                    <span className="capitalize text-xs text-muted-foreground/70">
                      {course.track}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── AllCourse ────────────────────────────────────────────────────────────────

export function AllCourse() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <CourseHeader />
      <CourseGrid />
    </div>
  );
}
