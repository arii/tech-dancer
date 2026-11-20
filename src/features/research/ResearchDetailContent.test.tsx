import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResearchDetail from './ResearchDetail';

const fixtures = vi.hoisted(() => ({ study: false, status: 'Coming Soon', id: 'fixture-tool' }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
vi.mock('./useResearch', () => ({ useResearch: () => ({
  studies: [],
  getTool: () => ({id: fixtures.id, title: 'Fixture Tool', description: 'Fixture description', category: 'Fixture category', taxonomyBucket: 'engineering', status: fixtures.status, tags: []}),
  getStudy: () => fixtures.study ? {slug: fixtures.id, title: 'Fixture Study', excerpt: 'Study excerpt', author: 'Ariel Anders', content: 'Study body', date: '2026-11-01', category: 'Engineering', tags: []} : undefined,
}) }));
vi.mock('@/features/lab/BlogDrafter', () => ({ BlogDrafter: () => <div>Interactive fixture tool</div> }));
afterEach(() => { cleanup(); fixtures.study = false; fixtures.status = 'Coming Soon'; fixtures.id = 'fixture-tool'; });

describe('research tool content contexts', () => {
  it.each([false, true])('preserves fallback DOM with embedded study=%s', (study) => {
    fixtures.study = study;
    const {container} = render(<MemoryRouter initialEntries={['/research/fixture-tool']}><ResearchDetail /></MemoryRouter>);
    expect(container.innerHTML).toMatchSnapshot();
    expect(screen.getByRole('heading', {name: 'Fixture Tool', level: study ? 2 : 1})).toBeDefined();
    expect(screen.getByText('Work in Progress')).toBeDefined();
  });

  it.each([false, true])('renders registered interactive tool in context embedded study=%s', async (study) => {
    fixtures.study = study; fixtures.status = 'Live Tool'; fixtures.id = 'blog-drafter';
    render(<MemoryRouter initialEntries={['/research/blog-drafter']}><ResearchDetail /></MemoryRouter>);
    expect(await screen.findByText('Interactive fixture tool')).toBeDefined();
    expect(screen.queryByText('Work in Progress')).toBeNull();
  });
});
