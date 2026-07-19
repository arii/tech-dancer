import { useState } from 'react';
import { Box, Stack } from '@/layouts/Primitives';

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
      <Stack direction="row" align="center" gap={3}>
        <Box
          as="span"
          paddingX={2.5}
          paddingY={1}
          radius="md"
          className={`text-xs font-bold tracking-wider uppercase ${
            method === 'POST'
              ? 'bg-accent/20 text-accent border border-accent/30'
              : 'bg-main/20 text-main border border-main/30'
          }`}
        >
          {method}
        </Box>
        <Box as="code" className="text-sm font-semibold text-main font-mono break-all">
          {path}
        </Box>
      </Stack>
      <Box as="p" className="text-sm text-dim">
        {description}
      </Box>
      <Box marginTop={2}>
        <Box as="span" display="block" marginBottom={1} className="text-xs font-semibold text-dim uppercase tracking-wider">
          Example Call
        </Box>
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
      <Stack direction="col" gap={2}>
        <Box
          as="button"
          onClick={handleToggleResponse}
          display="flex"
          align="center"
          gap={1}
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
      </Stack>
    </Stack>
  );
};
