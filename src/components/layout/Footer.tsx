import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-transparent border-t border-[#55DDF5]/20 pt-16 pb-12 overflow-hidden font-mono">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core quote banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 p-8 rounded-3xl glass-panel-glow hud-corner">
          <p className="text-xs uppercase tracking-widest text-[#55DDF5] mb-3 font-bold">
            HERITAGE PRESERVATION AXIOM
          </p>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#F0F6FC] italic leading-relaxed">
            "The mission may end, but its footprint remains."
          </blockquote>
          <p className="mt-4 text-xs text-[#94A3B8]">
            "The missions may be silent, but the evidence of exploration remains."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#55DDF5] shadow-[0_0_12px_#55DDF5]" />
              <span className="font-display font-bold tracking-wider text-lg text-[#F0F6FC]">
                AFTER THE FOOTPRINTS
              </span>
            </div>
            <p className="text-sm text-[#F0F6FC]/70 max-w-md font-light leading-relaxed">
              An interactive digital archive dedicated to documenting, contextualizing, and advocating for the preservation of humanity’s robotic and human exploration artifacts across the Solar System.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-2">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#55DDF5]" /> Earth • Moon • Mars
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FF9F1C]" /> Outer Space Treaty 1967
              </span>
            </div>
          </div>

          {/* Archive navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#55DDF5] mb-4 font-bold">
              ARCHIVE MODULES
            </h4>
            <ul className="space-y-2 text-sm text-[#F0F6FC]/70">
              <li>
                <Link to="/story" className="hover:text-[#55DDF5] transition-colors">
                  The Story & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#55DDF5] transition-colors">
                  Explore Planetary Bodies
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[#55DDF5] transition-colors">
                  Documented Artifacts (6)
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#55DDF5] transition-colors">
                  Interactive 3D Planetary Map
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-[#55DDF5] transition-colors">
                  Chronological Timeline
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-[#55DDF5] transition-colors">
                  Mission-Control Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Trusted Data Sources */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#55DDF5] mb-4 font-bold">
              OFFICIAL SOURCES
            </h4>
            <ul className="space-y-2 text-sm text-[#F0F6FC]/70">
              <li>
                <a
                  href="https://www.nasa.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#55DDF5] transition-colors"
                >
                  NASA Official Portal <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://mars.nasa.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#55DDF5] transition-colors"
                >
                  NASA Mars Exploration <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://lroc.sese.asu.edu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#55DDF5] transition-colors"
                >
                  LROC Lunar Imagery <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.uahirise.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#55DDF5] transition-colors"
                >
                  HiRISE Mars Imagery <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="border-t border-[#55DDF5]/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© 2026 AFTER THE FOOTPRINTS • Built for NASA Space Apps & Space Heritage Education.</p>
          <p className="flex items-center gap-1 text-[#55DDF5]">
            <Sparkles className="w-3.5 h-3.5" /> 3D WebGL Realtime Engine
          </p>
        </div>
      </div>
    </footer>
  );
};
