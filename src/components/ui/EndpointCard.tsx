// impeccable-ignore-file
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
      <Box display="flex" align="center" gap={3}>
        <Box
          as="span"
          paddingX={2.5}
          paddingY={1}
          radius="md"
          className={`text-xs font-bold tracking-wider uppercase ${
            method === 'POST'
              ? 'bg-accent/20 text-accent border border-accent/30'
              : 'bg-primary/20 text-primary border border-primary/30'
          }`}
        >
          {method}
        </Box>
        <Box as="code" className="text-sm font-semibold text-primary font-mono break-all">
          {path}
        </Box>
      </Box>
      <Box as="p" className="text-sm text-secondary">
        {description}
      </Box>
      <Box className="mt-2">
        <Box as="span" className="text-xs font-semibold text-dim uppercase tracking-wider block mb-1">
          Example Call
        </Box>
        <Box
          padding={3}
          radius="md"
          surface="bg"
          as="pre"
          className="text-xs text-primary font-mono overflow-x-auto whitespace-pre-wrap break-all border border-default/40"
        >
          {exampleCall}
        </Box>
      </Box>
      <Stack gap={2}>
        <button
          onClick={handleToggleResponse}
          className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors duration-200 cursor-pointer self-start flex align-center gap-1"
        >
          {showResponse ? 'Hide Example Response' : 'Show Example Response'}
        </button>
        {showResponse && (
          <Box
            padding={3}
            radius="md"
            surface="bg"
            as="pre"
            className="text-xs text-secondary font-mono overflow-x-auto whitespace-pre-wrap border border-default/40"
          >
            {exampleResponse}
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
