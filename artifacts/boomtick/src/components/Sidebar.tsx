import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { sidebarNavItems } from "@/content/siteContent";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed top-0 left-0 h-full w-56 bg-card border-r border-border z-40 hidden md:flex flex-col">
        <div className="px-4 py-4 border-b border-border"><Link href="/" className="inline-flex items-center" data-testid="link-home-logo"><Logo /></Link></div>
        <nav className="flex-1 py-4 overflow-y-auto">{sidebarNavItems.map((item) => (<Link key={item.label} href={item.href} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group"><item.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" /><span>{item.label}</span></Link>))}</nav>
        <div className="px-6 py-5 border-t border-border space-y-1"><p className="text-xs text-muted-foreground">Written by <span className="text-primary font-semibold">Tech Dancer</span></p><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} boomtick.blog</p></div>
      </aside>

      <div className="md:hidden sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3"><Link href="/" className="inline-flex items-center" data-testid="link-home-logo-mobile"><div className="scale-[0.62] -translate-x-2 origin-left"><Logo /></div></Link><button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex items-center justify-center rounded-md border border-border bg-card p-2 text-foreground" data-testid="button-toggle-nav" aria-label="Toggle navigation">{open ? <X size={18} /> : <Menu size={18} />}</button></div>
        {open ? (<nav className="border-t border-border bg-card px-3 py-3">{sidebarNavItems.map((item) => (<Link key={item.label} href={item.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"><item.icon size={16} className="text-primary shrink-0" /><span>{item.label}</span></Link>))}</nav>) : null}
      </div>
    </>
  );
};

export default Sidebar;