import { Link } from "wouter";
import { BookOpen, ShoppingBag, Plane, BarChart2, Info, Search } from "lucide-react";
import Logo from "@/components/Logo";

const navItems = [
  { icon: Search, label: "Search", href: "/" },
  { icon: BookOpen, label: "Blog", href: "/" },
  { icon: Plane, label: "Travel", href: "/" },
  { icon: ShoppingBag, label: "Gear Reviews", href: "/" },
  { icon: BarChart2, label: "Data Lab", href: "/" },
  { icon: Info, label: "About Tech Dancer", href: "/" },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-card border-r border-border z-40 flex flex-col">
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="inline-flex items-center" data-testid="link-home-logo">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-3 px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group"
          >
            <item.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-border space-y-1">
        <p className="text-xs text-muted-foreground">Written by <span className="text-primary font-semibold">Tech Dancer</span></p>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} boomtick.blog</p>
      </div>
    </aside>
  );
};

export default Sidebar;
