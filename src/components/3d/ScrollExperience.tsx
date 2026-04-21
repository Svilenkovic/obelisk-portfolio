"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import GarmentModel from './GarmentModel';

export default function ScrollExperience() {
  return (
    <div className="fixed inset-0 w-full h-[100svh] bg-background -z-10 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} color="#051024" />
          <directionalLight castShadow position={[10, 10, 5]} intensity={2} shadow-mapSize={[1024, 1024]} color="#e0eaff" />
          <directionalLight position={[-10, 5, -5]} intensity={1} color="#c9a84c" />
          <pointLight position={[0, -5, 0]} intensity={1.5} color="#0a1733" />
          
          <GarmentModel />
          {/* Enhanced WOW Particles */}
          <Sparkles count={1500} scale={25} size={3} speed={0.4} opacity={0.6} color="#c9a84c" noise={0.1} />
          <Sparkles count={800} scale={15} size={1.5} speed={0.6} opacity={0.8} color="#ffffff" noise={0.2} />
          <ContactShadows position={[0, -3.0, 0]} opacity={0.8} scale={30} blur={4} far={10} color="#051024" />
        </Suspense>
      </Canvas>
    </div>
  );
}
