"use client";

import {
  ArrowLeft,
  CheckCircle,
  Play,
  Trophy,
  Terminal,
  Code,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { Progress } from "@workspace/ui/components/progress";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";
import { PortableTextRenderer } from "../markdown";
import { MonacoEditor } from "../monaco-editor";
import { INITIAL_CODE } from "@/lib/data";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { courseQueries, lessonQueries, progressQueries } from "@/lib/queries";
import { Lesson, Module } from "@workspace/sanity-client";

/* =====================================================
   TYPES
===================================================== */

interface LayoutProps {
  showCodeEditor: boolean;
  setShowCodeEditor: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  consoleOutput: string[];
  runCode: () => void;
}

/* =====================================================
   BUSINESS LOGIC
===================================================== */

function useCourseRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);

    setTimeout(() => {
      setConsoleOutput((prev) => [...prev, "> Compiling program..."]);
    }, 500);

    setTimeout(() => {
      setConsoleOutput((prev) => [...prev, "> Deploying to Devnet..."]);
    }, 1500);

    setTimeout(() => {
      setConsoleOutput((prev) => [
        ...prev,
        "> Program deployed: Fg6P...LnS",
        "> Transaction signature: 5Kj3...9zX",
        "> Logs:",
        "  Program log: Hello Solana!",
        "  Program consumed: 1240 compute units",
      ]);

      setIsRunning(false);

      toast("Success!", {
        description: "Program deployed and executed successfully +50 XP",
      });
    }, 2500);
  };

  return { isRunning, consoleOutput, runCode };
}

/* =====================================================
   SMART CONTAINER
===================================================== */

export default function Course() {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const { isRunning, consoleOutput, runCode } = useCourseRunner();

  return (
    <CourseLayout
      showCodeEditor={showCodeEditor}
      setShowCodeEditor={setShowCodeEditor}
      isRunning={isRunning}
      consoleOutput={consoleOutput}
      runCode={runCode}
    />
  );
}

/* =====================================================
   LAYOUT
===================================================== */

