import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { artifacts } from '../data/artifacts';
import { ArtifactModelViewer } from '../components/3d/ArtifactModelViewer';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { useSoundEffects } from '../hooks/useSoundEffects';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Shield,
  Award,
  BookOpen,
  Info,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export const ArtifactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playClick } = useSoundEffects();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'accomplishments' | 'science' | 'condition' | 'specs' | 'sources'
  >('overview');

  const artifact = artifacts.find((a) => a.id === id);

  if (!artifact) {
    return (
      <div className="min-h-screen bg-[#05070D] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="font-mono text-xs text-[#55DDF5]">// 404 TELEMETRY NOT FOUND</p>
          <h1 className="text-3xl font-display font-bold text-[#E8EDF5]">Artifact Not Registered</h1>
          <p className="text-sm text-[#A5A5A5]">The requested planetary hardware could not be located in the archive.</p>
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#55DDF5] text-[#05070D] font-mono text-xs font-bold uppercase tracking-wider"
          >
            &larr; Return to Archive
          </Link>
        </div>
      </div>
    );
  }

  // Next and Previous Artifact for smooth navigation
  const currentIndex = artifacts.findIndex((a) => a.id === artifact.id);
  const prevArtifact = artifacts[(currentIndex - 1 + artifacts.length) % artifacts.length];
  const nextArtifact = artifacts[(currentIndex + 1) % artifacts.length];

  const tabs = [
    { id: 'overview', label: 'OVERVIEW & HISTORY', icon: BookOpen },
    { id: 'accomplishments', label: 'ACCOMPLISHMENTS', icon: Award },
    { id: 'science', label: 'SCIENTIFIC LEGACY', icon: Sparkles },
    { id: 'condition', label: 'IN SITU STATUS', icon: Shield },
    { id: 'specs', label: 'HARDWARE SPECS', icon: Layers },
    { id: 'sources', label: 'NASA SOURCES', icon: ExternalLink },
  ] as const;

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Return to Archive */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/archive"
            onClick={playClick}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#55DDF5] hover:text-[#A5E9F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/archive/${prevArtifact.id}`}
              onClick={playClick}
              className="px-3 py-1.5 rounded border border-[#55DDF5]/20 bg-[#0A1020] hover:bg-[#101B32] text-[11px] font-mono text-[#E8EDF5] transition-colors"
              title={`Previous: ${prevArtifact.shortName}`}
            >
              &larr; {prevArtifact.shortName}
            </Link>
            <Link
              to={`/archive/${nextArtifact.id}`}
              onClick={playClick}
              className="px-3 py-1.5 rounded border border-[#55DDF5]/20 bg-[#0A1020] hover:bg-[#101B32] text-[11px] font-mono text-[#E8EDF5] transition-colors"
              title={`Next: ${nextArtifact.shortName}`}
            >
              {nextArtifact.shortName} &rarr;
            </Link>
          </div>
        </div>

        {/* Header Block */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <DataBadge
              label="WORLD"
              value={artifact.planet.toUpperCase()}
              variant={artifact.planet === 'moon' ? 'lunar' : 'mars'}
            />
            <span className="text-xs font-mono text-[#A5A5A5] px-2 py-0.5 rounded bg-[#101B32]">
              {artifact.operator} • {artifact.country}
            </span>
            <span className="text-xs font-mono text-[#F59E0B] px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10">
              {artifact.currentStatus}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#E8EDF5] tracking-tight">
            {artifact.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#A5A5A5]">
            <span className="flex items-center gap-1.5 text-[#55DDF5]">
              <MapPin className="w-3.5 h-3.5" />
              {artifact.coordinates.latDisplay}, {artifact.coordinates.lngDisplay} ({artifact.coordinates.siteName})
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Landed: {artifact.landingDate}
            </span>
            <Link
              to="/map"
              className="text-[#F59E0B] hover:underline flex items-center gap-1"
            >
              Locate on 3D Globe &rarr;
            </Link>
          </div>
        </div>

        {/* 3D Interactive Model Inspector Viewport */}
        <div className="mb-10">
          <ArtifactModelViewer artifact={artifact} />
        </div>

        {/* Information Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#55DDF5]/15 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  playClick();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'border border-[#55DDF5] bg-[#55DDF5]/20 text-[#55DDF5] font-bold shadow-md shadow-[#55DDF5]/10'
                    : 'border border-transparent hover:bg-[#101B32]/70 text-[#E8EDF5]/70 hover:text-[#E8EDF5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tab Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'overview' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-2">
                    Original Mission Objective
                  </h3>
                  <p className="text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                    {artifact.originalObjective}
                  </p>
                </div>

                <div className="border-t border-[#55DDF5]/10 pt-6">
                  <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-2">
                    Historical Significance
                  </h3>
                  <p className="text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                    {artifact.historicalSignificance}
                  </p>
                </div>

                <div className="border-t border-[#55DDF5]/10 pt-6">
                  <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-3">
                    Curated Curiosities & Key Facts
                  </h3>
                  <div className="space-y-3">
                    {artifact.interestingFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15 flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#55DDF5]/20 text-[#55DDF5] flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                          {fact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            )}

            {activeTab === 'accomplishments' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-4">
                  Documented Mission Accomplishments
                </h3>
                <div className="space-y-3">
                  {artifact.whatItAccomplished.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#55DDF5] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#E8EDF5] font-light leading-relaxed">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {activeTab === 'science' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-4">
                  Scientific Discoveries & Long-Term Contributions
                </h3>
                <div className="space-y-4">
                  {artifact.scientificContributions.map((contrib, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15 flex items-start gap-3"
                    >
                      <Sparkles className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#E8EDF5]/85 font-light leading-relaxed">
                        {contrib}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {activeTab === 'condition' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F59E0B] mb-2">
                    <Shield className="w-4 h-4" />
                    <span>IN SITU ARCHAEOLOGICAL ASSESSMENT</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#E8EDF5]">
                    Fate and Physical Condition
                  </h3>
                  <p className="mt-3 text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                    {artifact.fateAndCondition}
                  </p>
                </div>

                <div className="border-t border-[#55DDF5]/10 pt-6 space-y-3">
                  <h4 className="text-sm font-mono uppercase text-[#55DDF5]">
                    VERIFICATION INTEGRITY
                  </h4>
                  <div className="p-3.5 rounded-lg bg-[#05070D]/80 border border-[#55DDF5]/20 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#A5A5A5]">CONFIRMATION LEVEL:</span>
                    <span className="text-xs font-mono text-[#55DDF5] font-semibold">
                      {artifact.statusCertainty}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#05070D]/80 border border-[#55DDF5]/20 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#A5A5A5]">CURRENT TELEMETRY STATUS:</span>
                    <span className="text-xs font-mono text-[#F59E0B] font-semibold">
                      {artifact.currentStatus}
                    </span>
                  </div>
                </div>
              </GlassPanel>
            )}

            {activeTab === 'specs' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-display font-bold text-[#E8EDF5]">
                  Engineering Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15">
                    <span className="text-[#55DDF5] block mb-1">MASS (EARTH WEIGHT)</span>
                    <span className="text-base text-[#E8EDF5] font-semibold">{artifact.specs.massKg}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15">
                    <span className="text-[#55DDF5] block mb-1">DIMENSIONS</span>
                    <span className="text-base text-[#E8EDF5] font-semibold">{artifact.specs.dimensions}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15">
                    <span className="text-[#55DDF5] block mb-1">POWER SOURCE</span>
                    <span className="text-base text-[#E8EDF5] font-semibold">{artifact.specs.powerSource}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/15">
                    <span className="text-[#55DDF5] block mb-1">COMMUNICATION ARRAY</span>
                    <span className="text-base text-[#E8EDF5] font-semibold">{artifact.specs.communication}</span>
                  </div>
                </div>
              </GlassPanel>
            )}

            {activeTab === 'sources' && (
              <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-display font-bold text-[#E8EDF5] mb-2">
                  Official References & Source Documentation
                </h3>
                <p className="text-xs text-[#A5A5A5] font-mono mb-4">
                  All dates, coordinates, and factual statements are verified against NASA and academic archives:
                </p>
                <div className="space-y-3">
                  {artifact.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-[#05070D]/70 border border-[#55DDF5]/20 hover:border-[#55DDF5] hover:bg-[#101B32] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#55DDF5]">{ref.organization}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#E8EDF5] group-hover:text-[#55DDF5] transition-colors mt-0.5">
                          {ref.title}
                        </h4>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#55DDF5] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </GlassPanel>
            )}
          </div>

          {/* Sidebar: Location & Photographic Archives (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coordinates & Location Telemetry Card */}
            <GlassPanel cornerBorders className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#55DDF5]">
                  SITE TELEMETRY
                </span>
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
              </div>

              <div className="space-y-2 text-xs font-mono border-y border-[#55DDF5]/15 py-3">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A5]">LATITUDE:</span>
                  <span className="text-[#E8EDF5]">{artifact.coordinates.latDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A5]">LONGITUDE:</span>
                  <span className="text-[#E8EDF5]">{artifact.coordinates.lngDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A5]">SITE:</span>
                  <span className="text-[#55DDF5] font-semibold">{artifact.coordinates.siteName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A5]">REGION:</span>
                  <span className="text-[#E8EDF5]">{artifact.coordinates.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A5]">DURATION:</span>
                  <span className="text-[#E8EDF5]">{artifact.operationalDuration}</span>
                </div>
              </div>

              <Link
                to="/map"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#55DDF5]/20 hover:bg-[#55DDF5]/30 text-[#55DDF5] border border-[#55DDF5]/30 text-xs font-mono font-semibold transition-colors"
              >
                <span>OPEN 3D MAP AT THIS SITE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </GlassPanel>

            {/* In Situ Photographic Imagery */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-[#55DDF5] tracking-wider">
                HISTORICAL PHOTOGRAPHS
              </h4>
              {artifact.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-[#55DDF5]/20 bg-[#0A1020]/80 group"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <p className="text-xs text-[#E8EDF5]/80 font-light leading-snug">
                      {img.caption}
                    </p>
                    <p className="mt-1 text-[10px] font-mono text-[#A5A5A5]">
                      CREDIT: {img.credit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
