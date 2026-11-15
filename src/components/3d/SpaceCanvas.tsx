import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarField } from './StarField';

interface SpaceCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  enableStars?: boolean;
  className?: string;
}

export const SpaceCanvas: React.FC<SpaceCanvasProps> = ({
  children,
  cameraPosition = [0, 0, 5],
  fov = 45,
  enableStars = true,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 1.75]} // Smooth performance across standard laptops and retina screens
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {enableStars && <StarField />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
