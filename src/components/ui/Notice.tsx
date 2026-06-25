import { Box, Text } from '@/layouts/Primitives';

interface NoticeProps {
  type?: 'info' | 'warning';
  children: React.ReactNode;
}

export function Notice({ type = 'info', children }: NoticeProps) {
  const surface = type === 'warning' ? 'warning' : 'accent';
  const label = type === 'warning' ? 'CAUTION' : 'NOTE';

  return (
    <Box
      surface={surface}
      border
      padding={6}
      marginY={8}
      radius="none"
      position="relative"
      className="overflow-hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width={0.5}
        height="full"
        className={type === 'warning' ? "bg-accent-purple" : "bg-accent"}
      />
      <Text
        variant="mono"
        size="tiny"
        weight="font-bold"
        intent={type === 'warning' ? 'warning' : 'success'}
        tracking="widest"
        marginBottom={2}
        display="block"
      >
        {label}
      </Text>
      <Box className="prose-direct-children [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul:first-child]:mt-0 [&>ul:last-child]:mb-0"> {/* impeccable-ignore */}
        {children}
      </Box>
    </Box>
  );
}
