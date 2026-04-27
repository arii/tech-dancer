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
    setData({
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
    updateField,
    applyAIResponse,
    clearForm,
    markdownPreview,
    githubIssueUrl
  };
}
