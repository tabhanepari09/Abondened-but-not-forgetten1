import React from 'react';
import { artifacts } from '../../data/artifacts';
import { Artifact } from '../../types';
import { AttitudeIndicator } from './AttitudeIndicator';
import { Play, Pause, RotateCcw, Compass, Radio, ChevronRight, ChevronLeft } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface MissionDockStripProps {
  selectedArtifactId: string;
  onSelectArtifact: (art: Artifact) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
}

export const MissionDockStrip: React.FC<MissionDockStripProps> = ({
  selectedArtifactId,
  onSelectArtifact,
  isAutoRotating,
  onToggleAutoRotate,
}) => {
  const { playClick } = useSoundEffects();

  const getCodeDesignation = (id: string) => {
    switch (id) {
      case 'apollo-11-lm':
        return 'LM-EAGLE';
      case 'surveyor-3':
        return 'SRV-03';
      case 'lunar-roving-vehicle':
        return 'LRV-01';
      case 'sojourner-rover':
        return 'SOJ-01';
      case 'spirit-rover':
        return 'MER-A';
      case 'opportunity-rover':
        return 'MER-B';
      default:
        return 'OBJ-00';
    }
  };

  return (
    <div className="relative w-full max-w-[1550px] mx-auto px-4 font-mono select-none">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-4 p-3 rounded-2xl border border-[#55DDF5]/25 bg-[#070D1A]/92 backdrop-blur-2xl shadow-2xl">
        {/* Left: Docked Vehicles Carousel Cards (Matches reference image bottom left!) */}
        <div className="flex-1 w-full overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-2.5 min-w-max">
            {artifacts.map((art) => {
              const isSelected = art.id === selectedArtifactId;
              const isMoon = art.planet === 'moon';
              return (
                <button
                  key={art.id}
                  onClick={() => {
                    onSelectArtifact(art);
                    playClick();
                  }}
                  className={`group relative p-2.5 rounded-xl border text-left transition-all duration-200 w-48 sm:w-52 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#55DDF5] bg-[#101B32] shadow-[0_0_15px_rgba(85,221,245,0.25)] ring-1 ring-[#55DDF5]'
                      : 'border-[#55DDF5]/20 bg-[#0A1020]/80 hover:border-[#55DDF5]/50 hover:bg-[#101B32]/70'
                  }`}
                >
                  {/* Top line: Code designation + Live status dot */}
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-bold text-[#55DDF5] tracking-wider">
                      {getCodeDesignation(art.id)}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-[#A5A5A5]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-[#55DDF5] animate-ping' : isMoon ? 'bg-[#55DDF5]' : 'bg-[#FF9F1C]'
                        }`}
                      />
                      {art.planet.toUpperCase()}
                    </span>
                  </div>

                  {/* Vehicle Short Name */}
                  <div className="text-xs font-display font-bold text-[#E8EDF5] truncate group-hover:text-[#55DDF5] transition-colors">
                    {art.shortName}
                  </div>

                  {/* Coordinates & Energy level line */}
                  <div className="mt-2 pt-1.5 border-t border-[#55DDF5]/10 flex items-center justify-between text-[9px] text-[#A5A5A5]">
                    <span>{art.coordinates.latDisplay}</span>
                    <span className="text-[#55DDF5]">IN SITU</span>
                  </div>

                  {/* Active highlight bar */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#55DDF5] shadow-[0_0_8px_#55DDF5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Playback & Rotation Controller Deck */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#05070D]/80 border border-[#55DDF5]/20">
          <button
            onClick={() => {
              onToggleAutoRotate();
              playClick();
            }}
            className={`p-2 rounded-lg border transition-all ${
              isAutoRotating
                ? 'bg-[#55DDF5]/20 border-[#55DDF5] text-[#55DDF5]'
                : 'bg-[#101B32] border-[#55DDF5]/20 text-[#A5A5A5] hover:text-[#E8EDF5]'
            }`}
            title={isAutoRotating ? 'Pause Orbit' : 'Resume Orbit'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="text-center px-2">
            <span className="block text-[8px] uppercase text-[#A5A5A5]">ORBIT DYNAMICS</span>
            <span className="text-[11px] font-bold text-[#55DDF5]">
              {isAutoRotating ? '0.04 RAD/S' : 'HOLD STATIC'}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#55DDF5]/20" />

          {/* Quick telemetry toggle */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#A5A5A5]">
            <Radio className="w-3 h-3 text-[#FF9F1C] animate-pulse" />
            <span>RELAY LINK: OK</span>
          </div>
        </div>

        {/* Right: Attitude Gyro Horizon & Status Ring (Matches reference image bottom right!) */}
        <div className="hidden lg:flex items-center gap-4 pl-2">
          <AttitudeIndicator pitch={-3.4} roll={14.2} heading={248} />
        </div>
      </div>
    </div>
  );
};
