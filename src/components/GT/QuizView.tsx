import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../../types';
import { submitQuizApi } from '../../services/api';
import { HelpCircle, CheckCircle2, XCircle, Clock, Award, RefreshCw, ChevronRight, ArrowLeft, Zap, Sparkles } from 'lucide-react';

interface QuizViewProps {
  quiz: Quiz;
  onBack: () => void;
  onQuizCompleted?: (scorePercent: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, onBack, onQuizCompleted }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.timeLimitMinutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const currentQ = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (qId: string, option: string, isMultiSelect = false) => {
    if (submitted) return;
    if (isMultiSelect) {
      const currentList: string[] = answers[qId] || [];
      if (currentList.includes(option)) {
        setAnswers({ ...answers, [qId]: currentList.filter(o => o !== option) });
      } else {
        setAnswers({ ...answers, [qId]: [...currentList, option] });
      }
    } else {
      setAnswers({ ...answers, [qId]: option });
    }
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;
    setSubmitting(true);
    const timeTaken = quiz.timeLimitMinutes * 60 - timeLeftSeconds;
    try {
      const res = await submitQuizApi(quiz.id, answers, timeTaken);
      setResult(res);
      setSubmitted(true);
      if (onQuizCompleted) onQuizCompleted(res.scorePercent);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (submitted && result) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Session
        </button>

        {/* Quiz Score Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 text-2xl font-bold">
            {result.scorePercent}%
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">
              {result.passed ? '🎉 Quiz Passed Successfully!' : 'Needs Revision — Keep Practicing'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Passing threshold was {quiz.passingScorePercent}%. You answered {result.correctCount} out of {result.totalQuestions} questions correctly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="block font-bold text-emerald-400 text-base">{result.correctCount}</span>
              <span className="block text-slate-400 text-[10px]">Correct</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="block font-bold text-rose-400 text-base">{result.totalQuestions - result.correctCount}</span>
              <span className="block text-slate-400 text-[10px]">Incorrect</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="block font-bold text-blue-400 text-base">{result.timeTakenSeconds}s</span>
              <span className="block text-slate-400 text-[10px]">Time Taken</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setCurrentQuestionIndex(0);
                setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-5 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retry Quiz
            </button>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30"
            >
              Continue Learning Path
            </button>
          </div>
        </div>

        {/* Detailed Question Explanations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Answer Breakdown & Explanations</h3>
          {result.explanations.map((e: any, idx: number) => (
            <div
              key={e.questionId}
              className={`p-5 rounded-2xl border space-y-3 ${
                e.isCorrect
                  ? 'bg-slate-900/90 border-emerald-500/30'
                  : 'bg-slate-900/90 border-rose-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-white text-xs">
                  Q{idx + 1}. {e.prompt}
                </span>
                {e.isCorrect ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Correct
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-rose-400 font-bold">
                    <XCircle className="w-4 h-4" /> Incorrect
                  </span>
                )}
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300">
                  <strong className="text-slate-500">Your Answer:</strong> {JSON.stringify(e.userAnswer || 'None')}
                </p>
                <p className="text-emerald-400 font-semibold">
                  <strong className="text-slate-500">Correct Answer:</strong> {JSON.stringify(e.correctAnswer)}
                </p>
              </div>

              <p className="text-slate-400 text-xs italic bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                💡 <strong className="text-slate-300">Explanation:</strong> {e.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
            INTERACTIVE ASSESSMENT
          </span>
          <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
        </div>

        {/* Timer */}
        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded font-semibold">{currentQ.type}</span>
          </div>

          <h3 className="text-base font-bold text-white leading-relaxed">{currentQ.prompt}</h3>

          {currentQ.codeSnippet && (
            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
              {currentQ.codeSnippet}
            </pre>
          )}

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options?.map((opt, i) => {
              const isMultiSelect = currentQ.type === 'Multiple Select';
              const selected = isMultiSelect
                ? (answers[currentQ.id] || []).includes(opt)
                : answers[currentQ.id] === opt;

              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(currentQ.id, opt, isMultiSelect)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-blue-600/20 text-white border-blue-500 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      selected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs px-4 py-2 rounded-xl border border-slate-800"
            >
              Previous
            </button>

            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30"
              >
                {submitting ? 'Evaluating...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
