import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BookingModal } from '@/features/services/BookingModal';

describe('BookingModal Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('does not render anything when isOpen is false', () => {
    const handleClose = vi.fn();
    render(<BookingModal isOpen={false} onClose={handleClose} />);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByTitle('Schedule a consultation on Cal.com')).toBeNull();
  });

  it('renders modal with embedded iframe and default 20min Cal.com URL when isOpen is true', () => {
    const handleClose = vi.fn();
    render(<BookingModal isOpen={true} onClose={handleClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();

    expect(screen.getByText('Book a Discovery Call')).toBeDefined();

    const iframe = screen.getByTitle('Schedule a consultation on Cal.com') as HTMLIFrameElement;
    expect(iframe).not.toBeNull();
    expect(iframe.src).toBe('https://cal.com/ariel-anders/20min?embed=true');

    const openInNewTabLink = screen.getByText('Open in new tab').closest('a');
    expect(openInNewTabLink).not.toBeNull();
    expect(openInNewTabLink?.getAttribute('href')).toBe('https://cal.com/ariel-anders/20min');
    expect(openInNewTabLink?.getAttribute('target')).toBe('_blank');
    expect(openInNewTabLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('properly formats custom bookingUrl with existing query parameters', () => {
    const handleClose = vi.fn();
    render(
      <BookingModal
        isOpen={true}
        onClose={handleClose}
        bookingUrl="https://cal.com/ariel-anders/20min?theme=dark"
      />
    );

    const iframe = screen.getByTitle('Schedule a consultation on Cal.com') as HTMLIFrameElement;
    expect(iframe.src).toContain('https://cal.com/ariel-anders/20min?theme=dark&embed=true');
  });

  it('calls onClose when clicking the close button', () => {
    const handleClose = vi.fn();
    render(<BookingModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText('Close booking modal');
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop backdrop overlay', () => {
    const handleClose = vi.fn();
    render(<BookingModal isOpen={true} onClose={handleClose} />);

    const modalBackdrop = screen.getByRole('dialog');
    fireEvent.click(modalBackdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing the Escape key', () => {
    const handleClose = vi.fn();
    render(<BookingModal isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
