import { Github, FileText, ExternalLink, Info, Terminal } from 'lucide-react';
import { useBlogDrafter } from './useBlogDrafter';
import ReactMarkdown from 'react-markdown';
import { CONTENT_CATEGORIES } from '@/config/content';

export function BlogDrafter() {
  const { data, updateField, markdownPreview, githubIssueUrl } = useBlogDrafter();

  return (
    <div className="flex flex-col gap-10 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
           <Terminal className="w-5 h-5 text-accent-brand" />
           <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl">CONTENT PIPELINE</span>
        </div>
        <div className="border border-line p-4 bg-accent/5">
           <div className="flex flex-row items-start gap-2">
              <Info className="w-4 h-4 text-accent-brand shrink-0 mt-1" />
              <p className="font-sans leading-relaxed text-text-body text-xs">
                This tool prepares your blog post for the Tech-Dancer automated pipeline.
                Complete the form below to generate a pre-formatted GitHub Issue link.
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form Column */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-line pb-2">
             <span className="font-mono uppercase tracking-widest text-[8px] font-bold text-accent-brand">METADATA_INPUT</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">POST_TITLE</span>
              <input
                type="text"
                value={data.title}
                onChange={(e: any) => updateField('title', e.target.value)}
                placeholder="The Future of WCS..."
                className="w-full bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">CATEGORY</span>
                <select
                  value={data.category}
                  onChange={(e: any) => updateField('category', e.target.value)}
                  className="w-full bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none appearance-none"
                >
                  {CONTENT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">DATE</span>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e: any) => updateField('date', e.target.value)}
                  className="w-full bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">EXCERPT_SUMMARY</span>
              <textarea
                value={data.excerpt}
                onChange={(e: any) => updateField('excerpt', e.target.value)}
                placeholder="A brief overview of the post content..."
                className="w-full h-20 bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">AMAZON_AFFILIATE_LINK (OPTIONAL)</span>
              <input
                type="url"
                value={data.affiliateLink}
                onChange={(e: any) => updateField('affiliateLink', e.target.value)}
                placeholder="https://amazon.com/..."
                className="w-full bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">BODY_COMMENTARY</span>
              <textarea
                value={data.commentary}
                onChange={(e: any) => updateField('commentary', e.target.value)}
                placeholder="Write your main content here..."
                className="w-full h-40 bg-surface border border-line p-3 font-mono text-sm focus:border-accent-brand outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-line pb-2 flex justify-between items-center">
             <span className="font-mono uppercase tracking-widest text-[8px] font-bold text-accent-brand">MARKDOWN_PREVIEW</span>
             <div className="flex items-center gap-2 text-text-dim">
                <FileText className="w-3 h-3" />
                <span className="font-mono uppercase tracking-widest text-[8px]">v1.2.0</span>
             </div>
          </div>

          <div
            className="flex-1 border border-line bg-muted p-6 overflow-y-auto max-h-[600px] prose prose-sm prose-invert max-w-none bg-black/5"
          >
            <ReactMarkdown>{markdownPreview}</ReactMarkdown>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
                  Current Data: ${JSON.stringify(data, null, 2)}
                  Respond ONLY with a valid JSON object matching the keys above. Ensure the 'commentary' field is a full, high-quality Markdown post.`;
                navigator.clipboard.writeText(prompt);
                alert("AI Prompt Copied! Use Gemini or Claude to expand.");
              }}
              className="flex items-center justify-center gap-3 bg-muted border border-line p-4 hover:bg-line transition-all cursor-pointer group"
            >
              <Terminal className="w-5 h-5" />
              <span className="font-mono tracking-widest uppercase text-xs font-bold">COPY AI PROMPT</span>
            </button>

            <a
              href={githubIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-accent text-bg p-4 hover:bg-accent-brand transition-all cursor-pointer group"
            >
              <Github className="w-5 h-5" />
              <span className="font-display font-bold uppercase tracking-tight leading-none text-base font-bold">SUBMIT DRAFT</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
