import { Link, useLocation } from "wouter";
import { Search, BookOpen, ShoppingBag, FlaskConical, User, Send } from "lucide-react";

const navItems = [
  { icon: Search, label: "Search", href: "/" },
  { icon: BookOpen, label: "Blog Posts", href: "/" },
  { icon: ShoppingBag, label: "Gear Reviews", href: "/" },
  { icon: FlaskConical, label: "Data & Development Lab", href: "/" },
  { icon: User, label: "About", href: "/" },
  { icon: Send, label: "Contact", href: "/" },
];

const Sidebar = () => {
  const [location] = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-card border-r border-border z-40 flex flex-col">
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-1.5 font-black text-xl tracking-tighter text-foreground">
          <span className="text-primary">B\</span>
          <span>boomtick</span>
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

      <div className="px-6 py-5 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} boomtick.blog
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
