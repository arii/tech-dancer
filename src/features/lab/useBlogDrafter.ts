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
    try {
      let cleanJson = jsonString.trim();
      if (cleanJson.startsWith('```json')) cleanJson = cleanJson.substring(7);
      if (cleanJson.startsWith('```')) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith('```')) cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      cleanJson = cleanJson.trim();

      const parsed = JSON.parse(cleanJson);
      
      setData(prev => ({
        ...prev,
        title: parsed.title || prev.title,
        excerpt: parsed.excerpt || parsed.description || prev.excerpt,
        affiliateLink: parsed.affiliateLink || prev.affiliateLink,
        commentary: parsed.commentary || prev.commentary
      }));
      return true;
    } catch (e) {
      console.error("JSON Parsing Error:", e);
      return false;
    }
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
