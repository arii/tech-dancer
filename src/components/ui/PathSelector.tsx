import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<'dancer' | 'roboticist' | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-y border-line min-h-[60vh] w-full bg-black">
      {/* --- DANCER PATH --- */}
      <div
        className="lg:col-span-7 relative group overflow-hidden cursor-pointer border-r border-line/20"
        onMouseEnter={() => setHoveredPath('dancer')}
        onMouseLeave={() => setHoveredPath(null)}
      >
        {/* Background: Colored by default, grayscales if other is hovered */}
        <div className={`absolute inset-0 bg-gradient-to-br from-accent/30 to-black transition-all duration-700 ease-in-out ${hoveredPath === 'roboticist' ? 'grayscale opacity-60' : 'opacity-100'}`}></div>

        {/* Scanline: Hidden by default, visible and scanning ONLY when hovered */}
        <div className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500 ${hoveredPath === 'dancer' ? 'opacity-100 animate-scanline' : 'opacity-0'}`}></div>

        {/* Content Container */}
        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2">
            ARE YOU A DANCER?
          </h2>
          <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <li>
              <NavLink className="hover:text-accent transition-colors flex items-center gap-2" to="/blog?category=Lifestyle">
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span> Lifestyle blog posts
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-accent transition-colors flex items-center gap-2" to="/gear">
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span> Gear reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* --- ROBOTICIST PATH --- */}
      <div
        className="lg:col-span-5 relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setHoveredPath('roboticist')}
        onMouseLeave={() => setHoveredPath(null)}
      >
        {/* Background: Colored by default, grayscales if other is hovered */}
        <div className={`absolute inset-0 bg-gradient-to-bl from-accent/30 to-black transition-all duration-700 ease-in-out ${hoveredPath === 'dancer' ? 'grayscale opacity-60' : 'opacity-100'}`}></div>

        {/* Scanline: Hidden by default, visible and scanning ONLY when hovered */}
        <div className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none transition-opacity duration-500 ${hoveredPath === 'roboticist' ? 'opacity-100 animate-scanline delay-100' : 'opacity-0'}`}></div>

        {/* Content Container */}
        <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <h2 className="text-3xl md:text-5xl font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2">
            HIRING A ROBOTICIST?
          </h2>
          <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <li>
              <NavLink className="hover:text-accent transition-colors flex items-center gap-2" to="/blog?category=Tech">
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span> Tech blog posts
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-accent transition-colors flex items-center gap-2" to="/research">
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span> Data &amp; Development Lab
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
