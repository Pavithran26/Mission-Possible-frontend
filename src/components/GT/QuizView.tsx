import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../../types';
import { submitQuizApi } from '../../services/api';
import { QuizReview } from './QuizReview';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw, ChevronRight, ArrowLeft, Zap, Sparkles } from 'lucide-react';

interface QuizViewProps {
  quiz: Quiz;
  onBack: () => void;
  onQuizCompleted?: (scorePercent: number) => void;
}

class QuizReviewErrorBoundary extends React.Component<{
  onReset: () => void;
  onGoToCourse: () => void;
  children: React.ReactNode;
}, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('QuizReview render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg text-center space-y-4">
          <p className="text-sm font-semibold text-rose-600">Something went wrong while loading the quiz review.</p>
          <p className="text-slate-600 dark:text-slate-300">Please try again or return to the course.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <button onClick={this.props.onReset} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">Retry Review</button>
            <button onClick={this.props.onGoToCourse} className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">Back to Course</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, onBack, onQuizCompleted }) => {
  const storageKey = `quiz-review-${quiz.id}`;
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showReviewPage, setShowReviewPage] = useState(false);
  const [confirmingLeave, setConfirmingLeave] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.answers && parsed.result) {
          setAnswers(parsed.answers);
          setResult(parsed.result);
          setSubmitted(true);
          setShowReviewPage(parsed.showReviewPage === true);
        }
      }
    } catch (err) {
      console.error('Failed to restore quiz review data:', err);
    }
  }, [storageKey]);

  useEffect(() => {
    if (submitted && result) {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ answers, result, quizId: quiz.id, showReviewPage })
        );
      } catch (err) {
        console.error('Failed to persist quiz review data:', err);
      }
    }
  }, [submitted, result, answers, showReviewPage, quiz.id, storageKey]);

  useEffect(() => {
    if (showReviewPage && submitted && result) {
      try {
        const saved = sessionStorage.getItem(storageKey);
        const parsed = saved ? JSON.parse(saved) : {};
        sessionStorage.setItem(storageKey, JSON.stringify({ ...parsed, answers, result, quizId: quiz.id, showReviewPage: true }));
      } catch (err) {
        console.error('Failed to update review visibility state:', err);
      }
    }
  }, [showReviewPage, submitted, result, answers, quiz.id, storageKey]);

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
    try {
      const res = await submitQuizApi(quiz.id, answers);
      setResult(res);
      setSubmitted(true);
      sessionStorage.setItem(storageKey, JSON.stringify({ answers, result: res, quizId: quiz.id, showReviewPage: false }));
      if (onQuizCompleted) onQuizCompleted(res.scorePercent);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackAttempt = () => {
    if (Object.keys(answers).length > 0 && !submitted) {
      setConfirmingLeave(true);
      return;
    }
    onBack();
  };

  const handleLeaveConfirmed = () => {
    setConfirmingLeave(false);
    onBack();
  };

  const handleRetryQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setResult(null);
    setShowReviewPage(false);
    try {
      sessionStorage.removeItem(storageKey);
    } catch (err) {
      console.error('Failed to clear quiz retry state:', err);
    }
  };

  const handleCancelLeave = () => {
    setConfirmingLeave(false);
  };

  if (submitted && result) {
    if (showReviewPage) {
      return (
        <QuizReviewErrorBoundary onReset={() => setShowReviewPage(false)} onGoToCourse={onBack}>
          <QuizReview
            quiz={quiz}
            answers={answers}
            onBack={() => setShowReviewPage(false)}
            onRetry={handleRetryQuiz}
            onGoToCourse={onBack}
            scorePercent={result.scorePercent}
            passed={result.passed}
          />
        </QuizReviewErrorBoundary>
      );
    }

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <button
          onClick={handleBackAttempt}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
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
              You answered {result.correctCount} out of {result.totalQuestions} questions correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2 text-xs text-left">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px]">Your Score</p>
              <p className="mt-3 text-2xl font-bold text-white">{result.correctCount} / {result.totalQuestions}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px]">Percentage</p>
              <p className="mt-3 text-2xl font-bold text-white">{result.scorePercent}%</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px]">Status</p>
              <p className={`mt-3 text-2xl font-bold ${result.passed ? 'text-emerald-400' : 'text-rose-400'}`}>{result.passed ? 'Passed' : 'Failed'}</p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setShowReviewPage(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
            >
              Review Answers
            </button>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30"
            >
              Continue Learning Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={handleBackAttempt}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {confirmingLeave && (
        <div className="rounded-3xl border border-rose-200/70 dark:border-rose-500/30 bg-white dark:bg-slate-950 p-5 shadow-md">
          <p className="text-sm font-semibold text-rose-600">Leave Quiz?</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Your current quiz progress will not be saved.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCancelLeave}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleLeaveConfirmed}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
            >
              Leave Quiz
            </button>
          </div>
        </div>
      )}

      {/* Quiz Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
            INTERACTIVE ASSESSMENT
          </span>
          <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
        </div>

        {/* No timer shown per updated quiz requirements */}
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
