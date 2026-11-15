import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { artifacts } from '../data/artifacts';
import { useArchiveStore } from '../store/archiveStore';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ArrowRight, MapPin, Eye, Calendar, Shield, ExternalLink } from 'lucide-react';

export const Archive: React.FC = () => {
  const activeFilter = useArchiveStore((s) => s.activeFilter);
  const setActiveFilter = useArchiveStore((s) => s.setActiveFilter);
  const { playClick } = useSoundEffects();

  const filteredArtifacts = artifacts.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.planet === activeFilter;
  });

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="THE CENTRAL ARCHIVE"
          title="Documented Space Heritage Artifacts"
          subtitle="Explore the verified inventory of human and robotic hardware resting on lunar and Martian surfaces. Every entry includes verified coordinates, scientific legacies, and 3D telemetry."
        />

        {/* Filter Controls & Archive Counts */}
        <div className="flex flex-wrap items-center justify-between gap-4 my-8 pb-6 border-b border-[#55DDF5]/15">
          <div className="flex items-center gap-2">
            {(['all', 'moon', 'mars'] as const).map((filter) => {
              const isSelected = activeFilter === filter;
              const count = filter === 'all' ? artifacts.length : artifacts.filter((a) => a.planet === filter).length;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    playClick();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                    isSelected
                      ? 'border-[#55DDF5] bg-[#55DDF5]/15 text-[#55DDF5] font-bold shadow-md shadow-[#55DDF5]/10'
                      : 'border-[#55DDF5]/15 bg-[#0A1020]/70 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
                  }`}
                >
                  {filter === 'all' ? 'ALL SITES' : `${filter.toUpperCase()}`} ({count})
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#A5A5A5] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55DDF5] animate-pulse" />
            <span>AUTHENTIC NASA / JPL / LROC TELEMETRY</span>
          </div>
        </div>

        {/* Artifact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtifacts.map((art) => (
            <GlassPanel
              key={art.id}
              cornerBorders
              className="flex flex-col justify-between group hover:border-[#55DDF5]/60 transition-all duration-300"
            >
              <div>
                {/* Header row: Planet badge + status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <DataBadge
                    label="WORLD"
                    value={art.planet.toUpperCase()}
                    variant={art.planet === 'moon' ? 'lunar' : 'mars'}
                  />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]">
                    {art.currentStatus.split('/')[0]}
                  </span>
                </div>

                {/* Title & Operator */}
                <h3 className="text-xl font-display font-bold text-[#E8EDF5] group-hover:text-[#55DDF5] transition-colors leading-snug">
                  {art.name}
                </h3>
                <p className="text-xs font-mono text-[#55DDF5]/80 mt-1">
                  {art.operator} • {art.mission}
                </p>

                {/* Short narrative */}
                <p className="mt-3 text-xs text-[#E8EDF5]/70 font-light line-clamp-3 leading-relaxed">
                  {art.originalObjective}
                </p>

                {/* Telemetry specs box */}
                <div className="mt-4 p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/10 space-y-1.5 text-xs font-mono text-[#A5A5A5]">
                  <div className="flex justify-between">
                    <span>LANDED:</span>
                    <span className="text-[#E8EDF5]">{art.landingDate.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>COORDINATES:</span>
                    <span className="text-[#55DDF5]">
                      {art.coordinates.latDisplay}, {art.coordinates.lngDisplay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SITE REGION:</span>
                    <span className="text-[#E8EDF5] truncate max-w-[160px] text-right">
                      {art.coordinates.region}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CERTAINTY:</span>
                    <span className="text-[#A5A5A5] text-[10px]">{art.statusCertainty}</span>
                  </div>
                </div>

                {/* Key Achievement Pill */}
                <div className="mt-3 text-[11px] text-[#A5E9F5] font-light bg-[#55DDF5]/5 border border-[#55DDF5]/15 p-2 rounded">
                  <span className="font-mono text-[#55DDF5] font-semibold">MILESTONE: </span>
                  {art.whatItAccomplished[0]}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 pt-4 border-t border-[#55DDF5]/15 flex items-center justify-between gap-2">
                <Link
                  to={`/archive/${art.id}`}
                  onClick={playClick}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#55DDF5]/15 hover:bg-[#55DDF5]/25 text-[#55DDF5] border border-[#55DDF5]/30 text-xs font-mono font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D INSPECTOR</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>

                <Link
                  to="/map"
                  className="flex items-center gap-1 text-xs font-mono text-[#A5A5A5] hover:text-[#E8EDF5] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>ON MAP</span>
                </Link>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};
