import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { SITE_METADATA } from '@/config/content';

export interface DraftData {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
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
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export function useBlogDrafter() {
  const [data, setData] = useState<DraftData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved draft", e);
      }
    }
    return {
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
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    return [];
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Periodic Auto-save logic (not debounced)
  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataRef.current));
      setLastSaved(new Date());
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  // Immediate save helper
  const saveDraft = useCallback((draftToSave: DraftData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draftToSave));
    setLastSaved(new Date());
  }, []);

  const saveToHistory = useCallback(() => {
    const newEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      data: { ...data }
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10 versions
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    saveDraft(data);
  }, [data, history, saveDraft]);

  const rollback = (entry: HistoryEntry) => {
    setData(entry.data);
    saveDraft(entry.data);
  };

  const deleteHistoryEntry = (id: string) => {
    const updatedHistory = history.filter(h => h.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const markdownPreview = useMemo(() => {
    return `# ${data.title || '[Title]'}

> **Category**: ${data.category} | **Date**: ${data.date} | **Author**: ${data.author}

${data.excerpt ? `*${data.excerpt}*` : ''}

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
      } catch (e) {
        console.error("JSON Clean/Parse Error:", e);
        return null;
      }
    };

    const parsed = cleanAndParseJSON(jsonString);
    if (!parsed) return false;

    // Helper to normalize literal \n strings if they exist
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
    const newData = {
      title: '',
      category: 'Lifestyle',
      excerpt: '',
      author: SITE_METADATA.author,
      date: new Date().toISOString().split('T')[0],
      affiliateLink: '',
      commentary: ''
    };
    setData(newData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    data,
    history,
    lastSaved,
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
