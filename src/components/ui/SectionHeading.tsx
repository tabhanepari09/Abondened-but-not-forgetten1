import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#55DDF5] ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="w-2 h-2 rounded-full bg-[#55DDF5] animate-ping" />
          <span>{badge}</span>
          <span className="text-[#55DDF5]/40">// NASA HERITAGE ARCHIVE</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#E8EDF5]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#E8EDF5]/70 max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
