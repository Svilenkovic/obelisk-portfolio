"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ShirtMaterialProps {
  color: string;
  designUrl?: string;
}

export default function ShirtMaterial({ color, designUrl }: ShirtMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  const designTexture = useMemo(() => {
    if (!designUrl) return null;
    const tex = textureLoader.load(designUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = false;
    return tex;
  }, [designUrl, textureLoader]);

  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2.6, 0.3]} />
      <meshStandardMaterial color={baseColor} roughness={0.8} metalness={0} />
      {designTexture && (
        <mesh position={[0, 0.2, 0.16]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial
            map={designTexture}
            transparent
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      )}
    </mesh>
  );
}
