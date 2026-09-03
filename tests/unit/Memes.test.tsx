import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Memes from '@/pages/Memes';
import { MEMES_DATA, MEME_PORTING_BACKLOG } from '@/data/memes';

describe('Memes Page Component', () => {
  const renderMemesPage = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <Memes />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  test('renders page elements, under construction banner, and backlog roadmap correctly', () => {
    renderMemesPage();

    // Check SEO & Page Headers
    expect(screen.getByTestId('memes-page')).toBeDefined();
    expect(screen.getByText('West Coast Swing Memes')).toBeDefined();
    expect(screen.getByText('COMMUNITY & HUMOR')).toBeDefined();

    // Check Under Construction banner notice and exact required text
    expect(screen.getByTestId('under-construction-banner')).toBeDefined();
    expect(
      screen.getByText(
        'Still porting some of my favorite original dance memes here! In the meantime, enjoy this initial curated collection of favorites.'
      )
    ).toBeDefined();

    // Check that all featured memes from data are rendered
    MEMES_DATA.forEach((meme) => {
      expect(screen.getByText(meme.title)).toBeDefined();
      expect(screen.getByTestId(`meme-card-${meme.id}`)).toBeDefined();

      const img = screen.getByAltText(meme.altText) as HTMLImageElement;
      expect(img).toBeDefined();
      expect(img.src).toContain(meme.imageSrc);
    });

    // Check Porting Roadmap section and backlog items
    expect(screen.getByTestId('porting-roadmap-section')).toBeDefined();
    expect(screen.getByText('Porting Roadmap & Backlog')).toBeDefined();

    MEME_PORTING_BACKLOG.forEach((item) => {
      expect(screen.getByTestId(`roadmap-item-${item.id}`)).toBeDefined();
      expect(screen.getByText(item.title)).toBeDefined();
      expect(screen.getByText(item.description)).toBeDefined();
    });
  });

  test('clicking a meme opens the lightbox and clicking the overlay backdrop closes it', () => {
    renderMemesPage();

    // The lightbox should not be visible initially
    expect(screen.queryByAltText('Expanded meme preview')).toBeNull();

    // Click the first meme image container
    const firstMeme = MEMES_DATA[0];
    const imageElement = screen.getAllByAltText(firstMeme.altText)[0];

    fireEvent.click(imageElement);

    // The lightbox should be visible now
    const expandedImage = screen.getByAltText('Expanded meme preview') as HTMLImageElement;
    expect(expandedImage).toBeDefined();
    expect(expandedImage.src).toContain(firstMeme.imageSrc);

    // Clicking the image itself should NOT close the lightbox (stopPropagation)
    fireEvent.click(expandedImage);
    expect(screen.getByAltText('Expanded meme preview')).toBeDefined();

    // Dismiss the lightbox by clicking the overlay backdrop
    const lightboxOverlay = screen.getByTestId('lightbox-overlay');
    fireEvent.click(lightboxOverlay);

    // The lightbox should be gone
    expect(screen.queryByAltText('Expanded meme preview')).toBeNull();
  });

  test('pressing Escape key closes the lightbox modal', () => {
    renderMemesPage();

    const firstMeme = MEMES_DATA[0];
    const imageElement = screen.getAllByAltText(firstMeme.altText)[0];

    fireEvent.click(imageElement);
    expect(screen.getByAltText('Expanded meme preview')).toBeDefined();

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape' });

    // Lightbox should be dismissed
    expect(screen.queryByAltText('Expanded meme preview')).toBeNull();
  });
});
