import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Cpu, Search, Calendar, ShieldCheck, Zap, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const WorkflowExplainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-surface border border-line/70 rounded-2xl overflow-hidden shadow-md">
      {/* Collapsible Header Banner (Balanced Vertical Alignment) */}
      <button
        id="workflow-explainer-trigger"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="workflow-explainer-content"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-muted/50 hover:bg-muted/80 transition-colors text-left cursor-pointer border-b border-line/40 min-h-[56px]"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan shrink-0">
            <Icon icon={Cpu} size="sm" />
          </div>
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-text-main">
                How WCS Navigator Works
              </span>
              <span className="text-[10px] font-mono font-bold rounded px-2 py-0.5 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                GUIDE
              </span>
            </div>
            <p className="text-xs text-text-dim">
              How your convention schedule is read, filtered by your dance level, and synced to your calendar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-text-dim hover:text-white shrink-0">
          <span>{isExpanded ? 'Hide Details' : 'How It Works'}</span>
          <Icon icon={isExpanded ? ChevronUp : ChevronDown} size="xs" />
        </div>
      </button>

      {/* Expanded Workflow Cards & Standards (Generous 24px / p-6 Padding) */}
      {isExpanded && (
        <div
          id="workflow-explainer-content"
          role="region"
          aria-labelledby="workflow-explainer-trigger"
          className="p-6 space-y-6"
        >
          {/* Vertical Stack Cards (No Split Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 Card */}
            <div className="bg-muted/40 border border-line/60 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-all">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-cyan/20 text-brand-cyan">
                    <Icon icon={Search} size="xs" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                    Step 1: Schedule Reading
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-main">
                  Schedule Discovery
                </h4>
                <p className="text-xs text-text-dim leading-relaxed">
                  Reads multi-room convention timetables to identify workshop levels, competitive divisions, and late-night social themes.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/80 border border-line/40">
                <span className="text-xs text-text-dim block">
                  Extracts: <strong className="text-brand-cyan">Workshops, Prelims &amp; Socials</strong>
                </span>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="bg-muted/40 border border-line/60 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-all">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Icon icon={Zap} size="xs" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-amber">
                    Step 2: Buffer Calculation
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-main">
                  Travel &amp; Rest Planning
                </h4>
                <p className="text-xs text-text-dim leading-relaxed">
                  Calculates backward transit, hotel check-in, and warm-up buffers before your first event so you never rush into competition calls.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/80 border border-line/40">
                <span className="text-xs text-text-dim block">
                  Calculates: <strong className="text-brand-amber">Arrival Deadline &amp; Rest Times</strong>
                </span>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-muted/40 border border-line/60 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-all">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <Icon icon={Calendar} size="xs" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
                    Step 3: Calendar Sync
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-main">
                  Ready-to-Use Calendar
                </h4>
                <p className="text-xs text-text-dim leading-relaxed">
                  Generates an .ics calendar file formatted with your selected workshops, competition alarms, and packing checklist.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/80 border border-line/40">
                <span className="text-xs text-text-dim block">
                  Format: <strong className="text-brand-emerald">Apple &amp; Google Calendar (.ics)</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Standards & Badges Footer with Generous Padding */}
          <div className="pt-4 border-t border-line/50 flex items-center justify-between flex-wrap gap-4 text-xs text-text-dim">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Icon icon={ShieldCheck} size="xs" color="accent" />
                <span>Private &amp; Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={Sparkles} size="xs" color="accent" />
                <span>Personalized Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={Cpu} size="xs" color="accent" />
                <span>Instant Calendar Download</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

