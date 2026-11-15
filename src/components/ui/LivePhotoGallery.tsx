import React, { useState } from 'react';
import { livePhotosCollection, LivePhoto } from '../../data/livePhotos';
import { GlassPanel } from './GlassPanel';
import { DataBadge } from './DataBadge';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import {
  Camera,
  Maximize2,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  Shield,
  Radio,
} from 'lucide-react';

interface LivePhotoGalleryProps {
  initialPlanet?: 'all' | 'moon' | 'mars' | 'earth';
  limit?: number;
  className?: string;
  showFilters?: boolean;
}

export const LivePhotoGallery: React.FC<LivePhotoGalleryProps> = ({
  initialPlanet = 'all',
  limit,
  className = '',
  showFilters = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'moon' | 'mars' | 'earth'>(initialPlanet);
  const [activePhoto, setActivePhoto] = useState<LivePhoto | null>(null);
  const { playClick, playBlip } = useSoundEffects();

  const filteredPhotos = livePhotosCollection
    .filter((p) => {
      if (selectedFilter === 'all') return true;
      return p.planet === selectedFilter;
    })
    .slice(0, limit || livePhotosCollection.length);

  const handleOpenPhoto = (photo: LivePhoto) => {
    setActivePhoto(photo);
    playBlip();
  };

  const handleClose = () => {
    setActivePhoto(null);
    playClick();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Filter Bar */}
      {showFilters && (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#55DDF5]/15 font-mono">
          <div className="flex items-center gap-2">
            {(['all', 'moon', 'mars', 'earth'] as const).map((cat) => {
              const isSelected = selectedFilter === cat;
              const count =
                cat === 'all'
                  ? livePhotosCollection.length
                  : livePhotosCollection.filter((p) => p.planet === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedFilter(cat);
                    playClick();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all border ${
                    isSelected
                      ? 'border-[#55DDF5] bg-[#55DDF5]/20 text-[#55DDF5] font-bold shadow-md shadow-[#55DDF5]/10'
                      : 'border-[#55DDF5]/15 bg-[#0A1020]/70 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
                  }`}
                >
                  {cat === 'all' ? 'ALL RECON' : cat.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A5A5A5]">
            <Radio className="w-3.5 h-3.5 text-[#55DDF5] animate-pulse" />
            <span>NASA / USGS / JAXA SELENE ARCHIVAL IMAGERY</span>
          </div>
        </div>
      )}

      {/* Grid of Live Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => {
          const isMoon = photo.planet === 'moon';
          const isMars = photo.planet === 'mars';
          return (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#55DDF5]/20 bg-[#070D1A]/85 hover:border-[#55DDF5] hover:shadow-[0_0_25px_rgba(85,221,245,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-[#05070D]">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Corner Scan Line Reticles */}
                <div className="absolute inset-2 border border-[#55DDF5]/20 pointer-events-none rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#55DDF5]" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#55DDF5]" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#55DDF5]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#55DDF5]" />
                </div>

                {/* Top Badge: World & Camera Telemetry */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-[#0A1020]/90 backdrop-blur-md border border-[#55DDF5]/30 text-[#55DDF5] font-bold uppercase">
                    {photo.planet.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#05070D]/80 backdrop-blur-md text-[#E8EDF5]/90 flex items-center gap-1">
                    <Camera className="w-3 h-3 text-[#FF9F1C]" />
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-mono text-[#55DDF5] flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    CLICK TO INSPECT METADATA &rarr;
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-2 font-mono">
                <h4 className="text-sm font-display font-bold text-[#E8EDF5] group-hover:text-[#55DDF5] transition-colors leading-snug line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-[#A5A5A5] line-clamp-2 font-light leading-relaxed">
                  {photo.subtitle}
                </p>

                <div className="pt-2 border-t border-[#55DDF5]/10 flex items-center justify-between text-[10px] text-[#A5A5A5]">
                  <span className="truncate max-w-[170px]">{photo.credit}</span>
                  <span className="text-[#55DDF5]">{photo.location.split(',')[0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Photographic Telemetry Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-[#05070D]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative max-w-5xl w-full rounded-2xl border border-[#55DDF5]/40 bg-[#070D1A] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#05070D]/80 border border-[#55DDF5]/30 text-[#E8EDF5] hover:text-[#55DDF5] hover:border-[#55DDF5] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Viewport (Left/Top) */}
            <div className="lg:w-7/12 bg-black flex items-center justify-center relative overflow-hidden group">
              <img
                src={activePhoto.imageSrc}
                alt={activePhoto.title}
                className="w-full h-full max-h-[55vh] lg:max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-3 left-3 bg-[#05070D]/80 backdrop-blur-md px-3 py-1 rounded border border-[#55DDF5]/20 text-[10px] font-mono text-[#55DDF5]">
                NASA HERITAGE LIVE CAPTURE
              </div>
            </div>

            {/* Metadata & Sensor Telemetry Panel (Right/Bottom) */}
            <div className="lg:w-5/12 p-6 sm:p-8 font-mono flex flex-col justify-between overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DataBadge
                    label="WORLD"
                    value={activePhoto.planet.toUpperCase()}
                    variant={activePhoto.planet === 'moon' ? 'lunar' : activePhoto.planet === 'mars' ? 'mars' : 'cyan'}
                  />
                  <span className="text-[10px] text-[#A5A5A5]">{activePhoto.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#E8EDF5]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#55DDF5] mt-1">
                  // {activePhoto.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#E8EDF5]/80 font-light leading-relaxed">
                  {activePhoto.description}
                </p>

                {/* Technical Telemetry Specs */}
                <div className="mt-6 p-4 rounded-xl bg-[#05070D]/80 border border-[#55DDF5]/20 space-y-2 text-xs text-[#A5A5A5]">
                  <div className="flex justify-between">
                    <span>CREDIT:</span>
                    <span className="text-[#E8EDF5] font-semibold text-right">{activePhoto.credit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LOCATION:</span>
                    <span className="text-[#55DDF5] text-right">{activePhoto.location}</span>
                  </div>
                  {activePhoto.telemetry?.coordinates && (
                    <div className="flex justify-between">
                      <span>COORDINATES:</span>
                      <span className="text-[#E8EDF5] text-right">{activePhoto.telemetry.coordinates}</span>
                    </div>
                  )}
                  {activePhoto.telemetry?.altitude && (
                    <div className="flex justify-between">
                      <span>ALTITUDE:</span>
                      <span className="text-[#E8EDF5] text-right">{activePhoto.telemetry.altitude}</span>
                    </div>
                  )}
                  {activePhoto.sensor && (
                    <div className="flex justify-between">
                      <span>SENSOR:</span>
                      <span className="text-[#FF9F1C] text-right truncate max-w-[180px]">{activePhoto.sensor}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#55DDF5]/15 flex items-center justify-between">
                <a
                  href={activePhoto.imageSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#55DDF5] hover:underline"
                >
                  <span>OPEN FULL-RESOLUTION FILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-[#55DDF5]/20 border border-[#55DDF5]/40 text-[#55DDF5] hover:bg-[#55DDF5]/30 text-xs font-bold"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
