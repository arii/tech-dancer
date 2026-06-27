import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { BaseCard } from '@/components/ui/BaseCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActionButton } from '@/components/ui/ActionButton';
import { ResearchTool } from '@/config/research-tools';
import { ToolImage, getToolIcon } from './ToolImage';

export interface FlagshipCardProps {
  tool: ResearchTool;
  baseUrl: string;
  onImageClick?: (src: string) => void;
}

export const FlagshipCard = ({
  tool,
  baseUrl,
  onImageClick
}: FlagshipCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <BaseCard
      key={tool.id}
      padding={0}
      gap={0}
      surface="surface"
      height="full"
      overflow="hidden"
    >
      <Stack gap={0} height="full">
        <ToolImage tool={tool} baseUrl={baseUrl} onImageClick={onImageClick} />
        <Stack flex={1} paddingTop={3.5} paddingX={4} paddingBottom={4} gap={0}>
          <Box display="flex" justify="between" align="start" width="full" marginBottom={3}>
            <Box width={12} height={12} surface="muted" radius="md" display="flex" align="center" justify="center" className="border border-white/8">
              <Icon icon={getToolIcon(tool)} size="lg" color="accent" />
            </Box>
            <StatusBadge label={tool.id === 'boomtick-blog' ? 'Active dev' : 'Flagship'} />
          </Box>

          <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest" marginBottom={1}>
            {tool.category}
          </Text>
          <Text as="h3" variant="display" size="2xl" weight="font-black" marginBottom={2}>
            {tool.title}
          </Text>
          {tool.subtitle && (
            <Text size="sm" color="accent" weight="font-semibold" uppercase tracking="tighter" marginBottom={2}>
              {tool.subtitle}
            </Text>
          )}
          <Text
            variant="body"
            size="md"
            color="dim"
            leading="relaxed"
            marginBottom={3}
            className={cn(!isExpanded && tool.description.length > 150 && "line-clamp-3")}
          >
            {tool.description}
          </Text>
          {tool.description && tool.description.length > 150 && (
            <Box as="button" onClick={toggleExpand} marginBottom={5} alignSelf="start" className="text-accent hover:underline text-xs font-semibold focus:outline-none z-30">
              {isExpanded ? "Read Less" : "Read More"}
            </Box>
          )}

          {tool.inDevMessage && (
            <div className="in-dev-banner">
              <Icon icon={FlaskConical} size="sm" color="dim" aria-hidden="true" />
              <p>
                <strong>{tool.inDevMessage.highlight}</strong>{tool.inDevMessage.rest}
              </p>
            </div>
          )}

          <Box display="flex" wrap="wrap" gap={1.5} marginBottom={3}>
            {tool.tags.map(tag => (
              <Text key={tag} className="flagship-tag">
                {tag}
              </Text>
            ))}
          </Box>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop="auto" width={{ base: "full", sm: "auto" }}>
            {tool.externalUrl ? (
              <ActionButton
                as="a"
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                {tool.externalLinkDisplayLabel || 'Open Link'}
                <Icon icon={ExternalLink} size="sm" />
              </ActionButton>
            ) : tool.canonicalPath && (
              <ActionButton
                as={Link}
                to={tool.canonicalPath}
                variant="primary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                Read Deep-Dive
                <Icon icon={ArrowRight} size="sm" />
              </ActionButton>
            )}
            {tool.sourceUrl && (
              <ActionButton
                as="a"
                href={tool.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                paddingX={4}
                paddingY={2}
                zIndex="docked"
                width={{ base: "full", sm: "auto" }}
              >
                Source Repo
                <Icon icon={Github} size="sm" />
              </ActionButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </BaseCard>
  );
};
