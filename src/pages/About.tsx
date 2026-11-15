import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Globe, Shield, Sparkles, BookOpen, Heart, ExternalLink, Code } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="PROJECT MANDATE"
          title="About 'After the Footprints'"
          subtitle="An interactive digital museum built for the NASA Space Apps Challenge, dedicated to the recognition, appreciation, and preservation of off-world exploration artifacts."
        />

        {/* The Core Philosophy */}
        <GlassPanel cornerBorders className="p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#55DDF5]">
            <Sparkles className="w-4 h-4" />
            <span>THE PHILOSOPHY & INSPIRATION</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5]">
            "The mission may end, but its footprint remains."
          </h3>

          <p className="text-sm sm:text-base text-[#E8EDF5]/80 font-light leading-relaxed">
            In July 1969, humanity left its first physical imprint in the lunar regolith. Since then, robotic orbiters, landers, and rovers have traversed uncharted valleys on Mars and hammered into lunar stone. When telemetry ceases and radio receivers grow cold, popular media often concludes that the mission has ended.
          </p>

          <p className="text-sm sm:text-base text-[#E8EDF5]/80 font-light leading-relaxed">
            <strong className="text-[#55DDF5] font-semibold">After the Footprints</strong> reframes this perspective. The cessation of electrical signals does not erase human ingenuity. These landing stages, wheel impressions, drill holes, and solar panels are the archaeological cradles of human space travel. They are permanent off-world monuments that belong to all humankind.
          </p>
        </GlassPanel>

        {/* Why Space Heritage Preservation Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#55DDF5]/10 border border-[#55DDF5]/30 flex items-center justify-center text-[#55DDF5]">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-display font-bold text-[#E8EDF5]">
              The Space Heritage Challenge
            </h4>
            <p className="text-xs sm:text-sm text-[#E8EDF5]/75 font-light leading-relaxed">
              With commercial lunar landers scheduled and the international Artemis accords taking shape, traffic around historical landing coordinates will inevitably surge. Rocket exhaust plumes and regolith blast-back risk scouring or burying irreplaceable Apollo and Surveyor hardware if protective buffer zones are not recognized worldwide.
            </p>
          </GlassPanel>

          <GlassPanel cornerBorders className="p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-display font-bold text-[#E8EDF5]">
              Educational & Scientific Mission
            </h4>
            <p className="text-xs sm:text-sm text-[#E8EDF5]/75 font-light leading-relaxed">
              By combining real-time 3D Three.js rendering with verified NASA orbital imaging coordinates, this archive serves educators, students, researchers, and space enthusiasts, making off-world history tangible, interactive, and universally accessible.
            </p>
          </GlassPanel>
        </div>

        {/* Technology Architecture */}
        <GlassPanel cornerBorders className="p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#55DDF5]">
            <Code className="w-4 h-4" />
            <span>TECHNICAL ARCHITECTURE</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#E8EDF5]">
            Built with Modern Web Technologies
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15">
              <span className="text-[#55DDF5] block">3D ENGINE</span>
              <span className="text-[#E8EDF5] font-semibold">Three.js + R3F + Drei</span>
            </div>
            <div className="p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15">
              <span className="text-[#55DDF5] block">FRAMEWORK</span>
              <span className="text-[#E8EDF5] font-semibold">React 18 + Vite + TS</span>
            </div>
            <div className="p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15">
              <span className="text-[#55DDF5] block">ANIMATION</span>
              <span className="text-[#E8EDF5] font-semibold">Motion + GSAP</span>
            </div>
            <div className="p-3 rounded-lg bg-[#05070D]/70 border border-[#55DDF5]/15">
              <span className="text-[#55DDF5] block">AUDIO ENGINE</span>
              <span className="text-[#E8EDF5] font-semibold">Synthesized Web Audio</span>
            </div>
          </div>
        </GlassPanel>

        {/* Attribution & Sources */}
        <GlassPanel cornerBorders className="p-8 space-y-6">
          <h3 className="text-xl font-display font-bold text-[#E8EDF5]">
            Data Sources & Imagery Attribution
          </h3>
          <p className="text-xs text-[#A5A5A5] font-mono">
            All factual claims, planetary parameters, and landing site coordinates are strictly sourced from verified official archives:
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-[#E8EDF5]/80 font-light">
            <li className="flex items-start gap-2">
              <span className="text-[#55DDF5] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>NASA Lunar Reconnaissance Orbiter Camera (LROC):</strong> Arizona State University School of Earth and Space Exploration. High-resolution orbital coordinates of Apollo 11, Surveyor 3, and Apollo 15 LRV.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#55DDF5] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>NASA Jet Propulsion Laboratory (JPL):</strong> Mars Exploration Rover Mission Archive (Spirit & Opportunity) and Mars Pathfinder Sojourner telemetry.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#55DDF5] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>NASA High Resolution Imaging Science Experiment (HiRISE):</strong> University of Arizona planetary orbital confirmation of Mars surface hardware.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#55DDF5] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>United Nations Office for Outer Space Affairs (UNOOSA):</strong> 1967 Treaty on Principles Governing the Activities of States in the Exploration and Use of Outer Space.
              </span>
            </li>
          </ul>
        </GlassPanel>

        {/* Memorable Closing Banner */}
        <div className="text-center p-10 rounded-2xl glass-panel-glow space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[#55DDF5]">
            THE TIMELESS TRUTH
          </p>
          <blockquote className="text-2xl sm:text-3xl font-display font-bold text-[#E8EDF5] italic max-w-2xl mx-auto leading-relaxed">
            "The missions may be silent, but the evidence of exploration remains."
          </blockquote>
          <p className="text-xs font-mono text-[#A5A5A5] pt-2">
            AFTER THE FOOTPRINTS • A DIGITAL TRIBUTE TO HUMAN CURIOSITY
          </p>
        </div>
      </div>
    </div>
  );
};
