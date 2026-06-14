import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

import { SITE_METADATA } from '@/config/content';

export interface DraftData {
  type: 'post';
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  affiliateLink: string;
  commentary: string;
  affiliateIds?: string[];
  tags?: string[];
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
  affiliateIds: [],
  tags: [],
};

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

  // Debounced persistence for manual edits
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

  // History persistence
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

  const updateField = <K extends keyof DraftData>(field: K, value: DraftData[K]) => {
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

    const normalize = (val: unknown, depth = 0): unknown => {
      if (depth > 5) return val; // Safety limit
      if (typeof val === 'string') return val.replace(/\\n/g, '\n');
      if (Array.isArray(val)) return val.map(v => normalize(v, depth + 1));
      if (val !== null && typeof val === 'object') {
        return Object.fromEntries(
          Object.entries(val).map(([k, v]) => [k, normalize(v, depth + 1)])
        );
      }
      return val;
    };

    setData((prev: DraftData) => {
      return {
        ...prev,
        type: 'post',
        title: (normalize(parsed.title) as string) || prev.title,
        category: (normalize(parsed.category) as string) || prev.category,
        excerpt: (normalize(parsed.excerpt || parsed.description) as string) || prev.excerpt,
        affiliateLink: (parsed.affiliateLink as string) || prev.affiliateLink,
        commentary: (normalize(parsed.commentary) as string) || prev.commentary,
        author: (normalize(parsed.author) as string) || prev.author,
        date: parsed.date || prev.date,
        affiliateIds: parsed.affiliateIds || prev.affiliateIds,
        tags: parsed.tags || prev.tags,
      };
    });
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
