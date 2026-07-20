import { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export interface EndpointCardProps {
  method: string;
  path: string;
  description: string;
  exampleCall: string;
  exampleResponse: string;
}

export const EndpointCard = ({
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
      <Box display="flex" align="center" gap={3}>
        <Text
          as="span"
          size="xs"
          weight="font-bold"
          tracking="wider"
          uppercase
          paddingX={2.5}
          paddingY={1}
          radius="md"
          className={
            method === 'POST'
              ? '[background-color:hsl(var(--color-accent)_/_0.2)] [color:hsl(var(--color-accent))] [border-width:1px] [border-style:solid] [border-color:hsl(var(--color-accent)_/_0.3)]'
              : '[background-color:hsl(var(--color-main)_/_0.2)] [color:hsl(var(--color-main))] [border-width:1px] [border-style:solid] [border-color:hsl(var(--color-main)_/_0.3)]'
          }
        >
          {method}
        </Text>
        <Text as="code" size="sm" weight="font-semibold" color="main" className="font-mono break-all">
          {path}
        </Text>
      </Box>
      <Text as="p" size="sm" color="dim">
        {description}
      </Text>
      <Box marginTop={2}>
        <Text as="span" marginBottom={1} display="block" size="xs" weight="font-semibold" color="dim" uppercase tracking="wider">
          Example Call
        </Text>
        <Box
          padding={3}
          radius="md"
          surface="bg"
          as="pre"
          className="text-xs text-main font-mono overflow-x-auto whitespace-pre-wrap break-all border border-default/40"
        >
          {exampleCall}
        </Box>
      </Box>
      <Box display="flex" flexDirection="col" gap={2}>
        <Box
          as="button"
          display="flex"
          align="center"
          gap={1}
          onClick={handleToggleResponse}
          className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors duration-200 cursor-pointer self-start"
        >
          {showResponse ? 'Hide Example Response' : 'Show Example Response'}
        </Box>
        {showResponse && (
          <Box
            padding={3}
            radius="md"
            surface="bg"
            as="pre"
            className="text-xs text-dim font-mono overflow-x-auto whitespace-pre-wrap border border-default/40"
          >
            {exampleResponse}
          </Box>
        )}
      </Box>
    </Stack>
  );
};
