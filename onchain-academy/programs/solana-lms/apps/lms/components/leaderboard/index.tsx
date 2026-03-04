
"use client";

import { useI18n } from "@/lib/i18n";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Trophy, Flame, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TimePeriod = "weekly" | "monthly" | "alltime";
type CourseFilter = "all" | "web3" | "rust" | "solana";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badge?: string;
  course?: string;
  isCurrentUser?: boolean;
}

// Mock data - Replace with API call
const LEADERBOARD_DATA: Record<
  TimePeriod,
  Record<CourseFilter, LeaderboardUser[]>
> = {
  weekly: {
    all: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 2500,
        level: 45,
        streak: 15,
        badge: "Master",
        course: "web3",
      },
      {
        rank: 2,
        name: "solana_fan",
        avatar: "SF",
        xp: 2100,
        level: 38,
        streak: 12,
        badge: "Expert",
        course: "solana",
      },
      {
        rank: 3,
        name: "rust_god",
        avatar: "RG",
        xp: 1900,
        level: 35,
        streak: 10,
        badge: "Expert",
        course: "rust",
      },
      {
        rank: 452,
        name: "you",
        avatar: "DV",
        xp: 240,
        level: 12,
        streak: 5,
        isCurrentUser: true,
        course: "web3",
      },
    ],
    web3: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 2500,
        level: 45,
        streak: 15,
        badge: "Master",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 1800,
        level: 32,
        streak: 8,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 1500,
        level: 28,
        streak: 6,
        badge: "Pro",
      },
      {
        rank: 78,
        name: "you",
        avatar: "DV",
        xp: 240,
        level: 12,
        streak: 5,
        isCurrentUser: true,
      },
    ],
    rust: [
      {
        rank: 1,
        name: "rust_god",
        avatar: "RG",
        xp: 1900,
        level: 35,
        streak: 10,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "block_ninja",
        avatar: "BN",
        xp: 1200,
        level: 25,
        streak: 8,
        badge: "Rookie",
      },
      {
        rank: 3,
        name: "solana_fan",
        avatar: "SF",
        xp: 980,
        level: 22,
        streak: 6,
      },
    ],
    solana: [
      {
        rank: 1,
        name: "solana_fan",
        avatar: "SF",
        xp: 2100,
        level: 38,
        streak: 12,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 1600,
        level: 30,
        streak: 9,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 1400,
        level: 27,
        streak: 7,
      },
    ],
  },
  monthly: {
    all: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 8500,
        level: 45,
        streak: 30,
        badge: "Master",
        course: "web3",
      },
      {
        rank: 2,
        name: "solana_fan",
        avatar: "SF",
        xp: 7200,
        level: 38,
        streak: 25,
        badge: "Expert",
        course: "solana",
      },
      {
        rank: 3,
        name: "rust_god",
        avatar: "RG",
        xp: 6800,
        level: 35,
        streak: 22,
        badge: "Expert",
        course: "rust",
      },
      {
        rank: 187,
        name: "you",
        avatar: "DV",
        xp: 850,
        level: 12,
        streak: 12,
        isCurrentUser: true,
        course: "web3",
      },
    ],
    web3: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 8500,
        level: 45,
        streak: 30,
        badge: "Master",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 6200,
        level: 32,
        streak: 20,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 5500,
        level: 28,
        streak: 18,
        badge: "Pro",
      },
      {
        rank: 52,
        name: "you",
        avatar: "DV",
        xp: 850,
        level: 12,
        streak: 12,
        isCurrentUser: true,
      },
    ],
    rust: [
      {
        rank: 1,
        name: "rust_god",
        avatar: "RG",
        xp: 6800,
        level: 35,
        streak: 22,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "block_ninja",
        avatar: "BN",
        xp: 4500,
        level: 25,
        streak: 15,
        badge: "Rookie",
      },
      {
        rank: 3,
        name: "solana_fan",
        avatar: "SF",
        xp: 3800,
        level: 22,
        streak: 12,
      },
    ],
    solana: [
      {
        rank: 1,
        name: "solana_fan",
        avatar: "SF",
        xp: 7200,
        level: 38,
        streak: 25,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 5800,
        level: 30,
        streak: 18,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 5200,
        level: 27,
        streak: 16,
      },
    ],
  },
  alltime: {
    all: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 15240,
        level: 45,
        streak: 120,
        badge: "Master",
        course: "web3",
      },
      {
        rank: 2,
        name: "solana_fan",
        avatar: "SF",
        xp: 12100,
        level: 38,
        streak: 45,
        badge: "Expert",
        course: "solana",
      },
      {
        rank: 3,
        name: "rust_god",
        avatar: "RG",
        xp: 11050,
        level: 35,
        streak: 88,
        badge: "Expert",
        course: "rust",
      },
      {
        rank: 4,
        name: "anchor_king",
        avatar: "AK",
        xp: 9800,
        level: 32,
        streak: 30,
        badge: "Pro",
        course: "web3",
      },
      {
        rank: 5,
        name: "dex_dev",
        avatar: "DD",
        xp: 8500,
        level: 28,
        streak: 15,
        badge: "Pro",
        course: "solana",
      },
      {
        rank: 6,
        name: "block_ninja",
        avatar: "BN",
        xp: 7200,
        level: 25,
        streak: 60,
        badge: "Rookie",
        course: "rust",
      },
      {
        rank: 452,
        name: "you",
        avatar: "DV",
        xp: 1240,
        level: 12,
        streak: 12,
        isCurrentUser: true,
        course: "web3",
      },
    ],
    web3: [
      {
        rank: 1,
        name: "kyle_builds",
        avatar: "KB",
        xp: 15240,
        level: 45,
        streak: 120,
        badge: "Master",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 9800,
        level: 32,
        streak: 30,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 8500,
        level: 28,
        streak: 15,
        badge: "Pro",
      },
      {
        rank: 4,
        name: "block_ninja",
        avatar: "BN",
        xp: 5200,
        level: 20,
        streak: 20,
      },
      {
        rank: 148,
        name: "you",
        avatar: "DV",
        xp: 1240,
        level: 12,
        streak: 12,
        isCurrentUser: true,
      },
    ],
    rust: [
      {
        rank: 1,
        name: "rust_god",
        avatar: "RG",
        xp: 11050,
        level: 35,
        streak: 88,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "block_ninja",
        avatar: "BN",
        xp: 7200,
        level: 25,
        streak: 60,
        badge: "Rookie",
      },
      {
        rank: 3,
        name: "solana_fan",
        avatar: "SF",
        xp: 5500,
        level: 22,
        streak: 30,
      },
      {
        rank: 4,
        name: "kyle_builds",
        avatar: "KB",
        xp: 4800,
        level: 18,
        streak: 25,
      },
    ],
    solana: [
      {
        rank: 1,
        name: "solana_fan",
        avatar: "SF",
        xp: 12100,
        level: 38,
        streak: 45,
        badge: "Expert",
      },
      {
        rank: 2,
        name: "anchor_king",
        avatar: "AK",
        xp: 9800,
        level: 32,
        streak: 30,
        badge: "Pro",
      },
      {
        rank: 3,
        name: "dex_dev",
        avatar: "DD",
        xp: 8500,
        level: 28,
        streak: 15,
        badge: "Pro",
      },
      {
        rank: 4,
        name: "kyle_builds",
        avatar: "KB",
        xp: 5200,
        level: 20,
        streak: 20,
      },
    ],
  },
};

