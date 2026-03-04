"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  CredentialCard,
  SkillProgress,
} from "@workspace/ui/components/custom-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Github,
  Twitter,
  Globe,
  Calendar,
  Shield,
  Code,
  Lock,
  Eye,
  Trophy,
  Zap,
  Flame,
  ExternalLink,
  Check,
  Settings,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { userQueries } from "@/lib/queries";
import { getCurrentUserId } from "@/hooks/auth";
import { useParams } from "next/navigation";

const SKILLS = [
  { id: "rust", label: "Rust", icon: Code, progress: 75 },
  { id: "anchor", label: "Anchor", icon: Code, progress: 60 },
  { id: "frontend", label: "Frontend", icon: Code, progress: 85 },
  { id: "security", label: "Security", icon: Shield, progress: 45 },
  { id: "defi", label: "DeFi", icon: Zap, progress: 55 },
  { id: "nft", label: "NFTs", icon: Trophy, progress: 40 },
];

const MOCK_CREDENTIALS = [
  {
    id: "CNFT...9X21",
    title: "Solana Fundamentals",
    track: "fundamentals",
    level: 3,
    date: "Feb 2024",
    color: "from-teal-500 to-blue-500",
  },
  {
    id: "CNFT...Y881",
    title: "DeFi Master",
    track: "defi",
    level: 5,
    date: "Mar 2024",
    color: "from-yellow-500 to-orange-500",
  },
];

const MOCK_ACHIEVEMENTS = [
  { id: "first_steps", name: "First Steps", icon: "🚀", date: "Jan 12, 2024" },
  {
    id: "course_completer",
    name: "Course Completer",
    icon: "📚",
    date: "Jan 20, 2024",
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    icon: "🔥",
    date: "Feb 01, 2024",
  },
  { id: "rust_rookie", name: "Rust Rookie", icon: "⚙️", date: "Feb 15, 2024" },
  {
    id: "anchor_expert",
    name: "Anchor Expert",
    icon: "⚓",
    date: "Mar 01, 2024",
  },
  {
    id: "early_adopter",
    name: "Early Adopter",
    icon: "⭐",
    date: "Jan 01, 2024",
  },
];

