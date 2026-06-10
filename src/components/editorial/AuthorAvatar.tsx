import { Box, Text } from '@/layouts/Primitives';

interface AuthorAvatarProps {
  src?: string;
  name: string;
  size?: number;
}

export function AuthorAvatar({ src, name, size = 10 }: AuthorAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <Box
        as="img"
        src={src}
        alt={name}
        width={size}
        height={size}
        radius="full"
        className="object-cover border border-line/20 shadow-sm"
      />
    );
  }

  return (
    <Box
      width={size}
      height={size}
      radius="full"
      surface="muted"
      display="flex"
      align="center"
      justify="center"
      className="border border-line/20 shadow-sm"
    >
      <Text variant="mono" size="micro" weight="font-bold" color="dim" opacityVariant="high">
        {initials}
      </Text>
    </Box>
  );
}
