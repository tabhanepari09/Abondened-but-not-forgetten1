import React from 'react';
import * as THREE from 'three';

export const SojournerRover: React.FC = () => {
  return (
    <group position={[0, -0.1, 0]}>
      {/* Warm Electronics Box (WEB) Core Body */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.35, 1.2]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top GaAs Solar Panel Deck */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.95, 0.04, 1.25]} />
        <meshStandardMaterial
          color="#1e1b4b" // Deep solar violet/blue
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Gold Foil Thermal Skirt Trim */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.92, 0.25, 1.22]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 6 Wheels on Rocker-Bogie Suspension */}
      {[
        { x: -0.65, y: -0.15, z: 0.5 },
        { x: 0.65, y: -0.15, z: 0.5 },
        { x: -0.68, y: -0.15, z: 0 },
        { x: 0.68, y: -0.15, z: 0 },
        { x: -0.65, y: -0.15, z: -0.5 },
        { x: 0.65, y: -0.15, z: -0.5 },
      ].map((w, idx) => (
        <group key={idx} position={[w.x, w.y, w.z]}>
          {/* Cleated Aluminum Wheel */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.15, 20]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Drive Motor Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.18, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}

      {/* Rocker-Bogie Linkage Struts (Left & Right) */}
      <mesh position={[-0.55, 0, 0]}>
        <boxGeometry args={[0.06, 0.06, 1.1]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[0.55, 0, 0]}>
        <boxGeometry args={[0.06, 0.06, 1.1]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Forward Stereo Camera Eyes */}
      <group position={[0, 0.35, 0.6]}>
        <mesh position={[-0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} />
        </mesh>
        <mesh position={[0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} />
        </mesh>
      </group>

      {/* Rear APXS Deployment Arm & Sensor */}
      <group position={[0, 0.1, -0.65]} rotation={[-0.3, 0, 0]}>
        <mesh position={[0, -0.15, -0.15]}>
          <boxGeometry args={[0.08, 0.06, 0.4]} />
          <meshStandardMaterial color="#475569" metalness={0.7} />
        </mesh>
        {/* Sensor Head */}
        <mesh position={[0, -0.28, -0.32]}>
          <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
      </group>

      {/* UHF Whip Antenna */}
      <mesh position={[0.35, 0.55, -0.4]}>
        <cylinderGeometry args={[0.01, 0.01, 0.55, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
    </group>
  );
};
