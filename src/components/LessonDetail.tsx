import React from "react";
import { Lesson, UserProgress } from "../types";
import { BookOpen, HelpCircle, Volume2, ArrowLeft, GraduationCap, ChevronRight, Award, Brain } from "lucide-react";

interface LessonDetailProps {
  lesson: Lesson;
  progress: UserProgress;
  onBack: () => void;
  onStartStudy: (lessonId: string) => void;
}

export default function LessonDetail({
  lesson,
  progress,
  onBack,
  onStartStudy
}: LessonDetailProps) {
  // Check which vocabulary words have already been studied in this lesson
  const lessonVocabIds = lesson.vocab.map((v) => v.id);
  const studiedCount = lessonVocabIds.filter((id) =>
    progress.learnedVocabIds.includes(id)
  ).length;

  const totalCount = lesson.vocab.length;
  const progressPercent = totalCount > 0 ? Math.round((studiedCount / totalCount) * 100) : 0;

  // Japanese voice output helper
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 text-white">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              lesson.level === "N5" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
              lesson.level === "N4" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
              "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
            }`}>
              {lesson.level}
            </span>
            <span className="text-xs text-white/50 font-mono">
              {lesson.vocab.length} Words • {lesson.grammar.length} Grammar Rules
            </span>
          </div>
          <h1 className="text-2xl font-sans font-bold text-white flex items-baseline gap-2">
            {lesson.title}
            <span className="text-sm font-normal text-white/50 font-sans">
              {lesson.japaneseTitle}
            </span>
          </h1>
        </div>
      </div>

      {/* Progress banner */}
      <div className="glass-panel border border-white/10 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-white">Lesson Learning Progress</span>
            <span className="font-mono text-white/60 font-semibold">{studiedCount} / {totalCount} words learned ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={() => onStartStudy(lesson.id)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <GraduationCap size={16} />
          Study Vocabulary
        </button>
      </div>

      {/* Detailed Grid: Left Vocabulary, Right Grammar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vocabulary List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-sans font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-400" />
            Vocabulary Words
          </h2>

          <div className="glass-card rounded-2xl border border-white/10 shadow-xl overflow-hidden divide-y divide-white/5">
            {lesson.vocab.map((word) => {
              const isLearned = progress.learnedVocabIds.includes(word.id);

              return (
                <div
                  key={word.id}
                  onClick={() => handleSpeak(word.japanese)}
                  className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="space-y-1.5 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-white font-sans">
                        {word.japanese}
                      </span>
                      {word.kanji && (
                        <span className="text-sm bg-white/10 text-white border border-white/10 px-1.5 py-0.2 rounded font-sans">
                          {word.kanji}
                        </span>
                      )}
                      <span className="text-xs text-white/50 font-mono">
                        ({word.romaji})
                      </span>
                      {isLearned && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-bold">
                          <Award size={10} /> Active SRS
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="text-white/80">
                        <strong className="text-white/40 mr-1 text-[10px] uppercase font-mono">EN:</strong>
                        {word.english}
                      </p>
                      <p className="text-indigo-200 font-sans">
                        <strong className="text-white/40 mr-1 text-[10px] uppercase font-mono">BN:</strong>
                        {word.bangla}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(word.japanese);
                    }}
                    className="p-2 text-white/40 group-hover:text-indigo-300 rounded-xl hover:bg-white/10 transition-all shrink-0 cursor-pointer"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grammar Rules Section */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-sans font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle size={18} className="text-indigo-400" />
            Grammar & Particle Rules
          </h2>

          <div className="space-y-4">
            {lesson.grammar.length > 0 ? (
              lesson.grammar.map((rule, idx) => (
                <div
                  key={idx}
                  className="glass-card border border-white/10 rounded-2xl p-5 shadow-xl space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-wider">
                      Rule {idx + 1}
                    </span>
                    <h3 className="font-bold text-white text-sm">
                      {rule.title}
                    </h3>
                  </div>

                  <div className="bg-white/5 font-mono text-xs text-white/90 p-2.5 rounded-xl border border-white/10 font-semibold">
                    {rule.formula}
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {rule.explanation}
                  </p>

                  {/* Examples */}
                  {rule.examples.length > 0 && (
                    <div className="border-t border-white/5 pt-3 space-y-3">
                      <span className="text-[10px] font-mono font-semibold text-white/50 uppercase">
                        Examples:
                      </span>
                      <div className="space-y-2">
                        {rule.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            onClick={() => handleSpeak(ex.japanese)}
                            className="text-xs p-2.5 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/12 border border-indigo-500/15 cursor-pointer group transition-colors space-y-1"
                          >
                            <div className="flex justify-between items-start">
                              <p className="font-bold text-white font-sans leading-relaxed">
                                {ex.japanese}
                              </p>
                              <Volume2 size={12} className="text-white/30 group-hover:text-indigo-300 mt-0.5 shrink-0 transition-colors" />
                            </div>
                            <p className="text-white/70">
                              {ex.english}
                            </p>
                            <p className="text-indigo-200 font-sans">
                              {ex.bangla}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="glass-card border border-white/10 rounded-2xl p-8 text-center text-xs text-white/55">
                <Brain className="mx-auto text-white/30 mb-2" size={32} />
                No grammar rules listed for this basics module. Study the vocabulary list above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
