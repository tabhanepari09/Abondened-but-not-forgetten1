import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Radio, Crosshair, Eye, EyeOff } from 'lucide-react';
import { useArchiveStore } from '../../store/archiveStore';

export const MissionHUD: React.FC = () => {
  const location = useLocation();
  const isHUDVisible = useArchiveStore((s) => s.isHUDVisible);
  const toggleHUD = useArchiveStore((s) => s.toggleHUD);
  const activePlanet = useArchiveStore((s) => s.activePlanet);

  const getSectionTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'ORBITAL RECON // DEEP SPACE';
      case '/story':
        return 'ARCHIVAL ESSAY // THE STORY';
      case '/explore':
        return `PLANETARY SYSTEM // ${activePlanet.toUpperCase()}`;
      case '/archive':
        return 'REGISTRY // 6 DOCUMENTED ARTIFACTS';
      case '/map':
        return `SURFACE TELEMETRY // ${activePlanet.toUpperCase()} MAP`;
      case '/timeline':
        return 'CHRONOLOGY // 1967-PRESENT';
      case '/quiz':
        return 'EVALUATION // MISSION CONTROL';
      case '/about':
        return 'MANDATE // HERITAGE POLICY';
      default:
        if (location.pathname.startsWith('/archive/')) {
          return 'ARTIFACT INSPECTION // IN SITU';
        }
        return 'ACTIVE TELEMETRY';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 pointer-events-auto font-mono">
      <button
        onClick={toggleHUD}
        className="p-2 rounded-xl border border-[#55DDF5]/30 bg-[#060D20]/90 text-[#55DDF5] hover:bg-[#0A1633] transition-colors shadow-lg shadow-black/60"
        title={isHUDVisible ? 'Minimize HUD' : 'Expand HUD'}
        aria-label="Toggle Mission HUD"
      >
        {isHUDVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </button>

      {isHUDVisible && (
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-[#55DDF5]/30 bg-[#060D20]/95 backdrop-blur-xl text-xs shadow-2xl shadow-black/80">
          <div className="flex items-center gap-2 text-[#55DDF5]">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#55DDF5]" />
            <span className="font-semibold tracking-wider">{getSectionTitle()}</span>
          </div>
          <span className="text-[#55DDF5]/30">|</span>
          <div className="flex items-center gap-1.5 text-[#94A3B8]">
            <Crosshair className="w-3 h-3 text-[#FF9F1C]" />
            <span>SYS OK</span>
          </div>
          <span className="text-[#55DDF5]/30">|</span>
          <Link
            to="/map"
            className="text-[11px] text-[#55DDF5] hover:underline flex items-center gap-1"
          >
            OPEN MAP &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};
