import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { DataBadge } from '../components/ui/DataBadge';
import { LivePhotoGallery } from '../components/ui/LivePhotoGallery';
import { Globe, Shield, Sparkles, Compass, ArrowRight, Clock, Award, Camera, Radio } from 'lucide-react';
import { SpaceCanvas } from '../components/3d/SpaceCanvas';
import { Moon } from '../components/3d/Moon';
import { Mars } from '../components/3d/Mars';

export const Story: React.FC = () => {
  const storyChapters = [
    {
      id: 'chapter-1',
      number: '01',
      title: 'The Airless Sanctuary: Lunar Preservation',
      subtitle: 'Where footprints survive for millions of years',
      description:
        'On Earth, human artifacts weather away under rains, tectonic movements, hurricane winds, and bacterial decomposition. On the Moon, there is no atmosphere, no liquid water, and no plate tectonics. The bootprints pressed into the fine lunar regolith by Neil Armstrong and Buzz Aldrin in July 1969 remain crisply preserved, altered only by the infinitesimal rain of micrometeorites and cosmic solar wind.',
      details: [
        'Over 180 metric tons of human-made equipment currently rests on the Moon.',
        'Descent stages of six Apollo Lunar Modules remain locked at their original touchdown coordinates.',
        'Surveyor 3 was visited by Apollo 12 astronauts in 1969, proving that materials endure extraordinarily well in vacuum.',
      ],
      tag: 'LUNAR REGOLITH',
    },
    {
      id: 'chapter-2',
      number: '02',
      title: 'The Rust Desert: The Martian Pioneers',
      subtitle: 'Robotic geologists standing silent amidst the red dunes',
      description:
        'Mars presents a vastly different archaeological environment. Shifting winds blow red iron oxide dust across vast basins. Carbon dioxide frost condenses during freezing polar winters. Yet throughout these harsh conditions, humanity’s robotic ambassadors—from the microwave-sized Sojourner to the marathon-running Opportunity—stand intact, holding within their hardware the definitive evidence that liquid water and hot springs once graced the Red Planet.',
      details: [
        'Sojourner opened mobile Mars exploration in 1997 with its groundbreaking Rocker-Bogie suspension.',
        'Spirit scraped open 90% pure hydrothermal silica with a jammed wheel, proving ancient volcanic hot springs existed.',
        'Opportunity completed 45.16 kilometers over 14 years before a planet-encircling dust storm sealed its mission in 2018.',
      ],
      tag: 'MARTIAN CHRONICLES',
    },
    {
      id: 'chapter-3',
      number: '03',
      title: 'The Space Archaeology Mandate',
      subtitle: 'Why off-world heritage belongs to all humankind',
      description:
        'Article VIII of the 1967 Outer Space Treaty affirms that states retain jurisdiction and control over objects launched into outer space. As commercial lunar landers and new national space agencies return to the Moon through the Artemis program, the question is no longer whether we can reach these worlds, but whether we possess the ethical foresight to preserve the cradle sites of our interplanetary childhood.',
      details: [
        'The US enacted the "One Small Step to Protect Human Heritage in Space Act" in 2020.',
        'Tranquility Base, Surveyor Crater, and Meridiani Planum are considered premier space archaeology heritage sites.',
        'The archive serves to document these artifacts before active traffic increases near historical landing coordinates.',
      ],
      tag: 'PRESERVATION ETHICS',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <SectionHeading
          badge="ARCHIVAL ESSAY"
          title="The Story Behind the Silence"
          subtitle="Humanity has ventured outward, leaving mechanical footprints across celestial surfaces. Though their radios are quiet, their scientific legacies remain immortal."
        />

        {/* =========================================================================
            FEATURED LIVE ORBITAL RECONNAISSANCE PHOTOGRAPHY (USER IMAGES)
           ========================================================================= */}
        <div className="my-16 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#55DDF5]">
              <Camera className="w-4 h-4" />
              <span>LIVE ORBITAL RECONNAISSANCE PHOTOGRAPHY</span>
            </div>
            <span className="text-xs font-mono text-[#A5A5A5]">NASA / USGS / JAXA SELENE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Photo 1: User's Moon SELENE Photograph */}
            <GlassPanel cornerBorders className="p-4 sm:p-6 group">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-4 border border-[#55DDF5]/20">
                <img
                  src="/images/moon-nasa-selene.jpg"
                  alt="Full Lunar Disk by NASA / USGS / JAXA SELENE"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#0A1020]/90 px-2.5 py-1 rounded border border-[#55DDF5]/30 text-[10px] font-mono text-[#55DDF5]">
                  LIVE LUNAR ORBITAL PHOTO
                </div>
                <div className="absolute bottom-3 right-3 bg-[#05070D]/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#A5A5A5]">
                  SELENE / KAGUYA
                </div>
              </div>

              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#55DDF5] font-bold">THE MOON // NEAR-SIDE RECON</span>
                  <span className="text-[#A5A5A5] text-[10px]">100 KM ORBIT</span>
                </div>
                <h4 className="text-lg font-display font-bold text-[#E8EDF5]">
                  Full Lunar Disk & Crater Ray Telemetry
                </h4>
                <p className="text-xs text-[#E8EDF5]/70 font-light leading-relaxed">
                  Authentic high-resolution optical reconnaissance showing the basaltic maria—where Apollo 11 and Surveyor 3 remain preserved—and the brilliant Tycho impact rays spanning thousands of kilometers.
                </p>
                <div className="pt-2 border-t border-[#55DDF5]/10 flex justify-between text-[10px] text-[#A5A5A5]">
                  <span>CREDIT: NASA / USGS / JAXA / SELENE</span>
                  <span className="text-[#55DDF5]">NEAR VACUUM</span>
                </div>
              </div>
            </GlassPanel>

            {/* Live Photo 2: User's Mars & Phobos Orbital Photograph */}
            <GlassPanel cornerBorders className="p-4 sm:p-6 group">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-4 border border-[#55DDF5]/20">
                <img
                  src="/images/mars-phobos-debris.jpg"
                  alt="Mars and Phobos Orbital Debris Field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#0A1020]/90 px-2.5 py-1 rounded border border-[#D9532F]/50 text-[10px] font-mono text-[#E26D5C]">
                  LIVE MARTIAN ORBITAL PHOTO
                </div>
                <div className="absolute bottom-3 right-3 bg-[#05070D]/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#A5A5A5]">
                  NASA / JPL
                </div>
              </div>

              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#E26D5C] font-bold">MARS // PHOBOS TIDAL DISRUPTION</span>
                  <span className="text-[#A5A5A5] text-[10px]">INNER SATELLITE</span>
                </div>
                <h4 className="text-lg font-display font-bold text-[#E8EDF5]">
                  Mars & Phobos Tidal Gravitational Survey
                </h4>
                <p className="text-xs text-[#E8EDF5]/70 font-light leading-relaxed">
                  Orbital perspective capturing the irregular moon Phobos orbiting above the thin Martian atmosphere. Mars rovers Sojourner, Spirit, and Opportunity have repeatedly imaged Phobos transiting the Martian sun from the surface below.
                </p>
                <div className="pt-2 border-t border-[#55DDF5]/10 flex justify-between text-[10px] text-[#A5A5A5]">
                  <span>CREDIT: NASA / JPL-Caltech</span>
                  <span className="text-[#E26D5C]">ATMOSPHERE: 6.1 MBAR</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-12 my-20">
          {storyChapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <GlassPanel cornerBorders className="p-8 sm:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#55DDF5]">
                        {chapter.number}
                      </span>
                      <span className="h-4 w-[1px] bg-[#55DDF5]/40" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[#A5A5A5]">
                        {chapter.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5]">
                      {chapter.title}
                    </h3>

                    <p className="text-sm font-mono text-[#55DDF5] tracking-wide">
                      // {chapter.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-[#E8EDF5]/80 font-light leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Bullet points & data callouts */}
                  <div className="md:w-80 space-y-3 p-4 rounded-xl bg-[#05070D]/60 border border-[#55DDF5]/15">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#55DDF5] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#FF9F1C]" />
                      VERIFIED EVIDENCE
                    </h4>
                    <ul className="space-y-2 text-xs text-[#E8EDF5]/75 font-light">
                      {chapter.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#55DDF5] font-mono mt-0.5">&bull;</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            COMPLETE ARCHIVAL RECONNAISSANCE PHOTO GALLERY
           ========================================================================= */}
        <div className="my-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#55DDF5] block mb-1">
              ARCHIVAL RECONNAISSANCE GALLERY
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5]">
              Real Spacecraft & Orbital Photography
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] font-mono mt-1">
              Explore authentic photographs taken in situ by Apollo astronauts, Martian rovers, and planetary orbiters.
            </p>
          </div>

          <LivePhotoGallery />
        </div>

        {/* Callout quote and next step navigation */}
        <div className="my-16 text-center max-w-3xl mx-auto p-8 rounded-2xl glass-panel-glow">
          <blockquote className="text-xl sm:text-2xl font-display italic text-[#E8EDF5]">
            "We came in peace for all mankind."
          </blockquote>
          <p className="mt-2 text-xs font-mono text-[#55DDF5]">
            Apollo 11 Commemorative Plaque, Tranquility Base
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#55DDF5] text-[#05070D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#A5E9F5] transition-colors"
            >
              <span>INSPECT ALL 6 3D ARTIFACTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#55DDF5]/30 bg-[#0A1020] text-[#E8EDF5] font-mono text-xs uppercase tracking-wider hover:bg-[#101B32] transition-colors"
            >
              <span>OPEN 3D CARTOGRAPHIC MAP</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
