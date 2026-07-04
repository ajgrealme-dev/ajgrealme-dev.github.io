import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { useApp } from '../context/AppContext';

function BgParticles({ isDark }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#00f5ff' : '#6366f1'}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function SmallGeo({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });
  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

export default function BackgroundCanvas({ isDark }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={isDark ? '#00f5ff' : '#6366f1'} />

      <BgParticles isDark={isDark} />

      {[
        { pos: [-8, 4, -3], c: isDark ? '#00f5ff' : '#6366f1', s: 0.3 },
        { pos: [8, -4, -3], c: isDark ? '#39ff14' : '#06b6d4', s: 0.4 },
        { pos: [-6, -6, -3], c: isDark ? '#ff00ff' : '#8b5cf6', s: 0.25 },
        { pos: [6, 5, -3], c: isDark ? '#00f5ff' : '#3b82f6', s: 0.35 },
        { pos: [0, -8, -3], c: isDark ? '#39ff14' : '#0ea5e9', s: 0.2 },
        { pos: [-10, 0, -4], c: isDark ? '#ff00ff' : '#7c3aed', s: 0.45 },
        { pos: [10, 2, -4], c: isDark ? '#00f5ff' : '#6366f1', s: 0.3 },
      ].map((g, i) => (
        <SmallGeo key={i} position={g.pos} color={g.c} speed={g.s} />
      ))}
    </Canvas>
  );
}
