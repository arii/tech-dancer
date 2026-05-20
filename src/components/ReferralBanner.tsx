
import { Gift } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { PRINTFUL_REFERRAL } from '@/config/constants';

interface ReferralBannerProps {
  layout?: 'expanded' | 'compact';
  className?: string;
}

export function ReferralBanner({ layout = 'expanded', className }: ReferralBannerProps) {
  const isExpanded = layout === 'expanded';

  return (
    <Box
      width="full"
      padding={isExpanded ? 6 : 8}
      radius="lg"
      border
      surface={isExpanded ? 'accent' : 'card'}
      className={className}
    >
      <Stack
        direction={isExpanded ? { base: 'col', md: 'row' } : 'col'}
        gap={6}
        align={isExpanded ? 'center' : 'start'}
        justify="between"
      >
        <Stack direction="row" gap={4} align="center">
          <Box
            padding={3}
            radius="full"
            width="fit"
            className={cn(
              isExpanded ? "bg-accent/20 text-accent" : "bg-accent-purple/10 text-accent-purple"
            )}
          >
            <Gift className={cn("w-6 h-6", stroke.thick)} />
          </Box>
          {isExpanded && (
            <Stack gap={1}>
              <Text variant="headline" size="lg" weight="font-bold">
                {PRINTFUL_REFERRAL.HERO_HEADING}
              </Text>
              <Text variant="body" size="sm" color="dim">
                {PRINTFUL_REFERRAL.HERO_SUBHEADING}
              </Text>
            </Stack>
          )}
        </Stack>

        {!isExpanded && (
          <Stack gap={2}>
            <Text variant="headline" size="xl" weight="font-bold" uppercase tracking="tight">
              {PRINTFUL_REFERRAL.FOOTER_HEADING}
            </Text>
            <Text variant="body" size="sm" color="dim">
              {PRINTFUL_REFERRAL.FOOTER_DESCRIPTION}
            </Text>
          </Stack>
        )}

        <Button
          as="a"
          href={PRINTFUL_REFERRAL.URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="primary"
          className={cn(!isExpanded && "w-fit")}
        >
          {isExpanded ? "Claim" : "Get Your"} {PRINTFUL_REFERRAL.DISCOUNT_AMOUNT} Discount
        </Button>
      </Stack>
    </Box>
  );
}
