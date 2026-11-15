import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoaded?: () => void;
  minDuration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoaded,
  minDuration = 800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          onLoaded?.();
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDuration, onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 bg-[#05070D] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 tech-grid opacity-30" />

          {/* Center telemetry indicator */}
          <div className="relative flex flex-col items-center gap-6 px-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#55DDF5]/20" />
              <div
                className="absolute inset-0 rounded-full border-t-2 border-[#55DDF5] animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <span className="w-3 h-3 rounded-full bg-[#55DDF5] shadow-[0_0_12px_#55DDF5]" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="font-display font-bold tracking-widest text-sm text-[#E8EDF5]">
                INITIALIZING SPACE ARCHIVE
              </h2>
              <p className="font-mono text-xs text-[#55DDF5]/80">
                TELEMETRY SYNCHRONIZATION: {progress}%
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-56 h-1 bg-[#101B32] rounded-full overflow-hidden border border-[#55DDF5]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#55DDF5]/60 to-[#55DDF5]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-mono text-[10px] text-[#A5A5A5] tracking-widest">
              CALIBRATING 3D PLANETARY MATRICES
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
