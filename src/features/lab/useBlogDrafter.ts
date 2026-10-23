import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

import { SITE_METADATA } from '@/config/content';

export type ContentType = 'post' | 'event' | 'resource';

export interface BaseDraftData {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  // Common fields that were moved to Base in some versions
  affiliateLink?: string;
  commentary?: string;
  // Extended fields for Resource and Event support across types
  verdict?: string;
  priceCategory?: string;
  updatedDate?: string;
  affiliateIds?: string[];
  tags?: string[];
  heading?: string;
  content?: string;
  location?: string;
  city?: string;
  schedule?: string;
  description?: string;
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
  url?: string;
  durability?: number;
  value?: number;
}

export interface PostDraftData extends BaseDraftData {
  type: 'post';
  affiliateLink: string;
  commentary: string;
}

export interface ResourceDraftData extends BaseDraftData {
  type: 'resource';
  durability?: number;
  value?: number;
  priceCategory: string;
  verdict: string;
  specs?: Record<string, string>;
  affiliateIds: string[];
  tags: string[];
  updatedDate: string;
  heading: string;
  content: string;
}

export interface EventDraftData extends BaseDraftData {
  type: 'event';
  location: string;
  city: string;
  schedule: string;
  description: string;
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
  url?: string;
}

export type DraftData = PostDraftData | ResourceDraftData | EventDraftData;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  data: DraftData;
}

const STORAGE_KEY = 'tech-dancer-blog-draft';
const HISTORY_KEY = 'tech-dancer-blog-history';
const DEBOUNCE_WAIT = 1000; // 1 second

const generateId = () => {
  return crypto.randomUUID();
};

const DEFAULT_DATA: DraftData = {
  type: 'post',
  title: '',
  category: 'Lifestyle',
  excerpt: '',
  author: SITE_METADATA.author,
  date: new Date().toISOString().split('T')[0],
  affiliateLink: '',
  commentary: '',
  location: '',
  city: '',
  schedule: '',
  description: '',
  affiliateIds: [],
  tags: [],
  verdict: '',
  priceCategory: '',
  updatedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  heading: '',
  content: ''
};

function cleanAndParseJSON(str: string): Record<string, unknown> | null {
  try {
    let clean = str.trim();
    clean = clean.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
    clean = clean.trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

function normalizeValue(val: unknown, depth = 0): unknown {
  if (depth > 5) return val; // Safety limit
  if (typeof val === 'string') return val.replace(/\\n/g, '\n');
  if (Array.isArray(val)) return val.map(v => normalizeValue(v, depth + 1));
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val).map(([k, v]) => [k, normalizeValue(v, depth + 1)])
    );
  }
  return val;
}

function buildResourceDraft(
  base: { title: string; category: string; excerpt: string; author: string; date: string },
  parsed: Record<string, unknown>,
  prev: DraftData
): ResourceDraftData {
  const pResource = prev.type === 'resource' ? prev : {} as Partial<ResourceDraftData>;
  return {
    ...base,
    type: 'resource',
    durability: (parsed.durability as number) ?? pResource.durability ?? 0,
    value: (parsed.value as number) ?? pResource.value ?? 0,
    priceCategory: (parsed.priceCategory as string) || pResource.priceCategory || '$$',
    verdict: (normalizeValue(parsed.verdict) as string) || pResource.verdict || '',
    specs: (normalizeValue(parsed.specs) as Record<string, string>) || pResource.specs || {},
    affiliateIds: (parsed.affiliateIds as string[]) || pResource.affiliateIds || [],
    tags: (parsed.tags as string[]) || pResource.tags || [],
    updatedDate: (parsed.updatedDate as string) || pResource.updatedDate || '',
    heading: (parsed.heading as string) || pResource.heading || '',
    content: (parsed.content as string) || pResource.content || '',
  };
}

function buildEventDraft(
  base: { title: string; category: string; excerpt: string; author: string; date: string },
  parsed: Record<string, unknown>,
  prev: DraftData
): EventDraftData {
  const pEvent = prev.type === 'event' ? prev : {} as Partial<EventDraftData>;
  return {
    ...base,
    type: 'event',
    location: (normalizeValue(parsed.location) as string) || pEvent.location || '',
    startDate: (parsed.startDate as string) || pEvent.startDate || '',
    earlyBirdDate: (parsed.earlyBirdDate as string) || pEvent.earlyBirdDate || '',
    hotelCutoffDate: (parsed.hotelCutoffDate as string) || pEvent.hotelCutoffDate || '',
    url: (parsed.url as string) || pEvent.url || '',
    city: (parsed.city as string) || pEvent.city || '',
    schedule: (parsed.schedule as string) || pEvent.schedule || '',
    description: (parsed.description as string) || pEvent.description || '',
  };
}

