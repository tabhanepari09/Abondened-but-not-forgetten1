import React from 'react';

interface ArcGaugeProps {
  label: string;
  value: string | number;
  unit?: string;
  percentage?: number; // 0 to 100
  statusText?: string;
}

export const ArcGauge: React.FC<ArcGaugeProps> = ({
  label,
  value,
  unit = '',
  percentage = 68,
  statusText = 'CALIBRATED',
}) => {
  // SVG semi-circle arc math
  const radius = 38;
  const stroke = 6;
  const circumference = Math.PI * radius; // 180 degree semi-circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 p-3 rounded-xl border border-[#55DDF5]/20 bg-[#0A1020]/80 backdrop-blur-md shadow-xl font-mono select-none">
      {/* Title */}
      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#A5A5A5] mb-1">
        <span>{label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#55DDF5] animate-ping" />
      </div>

      {/* Radial Semi-Circle Arc Meter */}
      <div className="relative flex flex-col items-center justify-center my-1">
        <svg className="w-28 h-16 overflow-visible" viewBox="0 0 100 55">
          {/* Background Arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="rgba(85, 221, 245, 0.15)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />

          {/* Value Arc (Glowing Cyan) */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#55DDF5"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 shadow-[0_0_10px_#55DDF5]"
          />

          {/* Ticks */}
          {[0, 30, 60, 90, 120, 150, 180].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 50 - 46 * Math.cos(rad);
            const y1 = 50 - 46 * Math.sin(rad);
            const x2 = 50 - 42 * Math.cos(rad);
            const y2 = 50 - 42 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(85, 221, 245, 0.4)"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Center Digital Readout */}
        <div className="absolute bottom-0 text-center">
          <div className="text-base font-display font-bold text-[#E8EDF5] leading-none">
            {value} <span className="text-[10px] font-normal text-[#55DDF5]">{unit}</span>
          </div>
        </div>
      </div>

      {/* Bottom Status & Mode Switch */}
      <div className="mt-2 pt-1.5 border-t border-[#55DDF5]/10 flex items-center justify-between text-[9px]">
        <span className="text-[#55DDF5]">{statusText}</span>
        <span className="px-1.5 py-0.5 rounded bg-[#55DDF5]/15 text-[#55DDF5] border border-[#55DDF5]/30">
          SYS OK
        </span>
      </div>
    </div>
  );
};
