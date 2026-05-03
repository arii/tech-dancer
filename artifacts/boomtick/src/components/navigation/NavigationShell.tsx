import { Link } from "wouter";
import Logo from "@/components/Logo";
import { useSidebarData } from "@/hooks/use-page-data";

const NavigationShell = () => {
  const { primaryNavigation } = useSidebarData();

  return (
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
  );
};

export default NavigationShell;
