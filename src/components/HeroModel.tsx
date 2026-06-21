import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Bounds, Trail } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
    if (particleRef.current) {
      const t = state.clock.elapsedTime;
      // Orbit around the body
      particleRef.current.position.set(
        Math.cos(t * 1.5) * 2,
        1 + Math.sin(t * 2) * 1.5,
        Math.sin(t * 1.5) * 2
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        
        {/* Core / Heart */}
        <Sphere ref={coreRef} args={[0.3, 32, 32]} position={[0, 1.2, 0]}>
          <meshBasicMaterial color="#dc2626" />
        </Sphere>
        <pointLight position={[0, 1.2, 0]} color="#dc2626" intensity={2} distance={2} />

        {/* Chest / Torso - Abstract Representation */}
        {/* Upper Chest */}
        <mesh position={[0, 1.2, -0.1]} scale={[1.2, 0.8, 0.6]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color="#050505"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.4}
            thickness={1.5}
            envMapIntensity={2}
          />
        </mesh>

        {/* Abs / Lower Torso */}
        <mesh position={[0, 0.2, -0.1]} scale={[0.8, 1, 0.5]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color="#050505"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.4}
            thickness={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Left shoulder */}
        <mesh position={[-1.3, 1.4, -0.1]} scale={[0.6, 0.6, 0.6]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color="#050505"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Right shoulder */}
        <mesh position={[1.3, 1.4, -0.1]} scale={[0.6, 0.6, 0.6]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color="#050505"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Orbiting particles representing neural/muscle signals */}
        <Trail width={2} length={10} color="#2563eb" attenuation={(t) => t * t}>
          <mesh ref={particleRef}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#2563eb" />
          </mesh>
        </Trail>

      </group>
    </Float>
  );
}
