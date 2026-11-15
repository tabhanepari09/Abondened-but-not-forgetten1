import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMarsTexture } from './proceduralTextures';

interface MarsProps {
  radius?: number;
  rotationSpeed?: number;
}

export const Mars: React.FC<MarsProps> = ({
  radius = 1.8,
  rotationSpeed = 0.04,
}) => {
  const marsRef = useRef<THREE.Mesh>(null);
  const [liveTexture, setLiveTexture] = useState<THREE.Texture | null>(null);

  // Load user's provided live Mars orbital photograph as texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/images/mars-phobos-debris.jpg',
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        setLiveTexture(tex);
      },
      undefined,
      () => {
        setLiveTexture(getMarsTexture());
      }
    );
  }, []);

  useFrame((_, delta) => {
    if (marsRef.current) {
      marsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const textureToUse = liveTexture || getMarsTexture();

  return (
    <group rotation={[0.44, 0, 0]}>
      {/* 3D Mars Sphere Textured with Live Mars Orbital Photograph */}
      <mesh ref={marsRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={textureToUse}
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* Thin Red-Orange Atmospheric Glow */}
      <mesh scale={[1.035, 1.035, 1.035]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#E26D5C"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
