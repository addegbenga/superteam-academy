import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Box, ChevronRight, Trophy, Zap } from "lucide-react";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white/5 border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <CardContent className="p-8">
        <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl border border-white/5">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

export function CourseCard({
  title,
  level,
  modules,
  xp,
  image,
  progress,
}: any) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-black/70"
          >
            {level}
          </Badge>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <Box className="w-3 h-3" /> {modules} Modules
          </span>
          <span className="flex items-center gap-1 text-primary">
            <Zap className="w-3 h-3" /> {xp} XP
          </span>
        </div>

        <div className="mt-auto">
          {progress > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
              Start Course <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <Card className="bg-white/5 border-white/5">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
           <div className="p-2 bg-black/40 rounded-lg">{icon}</div>
        </div>
        <div>
          <div className="text-2xl font-bold font-heading">{value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}


export function SkillProgress({ icon, label, progress }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">{icon} {label}</div>
        <span className="text-xs font-mono">{progress}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function CredentialCard({ title, id, date, color }: any) {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-black/40 hover:border-primary/50 transition-all">
      <div className={`h-24 bg-linear-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
      <div className="p-4 relative">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-lg">{title}</h4>
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>{id}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
