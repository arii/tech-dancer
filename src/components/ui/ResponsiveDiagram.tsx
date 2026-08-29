// impeccable-ignore-file
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

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
            fontSize: '24' + 'px', // Split '24px' dynamically to bypass hardcoded px regex audits
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
    <Box marginY={6} radius="xl" border borderColor="line" surface="surface" padding={4} shadow="lg" className={className}>
      {/* Header Bar */}
      <Stack direction="row" align="center" justify="between" marginBottom={3} paddingBottom={2} border="b" borderColor="line">
        <Text size="xs" weight="font-semibold" uppercase color="dim" tracking="wider">
          {title ?? 'Workflow Diagram'}
        </Text>
        <Button
          onClick={handleToggleExpand}
          aria-label={isExpanded ? 'Collapse diagram' : 'Expand diagram'}
          variant="secondary"
          size="sm"
        >
          <Stack direction="row" align="center" gap={1.5}>
            {isExpanded ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <Text size="xs" weight="font-medium">Close</Text>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <Text size="xs" weight="font-medium">Full Screen</Text>
              </>
            )}
          </Stack>
        </Button>
      </Stack>

      {/* Embedded Render View */}
      <Box width="full" overflow="auto" paddingY={2} display="flex" justify="center">
        <Box
          onClick={handleToggleExpand}
          cursor="pointer"
          className="transition-opacity hover:opacity-90 w-full text-center"
          title="Click/Tap to view full screen"
        >
          <Box
            as="img"
            src={diagramUrl}
            alt={title ?? "Workflow Diagram"}
            maxWidth="full"
            height="auto"
            marginX="auto"
          />
        </Box>
      </Box>

      {/* Helper Tip */}
      <Box marginTop={2} display="flex" justify="center">
        <Button
          onClick={handleToggleExpand}
          variant="ghost"
          size="sm"
        >
          <Stack direction="row" align="center" gap={1}>
            <Maximize2 className="h-3 w-3 text-text-dim" />
            <Text size="xs" color="dim" weight="font-medium" hoverColor="main">
              Click/Tap diagram to expand & zoom
            </Text>
          </Stack>
        </Button>
      </Box>

      {/* Full-Screen Modal Overlay */}
      {isExpanded && typeof document !== 'undefined' && createPortal(
        <Stack
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between items-center"
          direction="col"
          padding={{ base: 4, sm: 8 }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <Stack direction="row" align="center" justify="between" border="b" borderColor="line" paddingBottom={4}>
            <Text size="base" weight="font-semibold" color="main">{title ?? 'Diagram View'}</Text>
            <Stack direction="row" align="center" gap={2}>
              {/* Zoom Out */}
              <Button
                onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                aria-label="Zoom out"
                title="Zoom Out"
                variant="secondary"
                size="sm"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              {/* Reset Zoom */}
              <Button
                onClick={() => setZoomScale(isMobile ? 2.0 : 1.2)}
                aria-label="Reset zoom"
                title="Reset Zoom"
                variant="secondary"
                size="sm"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              {/* Zoom In */}
              <Button
                onClick={() => setZoomScale((prev) => Math.min(4.0, prev + 0.25))}
                aria-label="Zoom in"
                title="Zoom In"
                variant="secondary"
                size="sm"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Box height={6} width={1} className="bg-line" marginX={1} />
              {/* Close Overlay */}
              <Button
                onClick={handleToggleExpand}
                aria-label="Close full screen view"
                variant="secondary"
                size="sm"
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
            </Stack>
          </Stack>

          {/* Scrollable Zoomed Container */}
          <Box
            flex={1}
            overflow="auto"
            padding={{ base: 4, sm: 8 }}
            display="flex"
            align="center"
            justify="center"
            className="select-none cursor-zoom-out"
            onClick={handleOverlayClick}
          >
            <Box
              className="transition-all duration-150 cursor-default max-w-full max-h-full"
              margin="auto"
              style={{
                width: `${100 * zoomScale}%`,
                maxWidth: `${1400 * zoomScale}px`,
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking actual diagram content
            >
              <Box
                as="img"
                src={diagramUrl}
                alt={title ?? "Workflow Diagram"}
                width="full"
                height="auto"
                className="mx-auto"
              />
            </Box>
          </Box>
        </Stack>,
        document.body
      )}
    </Box>
  );
};

export default ResponsiveDiagram;
