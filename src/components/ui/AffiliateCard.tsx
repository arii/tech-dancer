import { ExternalLink, Tag } from 'lucide-react';
import { Box, Stack, Text } from '../../layouts/Primitives';
import { AffiliateLink } from '../../types';

interface AffiliateCardProps {
  link: AffiliateLink;
}

export function AffiliateCard({ link }: AffiliateCardProps) {
  return (
    <Stack
      as="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      direction="col"
      gap={3}
      height="full"
      padding={5}
      radius="lg"
      border
      surface="default"
      className="group hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <Box display="flex" align="center" justify="between">
        <Box
          paddingX={2}
          paddingY={1}
          radius="full"
          border
          surface="alt"
          className="border-line w-fit opacity-50"
        >
          <Stack direction="row" align="center" gap={1.5}>
            <Tag size={10} className="text-accent" />
            <Text
              variant="mono"
              size="micro"
              weight="font-black"
              tracking="wide"
              className="text-accent uppercase"
            >
              {link.category}
            </Text>
          </Stack>
        </Box>
        <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
      </Box>

      <Stack gap={1.5}>
        <Text
          as="h4"
          variant="body"
          size="md"
          weight="font-bold"
          className="text-text-main group-hover:text-accent transition-colors line-clamp-1"
        >
          {link.name}
        </Text>

        <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed text-text-body">
          {link.description}
        </Text>
      </Stack>

      <Box marginTop="auto" paddingTop={2} className="border-t border-line/20">
        <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
          View Product
        </Text>
      </Box>
    </Stack>
  );
}
