with open('src/features/events/components/CuratedGear.tsx', 'r') as f:
    content = f.read()

new_content = content.replace(
"""              {section.items.map((item) => (
                <GearCard
                  key={item.id}
                  slug={item.id}
                  title={item.name}
                  category={item.category}
                  excerpt={item.description}
                  basePath="/gear"
                />
              ))}""",
"""              {section.items.map((item) => (
                <GearCard
                  key={item.id}
                  slug={item.resourceSlug || item.id}
                  title={item.resourceTitle || item.name}
                  category={item.category}
                  excerpt={item.resourceExcerpt || item.description}
                  image={item.resourceImage}
                  rating={item.resourceRating}
                  externalUrl={!item.resourceSlug ? item.url : undefined}
                  basePath="/gear"
                />
              ))}"""
)

with open('src/features/events/components/CuratedGear.tsx', 'w') as f:
    f.write(new_content)
