import { describe, it, expect } from 'vitest';
import { routes, MOBILE_NAV_ROUTES, TOP_NAV_ROUTES } from '@/config/routes';
import { useProfile } from '@/features/profile/useProfile';

describe('Navigation Routes & Profile Config', () => {
  it('does not contain DevAI / research / versiontruth routes in route config', () => {
    const paths = routes.map(r => r.path);
    expect(paths).not.toContain('/research');
    expect(paths).not.toContain('/research/:id');
    expect(paths).not.toContain('/versiontruth');
  });

  it('does not include DevAI or versiontruth in top nav or mobile nav routes', () => {
    const topNavPaths = TOP_NAV_ROUTES.map(r => r.path);
    const mobileNavPaths = MOBILE_NAV_ROUTES.map(r => r.path);

    expect(topNavPaths).not.toContain('/research');
    expect(topNavPaths).not.toContain('/versiontruth');
    expect(mobileNavPaths).not.toContain('/research');
    expect(mobileNavPaths).not.toContain('/versiontruth');
  });

  it('profile data excludes professional section and portfolio/resume details', () => {
    const { bio } = useProfile();
    expect(bio.role).toBe('West Coast Swing');

    const sectionIds = bio.sections.map(s => s.id);
    expect(sectionIds).not.toContain('professional');

    const detailLabels = bio.details.map(d => d.label);
    expect(detailLabels).not.toContain('Portfolio');
    expect(detailLabels).not.toContain('Resume');
    expect(detailLabels).toContain('Location');
  });
});
