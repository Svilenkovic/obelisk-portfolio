"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import ShirtMaterial from "./ShirtMaterial";

interface TShirtViewerProps {
  color?: string;
  designUrl?: string;
  autoRotate?: boolean;
  className?: string;
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center canvas-skeleton rounded-2xl">
      <div className="text-text-muted text-sm">Loading 3D...</div>
    </div>
  );
}

export default function TShirtViewer({
  color = "#111111",
  designUrl,
  className = "",
}: TShirtViewerProps) {
  return (
    <div className={`relative w-full aspect-square ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-3, 3, -3]} intensity={0.3} />

          <ShirtMaterial color={color} designUrl={designUrl} />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2.5}
          />

          <Environment preset="studio" />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
