// "use client"
// import { Badge } from "@workspace/ui/components/badge";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@workspace/ui/components/card";
// import { StatCard } from "@workspace/ui/components/custom-card";
// import { Progress } from "@workspace/ui/components/progress";
// import {
//   Trophy,
//   Flame,
//   Target,
//   Clock,
//   Calendar,
//   ChevronRight,
//   Play,
// } from "lucide-react";
// import Link from "next/link";

// export default function DashboardHome() {

//   return (
//     <div className="container max-w-7xl py-10 mx-auto px-4 ">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Main Column */}
//         <div className="flex-1 space-y-8">
//           {/* Welcome */}
//           <div className="flex items-end justify-between">
//             <div>
//               <h1 className="text-3xl tracking-tighter font-bold mb-2">
//                 Welcome back, Dev 👋
//               </h1>
//               <p className="text-muted-foreground">
//                 You're on a 12 day streak! Keep it up.
//               </p>
//             </div>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <StatCard
//               icon={<Trophy className="text-yellow-400" />}
//               label="Total XP"
//               value="1,240"
//             />
//             <StatCard
//               icon={<Flame className="text-orange-500" />}
//               label="Streak"
//               value="12 Days"
//             />
//             <StatCard
//               icon={<Target className="text-blue-400" />}
//               label="Modules"
//               value="8/42"
//             />
//             <StatCard
//               icon={<Clock className="text-purple-400" />}
//               label="Hours"
//               value="14.5"
//             />
//           </div>

//           {/* Current Course */}
//           <Card className="border-primary/20 bg-primary/5">
//             <CardContent className="p-6">
//               <div className="flex flex-col md:flex-row gap-6 items-center">
//                 <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden relative">
//                   <img
//                     src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
//                     className="object-cover w-full h-full"
//                     alt="Course"
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                     <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-primary transition-colors hover:scale-110">
//                       <Play className="w-5 h-5 ml-1 text-white" fill="white" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 w-full">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <Badge
//                         variant="outline"
//                         className="mb-2 bg-black/20 text-xs"
//                       >
//                         Rust for Smart Contracts
//                       </Badge>
//                       <h3 className="text-xl font-bold">
//                         Module 4: Cross-Program Invocation (CPI)
//                       </h3>
//                     </div>
//                     <Link href={`courses/${1}`}>
//                       <Button>Continue</Button>
//                     </Link>
//                   </div>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Learn how to call other programs from your smart contract.
//                   </p>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-xs">
//                       <span>Course Progress</span>
//                       <span>35%</span>
//                     </div>
//                     <Progress value={35} className="h-2" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Activity Heatmap (Mock) */}
//           <Card className="border-white/10">
//             <CardHeader>
//               <CardTitle className=" text-base tracking-tight flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-muted-foreground" />
//                 Activity Log
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-1 justify-between overflow-x-auto pb-2">
//                 {Array.from({ length: 52 }).map((_, weekIndex) => (
//                   <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
//                     {Array.from({ length: 7 }).map((_, dayIndex) => {
//                       const active = Math.random() > 0.7;
//                       const intensity = Math.random();
//                       let bg = "bg-white/5";
//                       if (active) {
//                         if (intensity > 0.8) bg = "bg-primary";
//                         else if (intensity > 0.5) bg = "bg-primary/60";
//                         else bg = "bg-primary/30";
//                       }
//                       return (
//                         <div
//                           key={dayIndex}
//                           className={`w-3 h-3 rounded-sm ${bg}`}
//                         />
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="w-full md:w-80 space-y-6">
//           {/* Achievements */}
//           <Card className="border-white/10">
//             <CardHeader>
//               <CardTitle className="text-lg tracking-tighter">
//                 Achievements
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-4 gap-4">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//                 <div
//                   key={i}
//                   className={`aspect-square rounded-lg flex items-center justify-center ${i <= 3 ? "bg-primary/10 border border-primary/20" : "bg-white/5 opacity-50 grayscale"}`}
//                 >
//                   <Trophy
//                     className={`w-6 h-6 ${i <= 3 ? "text-primary" : "text-muted-foreground"}`}
//                   />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Leaderboard Preview */}
//           <Card className="border-white/10">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-lg tracking-tighter">
//                 Top Learners
//               </CardTitle>
//               <ChevronRight className="w-4 h-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {[
//                 { name: "kyle_builds", xp: "15,240", rank: 1 },
//                 { name: "solana_fan", xp: "12,100", rank: 2 },
//                 { name: "rust_god", xp: "11,050", rank: 3 },
//                 { name: "you", xp: "1,240", rank: 452, highlight: true },
//               ].map((user) => (
//                 <div
//                   key={user.name}
//                   className={`flex items-center justify-between p-2 rounded-lg ${user.highlight ? "bg-white/10 border border-white/5" : ""}`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span
//                       className={`text-sm font-bold w-4 ${user.rank <= 3 ? "text-yellow-400" : "text-muted-foreground"}`}
//                     >
//                       #{user.rank}
//                     </span>
//                     {user.name?.[0] && (
//                       <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold">
//                         {user.name?.[0].toUpperCase()}
//                       </div>
//                     )}
//                     <span className="text-sm font-medium">{user.name}</span>
//                   </div>
//                   <span className="text-xs font-mono text-muted-foreground">
//                     {user.xp} XP
//                   </span>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
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
import { useQuery } from "@tanstack/react-query";
import {
  userQueries,
  progressQueries,
  leaderboardQueries,
  courseQueries,
} from "@/lib/queries";
import { getCurrentUserId } from "@/hooks/auth";

