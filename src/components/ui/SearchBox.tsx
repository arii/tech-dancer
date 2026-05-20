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
        // impeccable-ignore
        className="bg-transparent border-none outline-none w-full focus:ring-0 pl-10"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
