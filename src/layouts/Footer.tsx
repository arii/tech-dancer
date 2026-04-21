export function Footer() {
  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="py-12 px-4 bg-bg opacity-80 border-t border-slate-200 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-mono tracking-[0.15em] text-xs text-text-dim weight-font-semibold uppercase">
          © 2026 TECH-DANCER
        </span>
        <div className="flex flex-row gap-2 items-center">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="p-2 border border-line hover:border-accent-brand hover:text-accent-brand transition-colors text-text-dim hover:text-accent rounded-sm"
            >
              <span className="font-mono tracking-[0.15em] text-xs uppercase font-semibold">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
