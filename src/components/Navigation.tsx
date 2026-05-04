import { MobileBottomNav } from './MobileBottomNav';
import NavigationShell from './navigation/NavigationShell';

export default function Navigation() {

  return (
    <>
      <NavigationShell />
      <MobileBottomNav />
      {/* Invisible global search trigger for tests/backwards compatibility if needed, though we should probably put it in the nav */}
    </>
  );
}
