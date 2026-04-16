/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, BarChart2, BookOpen, User, Home as HomeIcon, PenTool, Menu, X, Mail, FileText } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'lab', label: 'Gear Reviews', icon: ShoppingBag },
    { id: 'engine', label: 'Dance Analytics', icon: BarChart2 },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'feed', label: 'Resources', icon: BookOpen },
    { id: 'drafter', label: 'Drafter', icon: PenTool },
    { id: 'about', label: 'About Ariel', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-line z-[60] flex items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-xs font-display font-bold tracking-[1px] uppercase text-text-main">Ariel Anders</span>
          <span className="text-[8px] text-accent uppercase tracking-widest font-bold">MIT Roboticist // WCS</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-main hover:text-accent transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-bg z-[100] pt-24 px-8 overflow-y-auto">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 py-3 border-b border-line/50 ${
                  activeTab === item.id ? 'text-accent' : 'text-text-main'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-lg font-display font-bold uppercase tracking-tight">{item.label}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 p-6 bg-accent/5 border border-accent/20">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2">Find Me</div>
            <div className="text-sm font-display font-bold text-text-main uppercase">Wednesdays @ Mission City Swing</div>
            <div className="text-[10px] text-text-dim mt-1 font-mono uppercase tracking-widest">San Francisco, CA</div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <nav className="nav-rail flex-col justify-between">
        <div className="space-y-12">
          <div className="logo-area">
            <div className="text-sm font-display font-black tracking-[1px] uppercase text-text-main">
              ARIEL ANDERS
            </div>
            <div className="text-[9px] text-accent mt-1 uppercase tracking-[0.2em] font-bold">
              MIT ROBOTICIST // WCS
            </div>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex items-center gap-3 cursor-pointer py-2 px-1 transition-all ${
                  activeTab === item.id ? 'text-accent' : 'text-text-dim hover:text-accent'
                }`}
              >
                <item.icon className="w-4 h-4 stroke-1" />
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest transition-colors`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-8 space-y-4">
            <div className="p-4 bg-accent/5 border border-accent/20">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2 underline underline-offset-4">Location_Log</div>
              <div className="text-[11px] font-display font-bold text-text-main uppercase leading-tight">Wednesdays @ Mission City Swing</div>
              <div className="text-[9px] font-mono text-text-dim mt-1 uppercase tracking-widest">SF // CA</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-line">
          <div className="text-[9px] font-mono text-text-dim uppercase tracking-widest leading-relaxed">
            SYSTEM_PROTOCOL: 2026_V1.0
            <br />
            STATUS: ACTIVE_OPTIMIZATION
          </div>
        </div>
      </nav>
    </>
  );
}
