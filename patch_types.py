import re

with open('src/types.ts', 'r') as f:
    content = f.read()

new_content = content.replace(
"""export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: 'gear' | 'tech' | 'travel' | 'recovery';
  description: string;
}""",
"""export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: 'gear' | 'tech' | 'travel' | 'recovery';
  description: string;
  resourceSlug?: string;
  resourceTitle?: string;
  resourceExcerpt?: string;
  resourceRating?: number;
  resourceImage?: string;
}"""
)

with open('src/types.ts', 'w') as f:
    f.write(new_content)