function buildDraftFromParsed(parsed: Record<string, unknown>, prev: DraftData): DraftData {
  const type = (parsed.type as string) || prev.type;
  const base = {
    title: (normalizeValue(parsed.title) as string) || prev.title,
    category: (normalizeValue(parsed.category) as string) || prev.category,
    excerpt: (normalizeValue(parsed.excerpt || parsed.description) as string) || prev.excerpt,
    affiliateLink: (parsed.affiliateLink as string) || (prev.type === 'post' ? prev.affiliateLink : ''),
    commentary: (normalizeValue(parsed.commentary) as string) || (prev.type === 'post' ? prev.commentary : ''),
    author: (normalizeValue(parsed.author) as string) || prev.author,
    date: (parsed.date as string) || prev.date
  };

  if (type === 'resource') {
    return buildResourceDraft(base, parsed, prev);
  }

  if (type === 'event') {
    return buildEventDraft(base, parsed, prev);
  }

  return {
    ...base,
    type: 'post',
    affiliateLink: base.affiliateLink,
    commentary: base.commentary
  } as PostDraftData;
}

function generateMarkdownPreview(data: DraftData): string {
  if (data.type === 'event') {
    return `---
type: event
title: "${data.title || 'Untitled Event'}"
date: "${data.date}"
author: "${data.author}"
category: "${data.category}"
excerpt: "${data.excerpt || ''}"
location: "${data.location || ''}"
city: "${data.city || ''}"
schedule: "${data.schedule || ''}"
description: "${data.description || ''}"
---
# ${data.title || ''}
${data.excerpt || ''}
`;
  }

  if (data.type === 'resource') {
    return `type: resource
title: "${data.title || ''}"
date: "${data.date}"
author: "${data.author}"
category: "${data.category}"
excerpt: "${data.excerpt || ''}"
affiliateIds: ${JSON.stringify(data.affiliateIds ?? [])}
tags: ${JSON.stringify(data.tags ?? [])}
verdict: "${data.verdict || ''}"
priceCategory: "${data.priceCategory || ''}"
updatedDate: "${data.updatedDate || ''}"
${data.heading || ''}
${data.content || ''}
`;
  }

  return `---
type: post
title: "${data.title || 'Untitled Post'}"
date: "${data.date}"
author: "${data.author}"
category: "${data.category}"
excerpt: "${data.excerpt || ''}"
---

${data.commentary || '[Your commentary/content goes here]'}

${data.affiliateLink ? `\n[Buy on Amazon](${data.affiliateLink})` : ''}
`;
}

export function useBlogDrafter() {
  const [data, setData] = useState<DraftData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_DATA, ...parsed };
      }
    } catch {
      // Silent fail per audit recommendation
    }
    return DEFAULT_DATA;
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Silent fail per audit recommendation
    }
    return [];
  });

  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedSave = useCallback((nextData: DraftData) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      } catch {
        // Silent fail
      }
    }, DEBOUNCE_WAIT);
  }, []);

  useEffect(() => {
    debouncedSave(data);
  }, [data, debouncedSave]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // Silent fail
    }
  }, [history]);

  const saveToHistory = useCallback(() => {
    const newEntry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      data: { ...data }
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 10));
  }, [data]);

  const rollback = (entry: HistoryEntry) => {
    setData(entry.data);
  };

  const deleteHistoryEntry = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const markdownPreview = useMemo(() => {
    return generateMarkdownPreview(data);
  }, [data]);

  const githubIssueUrl = useMemo(() => {
    const repoOwner = SITE_METADATA.repo.owner;
    const repoName = SITE_METADATA.repo.name;
    const typeLabel = data.type.toUpperCase();
    const issueTitle = `Draft [${typeLabel}]: ${data.title || 'New Item'}`;
    const issueBody = `### New ${data.type} Submission\n\n**JSON Data for Pipeline:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n\n**Markdown Preview:**\n\`\`\`markdown\n${markdownPreview}\n\`\`\``;

    return `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
  }, [data, markdownPreview]);

  const updateField = <K extends keyof DraftData>(field: K, value: DraftData[K]) => {
    setData((prev: DraftData) => ({ ...prev, [field]: value }));
  };

  const applyAIResponse = (jsonString: string) => {
    const parsed = cleanAndParseJSON(jsonString);
    if (!parsed) return false;

    setData((prev: DraftData) => buildDraftFromParsed(parsed, prev));
    return true;
  };

  const clearForm = () => {
    setData(DEFAULT_DATA);
  };

  return {
    data,
    history,
    updateField,
    applyAIResponse,
    clearForm,
    saveToHistory,
    rollback,
    deleteHistoryEntry,
    markdownPreview,
    githubIssueUrl
  };
}
