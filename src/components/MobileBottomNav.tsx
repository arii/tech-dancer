import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
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
      className="lg:hidden bg-surface/90 backdrop-blur-xl border-line pb-safe" // impeccable-ignore
      paddingBottom={0}
    >
      <Box as="ul" display="flex" justify="around" align="center" width="full" height={16}>
        {MOBILE_NAV_ROUTES.map((item) => {
          const Icon = item.icon;
          return (
            <Box as="li" key={item.path} flex={1}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center h-full w-full transition-colors",
                  isActive ? "text-accent" : "text-text-dim hover:text-accent"
                )}
              >
                <Box
                  as="span"
                  display="flex"
                  flexDirection="col"
                  alignItems="center"
                  justifyContent="center"
                  minHeight={11}
                  width="full"
                >
                  <Icon className={cn("w-6 h-6", stroke.thick)} />
                  <Text variant="mono" size="micro" weight="font-bold" marginTop={1}>
                    {item.label.split(' ')[0]}
                  </Text>
                </Box>
              </NavLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
