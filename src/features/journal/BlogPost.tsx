import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug } from '@/lib/content';
import { ContentDetail } from '@/layouts/ContentDetail';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = useMemo(() => slug ? getPostBySlug(slug) : undefined, [slug]);

  if (!post) {
    return (
      <div className="panel h-full overflow-y-auto w-full text-center py-20">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="font-display font-bold uppercase tracking-tight leading-none text-2xl">Post Not Found</h1>
          <button onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors cursor-pointer">
            <span className="font-mono tracking-widest uppercase text-xs">Back to Journal</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <ContentDetail
      post={post}
      onBack={() => navigate('/blog')}
      backLabel="Back to Folio"
    />
  );
}
