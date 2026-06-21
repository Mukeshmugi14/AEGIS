/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import AnatomyVisualization from './components/AnatomyVisualization';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden relative">
      {/* Cinematic Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center italic text-sm">A</div>
          AEGIS <span className="text-red-600">//</span> CORE
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#" className="text-white border-b border-red-600 pb-1">Programs</a>
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Nutrition</a>
        </div>
        <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200">
          Join
        </button>
      </nav>

      <main className="relative z-10">
        <Hero />
        <Features />
        
        {/* Anatomy Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
              TARGET <span className="text-red-600">ACQUISITION</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">Interact with the 3D anatomical model to isolate muscle groups and review specialized hypertrophy protocols.</p>
          </div>
          <div className="h-[600px]">
            <AnatomyVisualization />
          </div>
        </section>

        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}
