export function getCategoryAbbreviation(category: string, length: number = 2): string {
  if (!category) return '';
  return category.slice(0, length).toUpperCase();
}

export function getCategoryColorClass(category: string): string {
  const norm = (category || '').toLowerCase();

  if (norm.includes('tech')) return 'bg-blue-50 text-blue-500';
  if (norm.includes('travel')) return 'bg-emerald-50 text-emerald-500';
  if (norm.includes('gear')) return 'bg-amber-50 text-amber-600';
  if (norm.includes('lifestyle')) return 'bg-rose-50 text-rose-500';

  return 'bg-slate-50 text-slate-500'; // Default
}
