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
            <Link key={item.label} href={item.href} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center gap-3 px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
              <item.icon size={16} className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border px-6 py-5">
          <p className="text-xs text-muted-foreground">
            Written by <span className="font-semibold text-primary">Tech Dancer</span>
          </p>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} boomtick.blog</p>
        </div>
      </aside>

      <div className="sticky top-0 z-50 md:hidden">
        <div className="border-b border-border bg-background/98 backdrop-blur">
          <div className="flex h-12 items-center justify-between px-3">
            <Link href="/" className="inline-flex items-center" data-testid="link-home-logo-mobile">
              <div className="origin-left scale-[0.42] -translate-x-5 -translate-y-0.5">
                <Logo />
              </div>
            </Link>
            <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-foreground" data-testid="button-toggle-nav" aria-label="Toggle navigation">
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="absolute left-0 right-0 border-b border-border bg-card px-2 py-2 shadow-2xl">
            {primaryNavigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                <item.icon size={15} className="shrink-0 text-primary" />
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
