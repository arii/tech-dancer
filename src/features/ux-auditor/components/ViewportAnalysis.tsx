import { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle, Copy, Image as ImageIcon, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Skeleton } from '@/components/ui/Skeleton';
import { cardVariants } from '@/lib/variants';
import { ViewportAnalysis as IViewportAnalysis } from '../useUXAuditor';

interface ViewportAnalysisProps {
  viewport: { name: string; width: number; height: number };
  data: IViewportAnalysis | undefined;
  url: string;
}

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />
};

function CopyPromptButton({ suggestion }: { suggestion: string }) {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => setCopied(false));
      } else {
        setCopied(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(suggestion);
      await new Promise(resolve => setTimeout(resolve, 400));
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setCopied(true);
        });
      } else {
        setCopied(true);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Box
      as="button"
      onClick={handleCopy}
      disabled={isCopying}
      marginTop={2}
      display="flex"
      align="center"
      gap={1}
      paddingX={3}
      paddingY={1}
      radius="md"
      surface="default"
      border={true}
      className="hover:border-accent transition-colors hover:text-accent font-bold text-xs"
    >
      {isCopying ? (
        <Icon icon={RefreshCw} size="xs" className="animate-spin" />
      ) : copied ? (
        <Icon icon={CheckCircle} size="xs" color="accent" />
      ) : (
        <Icon icon={Copy} size="xs" />
      )}
      <span>{isCopying ? 'Copying...' : copied ? 'Copied!' : 'Copy Prompt'}</span>
    </Box>
  );
}

function ViewportFrame({ url, width, height }: { url: string; width: number; height: number }) {
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
}

export function ViewportAnalysis({ viewport, data, url }: ViewportAnalysisProps) {
  const IconComponent = viewportIcons[viewport.name as keyof typeof viewportIcons];

  return (
    <Box className={cardVariants({ overflow: "hidden" })}>
      <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
        <Stack direction="row" align="center" gap={3}>
          <Box width={9} height={9} surface="default" radius="lg" shadow="sm" color="accent" display="flex" align="center" justify="center" shrink={0}>
            {IconComponent}
          </Box>
          <Text variant="sans" size="base" weight="font-bold">
            {viewport.name} Analysis
          </Text>
        </Stack>
        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
          {viewport.width}w × {viewport.height}h
        </Text>
      </Stack>

      <Stack direction={{ base: 'col', md: 'row' }} width="full">
        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
          {url ? (
            <ViewportFrame
              key={`${viewport.name}-${url}`}
              url={url}
              width={viewport.width}
              height={viewport.height}
            />
          ) : (
            <Stack align="center" justify="center" color="dim" className="text-center">
              <Box marginBottom={2}>
                <Icon icon={ImageIcon} size="2xl" color="muted" />
              </Box>
              <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider">
                Awaiting Frame...
              </Text>
            </Stack>
          )}
        </Box>

        <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
          {data ? (
            <>
              <Box surface="alt" padding={5} className="border border-line rounded-lg">
                <Box marginBottom={3}>
                  <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase display="block" tracking="widest">
                    Analysis Summary
                  </Text>
                </Box>
                <Text variant="sans" size="sm" weight="font-medium" className="leading-relaxed break-words block">
                  "{data.summary}"
                </Text>
              </Box>
              <Stack gap={4}>
                {data.improvements?.map((imp, idx) => (
                  <Box key={idx} padding={4} className={cardVariants({ interactive: true })}>
                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                      <Stack direction="row" align="center" gap={2}>
                        <Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-error shadow-sm' : 'bg-accent-purple shadow-sm'} />
                        <Text variant="sans" size="sm" weight="font-black">
                          {imp.element}
                        </Text>
                      </Stack>
                      <Text variant="mono" size="xs" weight="font-black" paddingX={2} paddingY={0.5} radius="full" surface="muted" color="dim" uppercase title={`Severity level: ${imp.severity} out of 10 (1-10 scale)`}>
                        SEV {imp.severity}
                      </Text>
                    </Box>
                    <Text variant="sans" size="xs" color="dim" marginBottom={3}>
                      {imp.issue}
                    </Text>
                    {imp.suggestion && imp.suggestion.trim() !== '' && (
                      <Box surface="muted" padding={3} radius="lg" border={true}>
                        <Stack direction={{ base: 'col', sm: 'row' }} align="start" gap={2}>
                          <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase tracking="widest" className="shrink-0">FIX</Text>
                          <Box flex={1} minWidth="0">
                            <Text variant="sans" size="xs" weight="font-bold" clamp={4} className="break-all whitespace-pre-wrap">
                              {imp.suggestion}
                            </Text>
                            {imp.element === "Manual Audit Required" && (
                              <CopyPromptButton suggestion={imp.suggestion} />
                            )}
                          </Box>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </>
          ) : (
            <Stack gap={4} width="full">
              <Skeleton height={20} width="full" />
              <Stack gap={2}>
                <Skeleton height={4} width="full" />
                <Skeleton height={4} width="full" />
                <Skeleton height={4} width="3/4" />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
