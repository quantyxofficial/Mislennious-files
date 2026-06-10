import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const Nodes = () => {
  const points = useMemo(() => {
    const p = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Connections = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Module */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
      </Float>

      {/* Orbiting Nodes */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} position={[
          Math.cos(i * (Math.PI * 2) / 6) * 3,
          Math.sin(i * (Math.PI * 2) / 6) * 3,
          (Math.random() - 0.5) * 2
        ]}>
          <Sphere args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
          </Sphere>
          <Line
            points={[[0, 0, 0], [-Math.cos(i * (Math.PI * 2) / 6) * 3, -Math.sin(i * (Math.PI * 2) / 6) * 3, 0]]}
            color="#06b6d4"
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        </Float>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        
        <Nodes />
        <Connections />
        
        <fog attach="fog" args={['#020617', 5, 20]} />
      </Canvas>
    </div>
  );
};
