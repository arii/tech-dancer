import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { getResourceBySlug } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';
import { ContentDetail } from '@/layouts/ContentDetail';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = useMemo(() => slug ? getResourceBySlug(slug) : undefined, [slug]);

  const affiliateLinks = useMemo(() =>
    (resource?.affiliateIds || [])
      .map(id => affiliateManager.getLink(id))
      .filter((link): link is NonNullable<typeof link> => !!link),
    [resource]
  );

  if (!resource) {
    return (
      <div className="panel h-full overflow-y-auto w-full text-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="font-display font-bold uppercase tracking-tight leading-none text-2xl">Review Not Found</h1>
          <button onClick={() => navigate('/gear')} className="hover:text-accent-brand transition-colors cursor-pointer">
            <span className="font-mono tracking-widest uppercase text-xs">Back to Toolbox</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <ContentDetail
      post={resource}
      onBack={() => navigate('/gear')}
      backLabel="Back to Toolbox"
    >
      {affiliateLinks.length > 0 && (
        <div className="border border-accent/20 p-6 bg-surface/50">
          <div className="flex flex-col gap-4">
            <span className="font-mono tracking-widest uppercase text-xs font-bold text-accent-brand">FEATURED GEAR</span>
            <div className="flex flex-wrap gap-4">
              {affiliateLinks.map((link) => (
                <a
                  key={link.id}
                  href={affiliateManager.resolveUrl(link.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 bg-surface border border-line hover:border-accent transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-mono tracking-widest uppercase text-xs font-bold">{link.name}</span>
                    <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim max-w-xs line-clamp-1">{link.description}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-accent" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </ContentDetail>
  );
}
