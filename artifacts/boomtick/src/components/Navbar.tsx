import React from "react";
import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter text-foreground">
          <span className="text-primary">B\</span>
          <span>boomtick</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wide">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">BLOG</Link>
          <Link href="/" className="text-foreground hover:text-primary transition-colors">GEAR</Link>
          <Link href="/" className="text-foreground hover:text-primary transition-colors">DATA LAB</Link>
          <Link href="/" className="text-foreground hover:text-primary transition-colors">TRAVEL</Link>
        </div>
        
        <button className="border-2 border-primary text-primary px-6 py-2.5 font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest rounded-md">
          Subscribe
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
