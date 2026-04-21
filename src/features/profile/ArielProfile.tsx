import { User, Award, Globe, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from './useProfile';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <section>
      <div className="flex flex-col gap-12">
        <PageHeader 
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="col-span-1 lg:col-span-4">
            <div className="flex flex-col gap-12">
              <div className="aspect-square bg-muted border border-line overflow-hidden relative flex items-center justify-center">
                <User className="w-24 h-24 text-line stroke-[0.5]" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {bio.details.map((detail) => (
                  <div key={detail.label} className="pb-4 border-b border-slate-200">
                    <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold block uppercase">{detail.label}</span>
                    <span className="font-display font-bold uppercase tracking-tight leading-none text-lg mt-1 font-bold text-accent-navy">{detail.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="#" 
                className="hover:text-accent transition-colors flex items-center gap-2 text-accent-navy"
              >
                <span className="font-mono tracking-[0.15em] text-xs font-semibold">VIEW FULL BACKGROUND</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-8">
            <div className="flex flex-col gap-16">
              {bio.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4">
                  <div className="pb-4 border-b border-slate-200">
                    <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl font-black text-accent-navy">{section.title}</span>
                  </div>
                  <p className="font-sans leading-relaxed text-text-body text-lg text-text-body leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: User, label: 'Curriculum Vitae' },
                  { icon: Award, label: 'Publications' },
                  { icon: Globe, label: 'Social' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="group hover:border-accent-brand transition-all border border-line bg-surface p-4 flex flex-col items-center gap-3 cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-accent-navy group-hover:text-accent transition-colors" />
                    <span className="font-mono tracking-[0.15em] text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
