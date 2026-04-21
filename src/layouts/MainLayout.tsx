import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailCaptureContext } from '@/features/email-capture/EmailCaptureContext';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { showEmailBar } = useEmailCaptureContext();

  return (
    <div className="flex min-h-screen bg-bg relative overflow-x-hidden w-full">
      <GlobalSearch />
      
      <div className="flex min-h-screen w-full">
        <Navigation />
        <main
          className="flex-1 relative overflow-y-auto bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col"
          style={{ viewTransitionName: 'main-content' }}
        >
          <div
            className={cn(
              "mx-auto min-h-full max-w-7xl w-full transition-all duration-300 px-4 md:px-6 lg:px-12 pt-12",
              showEmailBar ? "pb-48 md:pb-64" : "pb-12"
            )}
          >
            <div className="flex-1 w-full flex flex-col">
              <div className="flex-1 w-full">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
