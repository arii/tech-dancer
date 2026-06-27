import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface ViewportFrameProps {
  url: string;
  width: number;
  height: number;
}

const ViewportFrame = ({ url, width, height }: ViewportFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const scaleX = containerWidth / width;
        const scaleY = containerHeight / height;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height]);

  return (
    <Box
      ref={containerRef}
      width="full"
      height="full"
      display="flex"
      align="center"
      justify="center"
      overflow="hidden"
      position="relative"
      className="bg-surface rounded-xl shadow-2xl border border-line"
    >
      {isLoading && (
        <Box position="absolute" inset={true} display="flex" align="center" justify="center" zIndex="docked" surface="muted">
          <Stack align="center" gap={3}>
             <Icon icon={RefreshCw} size="md" className="animate-spin text-accent" />
             <Text variant="sans" size="xs" color="dim" weight="font-bold" uppercase tracking="wider">Loading Preview...</Text>
          </Stack>
        </Box>
      )}
      <Box
        as="iframe"
        src={url}
        title="Viewport Preview"
        onLoad={() => setIsLoading(false)}
        width={width}
        height={height}
        className="border-none bg-white origin-center"
        style={{ // impeccable-ignore - Dynamic scaling for iframe preview
          transform: `scale(${scale})`,
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
        }}
      />
      <Box position="absolute" bottom={4} right={4} maxWidth={48} pointerEvents="none">
         <Box
           paddingX={2}
           paddingY={1}
           radius="sm"
           border={true}
           className="bg-bg/80 backdrop-blur-sm"
         >
           <Text variant="sans" size="xs" color="dim">
             ⚠️ Some sites block embedding via CORS.
           </Text>
         </Box>
      </Box>
    </Box>
  );
};

export default ViewportFrame;
