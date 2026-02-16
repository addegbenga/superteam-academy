"use client";
import {
  Play,
  Clock,
  BookOpen,
  Globe,
  CheckCircle2,
  ChevronRight,
  Share2,
  Award,
  Zap,
  Shield,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  INSTRUCTORS,
  LEARNING_OBJECTIVES,
  SYLLABUS,
  TESTIMONIALS,
} from "@/lib/data";

// ==================== COMPONENTS ====================

function CourseHero({ courseId }: { courseId: string }) {
  return (
    <div className="px-4">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Thumbnail Card */}
        <div className="w-full lg:w-112.5 shrink-0">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <div className="aspect-video relative">
              <Image
                width={500}
                height={500}
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
                alt="Solana Fundamentals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 text-primary fill-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Courses
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary tracking-tight">
              Solana Fundamentals
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-4xl tracking-tighter line-clamp-1 font-bold">
              Solana Fundamentals
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-white/5 bg-white/5 hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-muted-foreground line-clamp-3 leading-relaxed max-w-3xl">
            Solana Fundamentals is a beginner-friendly yet rigorous course
            designed to give you a solid grasp of blockchain fundamentals.
            You'll explore how blockchains work, what smart contracts do, how to
            send on-chain transactions, and why concepts like decentralization
            and scalability matter.
          </p>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground border-y border-white/5 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> 6hrs
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> 58 lessons
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> 20+ languages
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Beginner
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link href={`${courseId}/learn`}>
              <Button
                size="lg"
                className="font-bold px-4 shadow-[0_0_20px_-5px_rgba(20,241,149,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                Start learning now
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden ring-2 ring-primary/10"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="Student"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                110,000+ students enrolled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearningObjectives() {
  return (
    <section className="space-y-6">
      <h3 className="text-xl tracking-tight font-bold">What you'll learn</h3>
      <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
        {LEARNING_OBJECTIVES.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CourseDescription() {
  return (
    <section className="space-y-4">
      <h3 className="text-xl tracking-tight font-bold">Course description</h3>
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
        <p>
          Build your foundational blockchain knowledge and unlock your future as
          a blockchain developer or web3 professional. The all-new Blockchain
          Basics is a comprehensive, beginner-friendly course designed to take
          you from zero to proficient in blockchain fundamentals in just a few
          hours. You'll gain a deep understanding of how decentralized
          technologies work, from sending your first transaction to grasping the
          core architecture of blockchain systems.
        </p>
        <p>
          This is the most up-to-date and practical blockchain fundamentals
          course available anywhere. It teaches you what actually matters: how
          blockchain networks operate, what wallets do, how smart contracts
          create trust minimized agreements, and why decentralization changes
          the game for ownership and innovation.
        </p>
      </div>
      <Button
        variant="link"
        className="text-primary p-0 h-auto font-bold flex items-center gap-1 group"
      >
        Read more{" "}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </section>
  );
}

function InstructorsSection() {
  return (
    <section className="space-y-6">
      <h3 className="text-xl tracking-tight font-bold">
        Meet your instructors
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSTRUCTORS.map((ins) => (
          <div
            key={ins.name}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group"
          >
            <Avatar className="w-14 h-14 border border-white/10 group-hover:border-primary/50">
              <AvatarImage src={ins.avatar} />
              <AvatarFallback>{ins.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-white group-hover:text-primary transition-colors">
                {ins.name}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {ins.role}
              </div>
              <div className="flex gap-2 transition-opacity">
                <Twitter className="w-3 h-3 cursor-pointer hover:text-primary" />
                <Linkedin className="w-3 h-3 cursor-pointer hover:text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SyllabusSection() {
  return (
    <section>
      <h3 className="text-xl tracking-tight font-bold mb-6">Syllabus</h3>
      <div className="space-y-4">
        {SYLLABUS.map((module, i) => (
          <Accordion
            key={i}
            type="single"
            collapsible
            className="border border-white/5 rounded-xl bg-white/5 overflow-hidden"
          >
            <AccordionItem value={`item-${i}`} className="border-none">
              <AccordionTrigger className="px-6 py-4 **:data-[slot=accordion-trigger-icon]:mt-2 hover:no-underline transition-colors">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center font-bold text-sm text-primary border border-white/5">
                      {i + 1}
                    </div>
                    <span className="font-bold tracking-tight text-lg">
                      {module.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {module.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {module.lessons} lessons
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <div className="space-y-1 ml-12 border-l border-white/10 pl-6">
                  {module.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between py-2 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {j === 0 ? (
                          <Play className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <BookOpen className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <span className="text-muted-foreground group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        5:00
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="space-y-10 pt-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Testimonials</h3>
        <p className="text-muted-foreground">
          Here's what our students are saying about their experience with Solana
          Academy:
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
          >
            <p className="text-muted-foreground mb-6 italic leading-relaxed">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                <AvatarImage src={t.avatar} />
                <AvatarFallback>{t.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-primary uppercase tracking-widest">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CourseSidebar() {
  return (
    <div className="lg:w-87.5 shrink-0 space-y-6 sticky top-24 self-start">
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden border-t-primary/20 border-t-2">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-primary/20 text-primary border-primary/20">
              Available
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-square rounded-xl bg-linear-to-br from-primary/20 via-background to-secondary/20 border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <Award className="w-20 h-20 text-primary opacity-50 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold tracking-tighter text-lg">
              Earn the Fundamentals achievement
            </h4>
            <p className="text-sm text-muted-foreground">
              by <span className="text-primary font-bold">Solana Academy</span>
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full border-white/10 hover:bg-white/5 group"
          >
            Learn more{" "}
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">
              This course is sponsored by
            </div>
            <div className="font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Solana Foundation
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function CourseDetail() {
  const params = useParams();

  return (
    <div className="bg-background container mx-auto max-w-7xl pt-12 px-4 pb-24">
      {/* Course Hero Section */}
      <CourseHero courseId={params.courseId as string} />

      {/* Content Tabs / Main Layout */}
      <div className="container mx-auto px-4 mt-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <div className="flex-1 space-y-16">
            <LearningObjectives />
            <CourseDescription />
            <InstructorsSection />
            <SyllabusSection />
            <TestimonialsSection />
          </div>
          {/* Right: Sidebar Cards */}
          <CourseSidebar />
        </div>
      </div>
    </div>
  );
}
