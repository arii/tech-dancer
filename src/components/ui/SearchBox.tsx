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
      minHeight={11}
      radius="lg"
      className="focus-within:ring-2 focus-within:ring-accent transition-all w-full sm:w-auto"
    >
      <Box
        as={Search}
        width={4.5}
        height={4.5}
        position="absolute"
        left={4}
        pointerEvents="none"
        className="text-text-dim"
      />
      <Text
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
        data-testid="search-input"
      />
    </Box>
  );
}
