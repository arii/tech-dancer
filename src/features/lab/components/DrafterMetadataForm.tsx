import { ChangeEvent } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { inputs } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { CONTENT_CATEGORIES } from '@/config/content';
import { EVENT_TYPES } from '../config';
import { DrafterData } from '../useBlogDrafter';

interface DrafterMetadataFormProps {
  data: DrafterData;
  updateField: (field: keyof DrafterData, value: string | string[] | number) => void;
}

export function DrafterMetadataForm({ data, updateField }: DrafterMetadataFormProps) {
  return (
    <Stack gap={6}>
      <Grid cols={2} gap={4}>
        <Stack gap={2}>
          <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Content Type</Text>
          <Box
            as="select"
            value={data.type}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField('type', e.target.value as 'post' | 'resource' | 'event')}
            className={cn(inputs.base, "appearance-none")}
          >
            <option value="post">Blog Post</option>
            <option value="resource">Resource Card</option>
            <option value="event">Event Card</option>
          </Box>
        </Stack>
        <Stack gap={2}>
          <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Category</Text>
          <Box
            as="select"
            value={data.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField('category', e.target.value)}
            className={cn(inputs.base, "appearance-none")}
          >
            {data.type === 'event' ? (
              EVENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))
            ) : CONTENT_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </Box>
        </Stack>
      </Grid>

      <Stack gap={2}>
        <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Title</Text>
        <Box
          as="input"
          type="text"
          value={data.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('title', e.target.value)}
          placeholder="The Future of WCS..."
          className={inputs.base}
        />
      </Stack>

      <Grid cols={2} gap={4}>
        <Stack gap={2}>
          <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Publish Date</Text>
          <Box
            as="input"
            type="date"
            value={data.date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('date', e.target.value)}
            className={inputs.base}
          />
        </Stack>
        <Stack gap={2}>
          <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Author</Text>
          <Box
            as="input"
            type="text"
            value={data.author}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('author', e.target.value)}
            className={inputs.base}
          />
        </Stack>
      </Grid>

      {data.type === 'resource' && (
        <Box border padding={4} surface="muted" radius="md">
          <Stack gap={4}>
             <Text variant="mono" size="micro" color="brand" weight="font-bold">Resource Metadata</Text>
             <Grid cols={3} gap={4}>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">RATING (0-5)</Text>
                  <Box as="input" type="number" step="0.1" value={data.rating} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('rating', parseFloat(e.target.value))} className={inputs.base} />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">DURABILITY</Text>
                  <Box as="input" type="number" step="0.1" value={data.durability} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('durability', parseFloat(e.target.value))} className={inputs.base} />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">VALUE</Text>
                  <Box as="input" type="number" step="0.1" value={data.value} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('value', parseFloat(e.target.value))} className={inputs.base} />
                </Stack>
             </Grid>
             <Grid cols={2} gap={4}>
               <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">Price Category</Text>
                  <Box as="input" type="text" value={data.priceCategory} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('priceCategory', e.target.value)} placeholder="e.g. $$$" className={inputs.base} />
               </Stack>
               <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">Updated Date</Text>
                  <Box as="input" type="text" value={data.updatedDate} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('updatedDate', e.target.value)} placeholder="Oct 2026" className={inputs.base} />
               </Stack>
             </Grid>
             <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">VERDICT</Text>
                <Box as="input" type="text" value={data.verdict} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('verdict', e.target.value)} placeholder="Final summary..." className={inputs.base} />
             </Stack>
             <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">AFFILIATE_IDS (COMMA SEPARATED)</Text>
                <Box as="input" type="text" value={(data.affiliateIds ?? []).join(', ')} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('affiliateIds', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="amazon, etc" className={inputs.base} />
             </Stack>
             <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">TAGS (COMMA SEPARATED)</Text>
                <Box as="input" type="text" value={(data.tags ?? []).join(', ')} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="practice, travel" className={inputs.base} />
             </Stack>
          </Stack>
        </Box>
      )}

      {data.type === 'event' && (
        <Box border padding={4} surface="muted" radius="md">
          <Stack gap={4}>
             <Text variant="mono" size="micro" color="brand" weight="font-bold">Event Logistics</Text>
             <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">EVENT_START_DATE</Text>
                <Box as="input" type="date" value={data.startDate} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('startDate', e.target.value)} className={inputs.base} />
             </Stack>
             <Grid cols={2} gap={4}>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">EARLY_BIRD_DEADLINE</Text>
                  <Box as="input" type="date" value={data.earlyBirdDate} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('earlyBirdDate', e.target.value)} className={inputs.base} />
                </Stack>
                <Stack gap={2}>
                  <Text variant="mono" size="micro" color="dim">HOTEL_CUTOFF</Text>
                  <Box as="input" type="date" value={data.hotelCutoffDate} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('hotelCutoffDate', e.target.value)} className={inputs.base} />
                </Stack>
             </Grid>
             <Stack gap={2}>
                <Text variant="mono" size="micro" color="dim">OFFICIAL_URL</Text>
                <Box as="input" type="url" value={data.url} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('url', e.target.value)} placeholder="https://..." className={inputs.base} />
             </Stack>
          </Stack>
        </Box>
      )}

      <Stack gap={2}>
        <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Excerpt</Text>
        <Box
          as="textarea"
          value={data.excerpt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('excerpt', e.target.value)}
          placeholder="A brief overview of the content..."
          height={20}
          className={cn(inputs.base, "resize-none")}
        />
      </Stack>

      {/* Type Specific Content Fields */}
      {data.type === 'post' && (
        <>
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Amazon Link (Optional)</Text>
            <Box
              as="input"
              type="url"
              value={data.affiliateLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('affiliateLink', e.target.value)}
              placeholder="https://amazon.com/..."
              className={inputs.base}
            />
          </Stack>

          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>Content</Text>
            <Box
              as="textarea"
              value={data.commentary}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('commentary', e.target.value)}
              placeholder="Write your main content here..."
              height={40}
              className={cn(inputs.base, "resize-none")}
            />
          </Stack>
        </>
      )}

      {data.type === 'resource' && (
        <>
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>RESOURCE_HEADING</Text>
            <Box
              as="input"
              type="text"
              value={data.heading}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('heading', e.target.value)}
              placeholder="Practice Anywhere"
              className={inputs.base}
            />
          </Stack>

          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>RESOURCE_CONTENT</Text>
            <Box
              as="textarea"
              value={data.content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('content', e.target.value)}
              placeholder="Write the resource review content here..."
              height={40}
              className={cn(inputs.base, "resize-none")}
            />
          </Stack>
        </>
      )}

      {data.type === 'event' && (
        <>
          <Grid cols={2} gap={4}>
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>LOCATION</Text>
              <Box
                as="input"
                type="text"
                value={data.location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('location', e.target.value)}
                placeholder="Hyatt Regency..."
                className={inputs.base}
              />
            </Stack>
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>CITY</Text>
              <Box
                as="input"
                type="text"
                value={data.city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('city', e.target.value)}
                placeholder="San Francisco, CA"
                className={inputs.base}
              />
            </Stack>
          </Grid>
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>SCHEDULE</Text>
            <Box
              as="input"
              type="text"
              value={data.schedule}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('schedule', e.target.value)}
              placeholder="October 8 - 11, 2026"
              className={inputs.base}
            />
          </Stack>
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="dim" className={inputs.label} marginBottom={0}>DESCRIPTION</Text>
            <Box
              as="textarea"
              value={data.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('description', e.target.value)}
              placeholder="Detailed event description..."
              height={40}
              className={cn(inputs.base, "resize-none")}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
}
