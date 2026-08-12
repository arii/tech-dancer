// impeccable-ignore-file
import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2 } from 'lucide-react';

export interface ResponsiveDiagramProps {
  /** Raw Mermaid.js definition string */
  chart: string;
  /** Optional caption or title for the diagram */
  title?: string;
  /** Optional custom CSS classes for the container */
  className?: string;
}

if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      darkMode: true,
      background: '#090d16',
      primaryColor: '#1e293b',
      primaryTextColor: '#f8fafc',
      primaryBorderColor: '#334155',
      lineColor: '#38bdf8',
      secondaryColor: '#0f172a',
      tertiaryColor: '#1e1b4b',
    },
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  });
}

export const ResponsiveDiagram: React.FC<ResponsiveDiagramProps> = ({
  chart,
  title,
  className = '',
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  // Detect screen size to adjust chart orientation definition dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adapt LR (Left-Right) to TD (Top-Down) on mobile screens for natural scrolling
  const processChartDefinition = (rawChart: string, mobile: boolean): string => {
    if (!mobile) return rawChart;
    return rawChart.replace(/graph\s+LR/g, 'graph TD').replace(/flowchart\s+LR/g, 'flowchart TD');
  };

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      if (typeof window === 'undefined') return;
      try {
        const adaptedChart = processChartDefinition(chart, isMobile);
        const { svg } = await mermaid.render(idRef.current, adaptedChart);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (error) {
        console.error('[ResponsiveDiagram] Rendering failed:', error);
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart, isMobile]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`my-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg ${className}`}>
      {/* Header Bar */}
      <div className="mb-3 flex items-center justify-between border-b border-slate-800/80 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title ?? 'Workflow Diagram'}
        </span>
        <button
          onClick={handleToggleExpand}
          type="button"
          aria-label={isExpanded ? 'Collapse diagram' : 'Expand diagram'}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {isExpanded ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Full Screen</span>
            </>
          )}
        </button>
      </div>

      {/* Embedded Render View */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto py-2 text-center [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:height-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Full-Screen Modal Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-semibold text-slate-200">{title ?? 'Diagram View'}</h3>
            <button
              onClick={handleToggleExpand}
              type="button"
              className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
          </div>
          <div
            className="flex-1 overflow-auto py-8 flex items-center justify-center [&_svg]:max-w-none [&_svg]:w-full [&_svg]:max-h-[80vh]"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      )}
    </div>
  );
};
