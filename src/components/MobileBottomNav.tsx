
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { MOBILE_NAV_ROUTES } from '@/config/routes';

export function MobileBottomNav() {
  return (
    <Box
      as="nav"
      aria-label="Mobile Bottom Navigation"
      position="fixed"
      inset="bottom"
      zIndex="sticky"
      border="t"
      display={{ lg: 'none' }}
      className="bg-surface/90 backdrop-blur-xl safe-bottom"
    >
      <Stack
        as="ul"
        direction="row"
        justify="between"
        align="center"
        width="full"
        height={16}
        paddingX={{ base: 4, md: 6 }}
      >
        {MOBILE_NAV_ROUTES.map((item) => {
          const Icon = item.icon;
          return (
            <Box as="li" key={item.path} flex={1} display="flex" justify="center">
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center h-full transition-colors tap-target",
                  isActive ? "text-accent" : "text-text-dim hover:text-accent"
                )}
              >
                <Icon className={cn("w-6 h-6", stroke.thick)} />
                <Text variant="mono" size="micro" weight="font-bold" marginTop={1}>
                  {item.label.split(' ')[0]}
                </Text>
              </NavLink>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
