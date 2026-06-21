import { motion } from 'motion/react';
import { Target, Zap, Flame } from 'lucide-react';

export default function Dashboard() {
  return (
    <section className="py-32 px-6 bg-[#050505] relative z-10 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
              YOUR PROGRESS, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">VISUALIZED.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Experience a dashboard that feels alive. Real-time telemetry, muscle strain analysis, and predictive recovery modeling.
            </p>
            
            <ul className="space-y-6">
              {[
                { label: "Hypertrophy Index", value: "8.4", icon: Flame, color: "text-red-600" },
                { label: "CNS Recovery", value: "92%", icon: Zap, color: "text-blue-500" },
                { label: "Target Adherence", value: "100%", icon: Target, color: "text-emerald-500" },
              ].map((stat, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <stat.icon className={stat.color} size={20} />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
                    <div className="text-2xl font-black">{stat.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Dashboard Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative perspective-[1000px]"
          >
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden aspect-[4/3] rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out flex flex-col p-6">
              {/* Mock Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-zinc-800" />
                  <div className="w-2 h-2 bg-zinc-800" />
                  <div className="w-2 h-2 bg-zinc-800" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Session Data</div>
              </div>

              {/* Mock Chart Area */}
              <div className="flex-1 flex gap-2 items-end justify-between">
                {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                  <div key={i} className="w-full relative group flex flex-col justify-end h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full bg-zinc-800 min-h-[5%] relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]" />
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Mock Footer Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-16 bg-white/[0.02] border border-white/5 flex flex-col justify-center px-4">
                      <div className="h-1 w-6 bg-zinc-800 mb-2" />
                      <div className="h-4 w-12 bg-white/10" />
                   </div>
                 ))}
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
