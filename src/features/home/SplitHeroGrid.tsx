import { Grid } from '@/layouts/Primitives';
import { DevAIPanel } from './DevAIPanel';
import { BoomTickPanel } from './BoomTickPanel';

export function SplitHeroGrid() {
  return (
    <Grid
      cols={{ base: 1, md: 2 }}
      gap={3}
      width="full"
      maxWidth="full"
      className="split-hero-grid"
    >
      <DevAIPanel />
      <BoomTickPanel />
    </Grid>
  );
}
