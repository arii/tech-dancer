import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import Services from '../Services';

describe('Services Page Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders services hero, consultation form, and modular packages', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByText(/Digital business systems for independent creatives/i)).toBeTruthy();
    expect(screen.getByText('Request Consultation →')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Book Discovery Call/i })).toBeTruthy();
    expect(screen.getByText('Request a Consultation')).toBeTruthy();
  });

  it('opens and closes BookingModal when clicking Book Discovery Call button', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.queryByRole('dialog')).toBeNull();

    const bookButton = screen.getByRole('button', { name: /Book Discovery Call/i });
    fireEvent.click(bookButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();

    const iframe = screen.getByTitle('Schedule a consultation on Cal.com') as HTMLIFrameElement;
    expect(iframe.src).toBe('https://cal.com/ariel-anders/20min?embed=true');

    const closeButton = screen.getByLabelText('Close booking modal');
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
