// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { readingTime } from '@/lib/content';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';

interface ListRowProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  basePath: string;
  content?: string;
  [key: string]: unknown;
}

export function ListRow({
  slug,
  title,
  category,
  excerpt,
  date,
  basePath,
  content,
  // Metadata props to be ignored
  type: _type,
  author: _author,
  authorAvatar: _authorAvatar,
  image: _image,
  tags: _tags,
  affiliateIds: _affiliateIds,
  rating: _rating,
  verdict: _verdict,
  priceCategory: _priceCategory,
  updatedDate: _updatedDate,
  durability: _durability,
  value: _value,
  specs: _specs,
  location: _location,
  city: _city,
  schedule: _schedule,
  description: _description,
  link: _link,
  url: _url,
  heroImage: _heroImage,
  whyAttending: _whyAttending,
  startDate: _startDate,
  earlyBirdDate: _earlyBirdDate,
  registrationDeadline: _registrationDeadline,
  hotelCutoffDate: _hotelCutoffDate,
  packingReminderDate: _packingReminderDate,
  theme: _theme,
  gear: _gear,
  themeName: _themeName,
  themeLabel: _themeLabel,
  themeDescription: _themeDescription,
  themeColors: _themeColors,
  themeOutfitIds: _themeOutfitIds,
  themeAccessoryIds: _themeAccessoryIds,
  gearOutfitIds: _gearOutfitIds,
  gearAccessoryIds: _gearAccessoryIds,
  gearShoeIds: _gearShoeIds,
  gearEssentialIds: _gearEssentialIds,
  gearTravelIds: _gearTravelIds,
  relatedEvents: _relatedEvents,
  ...rest
}: ListRowProps) {
  const rt = readingTime(content, excerpt);

  return (
    <Box as={NavLink} to={`${basePath}/${slug}`}
      {...rest}
      display="flex" align="center" border="b"
      className="group hover:bg-surface/50 transition-colors"
    >
      <Box width={1} shrink={0} self="stretch" opacity={0} className="bg-accent group-hover:opacity-100 transition-opacity" />
      <Box width={12} height={12} margin={4} shrink={0} radius="md" overflow="hidden" display="flex" align="center" justify="center" border className="bg-surface-alt/30 border-line/30">
        <CategoryPlaceholder category={category} size="md" />
      </Box>
      <Stack gap={1} flex paddingY={3} className="min-w-0">
        <Box display="flex" align="center" gap={3}>
          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
          <Text variant="mono" size="micro" color="dim">{date}</Text>
        </Box>
        <Text variant="display" size="sm" weight="font-bold" className="line-clamp-1">{title}</Text>
        <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
      </Stack>
      <Box display="flex" align="center" gap={3} padding={4} shrink={0}>
        <Text variant="mono" size="micro" color="dim">{rt} min</Text>
        <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity text-text-dim" />
      </Box>
    </Box>
  );
}
