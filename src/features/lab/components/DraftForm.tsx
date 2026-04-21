import React from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { CONTENT_CATEGORIES } from '@/config/content';
import { DraftData } from '../useBlogDrafter';

interface DraftFormProps {
  data: DraftData;
  updateField: (field: keyof DraftData, value: string) => void;
}

export const DraftForm: React.FC<DraftFormProps> = ({ data, updateField }) => {
  return (
    <Stack gap={8}>
      <Box border="b" paddingBottom={2} borderColor="line">
        <Text variant="mono" size="tiny" color="accent" tracking="widest">METADATA_INPUT</Text>
      </Box>

      <Stack gap={6}>
        <Stack gap={2}>
          <Text variant="label" size="micro" color="dim">POST_TITLE</Text>
          <Box 
            as="input"
            variant="mono"
            paddingX={4}
            paddingY={3}
            surface="default"
            radius="lg"
            border
            width="full"
            value={data.title}
            onChange={(e: any) => updateField('title', e.target.value)}
            placeholder="The Future of WCS..."
            className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
          />
        </Stack>

        <Grid cols={2} gap={4}>
          <Stack gap={2}>
            <Text variant="label" size="micro" color="dim">CATEGORY</Text>
            <Box 
              as="select"
              variant="mono"
              paddingX={4}
              paddingY={3}
              surface="default"
              radius="lg"
              border
              width="full"
              value={data.category}
              onChange={(e: any) => updateField('category', e.target.value)}
              className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none appearance-none"
            >
              {CONTENT_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </Box>
          </Stack>
          <Stack gap={2}>
            <Text variant="label" size="micro" color="dim">DATE</Text>
            <Box 
              as="input"
              type="date"
              variant="mono"
              paddingX={4}
              paddingY={3}
              surface="default"
              radius="lg"
              border
              width="full"
              value={data.date}
              onChange={(e: any) => updateField('date', e.target.value)}
              className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
            />
          </Stack>
        </Grid>

        <Stack gap={2}>
          <Text variant="label" size="micro" color="dim">EXCERPT_SUMMARY</Text>
          <Box 
            as="textarea"
            variant="mono"
            paddingX={4}
            paddingY={3}
            surface="default"
            radius="lg"
            border
            width="full"
            height={24}
            value={data.excerpt}
            onChange={(e: any) => updateField('excerpt', e.target.value)}
            placeholder="A brief overview..."
            className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none resize-none"
          />
        </Stack>

        <Stack gap={2}>
          <Text variant="label" size="micro" color="dim">AMAZON_AFFILIATE_LINK</Text>
          <Box 
            as="input"
            variant="mono"
            paddingX={4}
            paddingY={3}
            surface="default"
            radius="lg"
            border
            width="full"
            value={data.affiliateLink}
            onChange={(e: any) => updateField('affiliateLink', e.target.value)}
            placeholder="https://amazon.com/..."
            className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none"
          />
        </Stack>
      </Stack>

      <Stack gap={2}>
        <Box border="b" paddingBottom={2} borderColor="line">
          <Text variant="mono" size="tiny" color="accent" tracking="widest">BODY_COMMENTARY</Text>
        </Box>
        <Box 
          as="textarea"
          variant="mono"
          padding={4}
          surface="default"
          radius="lg"
          border
          width="full"
          height={72}
          value={data.commentary}
          onChange={(e: any) => updateField('commentary', e.target.value)}
          placeholder="Write your main content here..."
          className="focus:border-accent ring-accent/5 focus:ring-4 transition-all duration-200 outline-none resize-none shadow-inner"
        />
      </Stack>
    </Stack>
  );
};
