import React from 'react';
import * as THREE from 'three';

export const LunarRover: React.FC = () => {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Chassis Main Deck */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 2.4]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 4 Woven Wire-Mesh Wheels with Chevron Treads & Fenders */}
      {[
        { x: -0.9, z: 0.8 },
        { x: 0.9, z: 0.8 },
        { x: -0.9, z: -0.8 },
        { x: 0.9, z: -0.8 },
      ].map((w, i) => (
        <group key={i} position={[w.x, -0.2, w.z]}>
          {/* Wheel Mesh Cylinder */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
            <meshStandardMaterial
              color="#94a3b8"
              metalness={0.85}
              roughness={0.35}
              wireframe={false}
            />
          </mesh>

          {/* Hubcap & Wheel Motor Drive Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.32, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>

          {/* Fender (Apollo orange-tan dust fender) */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry
              args={[0.48, 0.48, 0.3, 16, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]}
            />
            <meshStandardMaterial
              color="#d97706"
              metalness={0.3}
              roughness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Two Folded Crew Seats (Lawn-chair woven nylon style) */}
      <group position={[-0.35, 0.45, -0.1]}>
        {/* Seat Back */}
        <mesh rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Seat Pan */}
        <mesh position={[0, -0.32, 0.22]}>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.4} />
        </mesh>
      </group>

      <group position={[0.35, 0.45, -0.1]}>
        {/* Seat Back */}
        <mesh rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Seat Pan */}
        <mesh position={[0, -0.32, 0.22]}>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.4} />
        </mesh>
      </group>

      {/* Central T-Handle Joystick Controller */}
      <group position={[0, 0.45, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* T-Handle Grip */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Forward High-Gain Umbrella Dish Antenna */}
      <group position={[0.45, 0.7, 1.0]} rotation={[-0.3, 0.2, 0]}>
        {/* Mast */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        {/* Inverted Parabolic Dish */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 0.2, 24, 1, true]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Ground-Controlled Color TV Camera */}
      <group position={[-0.45, 0.5, 1.0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.3]} />
          <meshStandardMaterial color="#334155" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Aft Geology Sample Collection Racks */}
      <mesh position={[0, 0.35, -1.0]}>
        <boxGeometry args={[1.2, 0.4, 0.35]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
};
