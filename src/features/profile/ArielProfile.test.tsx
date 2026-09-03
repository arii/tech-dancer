import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ArielProfile from './ArielProfile';

// Mock SEO to avoid helmet provider requirement
vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />
}));

describe('ArielProfile Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders standardized page header with role and name', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('BIOGRAPHY')).toBeTruthy();
    expect(screen.getByText('Ariel Anders, PhD')).toBeTruthy();
    expect(screen.getByText(/West Coast Swing dancer and roboticist/i)).toBeTruthy();
  });

  it('renders interspersed alternating zigzag sections with unique titles and captions', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('My Dance Background')).toBeTruthy();
    expect(screen.getByText('Style & Visual Expression')).toBeTruthy();
    expect(screen.getByText('Timing & Musicality')).toBeTruthy();
    expect(screen.getByText('Why I Built This Site')).toBeTruthy();
    expect(screen.getByText('Travel & Sustainable Logistics')).toBeTruthy();

    expect(screen.getByText('First WCS Competition • San Francisco, CA')).toBeTruthy();
    expect(screen.getByText('Late Night Social • LED Bunny Ears')).toBeTruthy();
    expect(screen.getByText('MADjam Floor • Precision & Groove')).toBeTruthy();
    expect(screen.getByText('Monterey Swingfest • Monterey, CA')).toBeTruthy();
    expect(screen.getByText('Weekend Socials • Community & Travel')).toBeTruthy();
  });

  it('renders social and legal links with proper spacing', () => {
    render(
      <BrowserRouter>
        <ArielProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('INSTAGRAM')).toBeTruthy();
    expect(screen.getByText('LINKEDIN')).toBeTruthy();
    expect(screen.getByText('GITHUB')).toBeTruthy();
    expect(screen.getByText('Privacy Policy')).toBeTruthy();
    expect(screen.getByText('Terms of Use')).toBeTruthy();
  });
});
