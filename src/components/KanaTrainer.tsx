import React, { useState } from "react";
import { KANA_DATA } from "../data/vocabulary";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Volume2 } from "lucide-react";

export default function KanaTrainer() {
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<{ kana: string; romaji: string; bangla: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const activeKanaList = activeTab === "hiragana" ? KANA_DATA.hiragana : KANA_DATA.katakana;

  // Speak Kana aloud using browser speech synthesis
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start the quiz
  const handleStartQuiz = () => {
    setQuizMode(true);
    generateNewQuestion();
    setUserAnswer("");
    setFeedback(null);
  };

  // Generate a random Kana question
  const generateNewQuestion = () => {
    const list = activeTab === "hiragana" ? KANA_DATA.hiragana : KANA_DATA.katakana;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentQuestion(list[randomIndex]);
    setUserAnswer("");
    setFeedback(null);
  };

  // Check the answer
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.romaji.toLowerCase();
    if (isCorrect) {
      setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      setFeedback({
        isCorrect: true,
        text: `Correct! '${currentQuestion.kana}' is indeed '${currentQuestion.romaji}' (pronounced ${currentQuestion.bangla}).`
      });
      handleSpeak(currentQuestion.kana);
    } else {
      setScore((prev) => ({ ...prev, total: prev.total + 1 }));
      setFeedback({
        isCorrect: false,
        text: `Incorrect. '${currentQuestion.kana}' is actually '${currentQuestion.romaji}' (${currentQuestion.bangla}).`
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-white tracking-tight">
            Kana Alphabet Trainer
          </h1>
          <p className="text-sm text-white/60">
            Learn and master the Hiragana and Katakana syllabaries with pronunciations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!quizMode ? (
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-medium text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              <Sparkles size={14} />
              Start recognition quiz
            </button>
          ) : (
            <button
              onClick={() => setQuizMode(false)}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-white font-medium text-xs px-4 py-2.5 rounded-xl cursor-pointer"
            >
              <RefreshCw size={14} />
              View Alphabet Chart
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      {!quizMode && (
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("hiragana")}
            className={`py-3 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === "hiragana"
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            Hiragana (ひらがな)
          </button>
          <button
            onClick={() => setActiveTab("katakana")}
            className={`py-3 px-6 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === "katakana"
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            Katakana (カタカナ)
          </button>
        </div>
      )}

      {/* Interactive Grid Chart */}
      {!quizMode ? (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {activeKanaList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSpeak(item.kana)}
              className="group relative glass-card p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:border-indigo-400/30 hover:bg-white/8 hover:scale-102 transition-all duration-150 rounded-xl"
            >
              <span className="text-3xl font-sans font-bold text-white group-hover:text-indigo-300 transition-colors">
                {item.kana}
              </span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono font-semibold text-white/60">
                  {item.romaji}
                </span>
                <span className="text-[10px] text-white/40 font-sans">
                  {item.bangla}
                </span>
              </div>
              <button className="absolute right-2 top-2 text-white/30 group-hover:text-white/60 opacity-0 group-hover:opacity-100 transition-all">
                <Volume2 size={12} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Quiz Mode */
        <div className="max-w-md mx-auto glass-card p-6 sm:p-8 space-y-6 animate-fade-in rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-sans font-bold text-white">
              {activeTab === "hiragana" ? "Hiragana Quiz" : "Katakana Quiz"}
            </h3>
            <span className="text-xs font-mono text-rose-300 bg-rose-500/20 border border-rose-500/30 py-1 px-2.5 rounded-full font-bold">
              Score: {score.correct} / {score.total}
            </span>
          </div>

          {currentQuestion && (
            <div className="space-y-6">
              {/* Question Stage */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 relative">
                <span className="text-6xl font-bold font-sans text-white">
                  {currentQuestion.kana}
                </span>
                <span className="text-xs text-white/50 font-sans">
                  Type the correct Romaji spelling
                </span>
                <button
                  onClick={() => handleSpeak(currentQuestion.kana)}
                  className="absolute right-3 bottom-3 p-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 rounded-xl cursor-pointer transition-colors"
                  title="Listen Pronunciation"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmitAnswer} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={feedback !== null}
                    placeholder="e.g. ka"
                    className="flex-1 min-w-0 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/10 font-mono placeholder:text-white/30"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={feedback !== null || !userAnswer.trim()}
                    className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/5 disabled:text-white/30 transition-colors text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    Check <ArrowRight size={16} />
                  </button>
                </div>
              </form>

              {/* Feedback State */}
              {feedback && (
                <div className={`p-4 rounded-xl flex gap-3 ${
                  feedback.isCorrect ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-200" : "bg-red-500/20 border border-red-500/30 text-red-200"
                }`}>
                  {feedback.isCorrect ? (
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">{feedback.isCorrect ? "Excellent!" : "Not quite!"}</p>
                    <p className="opacity-90">{feedback.text}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {feedback && (
                <button
                  onClick={generateNewQuestion}
                  className="w-full bg-white/10 hover:bg-white/25 border border-white/15 text-white font-medium text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
