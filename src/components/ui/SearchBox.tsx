import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Box } from '@/layouts/Primitives';

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
      surface="default"
      border
      paddingX={4}
      paddingY={2}
      maxWidth={maxWidth}
      flex={1}
      minHeight="44px"
      radius="lg"
      className="focus-within:ring-2 focus-within:ring-accent transition-all"
    >
      <Search size={18} className="text-text-dim" />
      <Box
        as="input"
        type="text"
        placeholder={placeholder}
        variant="mono"
        size="sm"
        paddingLeft={3}
        className="bg-transparent border-none outline-none w-full focus:ring-0"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
