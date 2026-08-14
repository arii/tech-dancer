import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
