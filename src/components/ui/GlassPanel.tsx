import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  cornerBorders?: boolean;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glow = false,
  cornerBorders = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ${glow ? 'glass-panel-glow' : 'glass-panel'} 
        ${cornerBorders ? 'hud-corner' : ''}
        relative rounded-2xl p-5 sm:p-6 transition-all duration-300
        ${className}
      `}
    >
      {cornerBorders && (
        <>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#55DDF5] pointer-events-none drop-shadow-[0_0_4px_#55DDF5]" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#55DDF5] pointer-events-none drop-shadow-[0_0_4px_#55DDF5]" />
        </>
      )}
      {children}
    </div>
  );
};
