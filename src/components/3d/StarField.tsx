import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export const StarField: React.FC<{ speed?: number }> = ({ speed = 0.05 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed * 0.1;
      groupRef.current.rotation.x += delta * speed * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />
    </group>
  );
};
