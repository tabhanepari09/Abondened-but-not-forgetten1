import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { timelineEvents } from '../data/timeline';
import { Link } from 'react-router-dom';
import { useSoundEffects } from '../hooks/useSoundEffects';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
} from 'lucide-react';

export const Timeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('evt-apollo-11');
  const [filterPlanet, setFilterPlanet] = useState<'all' | 'moon' | 'mars'>('all');
  const { playClick } = useSoundEffects();

  const filteredEvents = timelineEvents.filter((e) => {
    if (filterPlanet === 'all') return true;
    return e.planet === filterPlanet;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    playClick();
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CHRONOLOGY OF PRESENCE"
          title="Mission Heritage Timeline"
          subtitle="A verified chronological sequence of human landings, robotic milestones, off-world traverses, and modern space preservation milestones from 1967 to the present."
        />

        {/* Filter Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4 my-8 pb-4 border-b border-[#55DDF5]/15">
          <div className="flex items-center gap-2">
            {(['all', 'moon', 'mars'] as const).map((fp) => {
              const isSelected = filterPlanet === fp;
              return (
                <button
                  key={fp}
                  onClick={() => {
                    setFilterPlanet(fp);
                    playClick();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors border ${
                    isSelected
                      ? 'border-[#55DDF5] bg-[#55DDF5]/15 text-[#55DDF5] font-bold'
                      : 'border-[#55DDF5]/20 bg-[#0A1020]/70 text-[#E8EDF5]/70 hover:border-[#55DDF5]/40 hover:text-[#E8EDF5]'
                  }`}
                >
                  {fp === 'all' ? 'ALL EVENTS' : fp.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#A5A5A5]">
            SHOWING {filteredEvents.length} KEY MILESTONES
          </div>
        </div>

        {/* Vertical Timeline with Central Connection Line */}
        <div className="relative border-l-2 border-[#55DDF5]/20 ml-4 sm:ml-32 my-12 space-y-10">
          {filteredEvents.map((event, index) => {
            const isExpanded = expandedId === event.id;
            const isMoon = event.planet === 'moon';
            const isMars = event.planet === 'mars';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline Dot Node */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    isMoon
                      ? 'border-[#55DDF5] bg-[#05070D]'
                      : isMars
                      ? 'border-[#D9532F] bg-[#05070D]'
                      : 'border-[#F59E0B] bg-[#05070D]'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full m-0.5 ${
                      isMoon ? 'bg-[#55DDF5]' : isMars ? 'bg-[#D9532F]' : 'bg-[#F59E0B]'
                    }`}
                  />
                </div>

                {/* Left Floating Year Tag (desktop) */}
                <div className="hidden sm:block absolute -left-28 top-1 w-20 text-right font-display font-bold text-lg text-[#55DDF5]">
                  {event.year}
                </div>

                {/* Event Card */}
                <GlassPanel
                  cornerBorders
                  className="cursor-pointer hover:border-[#55DDF5]/50 transition-all p-5"
                  onClick={() => toggleExpand(event.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-display font-bold text-base text-[#55DDF5]">
                        {event.year} •
                      </span>
                      <span className="text-xs font-mono text-[#A5A5A5] uppercase tracking-wider">
                        {event.exactDate}
                      </span>
                      <span className="text-xs font-mono text-[#55DDF5]">
                        // {event.operator}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DataBadge
                        label="TARGET"
                        value={event.planet.toUpperCase()}
                        variant={event.planet === 'moon' ? 'lunar' : event.planet === 'mars' ? 'mars' : 'amber'}
                      />
                      <span className="text-xs text-[#A5A5A5]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#E8EDF5] group-hover:text-[#55DDF5] transition-colors">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#E8EDF5]/75 font-light leading-relaxed">
                    {event.description}
                  </p>

                  {/* Expandable Significance & Detail */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-3 border-t border-[#55DDF5]/15 space-y-3"
                    >
                      <div className="p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15">
                        <span className="text-[10px] font-mono uppercase text-[#F59E0B] block mb-1">
                          HISTORICAL SIGNIFICANCE
                        </span>
                        <p className="text-xs text-[#E8EDF5]/90 font-light">
                          {event.significance}
                        </p>
                      </div>

                      {event.artifactId && (
                        <div className="flex justify-end pt-1">
                          <Link
                            to={`/archive/${event.artifactId}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              playClick();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#55DDF5] hover:underline"
                          >
                            <span>INSPECT ARTIFACT IN 3D</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
