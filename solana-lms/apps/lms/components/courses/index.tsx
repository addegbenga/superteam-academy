import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Progress } from "@workspace/ui/components/progress";
import { Search, Filter, Clock, Zap, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const COURSES = [
  {
    id: 1,
    title: "Solana Fundamentals",
    description:
      "Learn the core concepts of Solana: Accounts, Programs, and Transactions.",
    level: "Beginner",
    duration: "4h",
    xp: 500,
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    progress: 0,
    topic: "Core",
  },
  {
    id: 2,
    title: "Rust for Smart Contracts",
    description:
      "Master Rust programming specifically for the Solana blockchain.",
    level: "Intermediate",
    duration: "8h",
    xp: 1200,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    progress: 35,
    topic: "Development",
  },
  {
    id: 3,
    title: "DeFi Architecture",
    description:
      "Deep dive into AMMs, Lending protocols, and Yield farming on Solana.",
    level: "Advanced",
    duration: "12h",
    xp: 2500,
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800",
    progress: 0,
    topic: "DeFi",
  },
  {
    id: 4,
    title: "Anchor Framework 101",
    description:
      "Accelerate your development with the most popular Solana framework.",
    level: "Intermediate",
    duration: "6h",
    xp: 800,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    progress: 0,
    topic: "Frameworks",
  },
];

export default function Courses() {
  return (
    <div className="container max-w-7xl  mx-auto px-4 py-12">
      <div className="flex flex-col gap-6 mb-12">
        <div>
          <h1 className="text-3xl tracking-tight font-bold mb-2">
            Course Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Master the Solana ecosystem with expert-led courses.
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 h-11 bg-white/5 border-white/10"
            />
          </div>
          <Button variant="outline" className="border-white/10 h-11 bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <Link key={course.id} href={`/courses/${course.title}`}>
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <div className="aspect-video h-44 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                <Image
                width={200}
                height={200}
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <Badge
                    variant="secondary"
                    
                    className="bg-black/50 backdrop-blur-md border-white/10 "
                  >
                    10% Completed
                  </Badge>
                </div>
              </div>
              <div className="p-6 pb-0 flex flex-col flex-1">
                <h3 className="tracking-tight font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 ">
                  {course.description}
                </p>
                  <div className="grid pt-2.5 space-y-2">
                    <Progress value={ course.progress} />
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    <Zap className="w-3 h-3" /> {course.xp} XP
                  </span>
                </div>
                </div>



              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
