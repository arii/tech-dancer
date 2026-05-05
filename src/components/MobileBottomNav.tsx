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
      className="lg:hidden bg-surface/90 backdrop-blur-xl border-t border-line pb-[safe-area-inset-bottom]"
    >
      <Box as="ul" display="flex" justify="around" align="center" width="full" className="h-16">
        {MOBILE_NAV_ROUTES.map((item) => {
          const Icon = item.icon;
          return (
            <Box as="li" key={item.path} flex={1}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center h-full transition-colors min-h-[44px]",
                  isActive ? "text-accent" : "text-text-dim hover:text-accent"
                )}
              >
                <Icon className={cn("w-6 h-6", stroke.thick)} />
                <Text variant="mono" size="micro" weight="font-bold" className="mt-1">
                  {item.label.split(' ')[0]}
                </Text>
              </NavLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
