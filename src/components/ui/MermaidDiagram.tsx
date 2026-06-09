// impeccable-ignore-file
import { useEffect, useRef, useState } from 'react';
import { Box } from '@/layouts/Primitives';

let mermaidInitialized = false;

async function ensureMermaid() {
  if (mermaidInitialized) return;
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      primaryColor: 'var(--raw-color-accent-purple)',
      primaryTextColor: 'var(--raw-color-text-main)',
      primaryBorderColor: 'color-mix(in srgb, var(--raw-color-accent-purple) 50%, var(--raw-color-surface-alt))',
      lineColor: 'var(--raw-color-accent-sky)',
      secondaryColor: 'var(--raw-color-surface-alt)',
      tertiaryColor: 'var(--raw-color-surface)',
      background: 'var(--raw-color-surface)',
      mainBkg: 'var(--raw-color-surface-alt)',
      nodeBorder: 'color-mix(in srgb, var(--raw-color-accent-purple) 50%, var(--raw-color-surface-alt))',
      clusterBkg: 'var(--raw-color-surface-alt)',
      titleColor: 'var(--raw-color-text-main)',
      edgeLabelBackground: 'var(--raw-color-surface-alt)',
      fontSize: '14px',
    },
    flowchart: { curve: 'basis', htmlLabels: true },
    sequence: { actorFontFamily: 'monospace', messageFontFamily: 'monospace' },
  });
  mermaidInitialized = true;
  return mermaid;
}

let diagramCounter = 0;

interface MermaidDiagramProps {
  code: string;
  alt?: string;
}

export function MermaidDiagram({ code, alt = 'Mermaid Diagram' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${++diagramCounter}`);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!containerRef.current) return;
      try {
        const mermaid = (await import('mermaid')).default;
        await ensureMermaid();
        if (cancelled) return;

        const { svg } = await mermaid.render(idRef.current, code.trim());
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;

        // Make SVG responsive and accessible
        const svgEl = containerRef.current.querySelector('svg');
        if (svgEl) {
          svgEl.setAttribute('width', '100%');
          svgEl.style.maxWidth = '100%';
          svgEl.setAttribute('role', 'img');
          svgEl.setAttribute('aria-label', alt);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Diagram render error');
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <Box
        padding={4}
        radius="md"
        border
        surface="warning"
        className="font-mono text-xs text-yellow-400 overflow-x-auto"
      >
        <span className="block font-bold mb-1 uppercase tracking-widest text-yellow-500 text-[10px]">
          Mermaid render error
        </span>
        {error}
      </Box>
    );
  }

  return (
    <Box
      marginY={8}
      radius="lg"
      border
      surface="surface"
      className="overflow-x-auto"
    >
      {/* inner div allows the SVG to be its natural width on mobile and scroll */}
      <div
        style={{ padding: '1.5rem', minWidth: 480 }}
        ref={containerRef}
      />
    </Box>
  );
}
