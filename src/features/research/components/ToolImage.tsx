import React from 'react';
import { Cpu, Activity, Globe, Search, LucideIcon } from 'lucide-react';

import { ResearchTool } from '@/config/research-tools';
import { Box, Stack, Text } from '@/layouts/Primitives';

export const getToolIcon = (tool: ResearchTool): LucideIcon => {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
};

export interface ToolImageProps {
  tool: ResearchTool;
  baseUrl: string;
  onImageClick?: (src: string) => void;
}

export const ToolImage = ({ tool, baseUrl, onImageClick }: ToolImageProps) => {
  if (tool.customPreview) {
    const { logo, headline, tagline } = tool.customPreview;
    return (
      <Box width="full" className="card-screenshot-wrapper boomtick-blog-preview border-b border-white/8">
        <Stack gap={1} className="preview-content">
          <Text className="preview-logo">
            {logo.prefix}<span className="logo-accent">{logo.accent}</span><span className="logo-dot font-light">{logo.suffix}</span>
          </Text>
          <Text className="preview-headline">
            {headline.map((line, idx) => (
              <React.Fragment key={idx}>
                {line.accent ? (
                  <span className="headline-accent">{line.accent}</span>
                ) : (
                  line.text
                )}
                {idx < headline.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
          <Text className="preview-tagline">
            {tagline}
          </Text>
        </Stack>
      </Box>
    );
  }

  if (!tool.image) return null;

  const src = tool.image.startsWith('/') ? `${baseUrl}${tool.image}` : tool.image;
  const alt = tool.imageAlt || `Screenshot of the ${tool.title} interface preview`;

  const handleImageClick = (e: React.MouseEvent) => {
    if (onImageClick) {
      e.preventDefault();
      e.stopPropagation();
      onImageClick(src);
    }
  };

  return (
    <Box width="full" className="card-screenshot-wrapper border-b border-white/8 cursor-zoom-in" onClick={handleImageClick}>
      <img
        src={src}
        alt={alt}
        className="opacity-heavy hover:opacity-100 transition-opacity duration-500 w-full"
      />
    </Box>
  );
};

export default ToolImage;