const MOCK_COMPLETED_COURSES = [
  {
    id: "1",
    title: "Solana Fundamentals",
    completedAt: "Feb 15, 2024",
    xp: 500,
    credentialId: "CNFT...9X21",
  },
  {
    id: "2",
    title: "Rust for Smart Contracts",
    completedAt: "Mar 20, 2024",
    xp: 1200,
    credentialId: "CNFT...9X23",
  },
];

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { userId } = getCurrentUserId();
  const { t } = useI18n();
  const [isPublic, setIsPublic] = useState(true);

  const { data: user } = useQuery(userQueries.profile(userId));
  const isOwnProfile = !username || username === userId;

  const xp = user?.xp ?? 0;
  const level = user?.level ?? 0;
  const streak = user?.streak?.current ?? 0;
  const achievements = user?.achievements ?? [];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
        <div className="flex-1">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            {t("profile.profile")}
          </h1>
          <p className="text-muted-foreground text-base">
            {t("profile.manageYourProfile")}
          </p>
        </div>
        {isOwnProfile && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border hover:border-border/60 transition-colors">
            {isPublic ? (
              <Eye className="w-5 h-5 text-teal-400" />
            ) : (
              <Lock className="w-5 h-5 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {isPublic ? t("profile.public") : t("profile.private")}
            </span>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                isPublic ? "bg-teal-500" : "bg-muted-foreground/30"
              }`}
              aria-label={`Toggle ${isPublic ? "private" : "public"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isPublic ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-6 grid">
        <TabsList className="bg-card border border-border p-1 rounded-lg h-auto">
          <TabsTrigger
            value="overview"
            className="rounded-md data-[state=active]:bg-secondary/70 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("profile.overview")}
          </TabsTrigger>
          <TabsTrigger
            value="credentials"
            className="rounded-md data-[state=active]:bg-secondary/70 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("profile.credentials")}
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="rounded-md data-[state=active]:bg-secondary/70 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("profile.achievements")}
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="rounded-md data-[state=active]:bg-secondary/70 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("profile.completedCourses")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="lg:w-1/3 space-y-6">
              <Card className="border-border pt-0 bg-card overflow-hidden hover:border-border/60 transition-colors">
                {/* Subtle dark banner — no vivid gradient, matches dashboard's restrained style */}
                <div className="h-28 bg-linear-to-r from-teal-950/50 to-card" />
                <CardContent className="relative  px-6 pb-6">
                  <div className="absolute -top-10 left-6">
                    <Avatar className="w-24 h-24 border-4 border-card ring-2 ring-teal-500/25">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={user?.userId || "User"}
                      />
                      <AvatarFallback>DV</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-14 space-y-5">
                    <div className="space-y-2">
                      <h2 className="text-2xl pt-2 font-heading font-bold text-foreground flex items-center gap-2">
                        <span className="truncate text-ellipsis line-clamp-1">

                        {user?.userId || "SolanaDev_2024"}
                        </span>
                        {isOwnProfile && (
                          <Link href="/settings">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted rounded-lg"
                              aria-label={t("profile.editProfile")}
                            >
                              <Settings className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </Link>
                        )}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t("profile.description")}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                        <Calendar className="w-4 h-4" />
                        {t("profile.joined")} January 2024
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground"
                        aria-label="Website"
                      >
                        <Globe className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Stats — exact color mapping from dashboard:
                        Zap/XP = yellow-400, Level = teal-400, Streak = orange-500 */}
                    <div className="border-t border-border grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <div className="text-lg font-bold font-heading text-foreground">
                            {xp.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          {t("profile.xp")}
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-lg font-bold font-heading text-teal-400">
                          {t("profile.levelShort")} {level}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          {t("profile.level")}
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <div className="text-lg font-bold font-heading text-foreground">
                            {streak}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          {t("profile.streak")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills - Desktop */}
              <Card className="border-border bg-card hidden lg:flex flex-col hover:border-border/60 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-heading font-bold flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5 text-teal-400" />
                    {t("profile.skills")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  {SKILLS.map((skill) => (
                    <SkillProgress
                      key={skill.id}
                      icon={<skill.icon className="w-4 h-4 text-teal-400" />}
                      label={skill.label}
                      progress={skill.progress}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-6">
              {/* Skills - Mobile */}
              <Card className="border-border bg-card lg:hidden hover:border-border/60 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-heading font-bold flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5 text-teal-400" />
                    {t("profile.skills")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {SKILLS.map((skill) => (
                    <SkillProgress
                      key={skill.id}
                      icon={<skill.icon className="w-4 h-4 text-teal-400" />}
                      label={skill.label}
                      progress={skill.progress}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Credentials */}
              <Card className="border-border bg-card hover:border-border/60 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-heading font-bold text-foreground">
                    {t("profile.onChainCredentials")}
                  </CardTitle>
                  <Badge className="bg-teal-500/15 text-teal-400 border border-teal-500/30 font-medium">
                    {MOCK_CREDENTIALS.length} {t("profile.nfts")}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_CREDENTIALS.map((cred) => (
                      <Link key={cred.id} href={`/certificates/${cred.id}`}>
                        <CredentialCard
                          title={cred.title}
                          id={cred.id}
                          date={cred.date}
                          color={cred.color}
                        />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-border bg-card hover:border-border/60 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-heading font-bold text-foreground">
                    {t("profile.achievementShowcase")}
                  </CardTitle>
                  <Badge className="bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 font-medium">
                    {achievements.length || MOCK_ACHIEVEMENTS.length} / 8
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {MOCK_ACHIEVEMENTS.slice(0, 6).map((ach) => (
                      <div
                        key={ach.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border group hover:border-teal-500/25 transition-colors"
                      >
                        <div className="text-xl flex-shrink-0">{ach.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-foreground group-hover:text-teal-400 transition-colors truncate">
                            {ach.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {ach.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Completed Courses */}
              <Card className="border-border bg-card hover:border-border/60 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-heading font-bold text-foreground">
                    {t("profile.completedCourses")}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 text-teal-400 hover:bg-teal-500/10 hover:text-teal-300"
                  >
                    <Link href="?tab=courses">{t("common.viewAll")}</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_COMPLETED_COURSES.slice(0, 2).map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border hover:border-teal-500/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-teal-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground truncate">
                              {course.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {course.completedAt} • +{course.xp}{" "}
                              {t("common.xp")}
                            </div>
                          </div>
                        </div>
                        {course.credentialId && (
                          <Link
                            href={`/certificates/${course.credentialId}`}
                            className="ml-2 flex-shrink-0"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-teal-500/10"
                            >
                              <ExternalLink className="w-4 h-4 text-teal-400" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="credentials">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("profile.onChainCredentials")}
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                {t("profile.credentialDescription")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_CREDENTIALS.map((cred) => (
                  <Link key={cred.id} href={`/certificates/${cred.id}`}>
                    <div className="rounded-xl border border-border bg-muted hover:border-teal-500/30 transition-all p-5 cursor-pointer group">
                      <div
                        className={`h-30 rounded-lg bg-linear-to-br ${cred.color} opacity-40 mb-4 group-hover:opacity-60 transition-opacity`}
                      />
                      <h4 className="font-bold text-base text-foreground">
                        {cred.title}
                      </h4>
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <span className="text-muted-foreground">
                          {t("profile.level")} {cred.level}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {cred.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-xs font-medium bg-teal-500/15 text-teal-400 border border-teal-500/30">
                          {cred.track}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {cred.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("profile.achievementShowcase")}
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                {t("profile.achievementDescription")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {MOCK_ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex flex-col items-center p-5 rounded-xl bg-muted border border-border group hover:border-yellow-500/30 transition-all text-center"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {ach.icon}
                    </div>
                    <div className="font-bold text-sm text-foreground">
                      {ach.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {ach.date}
                    </div>
                  </div>
                ))}
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={`locked-${i}`}
                    className="flex flex-col items-center p-5 rounded-xl bg-muted border border-border opacity-40 text-center"
                  >
                    <div className="text-4xl mb-3 grayscale">🔒</div>
                    <div className="font-bold text-sm text-foreground">???</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("profile.locked")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("profile.completedCourses")}
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                {t("profile.completedCoursesDescription")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_COMPLETED_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl bg-muted border border-border hover:border-teal-500/20 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base text-foreground">
                          {course.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t("profile.completedOn")} {course.completedAt}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-right shrink-0">
                        <div className="text-xs text-muted-foreground">
                          {t("profile.earned")}
                        </div>
                      </div>
                      {course.credentialId && (
                        <Link
                          href={`/certificates/${course.credentialId}`}
                          className="shrink-0"
                        >
                          <Button
                            size="sm"
                            className="gap-2 h-8  font-semibold"
                          >
                            {t("profile.viewCertificate")}
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}