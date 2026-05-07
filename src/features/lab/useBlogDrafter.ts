import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

import { SITE_METADATA } from '@/config/content';

export type ContentType = 'post' | 'event' | 'resource';

export interface DraftData {
  type: ContentType;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  // Post specific
  affiliateLink: string;
  commentary: string;
  // Event specific
  location: string;
  city: string;
  schedule: string;
  description: string;
  // Resource specific
  affiliateIds: string[];
  tags: string[];
  rating: number;
  verdict: string;
  priceCategory: string;
  updatedDate: string;
  heading: string;
  content: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  data: DraftData;
}

const STORAGE_KEY = 'tech-dancer-blog-draft';
const HISTORY_KEY = 'tech-dancer-blog-history';
const DEBOUNCE_WAIT = 1000; // 1 second

// Safe ID generator with fallback for legacy browsers
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
  rating: 5,
  verdict: '',
  priceCategory: '',
  updatedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  heading: '',
  content: ''
};

export function useBlogDrafter() {
  const [data, setData] = useState<DraftData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_DATA, ...parsed };
      } catch {
        // Silent fail per audit recommendation
      }
    }
    return DEFAULT_DATA;
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Silent fail per audit recommendation
      }
    }
    return [];
  });

  // Debounced persistence for manual edits
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedSave = useCallback((nextData: DraftData) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    }, DEBOUNCE_WAIT);
  }, []);

  useEffect(() => {
    debouncedSave(data);
  }, [data, debouncedSave]);

  // History persistence
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
# ${data.title || 'Untitled Event'}
${data.excerpt || ''}
`;
    }

    if (data.type === 'resource') {
      return `---
type: resource
title: "${data.title || 'Untitled Resource'}"
date: "${data.date}"
author: "${data.author}"
category: "${data.category}"
excerpt: "${data.excerpt || ''}"
affiliateIds: ${JSON.stringify(data.affiliateIds)}
tags: ${JSON.stringify(data.tags)}
rating: ${data.rating}
verdict: "${data.verdict || ''}"
priceCategory: "${data.priceCategory || ''}"
updatedDate: "${data.updatedDate || ''}"
---
## ${data.heading || ''}

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
  }, [data]);

  const githubIssueUrl = useMemo(() => {
    const repoOwner = SITE_METADATA.repo.owner; 
    const repoName = SITE_METADATA.repo.name;
    const typeLabel = data.type.toUpperCase();
    const issueTitle = `Draft [${typeLabel}]: ${data.title || 'New Item'}`;
    const issueBody = `### New ${data.type} Submission\n\n**JSON Data for Pipeline:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n\n**Markdown Preview:**\n\`\`\`markdown\n${markdownPreview}\n\`\`\``;
    
    return `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
  }, [data, markdownPreview]);

  const updateField = (field: keyof DraftData, value: any) => {
    setData((prev: DraftData) => ({ ...prev, [field]: value }));
  };

  const applyAIResponse = (jsonString: string) => {
    const cleanAndParseJSON = (str: string) => {
      try {
        let clean = str.trim();
        // Remove markdown code blocks if present
        clean = clean.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
        clean = clean.trim();
        return JSON.parse(clean);
      } catch {
        return null;
      }
    };

    const parsed = cleanAndParseJSON(jsonString);
    if (!parsed) return false;

    const normalize = (val: any) => {
      if (typeof val === 'string') return val.replace(/\\n/g, '\n');
      return val;
    };

    setData((prev: DraftData) => ({
      ...prev,
      ...Object.keys(parsed).reduce((acc, key) => {
        acc[key as keyof DraftData] = normalize(parsed[key]);
        return acc;
      }, {} as any)
    }));
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
