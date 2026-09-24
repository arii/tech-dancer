import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ExternalLink, X } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { CALENDAR_BOOKING_URL } from '@/config/constants';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl?: string;
  title?: string;
}

const formatEmbedUrl = (url: string): string => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has('embed')) {
      parsed.searchParams.set('embed', 'true');
    }
    return parsed.toString();
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return url.includes('embed=') ? url : `${url}${separator}embed=true`;
  }
};

export const BookingModal = ({
  isOpen,
  onClose,
  bookingUrl = CALENDAR_BOOKING_URL,
  title = 'Book a Discovery Call',
}: BookingModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const activeBookingUrl = bookingUrl || CALENDAR_BOOKING_URL;
  const embedUrl = formatEmbedUrl(activeBookingUrl);

  return createPortal(
    <Box
      id="booking-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      position="fixed"
      inset
      zIndex={50}
      display="flex"
      align="center"
      justify="center"
      padding={{ default: 4, sm: 6 }}
      className="bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Stack
        direction="col"
        width="full"
        maxWidth="3xl"
        surface="surface"
        border
        radius="2xl"
        shadow="2xl"
        padding={{ default: 4, sm: 6 }}
        overflow="hidden"
        marginY="auto"
        className="max-h-[90vh] border-line/60 bg-surface/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <Box
          display="flex"
          align="start"
          justify="between"
          marginBottom={4}
          gap={3}
        >
          <Stack gap={1}>
            <Text
              as="h3"
              id="booking-modal-title"
              variant="headline"
              size="xl"
              weight="font-bold"
              color="main"
            >
              {title}
            </Text>
            <Text size="xs" color="dim">
              Select your preferred date and time slot below to schedule a 20-minute consultation.
            </Text>
          </Stack>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close booking modal"
            className="text-text-dim hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </Box>

        {/* Embedded Cal Frame */}
        <Box
          flex={1}
          border
          radius="xl"
          overflow="hidden"
          className="border-line/60 bg-surface-alt relative min-h-[480px]"
        >
          <iframe
            src={embedUrl}
            title="Schedule a consultation on Cal.com"
            className="w-full h-full min-h-[480px] border-0"
            loading="lazy"
          />
        </Box>

        {/* Modal Footer */}
        <Box
          display="flex"
          direction={{ base: 'col', sm: 'row' }}
          align="center"
          justify="between"
          gap={3}
          paddingTop={3}
          marginTop={4}
          border="t"
          borderColor="line"
          className="text-xs text-dim"
        >
          <Stack direction="row" align="center" gap={1.5}>
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>20-minute Discovery Call · Virtual (Zoom / Meet)</span>
          </Stack>

          <Box
            as="a"
            href={activeBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-main font-semibold hover:text-accent transition-colors"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </Box>
        </Box>
      </Stack>
    </Box>,
    document.body
  );
};

export default BookingModal;
