import React, { useState, useEffect } from "react";
import { LESSONS } from "./data/vocabulary";
import { UserProgress, Lesson, SRSState, VocabWord } from "./types";
import { initializeSRSState, calculateSM2 } from "./utils/srs";
import Dashboard from "./components/Dashboard";
import KanaTrainer from "./components/KanaTrainer";
import LessonDetail from "./components/LessonDetail";
import StudySession from "./components/StudySession";
import SenseiChat from "./components/SenseiChat";
import ModelQuiz from "./components/ModelQuiz";
import { BookOpen, Sparkles, BrainCircuit, Calendar, LayoutDashboard, Settings, Trash2, GraduationCap } from "lucide-react";

const PROGRESS_LOCAL_STORAGE_KEY = "nihongo_srs_user_progress";

const defaultProgress: UserProgress = {
  srsData: {},
  learnedVocabIds: [],
  streak: 0,
  lastStudyDate: undefined,
  dailyGoal: 5,
  completedTodayCount: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "lessons" | "kana" | "chat" | "quiz">("dashboard");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [activeStudyVocab, setActiveStudyVocab] = useState<VocabWord[] | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Core User Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load user progress:", e);
    }
    return defaultProgress;
  });

  // Save progress state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save user progress:", e);
    }
  }, [progress]);

  // Handle study streak updating
  useEffect(() => {
    const checkStreak = () => {
      if (!progress.lastStudyDate) return;

      const lastDate = new Date(progress.lastStudyDate);
      const today = new Date();

      // Normalize to midnight
      lastDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        // Streak is broken!
        setProgress((prev) => ({
          ...prev,
          streak: 0,
          completedTodayCount: 0
        }));
      } else if (diffDays === 1) {
        // New day started, reset today's completion counter
        setProgress((prev) => ({
          ...prev,
          completedTodayCount: 0
        }));
      }
    };

    checkStreak();
  }, [progress.lastStudyDate]);

  // Spaced repetition flashcard grading handler
  const handleGradeCard = (vocabId: string, grade: number) => {
    setProgress((prev) => {
      const srsData = { ...prev.srsData };
      const learnedVocabIds = [...prev.learnedVocabIds];

      const previousState = srsData[vocabId] || initializeSRSState(vocabId);
      const updatedState = calculateSM2(grade, previousState);

      srsData[vocabId] = updatedState;

      if (!learnedVocabIds.includes(vocabId)) {
        learnedVocabIds.push(vocabId);
      }

      // Handle streak & completion count updates
      const todayStr = new Date().toISOString();
      const lastDateStr = prev.lastStudyDate;

      let streak = prev.streak;
      let completedTodayCount = prev.completedTodayCount + 1;

      if (!lastDateStr) {
        streak = 1;
      } else {
        const lastDate = new Date(lastDateStr);
        const today = new Date();
        lastDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffDays = Math.ceil(Math.abs(today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      return {
        ...prev,
        srsData,
        learnedVocabIds,
        streak,
        lastStudyDate: todayStr,
        completedTodayCount
      };
    });
  };

  // Build queue of cards due for review plus unstudied cards for a lesson
  const startLessonStudy = (lessonId: string) => {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;

    // Filter words in this lesson: include any that are due, or haven't been learned yet
    const now = new Date();
    const lessonVocab = lesson.vocab;

    const cardsToStudy = lessonVocab.filter((word) => {
      const cardState = progress.srsData[word.id];
      if (!cardState) return true; // never studied, study now
      return new Date(cardState.dueDate) <= now; // due for review
    });

    if (cardsToStudy.length > 0) {
      setActiveStudyVocab(cardsToStudy);
    } else {
      // Force study of all lesson cards if everything is fully reviewed
      setActiveStudyVocab(lessonVocab.slice(0, 10));
    }
  };

  // Launch a standard due cards review session
  const startDueReviews = () => {
    const now = new Date();
    const allWordsMap = new Map<string, VocabWord>();
    LESSONS.forEach((l) => l.vocab.forEach((v) => allWordsMap.set(v.id, v)));

    const dueVocab = (Object.values(progress.srsData) as SRSState[])
      .filter((card) => new Date(card.dueDate) <= now)
      .map((card) => allWordsMap.get(card.vocabId))
      .filter((v): v is VocabWord => v !== undefined);

    if (dueVocab.length > 0) {
      setActiveStudyVocab(dueVocab);
    } else {
      alert("🎉 All cards are currently reviewed! Choose a lesson to learn new words.");
    }
  };

  const handleClearProgress = () => {
    if (window.confirm("⚠️ Are you sure you want to delete all studied words, streak data, and card review intervals? This cannot be undone.")) {
      setProgress(defaultProgress);
      localStorage.removeItem(PROGRESS_LOCAL_STORAGE_KEY);
      setShowSettings(false);
      alert("All progress cleared successfully.");
    }
  };

  const handleTabNavigation = (tab: "dashboard" | "lessons" | "kana" | "chat" | "quiz") => {
    setActiveTab(tab);
    setSelectedLessonId(null);
    setActiveStudyVocab(null);
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col font-sans text-white">
      {/* Upper Navigation Rail */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/10 shadow-lg backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
          <div
            onClick={() => handleTabNavigation("dashboard")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span className="w-9 h-9 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-sans font-bold text-lg shadow-lg shadow-indigo-500/20">
              言
            </span>
            <span className="font-sans font-extrabold tracking-tight text-white text-lg sm:text-xl">
              Nihongo <span className="text-indigo-400 font-sans">SRS</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => handleTabNavigation("dashboard")}
              className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === "dashboard" ? "bg-white/15 text-white shadow-sm border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>
            <button
              onClick={() => handleTabNavigation("lessons")}
              className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === "lessons" ? "bg-white/15 text-white shadow-sm border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <BookOpen size={14} /> Lessons
            </button>
            <button
              onClick={() => handleTabNavigation("kana")}
              className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === "kana" ? "bg-white/15 text-white shadow-sm border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Sparkles size={14} /> Kana Chart
            </button>
            <button
              onClick={() => handleTabNavigation("chat")}
              className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === "chat" ? "bg-white/15 text-white shadow-sm border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <BrainCircuit size={14} /> AI Sensei Chat
            </button>
            <button
              onClick={() => handleTabNavigation("quiz")}
              className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === "quiz" ? "bg-white/15 text-white shadow-sm border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Calendar size={14} /> Model Exam
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white/10 hover:bg-white/25 text-white/95 rounded-xl transition-colors cursor-pointer border border-white/10"
              title="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Pane */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeStudyVocab ? (
          <StudySession
            vocabList={activeStudyVocab}
            srsData={progress.srsData}
            onGradeCard={handleGradeCard}
            onClose={() => setActiveStudyVocab(null)}
          />
        ) : selectedLessonId ? (
          <LessonDetail
            lesson={LESSONS.find((l) => l.id === selectedLessonId)!}
            progress={progress}
            onBack={() => setSelectedLessonId(null)}
            onStartStudy={startLessonStudy}
          />
        ) : activeTab === "dashboard" ? (
          <Dashboard
            lessons={LESSONS}
            progress={progress}
            onSelectLesson={(lessonId) => {
              setSelectedLessonId(lessonId);
            }}
            onStartReview={startDueReviews}
            onNavigate={handleTabNavigation}
          />
        ) : activeTab === "lessons" ? (
          /* Lessons Hub */
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-sans font-bold text-white tracking-tight">
                Japanese Lessons Hub
              </h1>
              <p className="text-sm text-white/60">
                Study vocabulary, particles, and grammar systematically from N5 to N4.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LESSONS.map((lesson) => {
                const vocabCount = lesson.vocab.length;
                const learnedCount = lesson.vocab.filter((v) =>
                  progress.learnedVocabIds.includes(v.id)
                ).length;
                const percent = vocabCount > 0 ? Math.round((learnedCount / vocabCount) * 100) : 0;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className="group glass-card glass-card-hover p-5 rounded-2xl cursor-pointer flex flex-col justify-between h-40"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          lesson.level === "N5" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
                          lesson.level === "N4" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                          "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        }`}>
                          {lesson.level}
                        </span>
                        <span className="text-xs text-white/60 font-mono">
                          {percent}% Studied
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors text-base">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-white/70 line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-400 h-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 font-semibold">
                        <span>{vocabCount} words • {lesson.grammar.length} rules</span>
                        <span className="group-hover:text-indigo-300 flex items-center gap-0.5 transition-colors">
                          Study Lesson <ChevronRightIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === "kana" ? (
          <KanaTrainer />
        ) : activeTab === "chat" ? (
          <SenseiChat />
        ) : (
          <ModelQuiz onBack={() => handleTabNavigation("dashboard")} />
        )}
      </main>

      {/* Settings Panel Drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md animate-slide-in">
                <div className="flex h-full flex-col glass-panel shadow-2xl border-l border-white/10 text-white">
                  <div className="px-6 py-5 bg-white/10 text-white flex items-center justify-between border-b border-white/10">
                    <h2 className="text-base font-bold font-sans">Settings & Progress</h2>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <XIcon />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-white/50 uppercase">Spaced Repetition Stats</h4>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10 divide-y divide-white/5 text-xs">
                        <div className="py-2 flex justify-between">
                          <span className="text-white/60">Studied Cards</span>
                          <span className="font-bold text-white">{progress.learnedVocabIds.length}</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-white/60">Consecutive Streak</span>
                          <span className="font-bold text-white">{progress.streak} days</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-white/60">Completed Reviews Today</span>
                          <span className="font-bold text-white">{progress.completedTodayCount}</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-white/60">Daily Study Target</span>
                          <span className="font-bold text-white">{progress.dailyGoal} cards</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-white/50 uppercase">Manage Learning Data</h4>
                      <div className="space-y-3">
                        <button
                          onClick={handleClearProgress}
                          className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-3 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Trash2 size={14} />
                          Reset Progress & Flashcards
                        </button>
                        <p className="text-[10px] text-white/40 leading-normal">
                          This resets all SuperMemo-2 card weights, easiness factors, studied vocabulary lists, and streaks back to zero.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Tab bar */}
      <footer className="md:hidden sticky bottom-0 z-40 glass-panel border-t border-white/10 h-16 flex items-center justify-around px-4 backdrop-blur-md">
        <button
          onClick={() => handleTabNavigation("dashboard")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            activeTab === "dashboard" ? "text-indigo-400" : "text-white/50 hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => handleTabNavigation("lessons")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            activeTab === "lessons" ? "text-indigo-400" : "text-white/50 hover:text-white"
          }`}
        >
          <BookOpen size={18} />
          <span>Lessons</span>
        </button>
        <button
          onClick={() => handleTabNavigation("kana")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            activeTab === "kana" ? "text-indigo-400" : "text-white/50 hover:text-white"
          }`}
        >
          <Sparkles size={18} />
          <span>Kana</span>
        </button>
        <button
          onClick={() => handleTabNavigation("chat")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            activeTab === "chat" ? "text-indigo-400" : "text-white/50 hover:text-white"
          }`}
        >
          <BrainCircuit size={18} />
          <span>AI Tutor</span>
        </button>
        <button
          onClick={() => handleTabNavigation("quiz")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            activeTab === "quiz" ? "text-indigo-400" : "text-white/50 hover:text-white"
          }`}
        >
          <Calendar size={18} />
          <span>Exam</span>
        </button>
      </footer>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}
