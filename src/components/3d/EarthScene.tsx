import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RollingEarthObject() {
  const earthRef = useRef<THREE.Group>(null);
  
  // Create a beautiful dashed wireframe / particle earth
  const [points, lines] = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(4, 8);
    const pos = geo.attributes.position.array as Float32Array;
    
    // We'll create dashed lines
    const linePoints: number[] = [];
    geo.computeBoundingSphere();
    
    // Create random connections for a "network" feel
    for (let i = 0; i < pos.length; i += 3) {
      if (Math.random() > 0.8) {
         const idx1 = i;
         const idx2 = Math.floor(Math.random() * (pos.length / 3)) * 3;
         linePoints.push(pos[idx1], pos[idx1+1], pos[idx1+2]);
         linePoints.push(pos[idx2], pos[idx2+1], pos[idx2+2]);
      }
    }
    const lineArray = new Float32Array(linePoints);
    return [pos, lineArray];
  }, []);

  useFrame((state) => {
    if (earthRef.current) {
      const scrollY = window.scrollY;
      const t = state.clock.elapsedTime;
      
      // "Earth rolling" effect based on scroll mapping
      earthRef.current.rotation.x = scrollY * 0.002;
      earthRef.current.rotation.y = t * 0.05 + scrollY * 0.001;
    }
  });

  return (
    <group ref={earthRef} position={[0, -1, 0]}>
      {/* Network Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </points>

      {/* Network Edge Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
      
      {/* Inner Core Glow */}
      <mesh>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export function EarthScene() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] z-0 pointer-events-none opacity-100 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <RollingEarthObject />
      </Canvas>
    </div>
  );
}
