import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PlanetaryMapViewer } from '../components/3d/PlanetaryMapViewer';
import { GlassPanel } from '../components/ui/GlassPanel';
import { artifacts } from '../data/artifacts';
import { Artifact } from '../types';
import { Link } from 'react-router-dom';
import { useArchiveStore } from '../store/archiveStore';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { MapPin, Globe, Compass, ArrowRight, Radio } from 'lucide-react';

export const PlanetaryMap: React.FC = () => {
  const [selectedWorld, setSelectedWorld] = useState<'moon' | 'mars'>('moon');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const { playClick } = useSoundEffects();

  const worldArtifacts = artifacts.filter((a) => a.planet === selectedWorld);

  const handleWorldSwitch = (w: 'moon' | 'mars') => {
    setSelectedWorld(w);
    setActiveArtifact(null);
    playClick();
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CARTOGRAPHIC CARTOGRAPHY"
          title="Interactive 3D Planetary Map"
          subtitle="Plot and inspect the exact coordinates of human and robotic exploration hardware resting upon the lunar maria and the Martian floodplains."
        />

        {/* World Selection Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 my-8 pb-4 border-b border-[#55DDF5]/15">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleWorldSwitch('moon')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                selectedWorld === 'moon'
                  ? 'border-[#55DDF5] bg-[#55DDF5]/20 text-[#55DDF5] font-bold shadow-lg shadow-[#55DDF5]/20'
                  : 'border-[#55DDF5]/20 bg-[#0A1020]/70 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedWorld === 'moon' ? 'bg-[#55DDF5]' : 'bg-[#A5A5A5]'}`} />
              <span>THE MOON CARTOGRAPHY (3 SITES)</span>
            </button>

            <button
              onClick={() => handleWorldSwitch('mars')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                selectedWorld === 'mars'
                  ? 'border-[#D9532F] bg-[#D9532F]/20 text-[#E26D5C] font-bold shadow-lg shadow-[#D9532F]/20'
                  : 'border-[#55DDF5]/20 bg-[#0A1020]/70 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedWorld === 'mars' ? 'bg-[#E26D5C]' : 'bg-[#A5A5A5]'}`} />
              <span>MARS CARTOGRAPHY (3 SITES)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#A5A5A5] flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#55DDF5] animate-pulse" />
            <span>ORBITAL COORDINATES: LRO & MRO VERIFIED</span>
          </div>
        </div>

        {/* 3D Map Component */}
        <div className="my-8">
          <PlanetaryMapViewer
            planet={selectedWorld}
            selectedArtifactId={activeArtifact?.id}
            onSelectArtifact={(art) => setActiveArtifact(art)}
          />
        </div>

        {/* Site Quick Selectors Grid */}
        <div className="mt-12 space-y-4">
          <h3 className="text-sm font-mono uppercase text-[#55DDF5] tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F59E0B]" />
            DOCUMENTED SITES ON {selectedWorld.toUpperCase()}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {worldArtifacts.map((art) => {
              const isSelected = activeArtifact?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => {
                    setActiveArtifact(art);
                    playClick();
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#55DDF5] bg-[#101B32] shadow-lg shadow-[#55DDF5]/10'
                      : 'border-[#55DDF5]/15 bg-[#0A1020]/75 hover:border-[#55DDF5]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#55DDF5]">{art.mission}</span>
                    <span className="text-[#A5A5A5] text-[10px]">{art.coordinates.latDisplay}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-[#E8EDF5]">
                    {art.shortName}
                  </h4>
                  <p className="text-xs text-[#E8EDF5]/70 font-light mt-1">
                    {art.coordinates.siteName}
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#55DDF5]/10 flex items-center justify-between text-xs font-mono text-[#55DDF5]">
                    <span>Focus on globe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
