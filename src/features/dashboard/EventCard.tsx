import { LucideIcon } from 'lucide-react';

interface EventCardProps {
  name: string;
  date: string;
  status: string;
  icon: LucideIcon;
}

export function EventCard({ name, date, status, icon: Icon }: EventCardProps) {
  return (
    <div
      className="flex flex-col h-full bg-surface/50 border border-line p-6 lg:p-8"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-accent" />
          <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">
            {status}
          </span>
        </div>
        <span className="font-display font-bold uppercase tracking-tight leading-snug text-xl text-accent-navy font-black">
          {name}
        </span>
        <span className="font-sans leading-relaxed text-text-body text-base text-text-dim">
          {date}
        </span>
      </div>
    </div>
  );
}
