"use client";
import { getCurrentUserId } from "@/hooks/auth";
import { useEnrolledCoursesWithDetails } from "@/hooks/use-course";
import { userQueries } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { StatCard } from "@workspace/ui/components/custom-card";
import { Progress } from "@workspace/ui/components/progress";
import {
  Trophy,
  Flame,
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Play,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const userId = getCurrentUserId();
  const { data: user } = useQuery(userQueries.profile(userId));
  const { data, isLoading } = useEnrolledCoursesWithDetails(userId);

  const currentCourse = data?.[0];

  return (
    <div className="container max-w-7xl py-10 mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl tracking-tighter font-bold mb-2">
              Welcome back, Dev 👋
            </h1>
            {user?.streak && (
              <p className="text-muted-foreground">
                {user?.streak?.current > 0
                  ? `You're on a ${user?.streak.current} day streak! Keep it up.`
                  : "Complete a lesson today to start your streak!"}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Trophy className="text-yellow-400" />}
              label="Total XP"
              value={user?.xp.toLocaleString() ?? "—"}
            />
            <StatCard
              icon={<Flame className="text-orange-500" />}
              label="Streak"
              value={user ? `${user.streak.current} Days` : "—"}
            />
            <StatCard
              icon={<Target className="text-blue-400" />}
              label="Level"
              value={user ? `Lvl ${user.level}` : "—"}
            />
            <StatCard
              icon={<Clock className="text-purple-400" />}
              label="Achievements"
              value={user ? `${user.achievements.length}` : "—"}
            />
          </div>

          {/* Current Course */}
          {isLoading ? (
            <Card className="border-primary/20 bg-primary/5 animate-pulse h-48" />
          ) : currentCourse?.course ? (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden relative">
                    {currentCourse.course.thumbnail ? (
                      <img
                        src={currentCourse.course.thumbnail}
                        className="object-cover w-full h-full"
                        alt={currentCourse.course.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full  bg-secondary backdrop-blur flex items-center justify-center cursor-pointer  transition-colors">
                        <Play
                          className="w-5 h-5 ml-1 text-white"
                          fill="white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge
                          variant="outline"
                          className="mb-2 bg-black/20 text-xs"
                        >
                          {currentCourse.course.track}
                        </Badge>
                        <h3 className="text-xl font-bold">
                          {currentCourse.course.title}
                        </h3>
                      </div>
                      <Link
                        href={`/course/${currentCourse.course.slug.current}`}
                      >
                        <Button>Continue</Button>
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {currentCourse.course.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Course Progress</span>
                        <span>
                          {currentCourse.progress.completionPercentage}%
                        </span>
                      </div>
                      <Progress
                        value={currentCourse.progress.completionPercentage}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-white/10 border-dashed">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-3">
                <BookOpen className="w-8 h-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No courses enrolled yet
                </p>
                <Link href="/course">
                  <Button variant="outline" size="sm">
                    Browse Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Activity Heatmap */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-base tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 justify-between overflow-x-auto pb-2">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const active = Math.random() > 0.7;
                      const intensity = Math.random();
                      let bg = "bg-white/5";
                      if (active) {
                        if (intensity > 0.8) bg = "bg-primary";
                        else if (intensity > 0.5) bg = "bg-primary/60";
                        else bg = "bg-primary/30";
                      }
                      return (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm ${bg}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          {/* Achievements */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-lg tracking-tighter">
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              {[
                "first_steps",
                "course_completer",
                "week_warrior",
                "monthly_master",
                "consistency_king",
                "rust_rookie",
                "anchor_expert",
                "early_adopter",
              ].map((id) => {
                const unlocked =
                  user?.achievements.some((a) => a.id === id) ?? false;
                return (
                  <div
                    key={id}
                    title={id.replaceAll("_", " ")}
                    className={`aspect-square rounded-lg flex items-center justify-center ${unlocked ? "bg-primary/10 border border-primary/20" : "bg-white/5 opacity-50 grayscale"}`}
                  >
                    <Trophy
                      className={`w-6 h-6 ${unlocked ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Enrolled Courses */}
          <Card className="border-white/10">
            <CardHeader className="flex flex-row border-b items-center justify-between">
              <CardTitle className="text-lg tracking-tighter">
                My Courses
              </CardTitle>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : data?.length ? (
                data.map(({ course, progress }) =>
                  course ? (
                    <Link
                      key={course._id}
                      href={`/course/${course.slug.current}`}
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 bg-white/10">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              className="w-full h-full object-cover"
                              alt={course.title}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {course.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress
                              value={progress.completionPercentage}
                              className="h-1 flex-1"
                            />
                            <span className="text-xs text-muted-foreground shrink-0">
                              {progress.completionPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : null,
                )
              ) : (
                <div className="p-8 border-0 border-none flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">No courses yet</p>
                    <p className="text-xs text-muted-foreground">
                      Start learning and track your progress.
                    </p>
                  </div>
                  {/* <Link href="/course">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Play className="w-3 h-3" />
                      Browse Courses
                    </Button>
                  </Link> */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
