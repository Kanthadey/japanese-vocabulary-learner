import React from "react";
import { Lesson, UserProgress } from "../types";
import { BookOpen, Calendar, CheckCircle2, Flame, Award, ArrowRight, Play, BookOpenCheck, BrainCircuit } from "lucide-react";

interface DashboardProps {
  lessons: Lesson[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onStartReview: () => void;
  onNavigate: (tab: "lessons" | "kana" | "chat" | "quiz") => void;
}

export default function Dashboard({
  lessons,
  progress,
  onSelectLesson,
  onStartReview,
  onNavigate
}: DashboardProps) {
  // Count due cards
  const now = new Date();
  const dueCount = Object.values(progress.srsData).filter(
    (card) => new Date(card.dueDate) <= now
  ).length;

  const totalWords = lessons.reduce((acc, l) => acc + l.vocab.length, 0);
  const learnedWords = progress.learnedVocabIds.length;
  const progressPercent = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

  // Filter lessons by level
  const n5Lessons = lessons.filter((l) => l.level === "N5");
  const n4Lessons = lessons.filter((l) => l.level === "N4");
  const basicLessons = lessons.filter((l) => l.level === "Basics");

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass-panel bg-gradient-to-br from-indigo-500/10 via-rose-500/5 to-transparent rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ようこそ！ (Welcome!)
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
            Nihongo SRS Learner
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Master Japanese vocabulary and grammar using an active spaced repetition system tailored for Minna no Nihongo N5 & N4.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            {dueCount > 0 ? (
              <button
                onClick={onStartReview}
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 hover:scale-102 transform duration-150 cursor-pointer"
              >
                <Play size={16} />
                Review {dueCount} Due Cards
              </button>
            ) : (
              <button
                onClick={() => onNavigate("lessons")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md cursor-pointer"
              >
                <BookOpen size={16} />
                Explore Lessons
              </button>
            )}
            <button
              onClick={() => onNavigate("chat")}
              className="inline-flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-medium text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors"
            >
              <BrainCircuit size={16} />
              Chat with Jahid Sensei
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none transform translate-x-12 translate-y-12 select-none text-9xl font-bold font-sans">
          日本語
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak card */}
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
              Study Streak
            </p>
            <h3 className="text-2xl font-bold text-white flex items-baseline gap-1">
              {progress.streak} <span className="text-sm font-normal text-white/60">days</span>
            </h3>
          </div>
          <div className={`p-3 rounded-xl border ${progress.streak > 0 ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-white/5 text-white/40 border-white/10"}`}>
            <Flame size={24} className={progress.streak > 0 ? "animate-pulse" : ""} />
          </div>
        </div>

        {/* Due cards */}
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
              Review Queue
            </p>
            <h3 className="text-2xl font-bold text-white">
              {dueCount} <span className="text-xs font-normal text-white/60">cards due</span>
            </h3>
          </div>
          <div className={`p-3 rounded-xl border ${dueCount > 0 ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"}`}>
            <Calendar size={24} />
          </div>
        </div>

        {/* Words Learned */}
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
              Vocabulary Learned
            </p>
            <h3 className="text-2xl font-bold text-white">
              {learnedWords} <span className="text-xs font-normal text-white/60">/ {totalWords}</span>
            </h3>
          </div>
          <div className="p-3 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl">
            <BookOpenCheck size={24} />
          </div>
        </div>

        {/* Master Percent */}
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
              Total Progress
            </p>
            <h3 className="text-2xl font-bold text-white">{progressPercent}%</h3>
          </div>
          <div className="p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl">
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* Grid of study categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Syllabus Progression */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-sans font-bold text-white tracking-tight">
              Syllabus Lessons
            </h2>
            <button
              onClick={() => onNavigate("lessons")}
              className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              See All Lessons <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Quick overview of basics */}
            <div className="glass-card p-5 space-y-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2 py-0.5 rounded">
                  Basics
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {basicLessons.length} Modules
                </span>
              </div>
              <h4 className="font-bold text-white">Kana, Numbers & Calendars</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Start with Hiragana/Katakana alphabet, numbers up to 10k, days of the week, dates, and times.
              </p>
              <div className="flex gap-2 pt-1">
                {basicLessons.slice(0, 2).map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className="flex-1 bg-white/5 hover:bg-white/12 border border-white/10 text-xs text-white py-2 px-3 rounded-xl text-left truncate transition-all duration-150 cursor-pointer"
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            </div>

            {/* N5 Section */}
            <div className="glass-card p-5 space-y-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold px-2 py-0.5 rounded">
                  JLPT N5
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {n5Lessons.length} Lessons Available
                </span>
              </div>
              <h4 className="font-bold text-white">Elementary N5 Syllabus</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Study foundational introductions, demonstratives, location markers, daily timetables, and transit verbs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {n5Lessons.slice(0, 4).map((lesson) => {
                  const lessonWords = lesson.vocab.map((v) => v.id);
                  const learnedCount = lessonWords.filter((id) =>
                    progress.learnedVocabIds.includes(id)
                  ).length;
                  const percent = lessonWords.length > 0 ? Math.round((learnedCount / lessonWords.length) * 100) : 0;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className="group bg-white/5 hover:bg-white/12 border border-white/10 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between h-20"
                    >
                      <div className="w-full flex items-start justify-between">
                        <span className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-white/50 font-mono">{percent}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-400 h-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Practice Tools */}
        <div className="space-y-6">
          <h2 className="text-xl font-sans font-bold text-white tracking-tight">
            Study Tools
          </h2>

          <div className="space-y-4">
            {/* Kana Practice Box */}
            <div
              onClick={() => onNavigate("kana")}
              className="glass-card bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent rounded-2xl p-5 cursor-pointer hover:border-indigo-400/30 transition-all duration-200 group space-y-2"
            >
              <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Interactive Chart
              </span>
              <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                Kana Alphabet Trainer
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Master Hiragana & Katakana with phonetic stroke-order guides and recognition testing.
              </p>
            </div>

            {/* AI Sensei Chat Box */}
            <div
              onClick={() => onNavigate("chat")}
              className="glass-card bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent rounded-2xl p-5 cursor-pointer hover:border-rose-400/30 transition-all duration-200 group space-y-2"
            >
              <span className="inline-block bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                AI Powered
              </span>
              <h4 className="font-bold text-white group-hover:text-rose-300 transition-colors">
                Dialogue with Jahid Sensei
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Submit raw Japanese sentences to get smart particle evaluations and live grammar feedback.
              </p>
            </div>

            {/* Exam Simulation Box */}
            <div
              onClick={() => onNavigate("quiz")}
              className="glass-card bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl p-5 cursor-pointer hover:border-emerald-400/30 transition-all duration-200 group space-y-2"
            >
              <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Model Testing
              </span>
              <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                JLPT N5 Model Quizzes
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Take timed vocabulary and grammar tests matching the standard JLPT exam layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
