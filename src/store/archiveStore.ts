import { create } from 'zustand';
import { PlanetId } from '../types';

interface ArchiveState {
  activePlanet: PlanetId;
  selectedArtifactId: string | null;
  activeFilter: 'all' | 'moon' | 'mars';
  isAudioMuted: boolean;
  isHUDVisible: boolean;
  highQuality3D: boolean;
  selectedHotspotId: string | null;
  cameraTargetDistance: number;
  
  // Actions
  setActivePlanet: (planet: PlanetId) => void;
  setSelectedArtifactId: (id: string | null) => void;
  setActiveFilter: (filter: 'all' | 'moon' | 'mars') => void;
  toggleAudio: () => void;
  toggleHUD: () => void;
  toggleQuality: () => void;
  setSelectedHotspotId: (id: string | null) => void;
  setCameraTargetDistance: (dist: number) => void;
}

export const useArchiveStore = create<ArchiveState>((set) => ({
  activePlanet: 'moon',
  selectedArtifactId: null,
  activeFilter: 'all',
  isAudioMuted: true,
  isHUDVisible: true,
  highQuality3D: true,
  selectedHotspotId: null,
  cameraTargetDistance: 4,

  setActivePlanet: (planet) => set({ activePlanet: planet }),
  setSelectedArtifactId: (id) => set({ selectedArtifactId: id, selectedHotspotId: null }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
  toggleHUD: () => set((state) => ({ isHUDVisible: !state.isHUDVisible })),
  toggleQuality: () => set((state) => ({ highQuality3D: !state.highQuality3D })),
  setSelectedHotspotId: (id) => set({ selectedHotspotId: id }),
  setCameraTargetDistance: (dist) => set({ cameraTargetDistance: dist }),
}));
