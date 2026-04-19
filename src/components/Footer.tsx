import { Box, Stack, Text } from '@/components/Primitives';
import { getFooter } from '@/lib/content';

export function Footer() {
  const { copyright, links } = getFooter();

  return (
    <Box as="footer" paddingY={12} paddingX={4} surface="bg" className="opacity-80 border-t border-slate-200" marginTop={32}>
      <Stack direction={{ base: 'col', sm: 'row' }} justify="between" align="center" gap={4}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
          {copyright}
        </Text>
        <Stack direction="row" gap={8} align="center">
          {links.map((link: any) => (
            <Text 
              key={link.label}
              as="a" 
              href={link.href}
              variant="mono" 
              size="xs" 
              color="dim"
              uppercase 
              weight="font-semibold"
              className="tracking-[0.15em] hover:text-accent transition-colors"
            >
              {link.label}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
