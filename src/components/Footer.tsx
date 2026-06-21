export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-[#050505] relative z-10 gap-6">
      <div className="flex gap-6 md:gap-12 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Volume</span>
          <span className="text-sm font-bold">42,500 LBS <span className="text-[10px] text-zinc-500">/ WK</span></span>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Consistency</span>
          <span className="text-sm font-bold">24 <span className="text-[10px] text-zinc-500 uppercase">Day Streak</span></span>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Nutrition</span>
          <span className="text-sm font-bold">3,200 <span className="text-[10px] text-zinc-500 uppercase">Kcal</span></span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        <span>Version 4.0.2</span>
        <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
        <span>Secure Access</span>
        <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
        <span className="text-white">v.STRNG_BETA</span>
      </div>
    </footer>
  );
}
