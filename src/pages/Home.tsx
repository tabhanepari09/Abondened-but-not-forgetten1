import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, MapPin, Radio, Sparkles, Eye, Layers, Camera, Server } from 'lucide-react';
import { SpaceCanvas } from '../components/3d/SpaceCanvas';
import { Moon } from '../components/3d/Moon';
import { Mars } from '../components/3d/Mars';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { artifacts } from '../data/artifacts';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ArcGauge } from '../components/hud/ArcGauge';
import { SegmentedMeter } from '../components/hud/SegmentedMeter';
import { TargetTelemetryPanel } from '../components/hud/TargetTelemetryPanel';
import { MissionDockStrip } from '../components/hud/MissionDockStrip';
import { LivePhotoGallery } from '../components/ui/LivePhotoGallery';
import { api } from '../services/api';
import { LiveTelemetry } from '../types';

export const Home: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0]); // Apollo 11 default
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [telemetry, setTelemetry] = useState<LiveTelemetry | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const { playClick } = useSoundEffects();

  useEffect(() => {
    // Fetch live telemetry from FastAPI backend
    api.getLiveTelemetry().then((t) => {
      setTelemetry(t);
    });
    api.checkBackendStatus().then((res) => {
      setBackendOnline(res.online);
    });

    const interval = setInterval(() => {
      api.getLiveTelemetry().then((t) => setTelemetry(t));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isMoon = selectedArtifact.planet === 'moon';

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden text-[#F0F6FC]">
      {/* =========================================================================
          COCKPIT 3D OBSERVATORY VIEWPORT (MATCHING USER REFERENCE IMAGE)
         ========================================================================= */}
      <div className="relative w-full h-screen min-h-[720px] flex flex-col justify-between overflow-hidden">
        {/* Full-bleed 3D Canvas with Realistic Solar Flare & Deep Space Backdrop */}
        <div className="absolute inset-0 z-0">
          <SpaceCanvas cameraPosition={[0, 0, 4.6]} fov={45}>
            <ambientLight intensity={0.25} />
            {/* Cinematic Solar Flare Point Light */}
            <pointLight position={[5, 4, -2]} intensity={5.5} color="#fff8e7" />
            <directionalLight position={[6, 3, 5]} intensity={2.2} color="#fffcf2" />
            <directionalLight position={[-7, -3, -5]} intensity={0.4} color="#55ddf5" />

            {/* Render 3D celestial world depending on selected artifact */}
            {isMoon ? (
              <Moon radius={1.9} rotationSpeed={isAutoRotating ? 0.04 : 0} />
            ) : (
              <Mars radius={1.9} rotationSpeed={isAutoRotating ? 0.05 : 0} />
            )}
          </SpaceCanvas>

          {/* Sunburst Glare Lens Flare (As seen in the top center of the reference image!) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-amber-100/20 via-cyan-200/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/30 blur-2xl pointer-events-none" />

          {/* Vignette & Tactical Grid Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05070D]/40 to-[#05070D]/90 pointer-events-none" />
          <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
        </div>

        {/* Top Cockpit Header Buffer (Below main navbar) */}
        <div className="relative z-10 pt-24 px-4 sm:px-8 max-w-[1600px] mx-auto w-full flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#0A1020]/90 border border-[#55DDF5]/30 text-[#55DDF5]">
              LIVE OBSERVATORY // {selectedArtifact.planet.toUpperCase()}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#A5A5A5] px-2 py-0.5 rounded bg-[#101B32]/70">
              TARGET LOCK: {selectedArtifact.shortName}
            </span>
            {telemetry && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-mono text-[#55DDF5] px-2.5 py-0.5 rounded bg-[#101B32]/90 border border-[#55DDF5]/25">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>{telemetry.dsnStation.split('(')[0].trim()}</span>
                <span className="text-emerald-400 font-semibold">{telemetry.signalStrengthDbm} dBm</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded border ${backendOnline ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400' : 'border-[#55DDF5]/20 bg-[#0A1020]/80 text-[#55DDF5]'
              }`}>
              <Server className="w-3 h-3" />
              <span>{backendOnline ? 'FASTAPI ONLINE' : 'API READY'}</span>
            </span>
            <Link
              to="/archive"
              className="px-3 py-1 rounded-lg border border-[#55DDF5]/30 bg-[#0A1020]/80 hover:bg-[#101B32] text-xs font-mono text-[#55DDF5] transition-colors"
            >
              FULL ARCHIVE &rarr;
            </Link>
          </div>
        </div>

        {/* Center Cockpit Stage: Left Floating Gauges + Right Target Card */}
        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 sm:px-8 my-auto flex items-center justify-between pointer-events-none">
          {/* Left HUD Column: Arc Gauge & Segmented Meter (Matches user image left side!) */}
          <div className="hidden md:flex flex-col gap-3 pointer-events-auto">
            <ArcGauge
              label="GRAV POTENTIAL"
              value={isMoon ? '1.62' : '3.72'}
              unit="m/s²"
              percentage={isMoon ? 45 : 72}
              statusText={isMoon ? '0.166 G' : '0.380 G'}
            />

            <SegmentedMeter
              label="DSN RELAY POWER"
              level={8}
              maxLevel={10}
              unit="%"
            />

            {/* Mineral Spectral Analysis Pill */}
            <div className="w-40 p-2.5 rounded-xl border border-[#55DDF5]/20 bg-[#0A1020]/80 backdrop-blur-md text-[9px] font-mono text-[#A5A5A5] space-y-1">
              <span className="text-[#55DDF5] block uppercase font-bold">SPECTRAL REGOLITH</span>
              <div className="flex justify-between">
                <span>BASALT:</span>
                <span className="text-[#E8EDF5]">64.2%</span>
              </div>
              <div className="flex justify-between">
                <span>ANORTHOSITE:</span>
                <span className="text-[#E8EDF5]">28.6%</span>
              </div>
            </div>
          </div>

          {/* Right HUD Column: Active Target Telemetry Panel (Matches user image top right!) */}
          <div className="pointer-events-auto ml-auto">
            <TargetTelemetryPanel artifact={selectedArtifact} />
          </div>
        </div>

        {/* Bottom Cockpit Deck: Vehicle Carousel Dock + Gyroscope (Matches user image bottom dock!) */}
        <div className="relative z-20 pb-4 w-full">
          <MissionDockStrip
            selectedArtifactId={selectedArtifact.id}
            onSelectArtifact={(art) => setSelectedArtifact(art)}
            isAutoRotating={isAutoRotating}
            onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
          />
        </div>
      </div>

      {/* =========================================================================
          PAGE 1 EDITORIAL SECTION: THE ARCHIVE MISSION & ESSENTIAL METRICS
         ========================================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-[#55DDF5]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Manifesto Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#55DDF5]">
              <span className="w-2 h-2 rounded-full bg-[#55DDF5] animate-ping" />
              <span>THE PHILOSOPHICAL FOUNDATION</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#E8EDF5] leading-tight">
              "The mission may end, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55DDF5] via-[#A5E9F5] to-[#E8EDF5]">
                but its footprint remains."
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#E8EDF5]/80 font-light leading-relaxed">
              When communication ceases and mission control issues its final command, popular media often concludes that the story is over. But across the airless basalt of the Moon and the rusted dunes of Mars, humanity’s technological ambassadors stand untouched by rain or rust—silent monuments to our greatest journeys.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/archive"
                onClick={playClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#55DDF5] hover:bg-[#A5E9F5] text-[#05070D] font-mono text-xs font-bold tracking-wider transition-all duration-200 shadow-lg shadow-[#55DDF5]/25"
              >
                <span>ENTER THE 6 ARTIFACT 3D ARCHIVE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/map"
                onClick={playClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#55DDF5]/30 bg-[#0A1020]/80 hover:bg-[#101B32] text-[#E8EDF5] font-mono text-xs font-semibold tracking-wider transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#FF9F1C]" />
                <span>3D CARTOGRAPHIC GLOBES</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <GlassPanel cornerBorders className="p-5">
              <span className="text-[10px] font-mono uppercase text-[#55DDF5] block mb-1">
                IN SITU ARTIFACTS
              </span>
              <div className="text-3xl font-display font-bold text-[#E8EDF5]">6 Verified</div>
              <p className="text-[11px] text-[#A5A5A5] font-mono mt-1">Direct LRO / MRO Imaged</p>
            </GlassPanel>

            <GlassPanel cornerBorders className="p-5">
              <span className="text-[10px] font-mono uppercase text-[#55DDF5] block mb-1">
                LUNAR DISTANCE
              </span>
              <div className="text-3xl font-display font-bold text-[#E8EDF5]">384,400</div>
              <p className="text-[11px] text-[#A5A5A5] font-mono mt-1">Kilometers from Earth</p>
            </GlassPanel>

            <GlassPanel cornerBorders className="p-5">
              <span className="text-[10px] font-mono uppercase text-[#FF9F1C] block mb-1">
                RECORD TRAVERSE
              </span>
              <div className="text-3xl font-display font-bold text-[#E8EDF5]">45.16 km</div>
              <p className="text-[11px] text-[#A5A5A5] font-mono mt-1">Opportunity (Meridiani)</p>
            </GlassPanel>

            <GlassPanel cornerBorders className="p-5">
              <span className="text-[10px] font-mono uppercase text-[#FF9F1C] block mb-1">
                CHRONOLOGY
              </span>
              <div className="text-3xl font-display font-bold text-[#E8EDF5]">1967 – Pres.</div>
              <p className="text-[11px] text-[#A5A5A5] font-mono mt-1">55+ Years of Relics</p>
            </GlassPanel>
          </div>
        </div>

        {/* =========================================================================
            LIVE ORBITAL RECONNAISSANCE SECTION (FEATURING USER UPLOADS & NASA PHOTOS)
           ========================================================================= */}
        <div className="mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#55DDF5] mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>LIVE RECONNAISSANCE PHOTOGRAPHY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5]">
                Authentic Planetary Optical Telemetry
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#A5A5A5] font-mono">
                Real captures from NASA, USGS, and JAXA SELENE tracking lunar impact rays and the Martian orbital environment.
              </p>
            </div>
            <Link
              to="/story"
              className="mt-4 md:mt-0 text-xs font-mono text-[#55DDF5] hover:underline flex items-center gap-1"
            >
              <span>EXPLORE ALL HISTORICAL ARCHIVES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <LivePhotoGallery limit={6} />
        </div>

        {/* =========================================================================
            FEATURED 6 IN SITU ARTIFACTS CARDS
           ========================================================================= */}
        <div className="mt-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#55DDF5] block mb-1">
                CATALOG OF RELICS
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5]">
                Six Documented Landmarks
              </h3>
            </div>
            <Link
              to="/archive"
              className="text-xs font-mono text-[#55DDF5] hover:underline flex items-center gap-1"
            >
              <span>VIEW FULL SPECIFICATIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.map((art) => (
              <GlassPanel key={art.id} cornerBorders className="p-6 flex flex-col justify-between group hover:border-[#55DDF5]/50 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <DataBadge
                      label="WORLD"
                      value={art.planet.toUpperCase()}
                      variant={art.planet === 'moon' ? 'lunar' : 'mars'}
                    />
                    <span className="text-[#FF9F1C]">{art.currentStatus.split('/')[0]}</span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-[#E8EDF5] group-hover:text-[#55DDF5] transition-colors">
                    {art.name}
                  </h4>

                  <p className="text-xs text-[#E8EDF5]/70 font-light mt-2 line-clamp-3">
                    {art.originalObjective}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#55DDF5]/10 space-y-1 text-xs font-mono text-[#A5A5A5]">
                    <div className="flex justify-between">
                      <span>SITE:</span>
                      <span className="text-[#55DDF5]">{art.coordinates.siteName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COORDINATES:</span>
                      <span className="text-[#E8EDF5]">{art.coordinates.latDisplay}, {art.coordinates.lngDisplay}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#55DDF5]/10 flex items-center justify-between">
                  <Link
                    to={`/archive/${art.id}`}
                    onClick={playClick}
                    className="flex items-center gap-1 text-xs font-mono text-[#55DDF5] hover:underline"
                  >
                    <span>INSPECT 3D MODEL</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedArtifact(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      playClick();
                    }}
                    className="text-xs font-mono text-[#A5A5A5] hover:text-[#E8EDF5]"
                  >
                    FOCUS COCKPIT &uarr;
                  </button>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
