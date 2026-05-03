import { Box, Stack, Text } from '@/layouts/Primitives';

export function Logo({ className }: { className?: string }) {
  return (
    <Stack direction="row" align="center" gap={2} className={className}>
      <Box position="relative" display="flex" align="center" justify="center">
        <Text
          as="span"
          variant="headline"
          weight="font-extrabold"
          className="text-[36px] tracking-tighter text-white" // impeccable-ignore
        >
          B
        </Text>
        <svg
          width="24"
          height="40"
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1 mt-1" // impeccable-ignore
        >
          <path
            d="M6 4L18 36"
            stroke="url(#logoGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="logoGradient" x1="6" y1="4" x2="18" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E5FF" />
              <stop offset="1" stopColor="#9D00FF" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
      <Text
        as="span"
        variant="headline"
        size="2xl"
        weight="font-medium"
        className="tracking-tight text-white"
      >
        boomtick
      </Text>
    </Stack>
  );
}
