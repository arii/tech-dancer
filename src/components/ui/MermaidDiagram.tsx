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
      primaryColor: '#7c3aed',
      primaryTextColor: '#f1f5f9',
      primaryBorderColor: '#4c1d95',
      lineColor: '#6366f1',
      secondaryColor: '#1e1b4b',
      tertiaryColor: '#0f172a',
      background: '#0f172a',
      mainBkg: '#1e1b4b',
      nodeBorder: '#4c1d95',
      clusterBkg: '#1e1b4b',
      titleColor: '#f1f5f9',
      edgeLabelBackground: '#1e1b4b',
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
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
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

        // Make SVG responsive
        const svgEl = containerRef.current.querySelector('svg');
        if (svgEl) {
          svgEl.setAttribute('width', '100%');
          svgEl.style.maxWidth = '100%';
        }

        setRendered(true);
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
