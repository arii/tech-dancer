
import { Gift } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { PRINTFUL_REFERRAL } from '@/config/constants';

interface ReferralBannerProps {
  variant?: 'hero' | 'footer';
  className?: string;
}

export function ReferralBanner({ variant = 'hero', className }: ReferralBannerProps) {
  const isHero = variant === 'hero';

  if (isHero) {
    return (
      <Box
        width="full"
        padding={6}
        radius="md"
        className={cn(
          "bg-gradient-to-r from-accent/10 to-accent-purple/10 border border-accent/20",
          className
        )}
      >
        <Stack direction={{ base: 'col', md: 'row' }} gap={6} align="center" justify="between">
          <Stack direction="row" gap={4} align="center">
            <Box padding={3} radius="full" className="bg-accent/20 text-accent">
              <Gift className={cn("w-6 h-6", stroke.thick)} />
            </Box>
            <Stack gap={1}>
              <Text variant="sans" size="lg" weight="font-bold">
                {PRINTFUL_REFERRAL.HERO_HEADING}
              </Text>
              <Text variant="sans" size="sm" color="dim">
                {PRINTFUL_REFERRAL.HERO_SUBHEADING}
              </Text>
            </Stack>
          </Stack>
          <Button
            as="a"
            href={PRINTFUL_REFERRAL.URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            variant="primary"
          >
            Claim {PRINTFUL_REFERRAL.DISCOUNT_AMOUNT} Discount
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      padding={8}
      radius="md"
      className={cn("bg-surface border border-line", className)}
    >
      <Stack gap={4}>
        <Box padding={3} radius="full" width="fit" className="bg-accent-purple/10 text-accent-purple">
          <Gift className={cn("w-6 h-6", stroke.thick)} />
        </Box>
        <Stack gap={2}>
          <Text variant="sans" size="xl" weight="font-bold">
            {PRINTFUL_REFERRAL.FOOTER_HEADING}
          </Text>
          <Text variant="sans" size="sm" color="dim">
            {PRINTFUL_REFERRAL.FOOTER_DESCRIPTION}
          </Text>
        </Stack>
        <Button
          as="a"
          href={PRINTFUL_REFERRAL.URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="primary"
          className="w-fit"
        >
          Get Your {PRINTFUL_REFERRAL.DISCOUNT_AMOUNT} Discount
        </Button>
      </Stack>
    </Box>
  );
}
