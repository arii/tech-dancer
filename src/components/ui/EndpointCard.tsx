import React, { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface EndpointCardProps {
  method: string;
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
  const [showResponse, setShowResponse] = useState(false);

  const handleToggleResponse = () => {
    setShowResponse((prev) => !prev);
  };

  return (
    <Stack
      padding={6}
      radius="lg"
      border="default"
      surface="card"
      gap={4}
    >
      <Stack direction="row" align="center" gap={3}>
        <Text
          as="span"
          paddingX={2.5}
          paddingY={1}
          radius="md"
          size="xs"
          weight="bold"
          tracking="wider"
          uppercase
          border
          className={
            method === 'POST'
              ? 'bg-accent/20 border-accent/30 text-accent'
              : 'bg-main/20 border-main/30 text-main'
          }
        >
          {method}
        </Text>
        <Text as="code" size="sm" weight="semibold" color="main" className="font-mono break-all">
          {path}
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
          className="font-mono overflow-x-auto whitespace-pre-wrap break-all border border-default/40"
        >
          {exampleCall}
        </Text>
      </Stack>
      <Stack gap={2}>
        <Text
          as="button"
          display="flex"
          align="center"
          gap={1}
          onClick={handleToggleResponse}
          size="xs"
          weight="semibold"
          color="accent"
          hoverColor="accent"
          className="transition-colors duration-200 cursor-pointer self-start"
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
            className="font-mono overflow-x-auto whitespace-pre-wrap border border-default/40"
          >
            {exampleResponse}
          </Text>
        )}
      </Stack>
    </Stack>
  );
});

EndpointCard.displayName = 'EndpointCard';
