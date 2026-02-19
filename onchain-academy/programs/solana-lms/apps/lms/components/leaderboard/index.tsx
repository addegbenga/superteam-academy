import { Trophy, Flame, Zap, Award } from "lucide-react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";

const LEADERBOARD_DATA = [
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
    name: "solana_fan",
    avatar: "SF",
    xp: 12100,
    level: 38,
    streak: 45,
    badge: "Expert",
  },
  {
    rank: 3,
    name: "rust_god",
    avatar: "RG",
    xp: 11050,
    level: 35,
    streak: 88,
    badge: "Expert",
  },
  {
    rank: 4,
    name: "anchor_king",
    avatar: "AK",
    xp: 9800,
    level: 32,
    streak: 30,
    badge: "Pro",
  },
  {
    rank: 5,
    name: "dex_dev",
    avatar: "DD",
    xp: 8500,
    level: 28,
    streak: 15,
    badge: "Pro",
  },
  {
    rank: 6,
    name: "block_ninja",
    avatar: "BN",
    xp: 7200,
    level: 25,
    streak: 60,
    badge: "Rookie",
  },
  {
    rank: 452,
    name: "you",
    avatar: "DV",
    xp: 1240,
    level: 12,
    streak: 12,
    highlight: true,
  },
];

export default function Leaderboard() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-4">
          <Trophy className="w-10 h-10 text-yellow-400" /> Global Leaderboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Top developers building on the frontier of Solana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <TopCard rank={2} name="solana_fan" xp="12.1k" />
        <TopCard rank={1} name="kyle_builds" xp="15.2k" primary />
        <TopCard rank={3} name="rust_god" xp="11.1k" />
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    User
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">
                    Level
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">
                    Streak
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">
                    XP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LEADERBOARD_DATA.map((user) => (
                  <tr
                    key={user.name}
                    className={`group transition-colors ${user.highlight ? "bg-primary/10" : "hover:bg-white/5"}`}
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
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {user.name}
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
                            Full Stack Developer
                          </div>
                        </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TopCard({ rank, name, xp, primary }: any) {
  return (
    <div
      className={`relative flex flex-col items-center p-6 rounded-2xl border ${
        primary
          ? "bg-primary/10 border-primary/50 -translate-y-4 shadow-[0_20px_40px_-15px_rgba(20,241,149,0.3)]"
          : "bg-white/5 border-white/10 mt-4"
      }`}
    >
      <div
        className={`absolute -top-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-black ${
          rank === 1
            ? "bg-yellow-400"
            : rank === 2
              ? "bg-slate-300"
              : "bg-amber-600"
        }`}
      >
        {rank}
      </div>
      <Avatar
        className={`w-20 h-20 mb-4 border-2 ${primary ? "border-primary" : "border-white/10"}`}
      >
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="text-lg font-heading font-bold">{name}</div>
      <div className="text-sm font-mono text-muted-foreground">{xp} XP</div>
    </div>
  );
}
