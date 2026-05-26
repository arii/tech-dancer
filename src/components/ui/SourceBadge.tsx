import { Text } from '@/layouts/Primitives';
import { ContentType } from '@/lib/contentTypeDetector';

interface SourceBadgeProps {
  type: ContentType;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const BADGE_TEXT: Record<ContentType, string> = {
  affiliate: 'Affiliate pick',
  merch: 'BoomTick merch',
  event: 'Event resource',
};

const POSITION_CLASSES: Record<string, string> = {
  'top-left': 'top-3 left-3',
  'top-right': 'top-3 right-3',
  'bottom-left': 'bottom-3 left-3',
  'bottom-right': 'bottom-3 right-3',
};

/**
 * Subtle source badge for resource cards.
 * Displays the content type (affiliate, merch, event) in a quiet, non-distracting way.
 */
export function SourceBadge({ type, position = 'bottom-left', className }: SourceBadgeProps) {
  const text = BADGE_TEXT[type];
  const posClass = POSITION_CLASSES[position];

  return (
    <div
      className={`absolute ${posClass} px-2 py-1 rounded-md bg-bg/70 backdrop-blur-sm ${className || ''}`}
    >
      <Text
        size="xs"
        weight="font-medium"
        color="dim"
        className="whitespace-nowrap"
      >
        {text}
      </Text>
    </div>
  );
}
