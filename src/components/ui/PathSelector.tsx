import { NavLink } from 'react-router-dom';

export default function PathSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-y border-line min-h-[60vh] w-full">
      {/* --- DANCER PATH --- */}
      <div className="md:col-span-12 lg:col-span-7 relative group overflow-hidden border-r border-line cursor-pointer w-full">
        {/* Background: Grayscale by default, colored on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900 bg-[length:200%_200%] animate-gradient grayscale group-hover:grayscale-0 transition-all duration-700"></div>

        {/* Scanline: Hidden by default, visible and scanning on hover */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] opacity-0 group-hover:opacity-100 animate-scanline z-10 pointer-events-none transition-opacity duration-500"></div>

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
      <div className="md:col-span-12 lg:col-span-5 relative group overflow-hidden cursor-pointer w-full">
        {/* Background: Grayscale by default, colored on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-950 bg-[length:200%_200%] animate-gradient grayscale group-hover:grayscale-0 transition-all duration-700"></div>

        {/* Scanline: Hidden by default, visible and scanning on hover */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] opacity-0 group-hover:opacity-100 animate-scanline z-10 pointer-events-none transition-opacity duration-500 delay-100"></div>

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
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span> Data & Development Lab
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