const courses = [
  { value: "all", label: "All Courses" },
  { value: "web3", label: "Web3 Development" },
  { value: "rust", label: "Rust Programming" },
  { value: "solana", label: "Solana Development" },
];

function TopCards({ users }: { users: LeaderboardUser[] }) {
  const topThree = users.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {topThree.map((user, idx) => (
        <div
          key={user.name}
          className={`relative flex flex-col items-center p-6 rounded-2xl border transition-all ${
            idx === 1
              ? "bg-primary/10 border-primary/50 -translate-y-4 shadow-[0_20px_40px_-15px_rgba(20,241,149,0.3)]"
              : "bg-white/5 border-white/10 mt-4"
          }`}
        >
          <div
            className={`absolute -top-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-black ${
              idx === 0
                ? "bg-yellow-400"
                : idx === 1
                  ? "bg-slate-300"
                  : "bg-amber-600"
            }`}
          >
            {idx + 1}
          </div>
          <Avatar
            className={`w-20 h-20 mb-4 border-2 ${
              idx === 1 ? "border-primary" : "border-white/10"
            }`}
          >
            <AvatarFallback>{user.avatar}</AvatarFallback>
          </Avatar>
          <div className="text-lg font-bold text-center">{user.name}</div>
          <div className="text-sm font-mono text-muted-foreground">
            {user.xp.toLocaleString()} XP
          </div>
        </div>
      ))}
    </div>
  );
}

