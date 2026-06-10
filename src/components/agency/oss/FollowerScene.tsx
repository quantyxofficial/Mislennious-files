import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, MeshWobbleMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const Monolith = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Transform 3D properties based on scroll
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.8]);
  const positionY = useTransform(scrollYProgress, [0, 1], [0, -2]);

  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle constant rotation on top of scroll rotation
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <motion.div 
      style={{ scale, rotateY: rotationY, rotateX: rotationX, y: positionY }}
    >
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron ref={meshRef} args={[1, 15]}>
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#4c1d95"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={2}
          />
        </Icosahedron>
      </Float>
      
      {/* Outer Wireframe for extra detail */}
      <Icosahedron args={[1.2, 1]}>
        <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.1} />
      </Icosahedron>
    </motion.div>
  );
};

export const FollowerScene = ({ scrollYProgress }: { scrollYProgress: any }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7c3aed" />
        
        <Monolith scrollYProgress={scrollYProgress} />
        
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  );
};
