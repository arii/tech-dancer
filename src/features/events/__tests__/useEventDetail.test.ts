/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEventDetail } from '../useEventDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { affiliateManager } from '@/lib/affiliateManager';
import { Event } from '@/lib/content';
import { AffiliateLink } from '@/types';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('@/lib/content', () => ({
  getEventBySlug: vi.fn(),
  getEvents: vi.fn(),
}));

vi.mock('@/lib/affiliateManager', () => ({
  affiliateManager: {
    getLink: vi.fn(),
  },
}));

describe('useEventDetail', () => {
  it('should return event details and resolved links', () => {
    const mockEvent = {
      slug: 'test-event',
      title: 'Test Event',
      theme: {
        outfitIds: ['outfit-1'],
        accessoryIds: ['acc-1'],
      },
      gear: {
        outfitIds: ['gear-outfit-1'],
        accessoryIds: ['gear-acc-1'],
        shoeIds: ['shoe-1'],
        essentialIds: ['ess-1'],
        travelIds: ['travel-1'],
      },
      relatedEvents: ['related-1'],
    } as unknown as Event;

    const mockAllEvents = [
      mockEvent,
      { slug: 'related-1', title: 'Related Event 1' } as unknown as Event,
    ];

    const mockAffiliateLink: AffiliateLink = {
      id: 'outfit-1',
      name: 'Outfit 1',
      url: 'http://example.com',
      category: 'gear',
      description: 'Test description',
    };

    vi.mocked(useParams).mockReturnValue({ slug: 'test-event' });
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    vi.mocked(useQuery).mockImplementation(({ queryKey }) => {
      if (Array.isArray(queryKey)) {
        if (queryKey[0] === 'event') {
          return { data: mockEvent, isLoading: false, isError: false } as UseQueryResult<Event | undefined>;
        }
        if (queryKey[0] === 'events') {
          return { data: mockAllEvents, isLoading: false, isError: false } as UseQueryResult<Event[]>;
        }
      }
      return { data: undefined, isLoading: false, isError: false } as UseQueryResult<unknown>;
    });
    vi.mocked(affiliateManager.getLink).mockReturnValue(mockAffiliateLink);

    const { result } = renderHook(() => useEventDetail());

    expect(result.current.event).toEqual(mockEvent);
    expect(result.current.themeOutfits).toEqual([mockAffiliateLink]);
    expect(result.current.themeAccessories).toEqual([mockAffiliateLink]);
    expect(result.current.gearSections).toHaveLength(4);
    expect(result.current.relatedEvents).toHaveLength(1);
    expect(result.current.relatedEvents[0].slug).toBe('related-1');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle missing event', () => {
    vi.mocked(useParams).mockReturnValue({ slug: 'non-existent' });
    vi.mocked(useQuery).mockReturnValue({ data: undefined, isLoading: false, isError: false } as UseQueryResult<unknown>);

    const { result } = renderHook(() => useEventDetail());

    expect(result.current.event).toBeUndefined();
    expect(result.current.themeOutfits).toEqual([]);
    expect(result.current.themeAccessories).toEqual([]);
    expect(result.current.gearSections).toEqual([]);
    expect(result.current.relatedEvents).toEqual([]);
  });

  it('should reflect loading state', () => {
    vi.mocked(useParams).mockReturnValue({ slug: 'test-event' });
    vi.mocked(useQuery).mockImplementation(({ queryKey }) => {
      if (Array.isArray(queryKey) && queryKey[0] === 'event') {
        return { data: undefined, isLoading: true, isError: false } as UseQueryResult<Event | undefined>;
      }
      return { data: [], isLoading: false, isError: false } as UseQueryResult<Event[]>;
    });

    const { result } = renderHook(() => useEventDetail());
    expect(result.current.isLoading).toBe(true);
  });

  it('should reflect error state', () => {
    vi.mocked(useParams).mockReturnValue({ slug: 'test-event' });
    vi.mocked(useQuery).mockImplementation(({ queryKey }) => {
      if (Array.isArray(queryKey) && queryKey[0] === 'event') {
        return { data: undefined, isLoading: false, isError: true, error: new Error('Failed to fetch') } as UseQueryResult<Event | undefined>;
      }
      return { data: [], isLoading: false, isError: false } as UseQueryResult<Event[]>;
    });

    const { result } = renderHook(() => useEventDetail());
    expect(result.current.isError).toBe(true);
    expect(result.current.error?.message).toBe('Failed to fetch');
  });
});
