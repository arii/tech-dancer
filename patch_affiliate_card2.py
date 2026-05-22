with open('src/components/ui/AffiliateCard.tsx', 'r') as f:
    content = f.read()

new_content = content.replace(
"""import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';""",
"""import { ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';"""
)

new_content = new_content.replace(
"""          <a href={link.resourceSlug ? `/gear/${link.resourceSlug}` : link.url} target={link.resourceSlug ? undefined : "_blank"} rel={link.resourceSlug ? undefined : "noopener noreferrer"} className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
            {link.resourceTitle || link.name}
          </a>""",
"""          {link.resourceSlug ? (
            <NavLink to={`/gear/${link.resourceSlug}`} className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              {link.resourceTitle || link.name}
            </NavLink>
          ) : (
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              {link.name}
            </a>
          )}"""
)

with open('src/components/ui/AffiliateCard.tsx', 'w') as f:
    f.write(new_content)
