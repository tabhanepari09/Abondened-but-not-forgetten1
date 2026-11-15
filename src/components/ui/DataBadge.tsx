import React from 'react';

interface DataBadgeProps {
  label: string;
  value: string;
  variant?: 'cyan' | 'amber' | 'mars' | 'lunar';
  className?: string;
}

export const DataBadge: React.FC<DataBadgeProps> = ({
  label,
  value,
  variant = 'cyan',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'border-[#55DDF5]/40 bg-[#55DDF5]/15 text-[#55DDF5] shadow-[0_0_12px_rgba(85,221,245,0.15)]',
    amber: 'border-[#FF9F1C]/40 bg-[#FF9F1C]/15 text-[#FF9F1C] shadow-[0_0_12px_rgba(255,159,28,0.15)]',
    mars: 'border-[#E26D5C]/40 bg-[#E26D5C]/15 text-[#E26D5C] shadow-[0_0_12px_rgba(226,109,92,0.15)]',
    lunar: 'border-[#94A3B8]/40 bg-[#94A3B8]/15 text-[#F0F6FC] shadow-[0_0_12px_rgba(148,163,184,0.15)]',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono uppercase tracking-wider backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      <span className="opacity-70 text-[10px]">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};
