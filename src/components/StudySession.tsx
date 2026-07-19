import React, { useState, useEffect } from "react";
import { VocabWord, SRSState } from "../types";
import { Volume2, RefreshCw, Check, ArrowRight, HelpCircle, GraduationCap, X, ChevronRight, MessageSquare, Loader2, BookOpen } from "lucide-react";

interface StudySessionProps {
  vocabList: VocabWord[];
  srsData: { [vocabId: string]: SRSState };
  onGradeCard: (vocabId: string, grade: number) => void;
  onClose: () => void;
}

export default function StudySession({
  vocabList,
  srsData,
  onGradeCard,
  onClose
}: StudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [aiSentence, setAiSentence] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentWord = vocabList[currentIndex];
  const totalCards = vocabList.length;

  // Speak word aloud
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play pronunciation on loading card
  useEffect(() => {
    if (currentWord) {
      handleSpeak(currentWord.japanese);
      setIsFlipped(false);
      setAiSentence(null);
      setAiError(null);
    }
  }, [currentIndex, currentWord]);

  // Request Gemini to generate a context sentence and explanations
  const handleAskSensei = async () => {
    if (!currentWord) return;
    setIsAiLoading(true);
    setAiError(null);
    setAiSentence(null);

    try {
      const response = await fetch("/api/gemini/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: currentWord.japanese,
          kanji: currentWord.kanji || "",
          romaji: currentWord.romaji,
          english: currentWord.english,
          lessonTitle: `Lesson ${currentWord.lessonId}`
        })
      });

      const data = await response.json();
      if (response.ok && data.result) {
        setAiSentence(data.result);
      } else {
        setAiError(data.error || "Could not retrieve AI sentence.");
      }
    } catch (err) {
      console.error(err);
      setAiError("Failed to reach Jahid Sensei. Check network connectivity.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSelfGrade = (grade: number) => {
    if (!currentWord) return;
    onGradeCard(currentWord.id, grade);

    if (currentIndex + 1 < totalCards) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed last card
      onClose();
    }
  };

  if (!currentWord) {
    return (
      <div className="glass-card p-8 text-center rounded-2xl border border-white/10 max-w-sm mx-auto shadow-2xl text-white space-y-4">
        <Check size={48} className="mx-auto text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 p-2.5 rounded-full" />
        <h3 className="font-bold text-white">Study Session Done!</h3>
        <p className="text-xs text-white/60">
          No vocabulary matches your study queue at the moment. Keep study streaks alive tomorrow!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Get current SRS scheduling state
  const state = srsData[currentWord.id];
  const repetition = state?.repetition || 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-16 text-white">
      {/* Session Progress Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-400" size={18} />
          <span className="font-sans font-bold text-white text-sm">
            Active Study Session
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold text-white/50">
            Card {currentIndex + 1} of {totalCards}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer transition-colors"
            title="Exit Study"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
        ></div>
      </div>

      {/* Spaced Repetition card container */}
      <div className="relative min-h-[280px] glass-card border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300">
        
        {/* Card Front / Back */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          {!isFlipped ? (
            /* Front side (Japanese Prompt) */
            <div className="space-y-4 animate-scale-up">
              <span className="text-5xl sm:text-6xl font-bold font-sans text-white tracking-wide block">
                {currentWord.japanese}
              </span>
              {currentWord.kanji && (
                <span className="inline-block bg-white/10 text-white font-semibold font-sans text-sm sm:text-base px-3 py-1 rounded-lg border border-white/10 animate-fade-in">
                  {currentWord.kanji}
                </span>
              )}
            </div>
          ) : (
            /* Back side (Reveal Translations) */
            <div className="space-y-4 animate-scale-up w-full">
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-bold text-indigo-300 font-sans block">
                  {currentWord.japanese}
                </span>
                {currentWord.kanji && (
                  <span className="inline-block bg-white/10 text-white font-sans text-xs px-2.5 py-0.5 rounded-md border border-white/10">
                    {currentWord.kanji}
                  </span>
                )}
                <span className="block text-xs font-mono text-white/50">
                  Pronunciation: {currentWord.romaji}
                </span>
              </div>

              {/* Translation detail */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-md mx-auto space-y-2">
                <p className="text-sm text-white/95">
                  <strong className="text-white/40 text-[10px] font-mono uppercase block">English Meaning</strong>
                  <span className="font-semibold">{currentWord.english}</span>
                </p>
                <p className="text-sm text-indigo-200 font-sans">
                  <strong className="text-white/40 text-[10px] font-mono uppercase block">Bangla Meaning (বাংলা)</strong>
                  <span className="font-bold">{currentWord.bangla}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card controls */}
        <div className="flex justify-between items-center border-t border-white/5 pt-4 flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleSpeak(currentWord.japanese)}
              className="p-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl cursor-pointer transition-colors"
              title="Repeat Pronunciation"
            >
              <Volume2 size={16} />
            </button>
            <span className="text-[10px] text-white/50 font-mono">
              Repetition Count: {repetition}
            </span>
          </div>

          {!isFlipped ? (
            <button
              onClick={() => setIsFlipped(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-1.5 ml-auto animate-fade-in"
            >
              Flip Card <RefreshCw size={14} />
            </button>
          ) : (
            <button
              onClick={handleAskSensei}
              disabled={isAiLoading}
              className="bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-semibold text-xs py-2 px-4 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ml-auto disabled:opacity-50 animate-fade-in"
            >
              {isAiLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <MessageSquare size={14} /> Ask Jahid Sensei
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* SM-2 Self Grading Interface (Only shown when card is flipped) */}
      {isFlipped && (
        <div className="glass-panel border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 animate-scale-up">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-sans font-bold text-white">
              Rate your recall difficulty:
            </h4>
            <p className="text-[11px] text-white/50 leading-none">
              SM-2 Spaced Repetition uses your rating to schedule reviews.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* AGAIN: Complete fail, schedules in 1 min */}
            <button
              onClick={() => handleSelfGrade(1)}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-16 group"
            >
              <span className="text-xs font-bold uppercase group-hover:scale-102 transform duration-150">
                Again
              </span>
              <span className="text-[10px] text-red-400">Wrong / Fail</span>
            </button>

            {/* HARD: Recalled with difficulty, schedules in 1 day */}
            <button
              onClick={() => handleSelfGrade(3)}
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-16 group"
            >
              <span className="text-xs font-bold uppercase group-hover:scale-102 transform duration-150">
                Hard
              </span>
              <span className="text-[10px] text-amber-400">Struggled</span>
            </button>

            {/* GOOD: Recalled correctly with minor delay, schedules in 4-6 days */}
            <button
              onClick={() => handleSelfGrade(4)}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-16 group"
            >
              <span className="text-xs font-bold uppercase group-hover:scale-102 transform duration-150">
                Good
              </span>
              <span className="text-[10px] text-emerald-400">Recalled</span>
            </button>

            {/* EASY: Instant recall with zero delay, schedules in 10-15 days */}
            <button
              onClick={() => handleSelfGrade(5)}
              className="bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-16 group"
            >
              <span className="text-xs font-bold uppercase group-hover:scale-102 transform duration-150">
                Easy
              </span>
              <span className="text-[10px] text-indigo-400">Instant</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Sensei Explanation Section (Shows loaded content) */}
      {(aiSentence || isAiLoading || aiError) && (
        <div className="glass-panel bg-gradient-to-br from-indigo-500/10 via-rose-500/5 to-transparent text-white rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 border border-white/10 animate-scale-up">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <GraduationCap className="text-indigo-400" size={18} />
            <h4 className="font-sans font-bold text-white text-sm">
              Sensei's Insights & Contextual Sentence
            </h4>
          </div>

          {isAiLoading && (
            <div className="flex items-center gap-2 text-xs text-white/50 justify-center py-6">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span>Jahid Sensei is generating custom memory explanations and sentences...</span>
            </div>
          )}

          {aiError && (
            <p className="text-xs text-rose-300 bg-rose-500/15 border border-rose-500/30 p-3 rounded-xl">
              {aiError}
            </p>
          )}

          {aiSentence && (
            <div className="text-xs leading-relaxed space-y-2 text-white/90 font-sans max-h-60 overflow-y-auto scrollbar-thin">
              <div className="whitespace-pre-line text-white/90">{aiSentence}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
