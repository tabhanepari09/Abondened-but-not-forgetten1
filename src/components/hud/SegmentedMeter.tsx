import React from 'react';

interface SegmentedMeterProps {
  label: string;
  level: number; // 0 to 10
  maxLevel?: number;
  unit?: string;
  variant?: 'cyan' | 'amber' | 'red';
}

export const SegmentedMeter: React.FC<SegmentedMeterProps> = ({
  label,
  level = 7,
  maxLevel = 10,
  unit = '%',
  variant = 'cyan',
}) => {
  const getSegmentColor = (idx: number) => {
    if (idx >= level) return 'bg-[#101B32]/60 border-transparent';
    if (idx >= 8) return 'bg-[#EF4444] border-[#EF4444] shadow-[0_0_6px_#EF4444]';
    if (idx >= 6) return 'bg-[#FF9F1C] border-[#FF9F1C] shadow-[0_0_6px_#FF9F1C]';
    return 'bg-[#55DDF5] border-[#55DDF5] shadow-[0_0_6px_#55DDF5]';
  };

  return (
    <div className="relative w-40 p-3 rounded-xl border border-[#55DDF5]/20 bg-[#0A1020]/80 backdrop-blur-md shadow-xl font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#A5A5A5] mb-2">
        <span>{label}</span>
        <span className="text-[#55DDF5] font-bold">
          {Math.round((level / maxLevel) * 100)}
          {unit}
        </span>
      </div>

      {/* Segmented Vertical Ladder */}
      <div className="flex items-center gap-1.5 my-2">
        <div className="flex-1 flex flex-col-reverse gap-1 h-20">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-[1px] border transition-all duration-300 ${getSegmentColor(
                i
              )}`}
            />
          ))}
        </div>

        {/* Readout stats on right side of meter */}
        <div className="w-16 space-y-1 text-[9px] text-[#A5A5A5]">
          <div className="p-1 rounded bg-[#05070D]/60 border border-[#55DDF5]/10">
            <span className="block text-[8px] text-[#55DDF5]">PWR OUT</span>
            <span className="text-[#E8EDF5] font-bold">140 W</span>
          </div>
          <div className="p-1 rounded bg-[#05070D]/60 border border-[#55DDF5]/10">
            <span className="block text-[8px] text-[#FF9F1C]">TEMP</span>
            <span className="text-[#E8EDF5] font-bold">-42°C</span>
          </div>
        </div>
      </div>

      {/* Mode Buttons */}
      <div className="grid grid-cols-2 gap-1 mt-2 text-[9px] text-center">
        <button className="py-0.5 rounded bg-[#55DDF5]/15 border border-[#55DDF5]/30 text-[#55DDF5] hover:bg-[#55DDF5]/25">
          AUTO
        </button>
        <button className="py-0.5 rounded bg-[#101B32]/70 border border-[#55DDF5]/15 text-[#A5A5A5] hover:text-[#E8EDF5]">
          MANUAL
        </button>
      </div>
    </div>
  );
};
