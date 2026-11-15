import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { PlanetSelector3D } from '../components/3d/PlanetSelector';
import { LivePhotoGallery } from '../components/ui/LivePhotoGallery';
import { planetsData } from '../data/missions';
import { useArchiveStore } from '../store/archiveStore';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { PlanetId } from '../types';
import { Globe, ArrowRight, Shield, Compass, MapPin, Camera } from 'lucide-react';

export const Explore: React.FC = () => {
  const activePlanet = useArchiveStore((s) => s.activePlanet);
  const setActivePlanet = useArchiveStore((s) => s.setActivePlanet);
  const setActiveFilter = useArchiveStore((s) => s.setActiveFilter);
  const { playClick } = useSoundEffects();

  const currentData = planetsData[activePlanet];

  const handleSelectPlanet = (p: PlanetId) => {
    setActivePlanet(p);
    if (p === 'moon' || p === 'mars') {
      setActiveFilter(p);
    }
    playClick();
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PLANETARY SELECTION"
          title="Explore the Celestial Bodies"
          subtitle="Navigate between the worlds of the Inner Solar System. Inspect their orbital and physical metrics, compare 3D environments with live optical photography, and enter their dedicated surface archives."
        />

        {/* Planet Switching Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-8">
          {(['moon', 'mars', 'earth'] as const).map((pid) => {
            const p = planetsData[pid];
            const isSelected = activePlanet === pid;
            return (
              <button
                key={pid}
                onClick={() => handleSelectPlanet(pid)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all duration-200 backdrop-blur-md ${
                  isSelected
                    ? 'border-[#55DDF5] bg-[#55DDF5]/15 text-[#55DDF5] shadow-lg shadow-[#55DDF5]/20 ring-1 ring-[#55DDF5]'
                    : 'border-[#55DDF5]/20 bg-[#0A1020]/75 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected ? 'bg-[#55DDF5] animate-ping' : 'bg-[#A5A5A5]'
                  }`}
                />
                <span className="font-bold text-sm sm:text-base">{p.name}</span>
                {pid !== 'earth' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#55DDF5]/20 text-[#55DDF5]">
                    {p.artifactsCount} SITES
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main 3D Display + Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
          {/* 3D Planet Viewer (7 cols) */}
          <div className="lg:col-span-7">
            <PlanetSelector3D activePlanet={activePlanet} />
          </div>

          {/* Scientific Telemetry & Entry Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#55DDF5]">
                    TARGET IDENTIFIER
                  </span>
                  <DataBadge
                    label="SYSTEM"
                    value={activePlanet.toUpperCase()}
                    variant={activePlanet === 'mars' ? 'mars' : activePlanet === 'moon' ? 'lunar' : 'cyan'}
                  />
                </div>
                <h3 className="text-3xl font-display font-bold text-[#E8EDF5]">
                  {currentData.name}
                </h3>
                <p className="text-xs font-mono text-[#55DDF5] mt-1">
                  // {currentData.subtitle}
                </p>
                <p className="mt-3 text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                  {currentData.description}
                </p>
              </div>

              {/* Physical Properties Table */}
              <div className="space-y-2 text-xs font-mono border-y border-[#55DDF5]/15 py-4">
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">EQUATORIAL DIAMETER:</span>
                  <span className="text-[#E8EDF5] font-semibold">{currentData.diameterKm}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">DISTANCE:</span>
                  <span className="text-[#E8EDF5] font-semibold">{currentData.distanceFromSun}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">SURFACE GRAVITY:</span>
                  <span className="text-[#55DDF5] font-semibold">{currentData.surfaceGravity}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">SURFACE TEMPERATURE:</span>
                  <span className="text-[#E8EDF5] font-semibold">{currentData.surfaceTemp}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">ATMOSPHERE:</span>
                  <span className="text-[#E8EDF5] font-semibold">{currentData.atmosphere}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5A5A5]">DAY / ROTATION:</span>
                  <span className="text-[#E8EDF5] font-semibold">{currentData.dayLength}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                {activePlanet !== 'earth' ? (
                  <>
                    <Link
                      to={`/archive`}
                      onClick={() => {
                        setActiveFilter(activePlanet);
                        playClick();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#55DDF5] hover:bg-[#A5E9F5] text-[#05070D] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#55DDF5]/20"
                    >
                      <span>ENTER {currentData.name.toUpperCase()} ARCHIVE ({currentData.artifactsCount} ARTIFACTS)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to={`/map`}
                      onClick={() => {
                        setActivePlanet(activePlanet);
                        playClick();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#55DDF5]/30 bg-[#0A1020]/80 hover:bg-[#101B32] text-[#E8EDF5] font-mono font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#FF9F1C]" />
                      <span>OPEN 3D CARTOGRAPHIC MAP</span>
                    </Link>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-[#101B32]/40 border border-[#55DDF5]/20 text-center">
                    <p className="text-xs font-mono text-[#A5A5A5]">
                      Earth serves as the point of departure for all outbound missions. The documented heritage sites reside beyond low Earth orbit on the Moon and Mars.
                    </p>
                    <Link
                      to="/archive"
                      onClick={() => {
                        setActiveFilter('all');
                        playClick();
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-[#55DDF5] hover:underline"
                    >
                      BROWSE ALL OFF-WORLD SITES &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Live Reconnaissance Gallery filtered for active planet */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#55DDF5]">
              <Camera className="w-4 h-4" />
              <span>LIVE OPTICAL RECONNAISSANCE // {activePlanet.toUpperCase()}</span>
            </div>
            <span className="text-xs font-mono text-[#A5A5A5]">VERIFIED NASA / SELENE TELEMETRY</span>
          </div>

          <LivePhotoGallery
            key={activePlanet}
            initialPlanet={activePlanet === 'earth' ? 'earth' : activePlanet}
            showFilters={false}
          />
        </div>
      </div>
    </div>
  );
};
