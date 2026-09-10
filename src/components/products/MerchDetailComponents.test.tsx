import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MerchImageGallery } from './MerchImageGallery';
import { MerchCollectionCrossLinks } from './MerchCollectionCrossLinks';

describe('Merch UI Detail Components', () => {
  describe('MerchImageGallery', () => {
    const mockImages = [
      { src: '/assets/gear/test-front.webp', side: 'front', alt: 'Test Shirt Front' },
      { src: '/assets/gear/test-back.webp', side: 'back', alt: 'Test Shirt Back' },
    ];

    it('renders primary active image and view switcher buttons', () => {
      render(
        <MerchImageGallery
          title="Test Neon Tee"
          images={mockImages}
          badges={['Rainbow Pride']}
          roles={['lead', 'follow']}
        />
      );

      // Active front image
      expect(screen.getAllByAltText('Test Shirt Front').length).toBeGreaterThan(0);

      // Side label pill
      expect(screen.getAllByText('Front View').length).toBeGreaterThan(0);

      // Find button to show back view
      const backButtons = screen.getAllByRole('button');
      const backPill = backButtons.find(
        (b) => b.getAttribute('aria-label') === 'Show Back View' || b.textContent?.includes('Back View')
      );
      expect(backPill).toBeTruthy();

      // Click to toggle view
      if (backPill) {
        fireEvent.click(backPill);
      }
      expect(screen.getAllByAltText('Test Shirt Back').length).toBeGreaterThan(0);
    });

    it('supports fallback front and back images when images array is empty', () => {
      render(
        <MerchImageGallery
          title="Fallback Tee"
          fallbackImage="/assets/gear/fallback-front.webp"
          fallbackImageBack="/assets/gear/fallback-back.webp"
        />
      );

      expect(screen.getAllByAltText('Fallback Tee - Front View').length).toBeGreaterThan(0);

      const buttons = screen.getAllByRole('button');
      const backPill = buttons.find(
        (b) => b.getAttribute('aria-label') === 'Show Back View' || b.textContent?.includes('Back View')
      );
      expect(backPill).toBeTruthy();

      if (backPill) {
        fireEvent.click(backPill);
      }
      expect(screen.getAllByAltText('Fallback Tee - Back View').length).toBeGreaterThan(0);
    });
  });

  describe('MerchCollectionCrossLinks', () => {
    it('renders related collection products excluding current item', () => {
      render(
        <MemoryRouter>
          <MerchCollectionCrossLinks
            currentProductId="love-neon-follow"
            currentGearSlug="2024-06-01-love-neon-follow-shirt"
            collections={['lead-follow-switch', 'rainbow-pride']}
            tags={['Neon', 'Pride']}
          />
        </MemoryRouter>
      );

      expect(screen.getByText(/More from the Lead\/Follow\/Switch Collection/i)).toBeTruthy();
      expect(screen.getByText('Ask Me to Lead - LOVE Neon Performance Tee')).toBeTruthy();
      expect(screen.queryByText('Ask Me to Follow - LOVE Neon Performance Tee')).toBeNull();
    });
  });
});
