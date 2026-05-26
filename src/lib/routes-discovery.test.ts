import { describe, it, expect } from 'vitest';
import { getAllRoutes } from './routes-discovery';

describe('getAllRoutes', () => {
  it('should return unique routes', () => {
    const { all } = getAllRoutes();
    const unique = new Set(all);
    expect(all.length).toBe(unique.size);
  });

  it('should exclude /preview from the sitemap', () => {
    const { all } = getAllRoutes();
    expect(all).not.toContain('/preview');
  });

  it('should exclude catch-all route', () => {
    const { all } = getAllRoutes();
    expect(all).not.toContain('*');
  });

  it('should use canonical path for UX Auditor', () => {
    const { all } = getAllRoutes();
    expect(all).toContain('/ux-auditor');
    expect(all).not.toContain('/research/ux-auditor');
  });

  it('should handle tool routes correctly', () => {
    const { tools } = getAllRoutes();
    expect(tools).toContain('/research/wcs-parquet-pipeline');
    expect(tools).toContain('/ux-auditor');
    expect(tools).toContain('/research/gitops-pr-reviewer');
  });

  it('should return detailed route information with lastmod', () => {
    const { detailed } = getAllRoutes();
    expect(detailed.length).toBeGreaterThan(0);
    expect(detailed[0]).toHaveProperty('path');
    expect(detailed[0]).toHaveProperty('lastmod');
    expect(new Date(detailed[0].lastmod).getTime()).not.toBeNaN();
  });
});