function LeaderboardTable({ users }: { users: LeaderboardUser[] }) {
  const { t } = useI18n();

  return (

    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-muted-foreground">
                {t("leaderboard.rank")}
              </th>
              <th className="px-6 py-4 text-left font-bold text-muted-foreground">
                {t("leaderboard.user")}
              </th>
              <th className="px-6 py-4 text-center font-bold text-muted-foreground">
                {t("leaderboard.level")}
              </th>
              <th className="px-6 py-4 text-center font-bold text-muted-foreground">
                {t("leaderboard.streak")}
              </th>
              <th className="px-6 py-4 text-right font-bold text-muted-foreground">
                XP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr
                key={user.name}
                className={`group transition-colors ${
                  user.isCurrentUser ? "bg-primary/10" : "hover:bg-white/5"
                }`}
              >
                <td className="px-6 py-4">
                  <span
                    className={`font-mono font-bold text-lg ${
                      user.rank === 1
                        ? "text-yellow-400"
                        : user.rank === 2
                          ? "text-slate-300"
                          : user.rank === 3
                            ? "text-amber-600"
                            : "text-muted-foreground"
                    }`}
                  >
                    #{user.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <Link className="w-full" href={`/profile/${user.name}`}>
                      <div className="font-bold flex items-center gap-2">
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 border-primary/20 bg-primary/5 text-primary"
                          >
                            You
                          </Badge>
                        )}
                        {user.badge && (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 border-primary/20 bg-primary/5 text-primary"
                          >
                            {user.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("leaderboard.fullStackDeveloper")}
                      </div>
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                    <Zap className="w-3 h-3 fill-current" /> {user.level}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">
                    <Flame className="w-3 h-3 fill-current" /> {user.streak}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono font-bold text-primary">
                    {user.xp.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>

  );
}

export default function LeaderboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("alltime");
  const [course, setCourse] = useState<CourseFilter>("all");
  const { t } = useI18n();

  const users = LEADERBOARD_DATA[timePeriod][course];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
          <Trophy className="w-10 h-10 text-yellow-400" />
          {t("leaderboard.globalLeaderboard")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("leaderboard.topDevelopers")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
        <Tabs
          value={timePeriod}
          onValueChange={(value) => setTimePeriod(value as TimePeriod)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid bg-secondary/30 border border-border w-full grid-cols-3 sm:w-auto">
            <TabsTrigger className="data-[state=active]:bg-secondary" value="weekly">Weekly</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-secondary" value="monthly">Monthly</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-secondary" value="alltime">All-Time</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select
          value={course}
          onValueChange={(value) => setCourse(value as CourseFilter)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Top 3 Cards */}
      <TopCards users={users} />

      {/* Full Leaderboard Table */}
      <LeaderboardTable users={users} />
    </div>
  );
}
