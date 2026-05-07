import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

import { SITE_METADATA } from '@/config/content';

export interface DraftData {
  type: 'post' | 'resource' | 'event';
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  affiliateLink: string;
  commentary: string;
  // Resource specific
  rating?: number;
  durability?: number;
  value?: number;
  priceCategory?: string;
  verdict?: string;
  specs?: Record<string, string>;
  // Event specific
  location?: string;
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
  url?: string;
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

export function useBlogDrafter() {
  const [data, setData] = useState<DraftData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Silent fail per audit recommendation
      }
    }
    return {
      type: 'post',
      title: '',
      category: 'Lifestyle',
      excerpt: '',
      author: SITE_METADATA.author,
      date: new Date().toISOString().split('T')[0],
      affiliateLink: '',
      commentary: ''
    };
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
    const issueTitle = `Draft: ${data.title || 'New Post'}`;
    const issueBody = `### New Blog Post Submission\n\n**JSON Data for Pipeline:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n\n**Markdown Preview:**\n\`\`\`markdown\n${markdownPreview}\n\`\`\``;
    
    return `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
  }, [data, markdownPreview]);

  const updateField = (field: keyof DraftData, value: string) => {
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

    const normalize = (val: any): any => {
      if (typeof val === 'string') return val.replace(/\\n/g, '\n');
      if (Array.isArray(val)) return val.map(normalize);
      if (val !== null && typeof val === 'object') {
        return Object.fromEntries(
          Object.entries(val).map(([k, v]) => [k, normalize(v)])
        );
      }
      return val;
    };

    setData((prev: DraftData) => ({
      ...prev,
      type: parsed.type || prev.type,
      title: normalize(parsed.title) || prev.title,
      excerpt: normalize(parsed.excerpt || parsed.description) || prev.excerpt,
      affiliateLink: parsed.affiliateLink || prev.affiliateLink,
      commentary: normalize(parsed.commentary) || prev.commentary,
      // Specialized fields
      rating: parsed.rating ?? prev.rating,
      durability: parsed.durability ?? prev.durability,
      value: parsed.value ?? prev.value,
      priceCategory: parsed.priceCategory || prev.priceCategory,
      verdict: normalize(parsed.verdict) || prev.verdict,
      specs: normalize(parsed.specs) || prev.specs,
      location: normalize(parsed.location) || prev.location,
      startDate: parsed.startDate || prev.startDate,
      earlyBirdDate: parsed.earlyBirdDate || prev.earlyBirdDate,
      hotelCutoffDate: parsed.hotelCutoffDate || prev.hotelCutoffDate,
      url: parsed.url || prev.url
    }));
    return true;
  };

  const clearForm = () => {
    setData({
      type: 'post',
      title: '',
      category: 'Lifestyle',
      excerpt: '',
      author: SITE_METADATA.author,
      date: new Date().toISOString().split('T')[0],
      affiliateLink: '',
      commentary: ''
    });
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
