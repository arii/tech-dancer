import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ResponsiveDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

export const ResponsiveDiagram: React.FC<ResponsiveDiagramProps> = ({
  chart,
  title,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomScale, setZoomScale] = useState(1.2);
  const [isMobile, setIsMobile] = useState(false);

  // Generate the mermaid.ink URL with dark theme and 24px font size payload
  const diagramUrl = React.useMemo(() => {
    try {
      const config = {
        code: chart,
        mermaid: {
          theme: 'dark',
          themeVariables: {
            fontSize: '24px',
          },
        },
      };
      const jsonStr = JSON.stringify(config);
      const bytes = new TextEncoder().encode(jsonStr);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = window.btoa(binary);
      const base64url = base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      return `https://mermaid.ink/svg/${base64url}`;
    } catch (e) {
      console.error('Failed to encode mermaid chart', e);
      return null;
    }
  }, [chart]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Escape key listener to close overlay
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
    setIsExpanded((prev) => {
      const next = !prev;
      if (next) {
        setZoomScale(isMobile ? 2.0 : 1.2);
      }
      return next;
    });
  };

  // Close overlay when clicking outer background area
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  if (!diagramUrl) {
    return null;
  }

  return (
    <div className={`my-6 rounded-xl border border-line bg-surface p-4 shadow-lg ${className}`}>
      {/* Header Bar */}
      <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-dim">
          {title ?? 'Workflow Diagram'}
        </span>
        <button
          onClick={handleToggleExpand}
          type="button"
          aria-label={isExpanded ? 'Collapse diagram' : 'Expand diagram'}
          className="flex items-center gap-1.5 rounded-lg bg-surface-alt px-2.5 py-1 text-xs font-medium text-text-main transition-colors hover:bg-line/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
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
      <div className="w-full overflow-x-auto py-2 flex justify-center">
        <div
          onClick={handleToggleExpand}
          className="w-full overflow-x-auto py-2 text-center cursor-pointer transition-opacity hover:opacity-90 max-h-96"
          title="Click/Tap to view full screen"
        >
          <img
            src={diagramUrl}
            alt={title ?? "Workflow Diagram"}
            className="mx-auto max-w-full height-auto max-h-80 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Helper Tip */}
      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="inline-flex items-center gap-1 text-[11px] text-text-dim font-medium hover:text-text-main transition-colors focus:outline-none"
        >
          <Maximize2 className="h-3 w-3" />
          <span>Click/Tap diagram to expand & zoom</span>
        </button>
      </div>

      {/* Full-Screen Modal Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md p-4 sm:p-8"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-semibold text-text-main">{title ?? 'Diagram View'}</h3>
            <div className="flex items-center gap-2">
              {/* Zoom Out */}
              <button
                onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                type="button"
                aria-label="Zoom out"
                title="Zoom Out"
                className="rounded-lg bg-surface-alt p-2 text-text-main hover:bg-line/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              {/* Reset Zoom */}
              <button
                onClick={() => setZoomScale(isMobile ? 2.0 : 1.2)}
                type="button"
                aria-label="Reset zoom"
                title="Reset Zoom"
                className="rounded-lg bg-surface-alt p-2 text-text-main hover:bg-line/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              {/* Zoom In */}
              <button
                onClick={() => setZoomScale((prev) => Math.min(4.0, prev + 0.25))}
                type="button"
                aria-label="Zoom in"
                title="Zoom In"
                className="rounded-lg bg-surface-alt p-2 text-text-main hover:bg-line/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <div className="h-6 w-[1px] bg-line mx-1" />
              {/* Close Overlay */}
              <button
                onClick={handleToggleExpand}
                type="button"
                aria-label="Close full screen view"
                className="rounded-lg bg-surface-alt p-2 text-text-main hover:bg-line/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="m-auto transition-all duration-150 cursor-default"
              style={{
                width: `${100 * zoomScale}%`,
                minWidth: `${360 * zoomScale}px`,
                maxWidth: `${1400 * zoomScale}px`,
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking actual diagram content
            >
              <img
                src={diagramUrl}
                alt={title ?? "Workflow Diagram"}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDiagram;
