import { Box, Text } from '@/layouts/Primitives';
import { FileText, MessageSquare, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS } from './constants';

export default function ContactCTARow() {
  const items = [
    {
      icon: FileText,
      label: "Curriculum vitae",
      sub: "PDF download",
      href: "/cv.pdf",
      bg: COLORS.blue.bg,
      color: COLORS.blue.accent,
      external: true
    },
    {
      icon: MessageSquare,
      label: "Get in touch",
      sub: "Contact form",
      href: "/contact",
      bg: COLORS.green.bg,
      color: COLORS.green.icon
    },
    {
      icon: Github,
      label: "GitHub",
      sub: "arii",
      href: "https://github.com/arii",
      bg: COLORS.neutral.bg,
      color: COLORS.neutral.text,
      external: true
    },
  ];

  return (
    <Box
      display="grid"
      cols={{ base: 1, md: 3 }}
      gap={2}
      paddingTop={8}
      border="t"
      className="border-line"
    >
      {items.map((item) => {
        const isExternal = item.external;
        const Component = isExternal ? 'a' : Link;
        const linkProps = isExternal
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : { to: item.href };

        return (
          <Box
            key={item.label}
            as={Component}
            // @ts-ignore - dynamic component props
            {...linkProps}
            display="flex"
            direction="col"
            align="center"
            justify="center"
            gap={1.5}
            padding={4}
            border
            radius="md"
            className="text-center hover:border-line transition-colors group"
          >
            <Box
              width={7}
              height={7}
              radius="md"
              display="flex"
              align="center"
              justify="center"
              style={{ backgroundColor: item.bg }}
            >
              <item.icon size={16} style={{ color: item.color }} />
            </Box>
            <Text variant="display" size="sm" weight="font-medium" className="text-accent-navy">{item.label}</Text>
            <Text variant="mono" size="micro" color="dim">{item.sub}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
