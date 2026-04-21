"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';

// Lazy load the inner component
const TShirt = React.lazy(() => import('./TShirt'));

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[10, 10, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#c9a84c" />
          
          <TShirt abstract={true} color="#111111" />
          
          <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.3} color="#c9a84c" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}
