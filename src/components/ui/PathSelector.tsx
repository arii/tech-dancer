import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

export default function PathSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-y border-line min-h-[60vh] w-full">
      {/* Dancer Path: Lifestyle & Gear */}
      <div className="md:col-span-12 lg:col-span-7 relative group overflow-hidden border-r border-line bg-gradient-to-br from-slate-900 to-blue-900 bg-[length:200%_200%] animate-gradient w-full">
        {/* Scanning Scanline Effect */}
        <motion.div
           variants={{ hover: { top: '100%', opacity: 1 } }}
           initial={{ top: '-10%', opacity: 0 }}
           animate={{ top: '100%', opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
           className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-white">ARE YOU A DANCER?</h2>
          <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold">
            <li>
              <NavLink to="/blog?category=Lifestyle" className="hover:text-accent transition-colors flex items-center gap-2">
                &rarr; Lifestyle blog posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/gear" className="hover:text-accent transition-colors flex items-center gap-2">
                &rarr; Gear reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Path: Robotics & AI */}
      <div className="md:col-span-12 lg:col-span-5 relative group overflow-hidden bg-gradient-to-br from-slate-800 to-blue-950 bg-[length:200%_200%] animate-gradient w-full">
        {/* Scanning Scanline Effect */}
        <motion.div
           variants={{ hover: { top: '100%', opacity: 1 } }}
           initial={{ top: '-10%', opacity: 0 }}
           animate={{ top: '100%', opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
           className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none"
        />

        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <h2 className="text-3xl md:text-5xl font-display font-black mb-4 text-white">HIRING A ROBOTICIST?</h2>
          <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold">
            <li>
              <NavLink to="/blog?category=Tech" className="hover:text-accent transition-colors flex items-center gap-2">
                &rarr; Tech blog posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/research" className="hover:text-accent transition-colors flex items-center gap-2">
                &rarr; Data & Development Lab
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
