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
  placeholder = "Search articles, insights, or tools...",
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
      minHeight="44px"
      radius="lg"
      className="focus-within:ring-2 focus-within:ring-accent transition-all w-full sm:w-auto"
    >
      <Text
        as={Search}
        size={18}
        color="dim"
        className="absolute left-4 pointer-events-none"
      />
      <Box
        as="input"
        type="text"
        placeholder={placeholder}
        variant="mono"
        size="sm"
        className="bg-transparent border-none outline-none pl-10 w-full focus:ring-0"
        value={value}
        onChange={onChange}
        data-testid="search-input"
      />
    </Box>
  );
}
