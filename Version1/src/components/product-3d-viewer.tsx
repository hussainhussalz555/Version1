"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type ViewerProps = {
  modelUrl?: string;
  sequenceFrames?: string[];
};

function Model({ modelUrl }: { modelUrl: string }) {
  const model = useGLTF(modelUrl);
  return <primitive object={model.scene} scale={1.4} />;
}

function PlaceholderObject() {
  return (
    <mesh rotation={[0.3, 0.5, 0]}>
      <boxGeometry args={[2.6, 0.2, 1.3]} />
      <meshStandardMaterial color="#222" metalness={0.5} roughness={0.25} />
    </mesh>
  );
}

export function Product3DViewer({ modelUrl, sequenceFrames }: ViewerProps) {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  if (modelUrl) {
    return (
      <div className="h-[420px] w-full border border-black/10 bg-[#f3efe7]">
        <Canvas camera={{ position: [0, 1.2, 3.2], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 4, 3]} intensity={1.2} />
          <Suspense fallback={<PlaceholderObject />}>
            <Model modelUrl={modelUrl} />
          </Suspense>
          <Environment preset="city" />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
        </Canvas>
      </div>
    );
  }

  if (sequenceFrames && sequenceFrames.length > 0) {
    return (
      <section className="space-y-4 border border-black/10 bg-[#f3efe7] p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-black/50">Scroll Showcase</p>
        <motion.div style={{ rotate }} className="relative mx-auto aspect-square w-full max-w-md">
          <Image src={sequenceFrames[0]} alt="Scroll product view" fill className="object-contain" />
        </motion.div>
        <p className="text-sm text-black/65">
          3D model not attached yet. Showing premium scroll-driven visual fallback that can be replaced by a real model + exploded animation.
        </p>
      </section>
    );
  }

  return null;
}
