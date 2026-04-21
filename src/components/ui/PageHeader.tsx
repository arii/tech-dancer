interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="pb-10 border-b border-slate-200">
      <div className="flex flex-col gap-4">
        <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">
          {label}
        </span>
        <h1 className="font-display font-bold uppercase tracking-tighter leading-tight text-5xl md:text-7xl text-accent-navy text-balance">
          {title}
        </h1>
        {description && (
          <p className="font-sans leading-relaxed text-text-body text-lg text-text-dim max-w-3xl mt-4 font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-end border-b border-slate-200 pb-4">
      <div className="flex flex-col gap-1">
        <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold">{label}</span>
        <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl font-black text-accent-navy">{title}</span>
      </div>
      {children}
    </div>
  );
}
