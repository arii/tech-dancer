export function getCategoryAbbreviation(category: string, length: number = 2): string {
  if (!category) return '';
  return category.slice(0, length).toUpperCase();
}
