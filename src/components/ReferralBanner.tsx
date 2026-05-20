
import { Gift } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

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
                Get $5 Off Your First Order
              </Text>
              <Text variant="sans" size="sm" color="dim">
                New to Printful? Use our referral link to save $5 on your first purchase.
              </Text>
            </Stack>
          </Stack>
          <Button
            as="a"
            href="https://www.printful.com/give-5-get-5/GZB6C4"
            target="_blank"
            rel="sponsored noopener noreferrer"
            variant="accent"
          >
            Claim $5 Discount
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
            First-Time Buyer Discount
          </Text>
          <Text variant="sans" size="sm" color="dim">
            Supporting BoomTick helps us keep the servers running and the content flowing. Save $5 on your first Printful order and support the blog at the same time.
          </Text>
        </Stack>
        <Button
          as="a"
          href="https://www.printful.com/give-5-get-5/GZB6C4"
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="accent"
          className="w-fit"
        >
          Get Your $5 Discount
        </Button>
      </Stack>
    </Box>
  );
}
