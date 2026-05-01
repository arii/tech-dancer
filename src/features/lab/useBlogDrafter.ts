import { useState, useMemo, useEffect, useCallback } from 'react';
import { debounce } from 'throttle-debounce';
import { SITE_METADATA } from '@/config/content';

export interface DraftData {
  type: 'post' | 'resource' | 'study' | 'event';
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  tags: string;
  affiliateLink: string;
  commentary: string;
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
      image: '',
      tags: '',
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
  const debouncedSave = useMemo(
    () =>
      debounce(DEBOUNCE_WAIT, (nextData: DraftData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      }),
    []
  );

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
    return `# ${data.title || '[Title]'}

> **Type**: ${data.type} | **Category**: ${data.category} | **Date**: ${data.date} | **Author**: ${data.author}
${data.tags ? `> **Tags**: ${data.tags}\n` : ''}
${data.excerpt ? `\n*${data.excerpt}*\n` : ''}
${data.image ? `\n![Hero Image](${data.image})\n` : ''}
---

${data.commentary || '[Your commentary/content goes here]'}

${data.affiliateLink ? `\n[Buy on Amazon](${data.affiliateLink})` : ''}
`;
  }, [data]);

  const githubIssueUrl = useMemo(() => {
    const repoOwner = SITE_METADATA.repo.owner; 
    const repoName = SITE_METADATA.repo.name;
    const issueTitle = `Draft: ${data.title || 'New Post'}`;

    const pipelineData = {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    const issueBody = `### New Content Submission\n\n**JSON Data for Pipeline:**\n\`\`\`json\n${JSON.stringify(pipelineData, null, 2)}\n\`\`\`\n\n**Markdown Preview:**\n\`\`\`markdown\n${markdownPreview}\n\`\`\``;
    
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

    const normalize = (str: string) => typeof str === 'string' ? str.replace(/\\n/g, '\n') : str;

    setData((prev: DraftData) => ({
      ...prev,
      title: normalize(parsed.title) || prev.title,
      excerpt: normalize(parsed.excerpt || parsed.description) || prev.excerpt,
      affiliateLink: parsed.affiliateLink || prev.affiliateLink,
      commentary: normalize(parsed.commentary) || prev.commentary
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
      image: '',
      tags: '',
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
