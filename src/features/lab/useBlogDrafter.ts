import { useState, useMemo } from 'react';
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

export function useBlogDrafter() {
  const [data, setData] = useState<DraftData>({
    title: '',
    category: 'Lifestyle',
    excerpt: '',
    author: SITE_METADATA.author,
    date: new Date().toISOString().split('T')[0],
    affiliateLink: '',
    commentary: ''
  });

  const markdownBody = useMemo(() => {
    return `${data.commentary || '[Your commentary/content goes here]'}${data.affiliateLink ? `\n\n[Buy on Amazon](${data.affiliateLink})` : ''}`;
  }, [data.commentary, data.affiliateLink]);

  const markdownPreview = useMemo(() => {
    return `---
title: ${data.title || '[Title]'}
date: ${data.date}
author: ${data.author}
category: ${data.category}
excerpt: ${data.excerpt || '[Excerpt]'}
---

${markdownBody}`;
  }, [data, markdownBody]);

  const githubIssueUrl = useMemo(() => {
    const repoOwner = SITE_METADATA.repo.owner; 
    const repoName = SITE_METADATA.repo.name;
    const issueTitle = `Draft: ${data.title || 'New Post'}`;
    const issueBody = `### New Blog Post Submission\n\n**JSON Data for Pipeline:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n\n**Markdown Preview:**\n\`\`\`markdown\n${markdownPreview}\n\`\`\``;
    
    return `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
  }, [data, markdownPreview]);

  const updateField = (field: keyof DraftData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
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

    setData(prev => ({
      ...prev,
      title: parsed.title || prev.title,
      excerpt: parsed.excerpt || parsed.description || prev.excerpt,
      affiliateLink: parsed.affiliateLink || prev.affiliateLink,
      commentary: parsed.commentary || prev.commentary
    }));
    return true;
  };

  return {
    data,
    updateField,
    applyAIResponse,
    markdownPreview,
    markdownBody,
    githubIssueUrl
  };
}
