"use client"
import { useGetAllCourses } from "@/hooks/use-course";
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
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const {} = useGetAllCourses();
  return (
    <div className="container max-w-7xl py-10 mx-auto px-4 ">
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
                You're on a 12 day streak! Keep it up.
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Trophy className="text-yellow-400" />}
              label="Total XP"
              value="1,240"
            />
            <StatCard
              icon={<Flame className="text-orange-500" />}
              label="Streak"
              value="12 Days"
            />
            <StatCard
              icon={<Target className="text-blue-400" />}
              label="Modules"
              value="8/42"
            />
            <StatCard
              icon={<Clock className="text-purple-400" />}
              label="Hours"
              value="14.5"
            />
          </div>

          {/* Current Course */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
                    className="object-cover w-full h-full"
                    alt="Course"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-primary transition-colors hover:scale-110">
                      <Play className="w-5 h-5 ml-1 text-white" fill="white" />
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
                        Rust for Smart Contracts
                      </Badge>
                      <h3 className="text-xl font-bold">
                        Module 4: Cross-Program Invocation (CPI)
                      </h3>
                    </div>
                    <Link href={`courses/${1}`}>
                      <Button>Continue</Button>
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to call other programs from your smart contract.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Course Progress</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Heatmap (Mock) */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className=" text-base tracking-tight flex items-center gap-2">
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center ${i <= 3 ? "bg-primary/10 border border-primary/20" : "bg-white/5 opacity-50 grayscale"}`}
                >
                  <Trophy
                    className={`w-6 h-6 ${i <= 3 ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg tracking-tighter">
                Top Learners
              </CardTitle>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "kyle_builds", xp: "15,240", rank: 1 },
                { name: "solana_fan", xp: "12,100", rank: 2 },
                { name: "rust_god", xp: "11,050", rank: 3 },
                { name: "you", xp: "1,240", rank: 452, highlight: true },
              ].map((user) => (
                <div
                  key={user.name}
                  className={`flex items-center justify-between p-2 rounded-lg ${user.highlight ? "bg-white/10 border border-white/5" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold w-4 ${user.rank <= 3 ? "text-yellow-400" : "text-muted-foreground"}`}
                    >
                      #{user.rank}
                    </span>
                    {user.name?.[0] && (
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold">
                        {user.name?.[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {user.xp} XP
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
