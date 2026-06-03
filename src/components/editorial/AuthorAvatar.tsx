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

  return (
    <Box
      as={src ? "img" : "div"}
      {...(src ? { src, alt: name, className: "object-cover" } : {})}
      width={size}
      height={size}
      radius="full"
      border={true}
      shadow="sm"
      surface={src ? undefined : "muted"}
      display={src ? undefined : "flex"}
      align={src ? undefined : "center"}
      justify={src ? undefined : "center"}
    >
      {!src && (
        <Text variant="mono" size="micro" weight="font-bold" color="dim" opacity={70}>
          {initials}
        </Text>
      )}
    </Box>
  );
}
