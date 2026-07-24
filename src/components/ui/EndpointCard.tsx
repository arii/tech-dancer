import React, { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { tagVariants } from '@/lib/variants';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface EndpointCardProps {
  method: HttpMethod;
  path: string;
  description: string;
  exampleCall: string;
  exampleResponse: string;
}

export const EndpointCard = React.memo(({
  method,
  path,
  description,
  exampleCall,
  exampleResponse,
}: EndpointCardProps) => {
  // Validate path to prevent path traversal in rendering (although this is just UI)
  const safePath = path.replace(/\.\.\//g, '');
  const isSafePath = /^\/[-a-zA-Z0-9_./?=&]+$/.test(safePath) || /^[a-zA-Z0-9_]+$/.test(safePath);
  const displayPath = isSafePath ? safePath : 'Invalid Path';
  const [showResponse, setShowResponse] = useState(false);

  const handleToggleResponse = React.useCallback(() => {
    setShowResponse((prev) => !prev);
  }, []);

  return (
    <Stack
      padding={6}
      radius="lg"
      border="default"
      surface="card"
      gap={4}
    >
      <Stack direction="row" align="center" gap={3}>
        <Box
          as="span"
          className={tagVariants({
            variant: method === 'POST' ? 'cyan' : 'default',
            size: 'sm',
          })}
        >
          {method}
        </Box>
        <Text as="code" size="sm" weight="semibold" color="main" className="font-mono break-all">
          {displayPath}
        </Text>
      </Stack>
      <Box as="p" className="text-sm text-dim">
        {description}
      </Box>
      <Stack gap={1}>
        <Text as="span" size="xs" weight="semibold" color="dim" uppercase tracking="wider" className="block">
          Example Call
        </Text>
        <Text
          padding={3}
          radius="md"
          surface="bg"
          as="pre"
          size="xs"
          color="main"
          className="font-mono overflow-x-auto whitespace-pre-wrap break-all border-line/40 border"
        >
          {exampleCall}
        </Text>
      </Stack>
      <Stack gap={2}>
        <Text
          as="button"
          onClick={handleToggleResponse}
          aria-expanded={showResponse}
          className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors duration-200 cursor-pointer self-start"
        >
          {showResponse ? 'Hide Example Response' : 'Show Example Response'}
        </Text>
        {showResponse && (
          <Text
            padding={3}
            radius="md"
            surface="bg"
            as="pre"
            size="xs"
            color="dim"
            className="font-mono overflow-x-auto whitespace-pre-wrap border-line/40 border"
          >
            {exampleResponse}
          </Text>
        )}
      </Stack>
    </Stack>
  );
});
