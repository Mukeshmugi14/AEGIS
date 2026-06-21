import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

type MuscleGroup = 'Head' | 'Chest' | 'Abs' | 'Arms' | 'Legs' | null;

interface MuscleProps {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  name: MuscleGroup;
  activeGroup: MuscleGroup;
  hoveredGroup: MuscleGroup;
  setHovered: (v: MuscleGroup) => void;
  setActive: (v: MuscleGroup) => void;
  geometryType?: 'sphere' | 'box' | 'capsule';
  args?: any[];
}

function MusclePart({ position, scale = [1, 1, 1], rotation = [0, 0, 0], name, activeGroup, hoveredGroup, setHovered, setActive, geometryType = 'box', args }: MuscleProps) {
  const ref = useRef<THREE.Mesh>(null);
  
  const isHovered = hoveredGroup === name;
  const isActive = activeGroup === name;

  const targetColor = new THREE.Color(isActive ? '#dc2626' : isHovered ? '#2563eb' : '#18181b');
  const targetEmissive = new THREE.Color(isActive ? '#dc2626' : isHovered ? '#2563eb' : '#000000');
  
  useFrame((state, delta) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.color.lerp(targetColor, 0.1);
      mat.emissive.lerp(targetEmissive, 0.1);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isActive ? 0.8 : isHovered ? 0.4 : 0, 0.1);
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(name); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(null); }}
      onClick={(e) => { e.stopPropagation(); setActive(name === activeGroup ? null : name); }}
    >
      {geometryType === 'sphere' && <sphereGeometry args={args || [1, 32, 32]} />}
      {geometryType === 'box' && <boxGeometry args={args || [1, 1, 1]} />}
      {geometryType === 'capsule' && <capsuleGeometry args={args || [0.5, 1, 4, 16]} />}
      
      <meshStandardMaterial 
        roughness={0.2} 
        metalness={0.8} 
        color="#18181b" 
      />
    </mesh>
  );
}

function AbstractFigure({ activeGroup, hoveredGroup, setHovered, setActive }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  const commonProps = { activeGroup, hoveredGroup, setHovered, setActive };

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <MusclePart name="Head" position={[0, 4, 0]} scale={[0.8, 0.9, 0.8]} geometryType="sphere" {...commonProps} />
      
      {/* Chest */}
      <MusclePart name="Chest" position={[0, 2.8, 0]} scale={[2.2, 1.2, 1]} geometryType="box" args={[1,1,1, 4,4,4]} {...commonProps} />
      
      {/* Abs/Core */}
      <MusclePart name="Abs" position={[0, 1.5, 0]} scale={[1.4, 1.2, 0.8]} geometryType="box" {...commonProps} />
      
      {/* Left Arm */}
      <MusclePart name="Arms" position={[-1.7, 2.5, 0]} rotation={[0, 0, -0.2]} scale={[0.6, 2.4, 0.6]} geometryType="capsule" args={[1, 1, 4, 16]} {...commonProps} />
      
      {/* Right Arm */}
      <MusclePart name="Arms" position={[1.7, 2.5, 0]} rotation={[0, 0, 0.2]} scale={[0.6, 2.4, 0.6]} geometryType="capsule" args={[1, 1, 4, 16]} {...commonProps} />
      
      {/* Left Leg */}
      <MusclePart name="Legs" position={[-0.6, -0.2, 0]} scale={[0.7, 2.8, 0.7]} geometryType="capsule" args={[1, 1, 4, 16]} {...commonProps} />
      
      {/* Right Leg */}
      <MusclePart name="Legs" position={[0.6, -0.2, 0]} scale={[0.7, 2.8, 0.7]} geometryType="capsule" args={[1, 1, 4, 16]} {...commonProps} />
    </group>
  );
}

export default function AnatomyVisualization() {
  const [hoveredGroup, setHoveredGroup] = useState<MuscleGroup>(null);
  const [activeGroup, setActiveGroup] = useState<MuscleGroup>('Chest');

  const exerciseData: Record<string, { title: string, list: string[] }> = {
    Head: { title: "Neck & Traps", list: ["Neck Curls", "Shrugs", "Isometric Holds"] },
    Chest: { title: "Pectorals", list: ["Bench Press", "Incline Dumbbell Press", "Cable Crossovers"] },
    Abs: { title: "Core & Obliques", list: ["Cable Crunches", "Hanging Leg Raises", "Planks"] },
    Arms: { title: "Biceps & Triceps", list: ["Barbell Curls", "Tricep Pushdowns", "Hammer Curls"] },
    Legs: { title: "Quads & Hamstrings", list: ["Barbell Squats", "Romanian Deadlifts", "Leg Press"] },
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#050505] rounded-xl overflow-hidden relative border border-white/10 group">
      
      {/* 3D Viewport */}
      <div className="w-full md:w-1/2 h-[400px] md:h-full relative cursor-crosshair">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#2563eb" />
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <AbstractFigure 
              activeGroup={activeGroup} 
              hoveredGroup={hoveredGroup} 
              setHovered={setHoveredGroup} 
              setActive={setActiveGroup} 
            />
          </Float>
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Canvas>
        
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Interactive Atlas</span>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full md:w-1/2 p-6 md:p-8 bg-white/[0.02] flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 relative">
        <div className="absolute top-0 right-0 p-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></div>
        </div>

        <AnimatePresence mode="wait">
          {activeGroup ? (
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">Target Acquired</span>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">{exerciseData[activeGroup].title}</h3>
              
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Optimized protocols for maximizing hypertrophy and neuromuscular adaptation in the {activeGroup.toLowerCase()} region.
              </p>

              <ul className="space-y-3">
                {exerciseData[activeGroup].list.map((ex, i) => (
                  <motion.li 
                    key={ex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-semibold">{ex}</span>
                  </motion.li>
                ))}
              </ul>
              
              <button className="mt-8 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-colors w-fit border border-transparent hover:border-white/20">
                Load Protocol
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center h-full text-zinc-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Select Muscle Group</h3>
              <p className="text-xs max-w-[200px] leading-relaxed">Rotate and select a highlighted zone on the 3D model to load specific training data.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
