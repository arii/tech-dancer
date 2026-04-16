/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, BarChart2, BookOpen, User, Home as HomeIcon, PenTool } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'lab', label: 'Gear Reviews', icon: ShoppingBag },
    { id: 'engine', label: 'Dance Analytics', icon: BarChart2 },
    { id: 'blog', label: 'Blog', icon: PenTool },
    { id: 'feed', label: 'Resources', icon: BookOpen },
    { id: 'about', label: 'About Ariel', icon: User },
  ];

  return (
    <nav className="nav-rail hidden md:flex">
      <div className="space-y-12">
        <div className="logo-area">
          <div className="text-sm font-serif font-bold tracking-[1px] uppercase text-text-main">
            ARIEL ANDERS
          </div>
          <div className="text-[10px] text-accent mt-1 uppercase tracking-widest font-bold">
            MIT Roboticist // WCS Tech-Dancer
          </div>
        </div>

        <ul className="space-y-4">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex items-center gap-3 cursor-pointer py-2 transition-all ${
                activeTab === item.id ? 'active' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                activeTab === item.id ? 'text-accent' : 'text-text-dim group-hover:text-accent'
              }`} />
              <span className={`text-sm font-bold transition-colors ${
                activeTab === item.id ? 'text-accent' : 'text-text-main group-hover:text-accent'
              }`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-8 space-y-4">
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Find Me</div>
            <div className="text-xs font-serif font-bold text-text-main">Wednesdays @ Mission City Swing</div>
            <div className="text-[9px] text-text-dim mt-1">San Francisco, CA</div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-line">
        <div className="text-[10px] text-text-dim italic leading-relaxed">
          "Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle."
        </div>
      </div>
    </nav>
  );
}
