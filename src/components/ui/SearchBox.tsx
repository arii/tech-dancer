// impeccable-ignore-file
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
      surface="surface"
      border
      paddingX={4}
      paddingY={1}
      maxWidth={maxWidth}
      flex={1}
      minHeight="44px"
      radius="lg"
      className="border-line/80 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all w-full sm:w-auto"
    >
      <Text
        as={Search}
        size={18}
        color="dim"
        className="absolute left-4 pointer-events-none"
        aria-hidden="true"
      />
      <Box
        as="input"
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        variant="mono"
        size="sm"
        className="bg-transparent border-none outline-none pl-10 w-full focus:ring-0"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
