"use client";

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const ProceduralGarment = ({ color }: { color: string }) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.color, {
        r: new THREE.Color(color).r,
        g: new THREE.Color(color).g,
        b: new THREE.Color(color).b,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [color]);

  return (
    <group position={[0, 0, 0]} dispose={null}>
       <mesh castShadow receiveShadow>
         <cylinderGeometry args={[1.2, 1.2, 3, 64, 32]} />
         <meshStandardMaterial
           ref={materialRef}
           color={color}
           roughness={0.85}
           metalness={0.05}
           envMapIntensity={1.2}
         />
       </mesh>
       <ContactShadows position={[0, -1.6, 0]} opacity={0.7} scale={10} blur={2.5} far={4} color="#000000" />
    </group>
  );
}

interface ProductViewerProps {
  color?: string;
}

export default function ProductViewer({ color = "#c9a84c" }: ProductViewerProps) {
  return (
    <div className="w-full h-full min-h-[60vh] md:min-h-full relative cursor-grab active:cursor-grabbing bg-surface rounded-2xl overflow-hidden border border-border">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.6} />
          <directionalLight castShadow position={[5, 10, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#c9a84c" />
          
          <ProceduralGarment color={color} />
          
          <OrbitControls 
            makeDefault 
            enablePan={false} 
            enableZoom={true} 
            minDistance={4} 
            maxDistance={12}
            autoRotate 
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2 + 0.1} 
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      <div className="absolute font-heading text-[10px] tracking-widest text-text-secondary bottom-4 left-1/2 -translate-x-1/2 pointer-events-none uppercase opacity-50">
        Povuci za rotaciju
      </div>
    </div>
  );
}
