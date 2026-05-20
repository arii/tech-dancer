import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Box, Text } from '@/layouts/Primitives';

interface SearchBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxWidth?: string;
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Search articles, guides, or gear...",
  maxWidth = "2xl"
}: SearchBoxProps) {
  return (
    <Box
      display="flex"
      align="center"
      position="relative"
      surface="default"
      border
      paddingX={4}
      paddingY={1}
      maxWidth={maxWidth}
      flex={1}
      radius="lg"
      width="full"
      className="focus-within:ring-2 focus-within:ring-accent transition-all tap-target sm:w-auto"
    >
      <Box
        as={Search}
        size={18}
        color="dim"
        position="absolute"
        left={4}
        className="pointer-events-none"
      />
      <Box
        as="input"
        type="text"
        placeholder={placeholder}
        variant="mono"
        size="sm"
        paddingLeft={10}
        width="full"
        className="bg-transparent border-none outline-none focus:ring-0"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
