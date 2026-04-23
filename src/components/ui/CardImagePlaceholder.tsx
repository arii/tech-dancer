import { Box, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface CardImagePlaceholderProps {
  image?: string;
  category: string;
  date?: string;
  title: string;
}

export function CardImagePlaceholder({ image, category, date, title }: CardImagePlaceholderProps) {
  const norm = (category || '').toLowerCase();

  let surfaceVariant: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';
  if (norm.includes('tech')) surfaceVariant = 'brand';
  else if (norm.includes('travel') || norm.includes('wcs')) surfaceVariant = 'accent';
  else if (norm.includes('gear')) surfaceVariant = 'warning';
  else if (norm.includes('lifestyle')) surfaceVariant = 'danger';

  if (image) {
    return (
      <Box className="relative w-full aspect-video max-h-[160px] overflow-hidden border-b border-line bg-bg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <Box className="absolute top-3 left-3">
          <Box surface={surfaceVariant} className="px-2 py-0.5 border border-line/20 backdrop-blur-sm bg-opacity-90">
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider">
              {category}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      surface={surfaceVariant}
      className={cn(
        "w-full h-10 flex items-center px-4 border-b border-line/10",
        "bg-opacity-10" // subtle background
      )}
    >
      <Box display="flex" align="center" gap={2}>
        <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="widest" className="opacity-80">
          {category}
        </Text>
        {date && (
          <>
            <Box className="w-1 h-1 rounded-full bg-current opacity-30" />
            <Text variant="mono" size="micro" uppercase tracking="widest" className="opacity-60">
              {date}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
