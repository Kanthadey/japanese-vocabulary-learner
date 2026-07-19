import React, { useState } from "react";
import { QUIZZES } from "../data/vocabulary";
import { Award, CheckCircle2, XCircle, AlertCircle, ArrowRight, BookOpen, Volume2, Trophy, ArrowLeft } from "lucide-react";

interface ModelQuizProps {
  onBack: () => void;
}

export default function ModelQuiz({ onBack }: ModelQuizProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<typeof QUIZZES[0] | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;
    let correctCount = 0;
    selectedQuiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  // Pronounce Japanese text
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/Underlined word:.*/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="space-y-6 animate-fade-in max-w-xl mx-auto text-white">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-sans font-bold text-white tracking-tight">
              JLPT Mock Exams
            </h1>
            <p className="text-sm text-white/60">
              Test your JLPT knowledge with official model test sheets.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          {QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz)}
              className="group glass-card p-6 rounded-2xl cursor-pointer hover:border-indigo-400/30 transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="inline-block bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/30 uppercase tracking-wider">
                  Level {quiz.level}
                </span>
                <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors text-base sm:text-lg">
                  {quiz.title}
                </h3>
                <p className="text-xs text-white/70 font-sans">
                  Exam paper containing {quiz.questions.length} vocabulary identification questions.
                </p>
              </div>
              <ChevronIcon />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto pb-16 text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedQuiz(null);
              handleResetQuiz();
            }}
            className="p-1.5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="font-sans font-bold text-white text-sm">
            {selectedQuiz.title}
          </span>
        </div>
        {submitted && (
          <span className="text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 py-1 px-2.5 rounded-full">
            Score: {score} / {selectedQuiz.questions.length}
          </span>
        )}
      </div>

      {/* Quiz Completion Badge */}
      {submitted && (
        <div className="glass-panel bg-gradient-to-br from-indigo-500/10 via-rose-500/5 to-transparent text-white p-6 rounded-2xl border border-white/10 shadow-2xl text-center space-y-3">
          <Trophy className="mx-auto text-amber-400" size={40} />
          <h2 className="text-xl font-bold font-sans">Model Test Finished!</h2>
          <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed">
            You scored {score} out of {selectedQuiz.questions.length} on this JLPT practice exam. 
            Review the detailed question analysis below to fix any particle or reading mistakes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleResetQuiz}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Retry Exam
            </button>
            <button
              onClick={() => {
                setSelectedQuiz(null);
                handleResetQuiz();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition-colors shadow-lg shadow-indigo-500/25"
            >
              Exit Quizzes
            </button>
          </div>
        </div>
      )}

      {/* Question Cards */}
      <div className="space-y-6">
        {selectedQuiz.questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`glass-card rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 transition-all duration-300 border border-white/10 ${
                submitted
                  ? isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-red-500/30 bg-red-500/5"
                  : ""
              }`}
            >
              {/* Question text */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-wider block">
                    Question {idx + 1}
                  </span>
                  <h4 className="font-sans font-semibold text-white text-sm sm:text-base leading-relaxed">
                    {q.question}
                  </h4>
                </div>
                <button
                  onClick={() => handleSpeak(q.question)}
                  className="p-2 text-white/40 hover:text-indigo-300 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 size={14} />
                </button>
              </div>

              {/* Multiple choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.choices.map((choice, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  const isAnswerCorrect = q.correctIndex === oIdx;

                  let btnStyle = "border-white/10 hover:bg-white/10 text-white/90";
                  if (isSelected) {
                    btnStyle = "border-indigo-400 bg-indigo-500/30 text-white";
                  }

                  if (submitted) {
                    if (isAnswerCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20";
                    } else if (isSelected) {
                      btnStyle = "border-red-500 bg-red-500 text-white font-bold shadow-lg shadow-red-500/20";
                    } else {
                      btnStyle = "border-white/5 opacity-40";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`p-3 text-left text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${btnStyle}`}
                    >
                      {String.fromCharCode(97 + oIdx)}. {choice}
                    </button>
                  );
                })}
              </div>

              {/* Question feedback */}
              {submitted && (
                <div className={`p-4 rounded-xl flex gap-3 text-xs leading-relaxed ${
                  isCorrect ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-200" : "bg-red-500/20 border border-red-500/30 text-red-200"
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold">{isCorrect ? "Correct!" : "Mistake detected!"}</p>
                    <p className="opacity-95">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmitQuiz}
          disabled={Object.keys(userAnswers).length !== selectedQuiz.questions.length}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/5 disabled:text-white/30 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
        >
          Submit Exam Paper
        </button>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="p-2 border border-white/10 text-white/50 group-hover:text-indigo-300 group-hover:border-indigo-400/30 rounded-xl transition-all shrink-0">
      <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
    </div>
  );
}

function ChevronRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
