import { Stack, Text } from '@/layouts/Primitives';

export function HeroBanner() {
  return (
    <Stack
      as="section"
      align="center"
      justify="center"
      paddingTop={{ base: 6, lg: 8 }}
      paddingBottom={{ base: 4, lg: 6 }}
      width="full"
      textAlign="center"
      aria-label="Welcome tagline"
    >
      <Text
        as="h1"
        variant="display"
        size={{ base: "3xl", md: "5xl", lg: "6xl" }}
        weight="font-black"
        leading="tight"
        tracking="tighter"
        className="text-white"
      >
        Code by day. Dance by night.
      </Text>
    </Stack>
  );
}
