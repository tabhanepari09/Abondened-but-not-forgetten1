import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useArchiveStore } from '../../store/archiveStore';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const SoundToggle: React.FC = () => {
  const isAudioMuted = useArchiveStore((s) => s.isAudioMuted);
  const toggleAudio = useArchiveStore((s) => s.toggleAudio);
  const { playClick } = useSoundEffects();

  const handleToggle = () => {
    toggleAudio();
    playClick();
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#55DDF5]/20 bg-[#0A1020]/80 hover:bg-[#101B32] hover:border-[#55DDF5]/50 text-xs font-mono transition-all duration-200"
      title={isAudioMuted ? 'Enable Ambient Deep Space Sound' : 'Mute Sound'}
      aria-label="Toggle ambient sound"
    >
      {isAudioMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#A5A5A5]" />
          <span className="text-[#A5A5A5] hidden sm:inline">AUDIO: MUTED</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#55DDF5] animate-pulse" />
          <span className="text-[#55DDF5] hidden sm:inline">AUDIO: LIVE</span>
        </>
      )}
    </button>
  );
};
