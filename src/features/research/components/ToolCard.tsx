import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ResearchTool } from '@/config/research-tools';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/lib/variants';

import { getToolIcon } from './ToolImage';

export interface ToolCardProps {
  tool: ResearchTool;
  navigate: (path: string) => void;
}

export const ToolCard = ({ tool, navigate }: ToolCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLink = !!tool.sourceUrl;
  const href = tool.sourceUrl || tool.canonicalPath || `/research/${tool.id}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLink) {
      e.preventDefault();
      navigate(href);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack
      as="a"
      href={href}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      height="full" align="start" textAlign="left" gap={0}
      paddingTop={3.5} paddingX={4} paddingBottom={4}
      className={cn(cardVariants({ interactive: true }), "no-underline")}
    >
      <Stack gap={0} width="full">
        <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
          <Box width={10} height={10} surface="muted" radius="md" display="flex" align="center" justify="center" className="border border-white/8">
            <Icon icon={getToolIcon(tool)} size="md" color="dim" />
          </Box>
          <StatusBadge label={tool.status} />
        </Box>
        <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacityVariant="subtle" marginBottom={1}>{tool.category}</Text>
        <Text variant="display" size="xl" weight="font-black" marginBottom={2}>{tool.title}</Text>
        {tool.subtitle && (
          <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter" marginBottom={2}>{tool.subtitle}</Text>
        )}
        <Text
          size="sm"
          color="dim"
          leading="relaxed"
          marginBottom={3}
          className={cn(!isExpanded && tool.description.length > 120 && "line-clamp-3")}
        >
          {tool.description}
        </Text>
        {tool.description && tool.description.length > 120 && (
          <Box as="button" onClick={handleToggleExpand} marginBottom={5} alignSelf="start" className="text-accent hover:underline text-xs font-semibold focus:outline-none">
            {isExpanded ? "Read Less" : "Read More"}
          </Box>
        )}
        <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
          {tool.tags.map(tag => (
            <Text key={tag} className="flagship-tag">{tag}</Text>
          ))}
        </Box>
      </Stack>
      <Box display="flex" align="center" gap={2} marginTop="auto">
        <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">
          {isLink ? 'View Source' : 'View Assets'}
        </Text>
        <Icon icon={ArrowRight} size="md" color="accent" />
      </Box>
    </Stack>
  );
};

export default ToolCard;
