import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { artifacts } from '../../data/artifacts';
import { getMoonTexture, getMarsTexture } from './proceduralTextures';
import { Artifact } from '../../types';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';

interface PlanetaryMapViewerProps {
  planet: 'moon' | 'mars';
  onSelectArtifact?: (artifact: Artifact) => void;
  selectedArtifactId?: string | null;
}

// Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

const PlanetGlobe: React.FC<{
  planet: 'moon' | 'mars';
  radius: number;
  selectedArtifact: Artifact | null;
  onSelect: (art: Artifact) => void;
}> = ({ planet, radius, selectedArtifact, onSelect }) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const [liveTexture, setLiveTexture] = useState<THREE.Texture | null>(null);

  // Load live user images as planetary texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const imagePath = planet === 'moon' ? '/images/moon-nasa-selene.jpg' : '/images/mars-phobos-debris.jpg';
    loader.load(
      imagePath,
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        setLiveTexture(tex);
      },
      undefined,
      () => {
        setLiveTexture(planet === 'moon' ? getMoonTexture() : getMarsTexture());
      }
    );
  }, [planet]);

  const relevantArtifacts = useMemo(() => artifacts.filter((a) => a.planet === planet), [planet]);
  const activeTexture = liveTexture || (planet === 'moon' ? getMoonTexture() : getMarsTexture());

  // Subtle continuous rotation unless inspecting a selected artifact
  useFrame((_, delta) => {
    if (globeRef.current && !selectedArtifact) {
      globeRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Planetary Sphere Textured with Real Live Image */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={activeTexture}
          roughness={planet === 'moon' ? 0.88 : 0.82}
          metalness={0.08}
        />
      </mesh>

      {/* Surface Markers */}
      {relevantArtifacts.map((art) => {
        const pos = latLngToVector3(art.coordinates.lat, art.coordinates.lng, radius * 1.015);
        const isSelected = selectedArtifact?.id === art.id;

        return (
          <group key={art.id} position={pos}>
            {/* Glowing marker dot */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(art);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.08 : 0.05, 16, 16]} />
              <meshBasicMaterial color={planet === 'moon' ? '#55DDF5' : '#FF9F1C'} />
            </mesh>

            {/* Pulsing Beacon Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.07, 0.12, 24]} />
              <meshBasicMaterial
                color={planet === 'moon' ? '#55DDF5' : '#FF9F1C'}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Interactive HTML Annotation Tag */}
            <Html distanceFactor={10} position={[0, 0.15, 0]} center>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(art);
                }}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-wider backdrop-blur-md transition-all whitespace-nowrap ${
                  isSelected
                    ? 'border-[#55DDF5] bg-[#0A1020]/95 text-[#55DDF5] ring-2 ring-[#55DDF5]/40 scale-110 shadow-lg shadow-[#55DDF5]/20'
                    : 'border-[#55DDF5]/30 bg-[#0A1020]/80 text-[#E8EDF5] hover:border-[#55DDF5] hover:text-[#55DDF5]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-[#55DDF5] animate-ping' : 'bg-[#55DDF5]'
                  }`}
                />
                <span>{art.shortName}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const PlanetaryMapViewer: React.FC<PlanetaryMapViewerProps> = ({
  planet,
  onSelectArtifact,
  selectedArtifactId,
}) => {
  const [internalSelected, setInternalSelected] = useState<Artifact | null>(() => {
    return artifacts.find((a) => a.id === selectedArtifactId) || null;
  });

  const selected = internalSelected;

  const handleSelect = (art: Artifact) => {
    setInternalSelected(art);
    onSelectArtifact?.(art);
  };

  return (
    <div className="relative w-full h-[600px] sm:h-[680px] rounded-3xl overflow-hidden border-2 border-[#55DDF5]/25 bg-[#05070D]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 3, 5]} intensity={2.0} color="#fffcf5" />
        <directionalLight position={[-6, -2, -4]} intensity={0.35} color="#55ddf5" />
        <Stars radius={80} count={2500} factor={3} fade />

        <PlanetGlobe
          planet={planet}
          radius={1.75}
          selectedArtifact={selected}
          onSelect={handleSelect}
        />

        <OrbitControls
          enablePan={false}
          minDistance={2.4}
          maxDistance={7}
          rotateSpeed={0.6}
          zoomSpeed={0.8}
        />
      </Canvas>

      {/* Top Left Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#55DDF5]/30 bg-[#0A1020]/90 backdrop-blur-md text-xs font-mono">
          <MapPin className="w-3.5 h-3.5 text-[#55DDF5]" />
          <span className="text-[#55DDF5] uppercase font-semibold">
            {planet.toUpperCase()} CARTOGRAPHIC GRID
          </span>
          <span className="text-[#A5A5A5] text-[10px]">// LIVE ORBITAL TEXTURE</span>
        </div>
      </div>

      {/* Top Right Instructions */}
      <div className="absolute top-4 right-4 z-10 hidden sm:block pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg border border-[#55DDF5]/15 bg-[#0A1020]/75 backdrop-blur-md text-[11px] font-mono text-[#A5A5A5]">
          Drag to rotate globe • Scroll to zoom • Click markers
        </div>
      </div>

      {/* Bottom Floating Target Data Card */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-10">
          <div className="p-4 rounded-2xl border border-[#55DDF5]/40 bg-[#0A1020]/95 backdrop-blur-xl shadow-2xl hud-corner font-mono">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#55DDF5]">
                  SELECTED SITE // {selected.planet.toUpperCase()}
                </span>
                <h4 className="text-base font-display font-bold text-[#E8EDF5] leading-snug">
                  {selected.name}
                </h4>
              </div>
              <button
                onClick={() => setInternalSelected(null)}
                className="text-xs text-[#A5A5A5] hover:text-[#E8EDF5] px-1 font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-[#A5A5A5] my-3 border-y border-[#55DDF5]/15 py-2">
              <div className="flex justify-between">
                <span>COORDINATES:</span>
                <span className="text-[#55DDF5]">
                  {selected.coordinates.latDisplay}, {selected.coordinates.lngDisplay}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SITE NAME:</span>
                <span className="text-[#E8EDF5]">{selected.coordinates.siteName}</span>
              </div>
              <div className="flex justify-between">
                <span>LANDING DATE:</span>
                <span className="text-[#E8EDF5]">{selected.landingDate.split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-[#FF9F1C]">{selected.currentStatus}</span>
              </div>
            </div>

            <Link
              to={`/archive/${selected.id}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#55DDF5]/20 hover:bg-[#55DDF5]/30 text-[#55DDF5] border border-[#55DDF5]/40 text-xs font-semibold transition-colors"
            >
              <span>ENTER FULL 3D INSPECTOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
