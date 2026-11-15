import React from 'react';
import * as THREE from 'three';

interface MerRoverProps {
  isSpirit?: boolean;
}

export const MerRover: React.FC<MerRoverProps> = ({ isSpirit = true }) => {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Central Electronics Body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.1, 0.45, 1.4]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Solar Panel Deck (Main body + Outspread Solar Wings) */}
      <group position={[0, 0.45, 0]}>
        {/* Central Deck */}
        <mesh>
          <boxGeometry args={[1.2, 0.04, 1.5]} />
          <meshStandardMaterial
            color="#1e1b4b" // Deep solar cells
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
        {/* Left Solar Wing */}
        <mesh position={[-0.85, 0, 0]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.5, 0.03, 1.3]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Right Solar Wing */}
        <mesh position={[0.85, 0, 0]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.5, 0.03, 1.3]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Rear Solar Wing */}
        <mesh position={[0, 0, -0.95]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[0.9, 0.03, 0.4]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.85} />
        </mesh>
      </group>

      {/* Pancam Mast Assembly (PMA) Periscope Neck */}
      <group position={[0, 0.45, 0.5]}>
        {/* Vertical Mast */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Camera Bar Head */}
        <mesh position={[0, 1.4, 0.05]}>
          <boxGeometry args={[0.35, 0.12, 0.18]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        {/* Dual Panoramic Stereo Lenses */}
        <mesh position={[-0.12, 1.4, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.08, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} />
        </mesh>
        <mesh position={[0.12, 1.4, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.08, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} />
        </mesh>
      </group>

      {/* High-Gain Steerable X-Band Dish Antenna */}
      <group position={[-0.45, 0.65, -0.4]} rotation={[0.4, -0.3, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.12, 24, 1, true]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Low-Gain Omni Antenna */}
      <mesh position={[0.45, 0.75, -0.4]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>

      {/* Forward Robotic Arm (Instrument Deployment Device - IDD) */}
      <group position={[0.35, 0.15, 0.7]} rotation={[0.5, 0.2, 0]}>
        {/* Shoulder Joint */}
        <mesh position={[0, -0.2, 0.2]}>
          <boxGeometry args={[0.08, 0.08, 0.5]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Forearm Link */}
        <mesh position={[0, -0.5, 0.4]}>
          <boxGeometry args={[0.06, 0.06, 0.45]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        {/* Turret Tool Head with Rock Abrasion Tool (RAT) */}
        <mesh position={[0, -0.7, 0.55]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
          <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 6 Cleated Aluminum Wheels on Rocker-Bogie Linkage */}
      {[
        { x: -0.9, y: -0.3, z: 0.7, isStuck: false },
        { x: 0.9, y: -0.3, z: 0.7, isStuck: isSpirit }, // Spirit's jammed right-front wheel
        { x: -0.95, y: -0.3, z: 0, isStuck: false },
        { x: 0.95, y: -0.3, z: 0, isStuck: false },
        { x: -0.9, y: -0.3, z: -0.7, isStuck: false },
        { x: 0.9, y: -0.3, z: -0.7, isStuck: false },
      ].map((w, idx) => (
        <group key={idx} position={[w.x, w.y, w.z]}>
          {/* Wheel Rim & Grousers */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.2, 24]} />
            <meshStandardMaterial
              color={w.isStuck ? '#d97706' : '#94a3b8'} // subtle dust tint on jammed wheel
              metalness={0.75}
              roughness={0.4}
            />
          </mesh>
          {/* Motor Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.24, 12]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}

      {/* Rocker-Bogie Struts */}
      <mesh position={[-0.8, -0.15, 0]}>
        <boxGeometry args={[0.07, 0.07, 1.5]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[0.8, -0.15, 0]}>
        <boxGeometry args={[0.07, 0.07, 1.5]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
    </group>
  );
};

export const SpiritRover: React.FC = () => <MerRover isSpirit={true} />;
export const OpportunityRover: React.FC = () => <MerRover isSpirit={false} />;
