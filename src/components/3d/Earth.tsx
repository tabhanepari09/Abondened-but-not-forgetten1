import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getEarthTexture, getEarthCloudsTexture } from './proceduralTextures';

interface EarthProps {
  radius?: number;
  rotationSpeed?: number;
  interactive?: boolean;
}

export const Earth: React.FC<EarthProps> = ({
  radius = 2,
  rotationSpeed = 0.05,
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => getEarthTexture(), []);
  const cloudsTexture = useMemo(() => getEarthCloudsTexture(), []);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * (rotationSpeed * 1.25);
    }
  });

  return (
    <group rotation={[0.41, 0, 0]}> {/* 23.5° axial tilt */}
      {/* Primary Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      {/* Cloud Sphere */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.015, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#55DDF5"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
