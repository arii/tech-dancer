import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Memes from '@/pages/Memes';
import { MEMES_DATA } from '@/data/memes';

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

  test('renders page elements correctly', () => {
    renderMemesPage();

    // Check SEO & Page Headers
    expect(screen.getByTestId('memes-page')).toBeDefined();
    expect(screen.getByText('West Coast Swing Memes')).toBeDefined();
    expect(screen.getByText('COMMUNITY & HUMOR')).toBeDefined();

    // Check that all memes from data are rendered
    MEMES_DATA.forEach((meme) => {
      // Title
      expect(screen.getByText(meme.title)).toBeDefined();

      // Card container
      expect(screen.getByTestId(`meme-card-${meme.id}`)).toBeDefined();

      // Image alt text
      const img = screen.getByAltText(meme.altText) as HTMLImageElement;
      expect(img).toBeDefined();
      expect(img.src).toContain(meme.imageSrc);
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

    // Dismiss the lightbox by clicking the overlay backdrop
    const lightboxOverlay = screen.getByTestId('lightbox-overlay');
    fireEvent.click(lightboxOverlay);

    // The lightbox should be gone
    expect(screen.queryByAltText('Expanded meme preview')).toBeNull();
  });
});
