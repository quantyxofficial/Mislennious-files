import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DataOracleBot() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  const [message, setMessage] = useState('Hi! 👋');
  const [scrolled, setScrolled] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const trackFactorRef = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (scrolled) return;
    const messages = [
      "Initializing connection... ⚡", 
      "Hello, human! 👋", 
      "Ready to crunch some data? 🔢", 
      "My neural nets are primed! 🧠",
      "Analyzing inputs... 📡",
      "Let's build something awesome. 🛠️",
      "Awaiting instructions. 🤖"
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMessage(messages[i]);
    }, 4500);
    return () => clearInterval(interval);
  }, [scrolled]);

  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const ringCount = 50;
  const particleCount = 1200;

  const [particlePositions, particleColors, ringData] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const rings = [];
    
    // Rings Data
    for (let i = 0; i < ringCount; i++) {
       const radius = 3 + i * 0.4;
       rings.push({
          radius,
          // Fade out the rings toward the edge
          opacity: Math.max(0.01, 0.4 - (i / ringCount) * 0.4)
       });
    }

    // Particles Data
    for (let i = 0; i < particleCount; i++) {
       // Snap to random rings
       const rIndex = Math.floor(Math.random() * ringCount);
       const radius = 3 + rIndex * 0.4 + (Math.random() * 0.1 - 0.05);
       const theta = Math.random() * Math.PI * 2;
       
       pos[i * 3] = Math.cos(theta) * radius;
       pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3; // Slight Y variance
       pos[i * 3 + 2] = Math.sin(theta) * radius;
       
       const color = new THREE.Color();
       const rand = Math.random();
       if (rand > 0.9) {
          color.setHSL(0.6, 0.9, 0.6); // Cyan/Blue
       } else if (rand > 0.8) {
          color.setHSL(0.55, 0.8, 0.7); // Light Blue
       } else {
          color.setHSL(0, 0, 0.4 + Math.random() * 0.4); // White/Gray
       }
       col[i * 3] = color.r;
       col[i * 3 + 1] = color.g;
       col[i * 3 + 2] = color.b;
    }

    return [pos, col, rings];
  }, [particleCount, ringCount]);

  const logoCurves = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const baseAngle = (i * (360 / 12) - 90) * (Math.PI / 180);
      const armLength = 0.35;
      const startR = 0.12;
      const startX = Math.cos(baseAngle) * startR;
      const startY = Math.sin(baseAngle) * startR;
      const endX = Math.cos(baseAngle) * (startR + armLength);
      const endY = Math.sin(baseAngle) * (startR + armLength);
      
      // Organic wavy path using two control points for 3D
      const perpRad = baseAngle + Math.PI / 2;
      const cp1X = Math.cos(baseAngle) * (startR + armLength * 0.33) + Math.cos(perpRad) * -0.08;
      const cp1Y = Math.sin(baseAngle) * (startR + armLength * 0.33) + Math.sin(perpRad) * -0.08;
      
      const cp2X = Math.cos(baseAngle) * (startR + armLength * 0.66) + Math.cos(perpRad) * 0.08;
      const cp2Y = Math.sin(baseAngle) * (startR + armLength * 0.66) + Math.sin(perpRad) * 0.08;

      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(cp1X, cp1Y, 0),
        new THREE.Vector3(cp2X, cp2Y, 0),
        new THREE.Vector3(endX, endY, 0)
      );

      return { curve, endX, endY };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollY = window.scrollY;
    
    // Smooth 4D wave on particles
    if (particlesRef.current) {
       particlesRef.current.rotation.y = time * 0.02;
       const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
       for (let i = 0; i < particleCount; i++) {
          const x = posArray[i * 3];
          const z = posArray[i * 3 + 2];
          const dist = Math.sqrt(x*x + z*z);
          // 4D spatial ripple mapping based on distance to core and time
          posArray[i * 3 + 1] = Math.sin(time * 2 - dist * 0.5) * 0.3;
       }
       particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Global Group tilt / scroll interaction
    if (groupRef.current) {
      // Very subtle parallax scroll effect to keep robot visible throughout the page
      const targetY = -scrollY * 0.0008; 
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      
      // Gentle floating tilt - Removed scroll-based rotation to ensure it never flips
      const tx = 0.2 + Math.sin(time * 0.5) * 0.05;
      const tz = Math.cos(time * 0.3) * 0.01;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tx, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tz, 0.1);
    }

    if (ringGroupRef.current) {
       const scrollInfluence = scrollY * 0.002;
       ringGroupRef.current.rotation.y = time * 0.05 + scrollInfluence * 0.2; // spin disk slightly based on scroll
       
       ringGroupRef.current.children.forEach((group, i) => {
          const mesh = group.children[0] as THREE.Mesh;
          if (mesh && mesh.material) {
             const mat = mesh.material as THREE.MeshBasicMaterial;
             const baseOpacity = ringData[i] ? ringData[i].opacity * 0.8 : 0.1;
             
             // Pulse effect mapping scroll and time
             const pulse = Math.sin(time * 2 + i * 0.2 + scrollY * 0.02);
             
             // Opacity stays strictly visible but pulses, amplifying slightly with scroll
             mat.opacity = baseOpacity * (1 + pulse * (0.2 + Math.min(0.3, scrollInfluence)));
          }
       });
    }

    trackFactorRef.current = THREE.MathUtils.lerp(
       trackFactorRef.current,
       isScrollingRef.current ? 0 : 1,
       0.1
    );
    const smoothTrackFactor = trackFactorRef.current;

    // Robot Head tracking mouse, breathing, and bobbing
    if (headRef.current) {
       // Target rotations based on mouse ONLY if not scrolled (or scale it down)
       let targetX = (pointer.current.x * Math.PI) / 3 * smoothTrackFactor;
       let targetY = -(pointer.current.y * Math.PI) / 6 * smoothTrackFactor;
       
       if (smoothTrackFactor < 0.99) {
          const noiseX = Math.sin(time * 3.2) * 0.4 + Math.cos(time * 1.5) * 0.2;
          const noiseY = Math.cos(time * 2.8) * 0.2 + Math.sin(time * 1.1) * 0.1;
          const inverseTrack = 1 - smoothTrackFactor;
          targetX += noiseX * inverseTrack;
          targetY += noiseY * inverseTrack;
       }
       
       headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
       headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.1);
       
       // Hovering bob animation
       headRef.current.position.y = Math.sin(time * 2) * 0.3;
       
       // 4D breathing expansion
       const scale = 1 + Math.sin(time * 1.5) * 0.02;
       headRef.current.scale.set(scale, scale, scale);
    }
    
    // Core Aura Burst
    if (coreGlowRef.current) {
        const mat = coreGlowRef.current.material as THREE.MeshBasicMaterial;
        // Occasional bursts: using a fast sine wave synced to time, checking if we are in a peak period
        const burstPhase = Math.sin(time * 0.5); // Slow cycle
        const isBurst = burstPhase > 0.8; // Triggers "sometimes"
        const burstMultiplier = isBurst ? 2.5 + Math.sin(time * 20) * 0.5 : 1.0; 
        
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.6 * burstMultiplier, 0.1);
    }

    // Bot Emotions / Blinking
    if (leftEyeRef.current && rightEyeRef.current) {
       // Deterministic semi-random blink timeline
       const t = (time + Math.sin(time * 0.5)) % 4;
       let eyeScaleY = 1;
       
       // Double blink pattern
       if (t < 0.1) eyeScaleY = 0.1;
       else if (t > 0.25 && t < 0.35) eyeScaleY = 0.1;
       
       // Look direction shift (eyes slightly translate)
       let lookX = pointer.current.x * 0.05 * smoothTrackFactor;
       let lookY = pointer.current.y * 0.05 * smoothTrackFactor;
       
       if (smoothTrackFactor < 0.99) {
          const noiseX = Math.sin(time * 3.2) * 0.1 + Math.cos(time * 1.5) * 0.05;
          const noiseY = Math.cos(time * 2.8) * 0.05 + Math.sin(time * 1.1) * 0.02;
          const inverseTrack = 1 - smoothTrackFactor;
          lookX += noiseX * inverseTrack;
          lookY += noiseY * inverseTrack;
       }

       leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScaleY, 0.4);
       rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScaleY, 0.4);
       
       leftEyeRef.current.position.x = THREE.MathUtils.lerp(leftEyeRef.current.position.x, -0.8 + lookX, 0.1);
       leftEyeRef.current.position.y = THREE.MathUtils.lerp(leftEyeRef.current.position.y, -0.2 + lookY, 0.1);
       
       rightEyeRef.current.position.x = THREE.MathUtils.lerp(rightEyeRef.current.position.x, 0.8 + lookX, 0.1);
       rightEyeRef.current.position.y = THREE.MathUtils.lerp(rightEyeRef.current.position.y, -0.2 + lookY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
       {/* Accretion Disk / Orbital Rings */}
       <group ref={ringGroupRef}>
         {ringData.map((ring, i) => (
           <group key={`ring-grp-${i}`}>
             <mesh rotation={[Math.PI / 2, 0, 0]}>
               <ringGeometry args={[ring.radius, ring.radius + 0.02, 128]} />
               <meshBasicMaterial color="#a5b4fc" side={THREE.DoubleSide} transparent opacity={ring.opacity * 0.8} blending={THREE.AdditiveBlending} />
             </mesh>
           </group>
         ))}
       </group>

       {/* Floating Data Nodes */}
       <points ref={particlesRef}>
         <bufferGeometry>
           <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
           <bufferAttribute attach="attributes-color" count={particleCount} array={particleColors} itemSize={3} />
         </bufferGeometry>
         <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
       </points>

       {/* Center Bot Head */}
       <group ref={headRef}>
         {/* Internal Core Glow */}
         <mesh ref={coreGlowRef}>
           <sphereGeometry args={[1.92, 32, 32]} />
           <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
         </mesh>

         {/* Main Bot Shell */}
         <mesh castShadow receiveShadow>
           <sphereGeometry args={[2, 64, 64]} />
           <meshPhysicalMaterial 
             color="#ffffff" 
             emissive="#ffffff" 
             emissiveIntensity={0.05}
             roughness={0.05} 
             metalness={0.9}
             clearcoat={1.0}
             clearcoatRoughness={0.05}
           />
         </mesh>

          {/* KaizenStat Logo on Forehead (Stylized 3D version) */}
          <group position={[0, 0.65, 1.92]} rotation={[-0.33, 0, 0]}>
            {/* Center dot */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
            </mesh>
            
            {/* 10 curved radiating arms with dots */}
            {logoCurves.map((item, i) => (
              <group key={i}>
                {/* The curved arm */}
                <mesh>
                  <tubeGeometry args={[item.curve, 16, 0.02, 8, false]} />
                  <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
                </mesh>
                {/* The outer dot */}
                <mesh position={[item.endX, item.endY, 0]}>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
                </mesh>
              </group>
            ))}
          </group>

         {/* Nose / Mouth Dots */}
         <group position={[0, -0.55, 1.93]} rotation={[-0.1, 0, 0]}>
           <mesh position={[-0.1, 0, 0]}>
             <sphereGeometry args={[0.05, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
           </mesh>
           <mesh position={[0.1, 0, 0]}>
             <sphereGeometry args={[0.05, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
           </mesh>
         </group>

         {/* Left Eye */}
         <group ref={leftEyeRef} position={[-0.8, -0.2, 1.84]} rotation={[0, -0.2, 0]}>
           <mesh rotation={[Math.PI/2, 0, 0]}>
             <sphereGeometry args={[0.22, 32, 32]} />
             <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
           </mesh>
           <mesh position={[-0.08, 0.10, 0.18]}>
             <sphereGeometry args={[0.08, 16, 16]} />
             <meshBasicMaterial color="#ffffff" />
           </mesh>
         </group>
         
         {/* Right Eye */}
         <group ref={rightEyeRef} position={[0.8, -0.2, 1.84]} rotation={[0, 0.2, 0]}>
           <mesh rotation={[Math.PI/2, 0, 0]}>
             <sphereGeometry args={[0.22, 32, 32]} />
             <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
           </mesh>
           <mesh position={[-0.08, 0.10, 0.18]}>
             <sphereGeometry args={[0.08, 16, 16]} />
             <meshBasicMaterial color="#ffffff" />
           </mesh>
         </group>

         {/* null */}
       </group>
    </group>
  );
}

function ShootingStars() {
  const count = 60;
  const starsRef = useRef<THREE.InstancedMesh>(null);
  const [data] = useState(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 150 + 50, // start much further right
      y: Math.random() * 80 + 20,  // start higher
      z: -Math.random() * 100 - 50, // originate much deeper in the background
      speed: Math.random() * 4 + 2, // move much faster
      length: Math.random() * 10 + 5, // longer streaks
      delay: Math.random() * 10,
    }));
  });

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!starsRef.current) return;
    const time = state.clock.elapsedTime;
    data.forEach((star, i) => {
      // time mapped to delay
      const t = time * star.speed - star.delay;
      // if t > 0, it's moving.
      const cycle = t % 6; // frequency of shooting
      
      if (cycle > 0 && cycle < 1) { // active phase
        // path: move fast to bottom left, slightly forward
        const x = star.x - cycle * 250; 
        const y = star.y - cycle * 150; 
        const z = star.z + cycle * 100;
        
        dummy.position.set(x, y, z);
        // orient towards motion (atan2 of dy, dx)
        dummy.rotation.z = Math.atan2(150, 250);
        
        // scale based on lifecycle (fade in / out rapidly)
        const scaleNode = cycle < 0.1 ? cycle * 10 : cycle > 0.9 ? (1 - cycle) * 10 : 1;
        dummy.scale.set(star.length * scaleNode, 0.05 * scaleNode, 0.05 * scaleNode);
        
        dummy.updateMatrix();
        starsRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(1000, 1000, 1000); // hide when inactive
        dummy.updateMatrix();
        starsRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    starsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={starsRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export function BackgroundScene() {
  return (
    <Canvas 
      camera={{ position: [0, 2.5, 18], fov: 50 }} 
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.5} color="#ffffff" />
      {/* Cinematic Neutral Lighting for the Bot */}
      <directionalLight position={[5, 10, 10]} intensity={3.0} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#f0f0f0" />
      <pointLight position={[0, 0, 8]} intensity={2} color="#ffffff" />
      
      <ShootingStars />
      <DataOracleBot />
    </Canvas>
  );
}



