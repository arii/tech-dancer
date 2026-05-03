import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-bg text-white overflow-hidden relative">
      <div className="fixed inset-x-0 top-0 z-50 h-12 flex items-center justify-between px-3 text-[11px] font-bold tracking-[0.22em] uppercase">
        <div>Boom Tick</div>
        <div className="flex gap-3 text-[16px] opacity-90">
          <span>○</span>
          <span>≡</span>
        </div>
      </div>
      <div className="absolute inset-x-0 top-12 bottom-0 grid-pattern opacity-80" />
      <main className="relative z-10 mx-auto max-w-[920px] px-3 pt-16">
        <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent mb-3">West Coast Swing</div>
        <h1 className="m-0 font-display font-black tracking-[-0.05em] leading-[0.94] text-[clamp(50px,9.2vw,92px)]">
          Built for dancers.<br />
          <span className="bg-[linear-gradient(90deg,#27e7ff_0%,#6c77ff_55%,#df37ff_100%)] bg-clip-text text-transparent">Train smarter.</span><br />
          Dance better.
        </h1>
        <div className="w-12 h-[3px] bg-[linear-gradient(90deg,#27e7ff,#6c77ff)] mt-5 mb-4" />
        <p className="max-w-[340px] text-white/55 text-[15px] leading-[1.55] mb-6">
          Training, travel, and data for competitive West Coast Swing dancers.
        </p>
        <div className="grid grid-cols-4 gap-2 max-w-[330px] mb-6">
          <div><div className="w-[34px] h-[34px] rounded-xl border border-cyan-300/25 bg-cyan-300/5 shadow-[0_0_10px_rgba(39,231,255,.22)]" /><div className="mt-2 text-[9px] leading-[1.08] tracking-[0.22em] font-bold">TRAIN<br /><span className="text-accent">SMARTER</span></div></div>
          <div><div className="w-[34px] h-[34px] rounded-xl border border-indigo-300/25 bg-indigo-300/5 shadow-[0_0_10px_rgba(108,119,255,.22)]" /><div className="mt-2 text-[9px] leading-[1.08] tracking-[0.22em] font-bold">TRAVEL<br /><span className="text-[#6c77ff]">BETTER</span></div></div>
          <div><div className="w-[34px] h-[34px] rounded-xl border border-fuchsia-300/25 bg-fuchsia-300/5 shadow-[0_0_10px_rgba(223,55,255,.22)]" /><div className="mt-2 text-[9px] leading-[1.08] tracking-[0.22em] font-bold">SHOP<br /><span className="text-[#df37ff]">SMARTER</span></div></div>
          <div><div className="w-[34px] h-[34px] rounded-xl border border-indigo-300/25 bg-indigo-300/5 shadow-[0_0_10px_rgba(108,119,255,.22)]" /><div className="mt-2 text-[9px] leading-[1.08] tracking-[0.22em] font-bold">USE<br /><span className="text-[#6c77ff]">DATA</span></div></div>
        </div>
        <div className="h-[430px] rounded-[24px] relative overflow-hidden bg-[radial-gradient(circle_at_50%_80%,rgba(39,231,255,.11),transparent_30%),linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01))] shadow-[0_0_0_1px_rgba(255,255,255,.05),0_28px_90px_rgba(0,0,0,.52)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0_3%,#22d8ef_3%_5%,transparent_5%_7%,#24c5ee_7%_9%,transparent_9%_12%,#2bb1f0_12%_14%,transparent_14%_16%,#4796f1_16%_18%,transparent_18%_21%,#6c77ff_21%_23%,transparent_23%_25%,#7b5cff_25%_27%,transparent_27%_30%,#9a4df7_30%_32%,transparent_32%_34%,#c33bf4_34%_36%,transparent_36%_38%,#df37ff_38%_40%,transparent_40%_43%,#ff2fbf_43%_45%,transparent_45%_47%,#ff2b92_47%_49%,transparent_49%_100%)] opacity-95 blur-[0.2px]" />
        </div>
        <div className="relative -mt-14 rounded-[18px] border border-white/8 bg-[#080810]/82 backdrop-blur-xl px-4 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.28em] font-bold uppercase">Weekly Insights</div>
            <div className="mt-1 text-[11px] text-white/48 truncate">Dance analytics // Gear reviews // Community updates</div>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <div className="min-w-[112px] rounded-xl bg-[#0c0f1e] px-3 py-3 text-[13px] text-white/42">Email Address</div>
            <div className="rounded-xl bg-[linear-gradient(90deg,#27e7ff,#6c77ff)] px-3 py-3 text-[11px] font-black uppercase tracking-[0.12em]">Subscribe →</div>
          </div>
        </div>
      </main>
    </div>
  </StrictMode>,
);