export default function DashboardHome() {
  const userId = getCurrentUserId();

  const { data: user } = useQuery(userQueries.profile(userId));
  const { data: leaderboard } = useQuery(
    leaderboardQueries.byTimeframe("alltime"),
  );
  const { data: enrolledCourses } = useQuery(progressQueries.enrolled(userId));

  console.log(enrolledCourses)

  const recentProgress = enrolledCourses?.[0];

  console.log(recentProgress?.courseId,"kkss")

  const { data: recentCourse } = useQuery({
    ...courseQueries.byId(recentProgress?.courseId ?? ""),
    enabled: !!recentProgress?.courseId,
  });

  console.log(recentCourse,"xx")

  const totalXp = user?.xp ?? 0;
  const streak = user?.streak.current ?? 0;
  const achievements = user?.achievements ?? [];
  const allAchievementDefs = [
    "first_steps",
    "course_completer",
    "week_warrior",
    "monthly_master",
    "consistency_king",
    "rust_rookie",
    "anchor_expert",
    "early_adopter",
  ];

  return (
    <div className="container max-w-7xl py-10 mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Column */}
        <div className="flex-1 space-y-8">
          {/* Welcome */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl tracking-tighter font-bold mb-2">
                Welcome back, Dev 👋
              </h1>
              <p className="text-muted-foreground">
                {streak > 0
                  ? `You're on a ${streak} day streak! Keep it up.`
                  : "Complete a lesson today to start your streak!"}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Trophy className="text-yellow-400" />}
              label="Total XP"
              value={totalXp.toLocaleString()}
            />
            <StatCard
              icon={<Flame className="text-orange-500" />}
              label="Streak"
              value={`${streak} Days`}
            />
            <StatCard
              icon={<Target className="text-blue-400" />}
              label="Achievements"
              value={`${achievements.length}/${allAchievementDefs.length}`}
            />
            <StatCard
              icon={<Clock className="text-purple-400" />}
              label="Level"
              value={`Lvl ${user?.level ?? 0}`}
            />
          </div>

          {/* Current Course */}
          {recentProgress && recentCourse ? (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden relative">
                    {recentCourse.thumbnail ? (
                      <img
                        src={recentCourse.thumbnail as any}
                        className="object-cover w-full h-full"
                        alt={recentCourse.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-primary transition-colors hover:scale-110">
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
                        {/* <Badge variant="outline" className="mb-2 bg-black/20 text-xs">
                          {recentCourse.category ?? "Course"}
                        </Badge> */}
                        <h3 className="text-xl font-bold">
                          {recentCourse.title}
                        </h3>
                      </div>
                      <Link href={`/course/${recentCourse.slug?.current}`}>
                        <Button>Continue</Button>
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {recentCourse.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Course Progress</span>
                        <span>{recentProgress.completionPercentage}%</span>
                      </div>
                      <Progress
                        value={recentProgress.completionPercentage}
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
                      // TODO: map real streakHistory dates once indexed
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
              {allAchievementDefs.map((id) => {
                const unlocked = achievements.some((a) => a.id === id);
                return (
                  <div
                    key={id}
                    title={id.replaceAll("_", " ")}
                    className={`aspect-square rounded-lg flex items-center justify-center ${
                      unlocked
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-white/5 opacity-50 grayscale"
                    }`}
                  >
                    <Trophy
                      className={`w-6 h-6 ${unlocked ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg tracking-tighter">
                Top Learners
              </CardTitle>
              <Link href="/leaderboard">
                <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {(leaderboard ?? []).slice(0, 3).map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center justify-between p-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold w-4 ${entry.rank <= 3 ? "text-yellow-400" : "text-muted-foreground"}`}
                    >
                      #{entry.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold">
                      {entry.username[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">
                      {entry.username}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-4 text-muted-foreground">
                    You
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    Y
                  </div>
                  <span className="text-sm font-medium">you</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {totalXp.toLocaleString()} XP
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
