import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, BookOpen, ShoppingBag, BarChart2, Globe, Mail, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

const primaryNavigation = [
  { icon: BookOpen, label: "Blog Posts", href: "/blog" },
  { icon: ShoppingBag, label: "Gear Reviews", href: "/gear" },
  { icon: BarChart2, label: "Data & Development Lab", href: "/research" },
  { icon: Globe, label: "About", href: "/about" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

const NavigationShell = () => {
  const [open, setOpen] = useState(false);
  const { open: openSearch } = useGlobalSearch();

  return (
    <>
      <Box as="aside" position="fixed" top={0} left={0} className="hidden h-full w-56 flex-col border-r border-border bg-card md:flex z-40" aria-label="Main Navigation">
        <Box className="border-b border-border px-4 py-4">
          <Logo />
        </Box>
        <Box as="nav" flex={1} overflowY="auto" paddingY={4} aria-label="Primary">
          <Box as="button" onClick={openSearch} display="flex" align="center" gap={3} paddingX={6} paddingY={3} width="full" className="group min-h-11 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground text-left">
            <Search size={16} className="shrink-0 text-foreground/70 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
            <span>Search</span>
          </Box>
          {primaryNavigation.map((item) => (
            <Box as={NavLink} key={item.label} to={item.href} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} display="flex" align="center" gap={3} paddingX={6} paddingY={3} className="group min-h-11 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground">
              <item.icon size={16} className="shrink-0 text-foreground/70 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
              <span>{item.label}</span>
            </Box>
          ))}
        </Box>
        <Stack gap={1} className="border-t border-border px-6 py-5">
          <Text variant="sans" size="xs" className="text-foreground/75">Written by Ariel Anders</Text>
          <Text variant="sans" size="xs" className="text-foreground/65">&copy; {new Date().getFullYear()} boomtick.blog</Text>
        </Stack>
      </Box>

      <Box position="sticky" top={0} z={50} className="border-b border-border bg-background/95 backdrop-blur md:hidden">
        <Box display="flex" align="center" justify="between" gap={3} paddingX={4} paddingY={3}>
          <Box className="min-w-0 origin-left scale-[0.58] -translate-x-3 -translate-y-1">
            <Logo />
          </Box>
          <Box display="flex" align="center" gap={2}>
            <button type="button" onClick={openSearch} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" aria-label="Open search">
              <Search size={18} />
            </button>
            <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" data-testid="button-toggle-nav" aria-label="Toggle navigation">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </Box>
        </Box>
        {open ? (
          <Box as="nav" className="border-t border-border bg-card px-3 py-3" aria-label="Mobile primary">
            <Box as="button" onClick={() => { setOpen(false); openSearch(); }} display="flex" align="center" gap={3} radius="lg" paddingX={4} paddingY={3} width="full" className="min-h-11 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground text-left">
              <Search size={16} className="shrink-0 text-primary" />
              <span>Search</span>
            </Box>
            {primaryNavigation.map((item) => (
              <Box as={NavLink} key={item.label} to={item.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`} display="flex" align="center" gap={3} radius="lg" paddingX={4} paddingY={3} className="min-h-11 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground">
                <item.icon size={16} className="shrink-0 text-primary" />
                <span>{item.label}</span>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavigationShell;
