import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { quizQuestions } from '../data/quiz';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { QuizEvaluationResult } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Shield,
  Radio,
  Server,
} from 'lucide-react';

export const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionId: number; selectedIndex: number }[]>([]);
  const [evalResult, setEvalResult] = useState<QuizEvaluationResult | null>(null);
  const [backendStatus, setBackendStatus] = useState<boolean | null>(null);

  const { playClick, playBlip } = useSoundEffects();

  useEffect(() => {
    api.checkBackendStatus().then((res) => {
      setBackendStatus(res.online);
    });
  }, []);

  const currentQ = quizQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / quizQuestions.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    playClick();
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const updatedAnswers = [...answersLog, { questionId: currentQ.id, selectedIndex: selectedOption }];
    setAnswersLog(updatedAnswers);

    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
      playBlip();
    } else {
      playClick();
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      playClick();
    } else {
      setIsQuizComplete(true);
      playBlip();
      // Evaluate via FastAPI endpoint
      const result = await api.evaluateQuiz(answersLog);
      setEvalResult(result);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    setEvalResult(null);
    setIsQuizComplete(false);
    playClick();
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="MISSION CONTROL EVALUATION"
          title="Space Heritage Knowledge Check"
          subtitle="Test your comprehension of off-world artifacts, historical lunar landings, Martian exploration milestones, and space archaeological preservation."
        />

        {!isQuizComplete ? (
          <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-6">
            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between border-b border-[#55DDF5]/15 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#55DDF5]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>
                  QUESTION {currentIndex + 1} OF {quizQuestions.length}
                </span>
              </div>
              <div className="text-xs font-mono text-[#A5A5A5]">
                CURRENT SCORE: {score} / {currentIndex}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#101B32] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#55DDF5]/60 to-[#55DDF5] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2 py-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F59E0B]">
                // MISSION REF: {currentQ.missionRef}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#E8EDF5] leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyle =
                  'border-[#55DDF5]/20 bg-[#0A1020]/75 hover:bg-[#101B32] hover:border-[#55DDF5]/50 text-[#E8EDF5]';

                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = 'border-[#55DDF5] bg-[#55DDF5]/15 text-[#55DDF5] ring-1 ring-[#55DDF5]';
                }

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                  } else {
                    optionStyle = 'opacity-40 border-transparent bg-[#0A1020]/40 text-[#A5A5A5]';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-light transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md border border-[#55DDF5]/30 flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card when submitted */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed ${selectedOption === currentQ.correctIndex
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-[#E8EDF5]'
                    : 'border-amber-500/40 bg-amber-950/20 text-[#E8EDF5]'
                  }`}
              >
                <div className="flex items-center gap-2 font-mono font-semibold mb-1">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400">CORRECT ANALYSIS</span>
                  ) : (
                    <span className="text-[#F59E0B]">TELEMETRY CORRECTION</span>
                  )}
                </div>
                <p className="font-light">{currentQ.explanation}</p>
                <p className="mt-2 text-[10px] font-mono text-[#A5A5A5]">
                  SOURCE: {currentQ.verifiedSource}
                </p>
              </div>
            )}

            {/* Action Button: Confirm or Next */}
            <div className="pt-4 border-t border-[#55DDF5]/15 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className={`px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all ${selectedOption !== null
                      ? 'bg-[#55DDF5] text-[#05070D] hover:bg-[#A5E9F5]'
                      : 'bg-[#101B32] text-[#A5A5A5] opacity-50 cursor-not-allowed'
                    }`}
                >
                  TRANSMIT RESPONSE
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-[#55DDF5] hover:bg-[#A5E9F5] text-[#05070D] font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2"
                >
                  <span>
                    {currentIndex + 1 < quizQuestions.length ? 'NEXT QUESTION' : 'VIEW SCORE SUMMARY'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </GlassPanel>
        ) : (
          /* Final Score Card */
          <GlassPanel cornerBorders className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#55DDF5]/10 border border-[#55DDF5]/40 flex items-center justify-center mx-auto text-[#55DDF5]">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#55DDF5]">
                  EVALUATION CONCLUDED
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${backendStatus ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-[#55DDF5]/30 bg-[#0A1020] text-[#55DDF5]'
                  }`}>
                  {backendStatus ? 'REST FASTAPI VERIFIED' : 'LOCAL CACHE'}
                </span>
              </div>
              <h3 className="text-3xl font-display font-bold text-[#E8EDF5]">
                Final Score: {score} / {quizQuestions.length}
              </h3>
              {evalResult?.rating && (
                <div className="inline-block px-3 py-1 rounded-lg bg-[#55DDF5]/15 border border-[#55DDF5]/40 text-[#55DDF5] font-mono text-xs font-bold uppercase tracking-wider my-2">
                  🎖️ {evalResult.rating}
                </div>
              )}
              <p className="text-sm text-[#E8EDF5]/70 font-light max-w-md mx-auto">
                {score === quizQuestions.length
                  ? 'Flawless mission-control rating! You demonstrated expert mastery of off-world heritage sites and planetary science.'
                  : score >= 5
                    ? 'Strong performance! You have a solid understanding of lunar and Martian exploration artifacts.'
                    : 'Good attempt! Explore the 3D archive and interactive map to further deepen your knowledge of space heritage.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#55DDF5]/15">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#55DDF5]/30 bg-[#0A1020] hover:bg-[#101B32] text-xs font-mono text-[#E8EDF5]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETRY EVALUATION</span>
              </button>

              <Link
                to="/archive"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#55DDF5] text-[#05070D] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#A5E9F5]"
              >
                <span>STUDY 3D ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassPanel>
        )}
      </div>
    </div>
  );
};
