import { useEffect, useRef } from 'react';
import { useArchiveStore } from '../store/archiveStore';

class ProceduralSpaceAudio {
  private ctx: AudioContext | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startAmbient() {
    this.initContext();
    if (!this.ctx || this.isRunning) return;

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Low frequency deep space drone (55Hz and 55.4Hz for subtle binaural beat)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(55.3, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.isRunning || !this.masterGain) return;
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
        } catch (_) {}
        this.isRunning = false;
      }, 1000);
    } catch (e) {
      console.warn(e);
    }
  }

  public playTelemetryClick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (_) {}
  }

  public playBeaconBlip() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (_) {}
  }
}

export const spaceAudio = new ProceduralSpaceAudio();

export function useSoundEffects() {
  const isAudioMuted = useArchiveStore((s) => s.isAudioMuted);
  const audioStartedRef = useRef(false);

  useEffect(() => {
    if (!isAudioMuted) {
      spaceAudio.startAmbient();
      audioStartedRef.current = true;
    } else {
      if (audioStartedRef.current) {
        spaceAudio.stopAmbient();
      }
    }
  }, [isAudioMuted]);

  return {
    playClick: () => {
      if (!isAudioMuted) spaceAudio.playTelemetryClick();
    },
    playBlip: () => {
      if (!isAudioMuted) spaceAudio.playBeaconBlip();
    }
  };
}
