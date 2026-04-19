import { motion } from 'motion/react';

export default function PathSelector() {
  return (
    <div className="grid grid-cols-12 gap-0 border-y border-line min-h-[60vh]">
      {/* Dancer Path: Lifestyle & Gear */}
      <motion.div
        className="col-span-12 lg:col-span-7 relative group cursor-pointer overflow-hidden border-r border-line bg-gradient-to-br from-slate-900 to-blue-900"
        whileHover="hover"
      >

        {/* Scanning Scanline Effect */}
        <motion.div
          variants={{ hover: { top: '100%', opacity: 1 } }}
          initial={{ top: '-10%', opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-bg via-bg/40 to-transparent">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4">ARE YOU A DANCER?</h2>
          <ul className="space-y-2 mb-6 font-mono text-sm tracking-widest uppercase text-accent font-bold">
            <li>→ Lifestyle blog posts</li>
            <li>→ Gear reviews</li>
          </ul>
        </div>
      </motion.div>

      {/* Tech Path: Robotics & AI */}
      <motion.div
        className="col-span-12 lg:col-span-5 relative group cursor-pointer overflow-hidden bg-gradient-to-br from-slate-800 to-blue-950"
        whileHover="hover"
      >

        {/* Scanning Scanline Effect */}
        <motion.div
          variants={{ hover: { top: '100%', opacity: 1 } }}
          initial={{ top: '-10%', opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-bg via-bg/40 to-transparent">
          <h2 className="text-3xl md:text-5xl font-display font-black mb-4">HIRING A ROBOTICIST?</h2>
          <ul className="space-y-2 mb-6 font-mono text-sm tracking-widest uppercase text-accent font-bold">
            <li>→ Tech blog posts</li>
            <li>→ Data & Development Lab</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
