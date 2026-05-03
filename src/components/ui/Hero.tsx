import React from 'react';

function Feature({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan to-purple opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="text-muted transition-colors duration-300 group-hover:text-text">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 items-center">

        {/* LEFT */}
        <div className="col-span-12 md:col-span-5">

          {/* Eyebrow */}
          <p className="text-xs tracking-widest text-muted mb-4">
            WEST COAST SWING
          </p>

          {/* Headline */}
          <h1 className="text-5xl font-semibold leading-tight text-text">
            Built for dancers.
          </h1>

          <h2 className="text-5xl font-semibold leading-tight mt-2">
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Train smarter.
            </span>{" "}
            <span className="text-text">Dance better.</span>
          </h2>

          {/* Sub */}
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-md">
            Systems, travel, and insights for competitive WCS dancers.
          </p>

          {/* Feature Row */}
          <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">

            <Feature label="Train smarter" />
            <Feature label="Travel better" />
            <Feature label="Shop smarter" />
            <Feature label="Use data" />

          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="col-span-12 md:col-span-7 relative">
          <div className="w-full h-[420px] rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 border border-white/5 relative overflow-hidden group">

            {/* waveform lines */}
            <div className="absolute inset-0 flex items-end justify-center gap-1 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-gradient-brand transition-all duration-300 group-hover:opacity-80"
                  style={{ height: `${20 + Math.random() * 200}px` }}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
