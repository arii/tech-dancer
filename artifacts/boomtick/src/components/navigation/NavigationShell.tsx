import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useSidebarData } from "@/hooks/use-page-data";

const NavigationShell = () => {
  const [open, setOpen] = useState(false);
  const { primaryNavigation } = useSidebarData();

  return (
    <>
      <aside className="fixed top-0 left-0 hidden h-full w-56 flex-col border-r border-border bg-card md:flex z-40">
        <div className="border-b border-border px-4 py-4">
          <Link href="/" className="inline-flex items-center" data-testid="link-home-logo">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {primaryNavigation.map((item) => (
            <Link key={item.label} href={item.href} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center gap-3 px-6 py-3 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground">
              <item.icon size={16} className="shrink-0 text-foreground/70 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border px-6 py-5">
          <p className="text-xs text-foreground/75">
            Written by Ariel Anders
          </p>
          <p className="text-xs text-foreground/65">&copy; {new Date().getFullYear()} boomtick.blog</p>
        </div>
      </aside>

      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="inline-flex items-center" data-testid="link-home-logo-mobile">
            <div className="origin-left scale-[0.62] -translate-x-2">
              <Logo />
            </div>
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex items-center justify-center rounded-md border border-border bg-card p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" data-testid="button-toggle-nav" aria-label="Toggle navigation">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open ? (
          <nav className="border-t border-border bg-card px-3 py-3">
            {primaryNavigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground">
                <item.icon size={16} className="shrink-0 text-primary" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </>
  );
};

export default NavigationShell;
