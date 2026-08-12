// impeccable-ignore-file
import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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
  const [zoomScale, setZoomScale] = useState<number>(1.5); // Default to a larger zoom on expand for mobile legibility
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  // Detect screen size to adjust chart orientation definition dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-set initial zoom scale to be more responsive to viewports
      setZoomScale(mobile ? 2.0 : 1.2);
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

  // Accessibility: Listen for Escape key to close overlay
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Close overlay when clicking outer background area
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
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
        onClick={handleToggleExpand}
        className="w-full overflow-x-auto py-2 text-center cursor-pointer transition-opacity hover:opacity-90 [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:height-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        title="Click/Tap to view full screen"
      />

      {/* Helper Tip */}
      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium hover:text-slate-400 transition-colors focus:outline-none"
        >
          <Maximize2 className="h-3 w-3" />
          <span>Click/Tap diagram to expand & zoom</span>
        </button>
      </div>

      {/* Full-Screen Modal Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-semibold text-slate-200">{title ?? 'Diagram View'}</h3>
            <div className="flex items-center gap-2">
              {/* Zoom Out */}
              <button
                onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                type="button"
                aria-label="Zoom out"
                title="Zoom Out"
                className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              {/* Reset Zoom */}
              <button
                onClick={() => setZoomScale(isMobile ? 2.0 : 1.2)}
                type="button"
                aria-label="Reset zoom"
                title="Reset Zoom"
                className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              {/* Zoom In */}
              <button
                onClick={() => setZoomScale((prev) => Math.min(4.0, prev + 0.25))}
                type="button"
                aria-label="Zoom in"
                title="Zoom In"
                className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <div className="h-6 w-[1px] bg-slate-800 mx-1" />
              {/* Close Overlay */}
              <button
                onClick={handleToggleExpand}
                type="button"
                aria-label="Close full screen view"
                className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Zoomed Container */}
          <div
            className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-start select-none cursor-zoom-out"
            onClick={handleOverlayClick}
          >
            <div
              className="m-auto transition-all duration-150 [&_svg]:w-full [&_svg]:h-auto cursor-default"
              style={{
                width: `${100 * zoomScale}%`,
                minWidth: `${360 * zoomScale}px`,
                maxWidth: `${1400 * zoomScale}px`,
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking actual diagram content
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDiagram;
