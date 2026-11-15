import React from 'react';
import * as THREE from 'three';

export const ApolloLunarModule: React.FC = () => {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Octagonal Descent Stage Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 1.1, 8]} />
        <meshStandardMaterial
          color="#d4af37" // Kapton Gold Foil
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* Descent Stage Upper Deck & Bulkheads */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.2, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Descent Propulsion System (DPS) Engine Bell */}
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 0.8, 24, 1, true]} />
        <meshStandardMaterial
          color="#1a202c"
          roughness={0.4}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4 Landing Gear Outriggers with Struts & Footpads */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        const footX = Math.cos(angle) * 2.5;
        const footZ = Math.sin(angle) * 2.5;

        return (
          <group key={i}>
            {/* Primary Diagonal Strut */}
            <mesh
              position={[x, -0.4, z]}
              rotation={[
                Math.sin(angle) * 0.45,
                angle,
                -Math.cos(angle) * 0.45,
              ]}
            >
              <cylinderGeometry args={[0.06, 0.06, 1.8, 12]} />
              <meshStandardMaterial
                color="#e5b83b"
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {/* Dish-shaped Lunar Surface Footpad */}
            <mesh position={[footX, -1.1, footZ]}>
              <cylinderGeometry args={[0.42, 0.48, 0.08, 24]} />
              <meshStandardMaterial
                color="#cbd5e1"
                roughness={0.4}
                metalness={0.7}
              />
            </mesh>

            {/* Surface Contact Probe */}
            <mesh position={[footX, -1.4, footZ]}>
              <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
              <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Forward Landing Leg with Astronaut Egress Ladder */}
      <group position={[0, -0.3, 1.8]} rotation={[0.2, 0, 0]}>
        {/* Left & Right Ladder Rails */}
        <mesh position={[-0.2, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[0.2, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>

        {/* Ladder Rungs */}
        {[-0.9, -0.7, -0.5, -0.3, -0.1, 0.1].map((ry, idx) => (
          <mesh key={idx} position={[0, ry, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
        ))}

        {/* Apollo 11 Plaque on Forward Strut */}
        <mesh position={[0, -0.3, 0.03]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.02]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Modular Equipment Stowage Quadrant Boxes */}
      <mesh position={[0.9, 0.1, 0.9]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.5]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.9, 0.1, -0.9]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.5]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};
