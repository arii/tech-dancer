
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
  const isCompact = layout === 'compact';

  const config = isCompact ? {
    heading: PRINTFUL_REFERRAL.HERO_HEADING,
    subheading: PRINTFUL_REFERRAL.HERO_SUBHEADING,
    buttonText: `Claim ${PRINTFUL_REFERRAL.DISCOUNT_AMOUNT} Discount`,
    surface: 'accent' as const,
    iconBg: 'bg-accent/20 text-accent',
    headingSize: 'lg' as const,
    uppercase: false,
    tracking: 'normal' as const
  } : {
    heading: PRINTFUL_REFERRAL.FOOTER_HEADING,
    subheading: PRINTFUL_REFERRAL.FOOTER_DESCRIPTION,
    buttonText: `Get Your ${PRINTFUL_REFERRAL.DISCOUNT_AMOUNT} Discount`,
    surface: 'card' as const,
    iconBg: 'bg-accent-purple/10 text-accent-purple',
    headingSize: 'xl' as const,
    uppercase: true,
    tracking: 'tight' as const
  };

  return (
    <Box
      width="full"
      padding={isCompact ? 6 : 8}
      radius="lg"
      border
      surface={config.surface}
      className={className}
    >
      <Stack
        direction={isCompact ? { base: 'col', md: 'row' } : 'col'}
        gap={6}
        align={isCompact ? 'center' : 'start'}
        justify="between"
      >
        <Stack
          direction={isCompact ? 'row' : 'col'}
          gap={isCompact ? 4 : 6}
          align={isCompact ? 'center' : 'start'}
        >
          <Box
            padding={3}
            radius="full"
            width="fit"
            className={config.iconBg}
          >
            <Gift className={cn("w-6 h-6", stroke.thick)} />
          </Box>

          <Stack gap={isCompact ? 1 : 2}>
            <Text
              variant="headline"
              size={config.headingSize}
              weight="font-bold"
              uppercase={config.uppercase}
              tracking={config.tracking}
            >
              {config.heading}
            </Text>
            <Text variant="body" size="sm" color="dim">
              {config.subheading}
            </Text>
          </Stack>
        </Stack>

        <Button
          as="a"
          href={PRINTFUL_REFERRAL.URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="primary"
          className={cn(!isCompact && "w-fit")}
        >
          {config.buttonText}
        </Button>
      </Stack>
    </Box>
  );
}
