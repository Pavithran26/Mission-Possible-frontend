import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { Quiz, QuizQuestion } from '../../types';

interface QuizReviewProps {
  quiz: Quiz;
  answers: Record<string, any>;
  onBack: () => void;
  onGoToCourse?: () => void;
  scorePercent: number;
  passed: boolean;
}

const normalizeAnswer = (answer: any): string[] => {
  if (Array.isArray(answer)) return answer.map(String);
  if (answer === undefined || answer === null) return [];
  return [String(answer)];
};

const isCorrectSelection = (question: QuizQuestion, userAnswer: any) => {
  if (Array.isArray(question.correctAnswer)) {
    const normalized = normalizeAnswer(userAnswer).map(a => a.trim().toLowerCase()).sort();
    return (
      normalized.length > 0 &&
      normalized.join(',') === question.correctAnswer.map(String).map(a => a.trim().toLowerCase()).sort().join(',')
    );
  }
  return String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
};

const getOptionState = (question: QuizQuestion, option: string, userAnswer: any) => {
  const correctAnswers = normalizeAnswer(question.correctAnswer).map(a => a.trim().toLowerCase());
  const selectedAnswers = normalizeAnswer(userAnswer).map(a => a.trim().toLowerCase());
  const optionNormalized = option.trim().toLowerCase();
  const isCorrect = correctAnswers.includes(optionNormalized);
  const isSelected = selectedAnswers.includes(optionNormalized);

  if (isSelected && isCorrect) {
    return 'selected-correct';
  }
  if (isSelected && !isCorrect) {
    return 'selected-incorrect';
  }
  if (!isSelected && isCorrect) {
    return 'correct';
  }
  return 'neutral';
};

export const QuizReview: React.FC<QuizReviewProps> = ({ quiz, answers, onBack, onGoToCourse, scorePercent, passed }) => {
  const available = quiz && Array.isArray(quiz.questions) && quiz.questions.length > 0;
  const safeScorePercent = scorePercent ?? 0;

  if (!available) {
    return (
      <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Quiz Review Not Available</p>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Your quiz review could not be loaded.</p>
        <div className="mt-5 flex justify-center gap-3">
          <button onClick={onBack} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">Back</button>
          {onGoToCourse && (
            <button onClick={onGoToCourse} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">Back to Course</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-full transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Score
        </button>
        {onGoToCourse && (
          <button
            onClick={onGoToCourse}
            className="inline-flex items-center gap-2 text-xs text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-full transition"
          >
            <BookOpen className="w-4 h-4" /> Back to Course
          </button>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-600/10 via-white to-slate-100 dark:from-blue-600/20 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xl">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{quiz.title}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Review Answers</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> {quiz.questions.length} Questions Reviewed
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Final Score</p>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{quiz.questions.filter(q => q).length > 0 ? `${Math.round((scorePercent / 100) * quiz.questions.length)}` : 0} / {quiz.questions.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Percentage</p>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{scorePercent}%</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Status</p>
              <p className={`mt-3 text-2xl font-bold ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>{passed ? 'Passed' : 'Failed'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {quiz.questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const correct = isCorrectSelection(question, userAnswer);
          const selectedAnswers = normalizeAnswer(userAnswer);
          return (
            <div key={question.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
              <div className={`h-1.5 w-full rounded-full mb-4 ${correct ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Question {index + 1}</p>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-2">{question.prompt}</h2>
                </div>
                <div className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${correct ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-rose-500/10 text-rose-600 dark:text-rose-300'}`}>
                  {correct ? 'Correct' : 'Incorrect'}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(question.options || []).map(option => {
                  const state = getOptionState(question, option, userAnswer);
                  return (
                    <div
                      key={option}
                      className={`rounded-2xl p-4 border text-sm font-medium ${
                        state === 'selected-correct'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                          : state === 'selected-incorrect'
                          ? 'border-rose-300 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-300'
                          : state === 'correct'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>{option}</span>
                        <span className="flex items-center gap-2">
                          {state === 'selected-correct' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          {state === 'selected-incorrect' && <XCircle className="w-4 h-4 text-rose-600" />}
                          {state === 'correct' && <CheckCircle2 className="w-4 h-4 text-emerald-600 opacity-80" />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Your Answer</p>
                  <p className="mt-2 text-slate-900 dark:text-slate-100">{selectedAnswers.length ? selectedAnswers.join(', ') : 'No answer selected'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Correct Answer</p>
                  <p className="mt-2 text-emerald-900 dark:text-emerald-300">{normalizeAnswer(question.correctAnswer).join(', ')}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
