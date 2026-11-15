import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMoonTexture } from './proceduralTextures';

interface MoonProps {
  radius?: number;
  rotationSpeed?: number;
}

export const Moon: React.FC<MoonProps> = ({
  radius = 1.8,
  rotationSpeed = 0.03,
}) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [liveTexture, setLiveTexture] = useState<THREE.Texture | null>(null);

  // Load the user's provided live SELENE NASA Moon image as the sphere texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/images/moon-nasa-selene.jpg',
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        setLiveTexture(tex);
      },
      undefined,
      () => {
        // Fallback to procedural texture if loading fails
        setLiveTexture(getMoonTexture());
      }
    );
  }, []);

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const textureToUse = liveTexture || getMoonTexture();

  return (
    <group rotation={[0.026, 0, 0]}>
      {/* 3D Moon Sphere Textured with User's Live NASA/SELENE Moon Photograph */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={textureToUse}
          roughness={0.88}
          metalness={0.08}
        />
      </mesh>

      {/* Atmospheric / Exosphere Rim Glow */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#A5E9F5"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
