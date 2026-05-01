import { NavLink } from 'react-router-dom';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { MOBILE_NAV_ROUTES } from '@/config/routes';

export function MobileBottomNav() {
  return (
    <Box
      as="nav"
      aria-label="Mobile Bottom Navigation"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex="sticky"
      paddingBottom="[safe-area-inset-bottom]"
      className="lg:hidden bg-surface/90 backdrop-blur-xl border-t border-line"
    >
      <Box as="ul" display="flex" justify="around" align="center" width="full" className="h-16">
        {MOBILE_NAV_ROUTES.map((item) => {
          const Icon = item.icon;
          return (
            <Box as="li" key={item.path} flex={1}>
              <Stack
                as={NavLink}
                to={item.path}
                align="center"
                justify="center"
                height="full"
                minHeight="[44px]"
                className={({ isActive }: { isActive: boolean }) => cn(
                  "transition-colors",
                  isActive ? "text-accent" : "text-text-dim hover:text-accent"
                )}
              >
                <Icon className={cn("w-6 h-6", stroke.thick)} />
                <Text variant="mono" size="micro" weight="font-bold" marginTop={1}>
                  {item.label.split(' ')[0]}
                </Text>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
