import { Box, Text } from '@/layouts/Primitives';
import { FileText, MessageSquare, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactCTARow() {
  const items = [
    {
      icon: FileText,
      label: "Curriculum vitae",
      sub: "PDF download",
      href: "/cv.pdf",
      bg: "bg-brand-blue-bg",
      color: "text-brand-blue-accent",
      external: true
    },
    {
      icon: MessageSquare,
      label: "Get in touch",
      sub: "Contact form",
      href: "/contact",
      bg: "bg-brand-green-bg",
      color: "text-brand-green-icon"
    },
    {
      icon: Github,
      label: "GitHub",
      sub: "arii",
      href: "https://github.com/arii",
      bg: "bg-brand-neutral-bg",
      color: "text-brand-neutral-text",
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
              className={item.bg}
            >
              <item.icon size={16} className={item.color} />
            </Box>
            <Text variant="display" size="sm" weight="font-medium" className="text-accent-navy">{item.label}</Text>
            <Text variant="mono" size="micro" color="dim">{item.sub}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