function CourseLayout({
  showCodeEditor,
  setShowCodeEditor,
  isRunning,
  consoleOutput,
  runCode,
}: LayoutProps) {
  return (
    <div className="text-foreground bg-background h-[calc(100vh-5rem)] flex flex-col">
      <CourseHeader
        showCodeEditor={showCodeEditor}
        toggleEditor={() => setShowCodeEditor((prev) => !prev)}
        runCode={runCode}
        isRunning={isRunning}
      />

      <ResizablePanelGroup orientation="horizontal" className="h-full">
        <CourseSidebar />

        <ResizableHandle />

        <LessonSection showCodeEditor={showCodeEditor} />

        {showCodeEditor && (
          <>
            <ResizableHandle className="bg-white/5 hover:bg-primary/50 transition-colors w-1" />
            <EditorSection
              runCode={runCode}
              consoleOutput={consoleOutput}
              isRunning={isRunning}
            />
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

/* =====================================================
   HEADER
===================================================== */

function CourseHeader({
  showCodeEditor,
  toggleEditor,
}: {
  showCodeEditor: boolean;
  toggleEditor: () => void;
  runCode: () => void;
  isRunning: boolean;
}) {
  return (
    <header className="h-14 border-b border-white/5 bg-black/50 backdrop-blur flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div className="flex flex-col">
          <h1 className="text-sm font-bold">Hello World in Rust</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Devnet Active
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={cn("h-8 gap-2", showCodeEditor && "bg-white/10")}
          onClick={toggleEditor}
        >
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">
            {showCodeEditor ? "Hide" : "Show"} Editor
          </span>
        </Button>
      </div>
    </header>
  );
}

/* =====================================================
   SIDEBAR
===================================================== */

function CourseSidebar() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const language = searchParams.get("lang") as string;
  const userId = "1234";

  const { data: course } = useQuery(courseQueries.bySlug(courseId, language));
  const { data: progress } = useQuery(progressQueries.course(userId, courseId));

  const modules = course?.modules as unknown as Array<
    Omit<Module, "lessons"> & { lessons: Lesson[] }
  >;
  const completionPercentage = progress?.completionPercentage ?? 0;

  return (
    <ResizablePanel
      collapsible
      maxSize={300}
      className="bg-black/20 border-r border-white/5"
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="font-medium tracking-tight text-sm mb-1.5">
            Course progress
          </p>
          <Progress value={completionPercentage} className="h-1 bg-white/10" />
          <p className="text-sm tracking-tight text-muted-foreground mt-1.5">
            {completionPercentage}% Complete
          </p>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {modules?.map((mod) => (
              <div key={mod._id} className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-2">
                  {mod.title}
                </div>

                <div className="space-y-0.5">
                  {mod?.lessons?.map((lesson, index) => (
                    <LessonItem
                      key={lesson._id}
                      title={lesson.title as string}
                      lessonSlug={lesson?.slug?.current as any}
                      //check if this lesson index is in completedLessons array
                      completed={progress?.completedLessons.includes(index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}

/* =====================================================
   LESSON SECTION
===================================================== */
function LessonSection({ showCodeEditor }: { showCodeEditor: boolean }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonSlug = params.courseLessonId?.[0] as string;
  const language = searchParams.get("lang") as string;
  const data = useQuery(lessonQueries.bySlug(lessonSlug, language));

  return (
    <ResizablePanel
      defaultSize={showCodeEditor ? 40 : 75}
      minSize={30}
      className="flex flex-col h-full"
    >
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="py-3 px-6 flex flex-col justify-between max-w-3xl mx-auto">
          <PortableTextRenderer content={data?.data?.content as any} />

          <div className="p-6 my-5 bg-blue-500/5 border border-blue-500/10 rounded-xl">
            <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-2">
              <Trophy className="w-4 h-4" /> Challenge
            </h4>
            <p className="text-sm">
              Modify the program to log "Hello [Your Name]" instead of "Hello
              Solana!". Deploy it to verify your completion.
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Pinned Bottom Section */}
      <div className="flex p-3 border-t justify-between bg-background">
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next Lesson</Button>
      </div>
    </ResizablePanel>
  );
}

/* =====================================================
   EDITOR SECTION
===================================================== */

function EditorSection({
  consoleOutput,
  isRunning,
  runCode,
}: {
  consoleOutput: string[];
  isRunning: boolean;
  runCode: () => void;
}) {
  return (
    <ResizablePanel defaultSize={350} minSize={350} className="flex flex-col">
      <ResizablePanelGroup orientation="vertical">
        <CodeEditorPanel />
        <ResizableHandle className="h-1" />
        <TerminalPanel
          runCode={runCode}
          consoleOutput={consoleOutput}
          isRunning={isRunning}
        />
      </ResizablePanelGroup>
    </ResizablePanel>
  );
}

function CodeEditorPanel() {
  return (
    <ResizablePanel collapsible>
      <div className="h-full flex flex-col bg-muted">
        <div className="h-9 border-b border-border flex items-center px-4 bg-black/20">
          <div className="px-3 py-1 bo border-t-2  text-muted-foreground border-primary text-xs font-mono">
            lib.rs
          </div>
        </div>

        <div className="flex-1">
          <MonacoEditor value={INITIAL_CODE} onChange={() => {}} />
        </div>
      </div>
    </ResizablePanel>
  );
}

function TerminalPanel({
  consoleOutput,
  isRunning,
  runCode,
}: {
  consoleOutput: string[];
  isRunning: boolean;
  runCode: () => void;
}) {
  return (
    <ResizablePanel defaultSize={30} minSize={30}>
      <div className="h-full flex flex-col  bg-background">
        <div className="h-11 p-2 font-mono border-b justify-between  border-border flex items-center px-4">
          <span className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-2">
            <Terminal className="w-3 h-3" /> TERMINAL
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-5 w-fit text-muted-foreground  hover:bg-primary/90 font-bold"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running" : "Run"}
            <Play className="w-2 h-2 fill-current" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4 font-mono text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">$ solana --version</div>
            <div className="text-muted-foreground">
              solana-cli 1.18.0 (src:devbuild)
            </div>

            {consoleOutput.map((line, i) => (
              <div
                key={i}
                className={cn(
                  line.startsWith(">")
                    ? "text-primary"
                    : "text-muted-foreground pl-4",
                )}
              >
                {line}
              </div>
            ))}

            {isRunning && (
              <div className="flex items-center gap-1 text-primary animate-pulse">
                <span className="w-2 h-4 bg-primary block" />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}

/* =====================================================
   LESSON ITEM
===================================================== */

function LessonItem({
  title,
  lessonSlug,
  completed,
}: {
  title: string;
  lessonSlug: string;
  completed?: boolean;
}) {
  const params = useParams();
  const active = params.courseLessonId?.[0] === lessonSlug;
  return (
    <Link
      href={lessonSlug}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left group",
        active
          ? "bg-primary/10 text-primary"
          : "hover:bg-white/5 text-muted-foreground",
      )}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
          completed
            ? "bg-primary border-primary"
            : "border-white/20 group-hover:border-white/40",
          active && !completed && "border-primary",
        )}
      >
        {completed && <CheckCircle className="w-3 h-3 text-black" />}
        {active && !completed && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </div>
      <span className="truncate text-pretty">{title}</span>
    </Link>
  );
}
