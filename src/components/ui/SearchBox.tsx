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
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 focus-within:border-accent/50 focus-within:ring-4 focus-within:ring-accent/10 transition-all w-full sm:w-auto shadow-inner"
      paddingX={{ base: 4, md: 5 }}
      paddingY={1.5}
      maxWidth={maxWidth}
      flex={1}
      minHeight={{ base: "44px", md: "48px" }}
      radius="full"
    >
      <Text
        as={Search}
        size={18}
        color="dim"
        className="absolute left-5 pointer-events-none"
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
