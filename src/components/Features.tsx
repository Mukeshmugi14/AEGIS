import { motion } from 'motion/react';
import { Activity, Brain, Target, Utensils } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    icon: Brain,
    title: "AI Workout Coach",
    description: "Adaptive algorithms that evolve your routine based on micro-progressions and recovery state.",
    color: "electric"
  },
  {
    icon: Activity,
    title: "Progress Tracking",
    description: "Cinematic data visualizations of your physiological changes over time.",
    color: "crimson"
  },
  {
    icon: Target,
    title: "Exercise Library",
    description: "4K motion-captured tutorials ensuring biomechanically perfect execution.",
    color: "electric"
  },
  {
    icon: Utensils,
    title: "Nutrition Planning",
    description: "Macro-optimized meal routing synchronized automatically with your daily burn.",
    color: "crimson"
  }
];

export default function Features() {
  return (
    <section className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
            ENGINEERED FOR <span className="text-zinc-500">EXCELLENCE</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Our platform merges cutting-edge technology with elite sports science to deliver a training experience previously reserved for professional athletes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 overflow-hidden flex flex-col items-start cursor-pointer hover:border-zinc-700 transition-colors"
            >
              {/* Background gradient flare on hover */}
              <div className={cn(
                "absolute -inset-20 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[50px] pointer-events-none",
                feature.color === 'electric' ? "bg-blue-600" : "bg-red-600"
              )} />
              
              <div className={cn(
                "w-10 h-10 flex items-center mb-6 relative z-10",
                feature.color === 'electric' ? "text-blue-500" : "text-red-500"
              )}>
                <feature.icon size={24} strokeWidth={2} />
              </div>
              
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3 relative z-10 text-white">{feature.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
