import { Canvas } from '@react-three/fiber';
import { motion } from 'motion/react';
import HeroModel from './HeroModel';
import { Environment, Lightformer } from '@react-three/drei';

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Environment preset="city">
            <Lightformer intensity={4} form="ring" color="white" rotation-y={Math.PI / 2} position={[-5, 2, -1]} scale={[10, 10, 1]} />
          </Environment>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#dc2626" />
          <HeroModel />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#dc2626]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Aegis Core 2.0 Released</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6 text-white"
        >
          BUILD YOUR<br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">STRONGEST</span><br />
          SELF
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 text-lg max-w-md mx-auto mb-10 leading-relaxed"
        >
          Precision coaching powered by AI. Transform your physique with data-driven training, personalized nutrition, and immersive progress tracking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto justify-center"
        >
          <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4 group hover:bg-red-700 transition-colors">
            START TRAINING
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
          <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors">
            VIEW PROGRAMS
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-zinc-500 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </div>
  );
}
