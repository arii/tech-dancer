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

  const markdownPreview = useMemo(() => {
    return `---
title: ${data.title || '[Title]'}
date: ${data.date}
author: ${data.author}
category: ${data.category}
excerpt: ${data.excerpt || '[Excerpt]'}
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

  const wordCount = data.commentary.trim().split(/\s+/).filter(Boolean).length;

  const updateField = (field: keyof DraftData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return {
    data,
    updateField,
    markdownPreview,
    githubIssueUrl,
    wordCount
  };
}
