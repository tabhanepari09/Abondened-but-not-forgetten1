import React from 'react';
import { Link } from 'react-router-dom';
import { Artifact } from '../../types';
import { Crosshair, ArrowRight, Shield, MapPin, Eye } from 'lucide-react';

interface TargetTelemetryPanelProps {
  artifact: Artifact;
  onInspect?: () => void;
}

export const TargetTelemetryPanel: React.FC<TargetTelemetryPanelProps> = ({
  artifact,
  onInspect,
}) => {
  return (
    <div className="relative w-80 sm:w-88 p-4 rounded-2xl border border-[#55DDF5]/35 bg-[#070D1A]/90 backdrop-blur-xl shadow-2xl font-mono select-none hud-corner">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#55DDF5]/20">
        <div className="flex items-center gap-1.5 text-[#55DDF5]">
          <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="text-[10px] uppercase font-bold tracking-widest">
            ACTIVE TARGET // LOCKED
          </span>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FF9F1C]">
          IN SITU
        </span>
      </div>

      {/* Target Title & Sub-header */}
      <div className="my-3">
        <h3 className="text-base font-display font-bold text-[#E8EDF5] leading-snug truncate">
          {artifact.name}
        </h3>
        <p className="text-[11px] text-[#55DDF5]/80 mt-0.5">
          {artifact.operator} • {artifact.mission}
        </p>
      </div>

      {/* Real-time Telemetry Metrics Table */}
      <div className="space-y-1.5 p-2.5 rounded-xl bg-[#05070D]/75 border border-[#55DDF5]/15 text-[10px] text-[#A5A5A5] my-2">
        <div className="flex justify-between">
          <span>COORDINATES:</span>
          <span className="text-[#55DDF5] font-semibold">
            {artifact.coordinates.latDisplay}, {artifact.coordinates.lngDisplay}
          </span>
        </div>
        <div className="flex justify-between">
          <span>SITE REGION:</span>
          <span className="text-[#E8EDF5] font-semibold truncate max-w-[150px]">
            {artifact.coordinates.siteName}
          </span>
        </div>
        <div className="flex justify-between">
          <span>SURFACE DURATION:</span>
          <span className="text-[#E8EDF5]">{artifact.operationalDuration.split('(')[0]}</span>
        </div>
        <div className="flex justify-between">
          <span>CONFIRMATION:</span>
          <span className="text-[#FF9F1C]">{artifact.statusCertainty.split('/')[0]}</span>
        </div>
      </div>

      {/* Prominent Glowing Cyan Action Button (Directly like in the user's reference image!) */}
      <div className="pt-2">
        <Link
          to={`/archive/${artifact.id}`}
          onClick={onInspect}
          className="group w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#55DDF5] to-[#A5E9F5] hover:brightness-110 text-[#05070D] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(85,221,245,0.4)] transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>INITIALIZE 3D TARGET</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
