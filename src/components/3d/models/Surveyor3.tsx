import React from 'react';
import * as THREE from 'three';

export const Surveyor3: React.FC = () => {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Triangular Aluminum Spaceframe Hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.45, 3]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 3 Outspread Tripod Landing Legs */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const legX = Math.cos(angle) * 1.5;
        const legZ = Math.sin(angle) * 1.5;

        return (
          <group key={i}>
            {/* Primary Leg Strut */}
            <mesh
              position={[legX * 0.5, -0.4, legZ * 0.5]}
              rotation={[Math.sin(angle) * 0.5, angle, -Math.cos(angle) * 0.5]}
            >
              <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.7} />
            </mesh>

            {/* Honeycomb Crushable Footpad */}
            <mesh position={[legX, -0.9, legZ]}>
              <cylinderGeometry args={[0.3, 0.35, 0.08, 16]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Central Solar Mast */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>

      {/* Planar Solar Array Panel */}
      <mesh position={[0.3, 1.4, 0]} rotation={[0.3, 0.4, 0.2]}>
        <boxGeometry args={[0.7, 0.9, 0.04]} />
        <meshStandardMaterial
          color="#1e3a8a" // Solar cell dark blue
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* High-Gain Planar Directional Antenna */}
      <mesh position={[-0.3, 1.4, 0]} rotation={[-0.2, 0.5, -0.1]}>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 24]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Vidicon TV Camera Unit on Turret (recovered by Apollo 12) */}
      <group position={[0.35, 0.4, 0.35]}>
        <mesh>
          <boxGeometry args={[0.25, 0.4, 0.25]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Camera Optical Lens Barrel */}
        <mesh position={[0, 0.05, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} />
        </mesh>
      </group>

      {/* Pantograph Articulated Surface Sampler Arm */}
      <group position={[-0.35, -0.1, 0.35]} rotation={[0.4, -0.3, 0]}>
        {/* Upper Arm Link */}
        <mesh position={[0, -0.3, 0.2]}>
          <boxGeometry args={[0.06, 0.06, 0.6]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        {/* Forearm Link */}
        <mesh position={[0, -0.6, 0.5]}>
          <boxGeometry args={[0.05, 0.05, 0.5]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        {/* Soil Excavation Scoop */}
        <mesh position={[0, -0.85, 0.7]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.2]} />
          <meshStandardMaterial color="#d97706" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
