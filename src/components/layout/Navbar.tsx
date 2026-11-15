import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wifi, Activity } from 'lucide-react';
import { SoundToggle } from '../ui/SoundToggle';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeUTC, setTimeUTC] = useState('');
  const location = useLocation();

  // Live UTC Space Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUTC(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MISSION', path: '/' },
    { name: 'STORY', path: '/story' },
    { name: 'WORLDS', path: '/explore' },
    { name: 'ARCHIVE', path: '/archive' },
    { name: 'MAP 3D', path: '/map' },
    { name: 'TIMELINE', path: '/timeline' },
    { name: 'EVAL', path: '/quiz' },
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? 'bg-[#040816]/90 backdrop-blur-2xl border-b border-[#55DDF5]/25 py-2.5 shadow-2xl shadow-black/90'
          : 'bg-gradient-to-b from-[#020409]/95 via-[#040816]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: NASA Worm Insignia + Mission Tag */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            {/* NASA Worm Logo SVG */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl border border-[#55DDF5]/35 bg-[#060D20]/90 group-hover:border-[#55DDF5] transition-all shadow-[0_0_20px_rgba(85,221,245,0.2)]">
              <svg className="h-4 sm:h-5 w-auto fill-[#F0F6FC] group-hover:fill-[#55DDF5] transition-colors" viewBox="0 0 110 32">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5v19.5h7.2V12.5C7.2 9.6 9.6 7.2 12.5 7.2s5.3 2.4 5.3 5.3v19.5h7.2V12.5C25 5.6 19.4 0 12.5 0zm25.8 0C31.4 0 25.8 5.6 25.8 12.5v19.5h7.2V12.5c0-2.9 2.4-5.3 5.3-5.3 2.9 0 5.3 2.4 5.3 5.3v19.5h7.2V12.5C50.8 5.6 45.2 0 38.3 0zm28.3 0C59.7 0 54.1 5.6 54.1 12.5v19.5h7.2V19.7h10.6v12.3h7.2V12.5C79.1 5.6 73.5 0 66.6 0zm-5.3 12.5c0-2.9 2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3v1.8H61.3v-1.8zm41.2-12.5C100.9 0 95.3 5.6 95.3 12.5v19.5h7.2V19.7h10.6v12.3h7.2V12.5C120.3 5.6 114.7 0 107.8 0zm-5.3 12.5c0-2.9 2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3v1.8h-10.6v-1.8z" />
              </svg>
              <div className="h-3 w-[1px] bg-[#55DDF5]/40" />
              <span className="text-[10px] tracking-widest text-[#55DDF5] uppercase font-bold">
                HERITAGE ARCHIVE
              </span>
            </div>
          </Link>

          {/* Mission System Tag */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] text-[#94A3B8] border-l border-[#55DDF5]/20 pl-4">
            <span className="text-[#55DDF5]">SYS // DS-988</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#F0F6FC]">
              <Wifi className="w-3 h-3 text-[#55DDF5] animate-pulse" />
              DSN 24.2 GHz
            </span>
          </div>
        </div>

        {/* Center: Mission Control Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-[#55DDF5]/30 bg-[#060D20]/85 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1 text-[11px] tracking-wider rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#55DDF5] text-[#020409] font-bold shadow-[0_0_15px_rgba(85,221,245,0.5)]'
                    : 'text-[#F0F6FC]/75 hover:text-[#55DDF5] hover:bg-[#0A1633]/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Live UTC Clock & Telemetry Badges */}
        <div className="flex items-center gap-3">
          {/* Live UTC Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl border border-[#55DDF5]/25 bg-[#060D20]/80 text-[11px] text-[#55DDF5]">
            <Activity className="w-3.5 h-3.5 text-[#55DDF5]" />
            <span className="font-semibold tabular-nums">{timeUTC || '12:00:00 UTC'}</span>
          </div>

          <SoundToggle />

          {/* Mobile button */}
          <Link
            to="/archive"
            className="md:hidden px-2.5 py-1 rounded-lg bg-[#55DDF5]/20 border border-[#55DDF5]/40 text-[#55DDF5] text-[10px] font-bold"
          >
            ARCHIVE
          </Link>
        </div>
      </div>
    </header>
  );
};
