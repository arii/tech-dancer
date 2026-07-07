
import { NavLink } from 'react-router-dom';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { transitions } from '@/styles/utilities';
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
      <Stack as="ul" direction="row" justify="around" align="center" width="full" height={16}>
        {MOBILE_NAV_ROUTES.map((item) => {
          const Icon = item.icon;
          return (
            <Box as="li" key={item.path} flex={1}>
              <NavLink
                to={item.path}
                aria-label={item.label}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center h-full tap-target",
                  transitions.colors,
                  isActive ? "text-accent" : "text-text-dim hover:text-accent"
                )}
              >
                <Box as={Icon} width={6} height={6} className="stroke-thick" />
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
