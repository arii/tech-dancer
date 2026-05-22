with open('src/components/ui/AffiliateCard.tsx', 'r') as f:
    content = f.read()

new_content = content.replace(
"""        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
            {link.name}
          </a>
        </Text>

        <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {link.description}
        </Text>""",
"""        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
          <a href={link.resourceSlug ? `/gear/${link.resourceSlug}` : link.url} target={link.resourceSlug ? undefined : "_blank"} rel={link.resourceSlug ? undefined : "noopener noreferrer"} className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
            {link.resourceTitle || link.name}
          </a>
        </Text>

        <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {link.resourceExcerpt || link.description}
        </Text>"""
)

with open('src/components/ui/AffiliateCard.tsx', 'w') as f:
    f.write(new_content)
