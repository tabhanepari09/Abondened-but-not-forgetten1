import React, { useState, useEffect } from 'react';

interface AttitudeIndicatorProps {
  pitch?: number;
  roll?: number;
  heading?: number;
}

export const AttitudeIndicator: React.FC<AttitudeIndicatorProps> = ({
  pitch = -4.2,
  roll = 12.5,
  heading = 248,
}) => {
  const [liveRoll, setLiveRoll] = useState(roll);
  const [livePitch, setLivePitch] = useState(pitch);

  // Subtle natural attitude drift animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRoll((r) => r + (Math.random() - 0.5) * 0.4);
      setLivePitch((p) => p + (Math.random() - 0.5) * 0.3);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-[#55DDF5]/40 bg-[#070D1A]/90 backdrop-blur-xl p-1 flex items-center justify-center shadow-[0_0_25px_rgba(85,221,245,0.15)] font-mono select-none">
      {/* Outer Heading Compass Ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[#55DDF5]/20 animate-spin-slow pointer-events-none" />

      {/* Degree Ticks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <div
          key={deg}
          className="absolute w-full h-full pointer-events-none"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <div className="w-[1px] h-2 bg-[#55DDF5]/60 mx-auto" />
        </div>
      ))}

      {/* Artificial Horizon Sphere / Core (Glowing Amber & Midnight Blue) */}
      <div
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[#55DDF5]/30 shadow-inner"
        style={{ transform: `rotate(${liveRoll}deg)` }}
      >
        {/* Upper Half: Deep Space Midnight Blue */}
        <div className="w-full h-1/2 bg-gradient-to-b from-[#0A1020] to-[#101B32] flex items-end justify-center pb-1">
          <div className="w-6 h-[1px] bg-[#55DDF5]/40" />
        </div>

        {/* Horizon Dividing Line */}
        <div className="w-full h-[2px] bg-[#FF9F1C] shadow-[0_0_8px_#FF9F1C]" />

        {/* Lower Half: Planetary Core Glowing Amber */}
        <div className="w-full h-1/2 bg-gradient-to-b from-[#8C3A1A]/90 to-[#2A0E08] flex items-start justify-center pt-1">
          <div className="w-6 h-[1px] bg-[#FF9F1C]/40" />
        </div>

        {/* Pitch Ladder Marks */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform"
          style={{ transform: `translateY(${livePitch * 1.5}px)` }}
        >
          <div className="w-8 h-[1px] bg-[#55DDF5]/70 mb-2" />
          <div className="w-4 h-[1px] bg-[#55DDF5]/50 mb-2" />
          <div className="w-8 h-[1px] bg-[#55DDF5]/70 mt-2" />
        </div>
      </div>

      {/* Fixed Aircraft / Gimbal Crosshair reticle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3 h-3 rounded-full border-2 border-[#55DDF5] bg-[#05070D]/80" />
        <div className="absolute w-8 h-[2px] bg-[#55DDF5] -left-1" />
        <div className="absolute w-8 h-[2px] bg-[#55DDF5] -right-1" />
      </div>

      {/* Digital Heading and Pitch readout labels */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-[#A5A5A5] flex items-center gap-1.5 bg-[#05070D]/90 px-2 py-0.5 rounded border border-[#55DDF5]/20">
        <span className="text-[#FF9F1C]">HDG {heading}°</span>
        <span>•</span>
        <span className="text-[#55DDF5]">P {livePitch.toFixed(1)}°</span>
      </div>
    </div>
  );
};
