import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { Moon } from './Moon';
import { Mars } from './Mars';
import { PlanetId } from '../../types';

interface PlanetSelector3DProps {
  activePlanet: PlanetId;
}

const PlanetViewer: React.FC<{ activePlanet: PlanetId }> = ({ activePlanet }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {activePlanet === 'earth' && <Earth radius={2.0} />}
        {activePlanet === 'moon' && <Moon radius={1.9} />}
        {activePlanet === 'mars' && <Mars radius={1.9} />}
      </group>
    </Float>
  );
};

export const PlanetSelector3D: React.FC<PlanetSelector3DProps> = ({ activePlanet }) => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-[#55DDF5]/20 bg-[#05070D]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[7, 4, 6]} intensity={2.0} color="#fffcf0" />
        <directionalLight position={[-6, -3, -4]} intensity={0.35} color="#55ddf5" />
        <Stars radius={80} count={3000} factor={3} fade />

        <PlanetViewer activePlanet={activePlanet} />

        <OrbitControls
          enablePan={false}
          minDistance={3.2}
          maxDistance={8}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Viewport instruction badge */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="px-3 py-1 rounded border border-[#55DDF5]/15 bg-[#0A1020]/75 backdrop-blur-md text-[10px] font-mono text-[#A5A5A5]">
          Drag to rotate planetary body • Scroll to zoom
        </div>
      </div>
    </div>
  );
};
