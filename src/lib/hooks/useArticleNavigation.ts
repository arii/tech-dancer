export interface NavigableItem {
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  date?: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
}

export function useArticleNavigation<T extends NavigableItem>(
  items: T[],
  currentSlug: string,
  basePath: string
) {
  const currentIndex = items.findIndex(item => item.slug === currentSlug);

  const nextItem = currentIndex > 0 ? items[currentIndex - 1] : undefined;
  const previousItem = currentIndex !== -1 && currentIndex < items.length - 1 ? items[currentIndex + 1] : undefined;

  const mapToNavigable = (item?: T) => {
    if (!item) return undefined;
    return {
      title: item.title,
      href: `${basePath}/${item.slug}`,
      slug: item.slug,
      basePath,
      category: item.category,
      excerpt: item.excerpt,
      date: item.date,
      readingTime: item.readingTime,
      image: item.image,
      imageAlt: item.imageAlt,
    };
  };

  return {
    previous: mapToNavigable(previousItem),
    next: mapToNavigable(nextItem)
  };
}
