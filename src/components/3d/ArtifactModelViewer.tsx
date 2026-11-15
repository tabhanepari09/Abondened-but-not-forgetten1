import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Artifact, Hotspot } from '../../types';
import { ApolloLunarModule } from './models/ApolloLunarModule';
import { Surveyor3 } from './models/Surveyor3';
import { LunarRover } from './models/LunarRover';
import { SojournerRover } from './models/SojournerRover';
import { SpiritRover, OpportunityRover } from './models/SpiritRover';
import { RotateCcw, Info, Sparkles, Crosshair, Compass, Shield } from 'lucide-react';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

interface ArtifactModelViewerProps {
  artifact: Artifact;
}

export const ArtifactModelViewer: React.FC<ArtifactModelViewerProps> = ({ artifact }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const controlsRef = useRef<OrbitControlsType>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setActiveHotspot(null);
  };

  const renderModel = () => {
    switch (artifact.id) {
      case 'apollo-11-lm':
        return <ApolloLunarModule />;
      case 'surveyor-3':
        return <Surveyor3 />;
      case 'lunar-roving-vehicle':
        return <LunarRover />;
      case 'sojourner-rover':
        return <SojournerRover />;
      case 'spirit-rover':
        return <SpiritRover />;
      case 'opportunity-rover':
        return <OpportunityRover />;
      default:
        return <ApolloLunarModule />;
    }
  };

  const isMoon = artifact.planet === 'moon';
  const groundColor = isMoon ? '#42454a' : '#7c3218';

  return (
    <div className="relative w-full h-[560px] sm:h-[660px] rounded-3xl overflow-hidden border-2 border-[#55DDF5]/25 bg-[#05070D] shadow-2xl font-mono">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3, 2.2, 4], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Sun Flare directional lighting */}
        <pointLight position={[6, 8, -4]} intensity={4.5} color="#fffcf5" />
        <directionalLight position={[8, 12, 6]} intensity={2.2} color="#fffcf0" castShadow />
        <directionalLight position={[-8, 6, -6]} intensity={0.6} color="#55ddf5" />
        <directionalLight position={[0, -4, 0]} intensity={0.2} color={groundColor} />

        <Stars radius={60} count={2200} factor={3} fade />

        {/* Planetary Ground Simulation */}
        <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[25, 25, 32, 32]} />
          <meshStandardMaterial
            color={groundColor}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>

        {/* 3D Model with Hotspots */}
        <group>
          {renderModel()}

          {/* Hotspots */}
          {artifact.hotspots.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <group key={hs.id} position={hs.position}>
                {/* Glowing Hotspot Marker */}
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(isSelected ? null : hs);
                  }}
                >
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshBasicMaterial color={isSelected ? '#55DDF5' : '#FF9F1C'} />
                </mesh>

                {/* HTML Annotation Tag */}
                <Html distanceFactor={8} position={[0, 0.12, 0]} center>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isSelected ? null : hs);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] tracking-wider backdrop-blur-md transition-all whitespace-nowrap shadow-md ${
                      isSelected
                        ? 'border-[#55DDF5] bg-[#0A1020]/95 text-[#55DDF5] ring-2 ring-[#55DDF5]/50 scale-110'
                        : 'border-[#FF9F1C]/50 bg-[#0A1020]/80 text-[#E8EDF5] hover:border-[#55DDF5] hover:text-[#55DDF5]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-[#55DDF5] animate-ping' : 'bg-[#FF9F1C]'
                      }`}
                    />
                    <span>{hs.title}</span>
                  </button>
                </Html>
              </group>
            );
          })}
        </group>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          minDistance={1.8}
          maxDistance={8.5}
          maxPolarAngle={Math.PI / 2 + 0.05}
          autoRotate={!activeHotspot}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Cockpit HUD Border Brackets & Reticles (As seen in the reference image) */}
      <div className="absolute inset-4 pointer-events-none border border-[#55DDF5]/15 rounded-2xl">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#55DDF5]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#55DDF5]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#55DDF5]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#55DDF5]" />
      </div>

      {/* Top Left Header Badge */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#55DDF5]/30 bg-[#070D1A]/90 backdrop-blur-xl text-xs">
          <Crosshair className="w-3.5 h-3.5 text-[#55DDF5] animate-pulse" />
          <span className="text-[#55DDF5] font-bold uppercase tracking-wider">
            3D TELEMETRY INSPECTOR
          </span>
          <span className="text-[#A5A5A5] hidden sm:inline text-[10px]">
            // {artifact.shortName}
          </span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <button
          onClick={resetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#55DDF5]/30 bg-[#070D1A]/90 hover:bg-[#101B32] text-xs text-[#E8EDF5] hover:text-[#55DDF5] transition-colors"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">RESET PERSPECTIVE</span>
        </button>
      </div>

      {/* Bottom Center Hotspot Detail Card */}
      {activeHotspot && (
        <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-10">
          <div className="p-4 rounded-2xl border border-[#55DDF5]/50 bg-[#070D1A]/95 backdrop-blur-2xl shadow-2xl hud-corner">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#55DDF5]" />
                <h4 className="text-sm font-display font-bold text-[#E8EDF5]">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-xs text-[#A5A5A5] hover:text-[#E8EDF5] px-1 font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#E8EDF5]/85 font-light leading-relaxed">
              {activeHotspot.description}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Left Navigation Tip */}
      <div className="absolute bottom-6 left-6 z-10 hidden sm:block pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg border border-[#55DDF5]/15 bg-[#070D1A]/80 text-[10px] text-[#A5A5A5]">
          Rotate: Left-Click • Zoom: Wheel • Inspect: Click Amber Hotspots
        </div>
      </div>
    </div>
  );
};
