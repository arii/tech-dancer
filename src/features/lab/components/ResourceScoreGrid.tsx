import { Star } from 'lucide-react';
import { ScoreGrid, ScoreItem } from '@/components/layout/DetailElements';

interface ResourceScoreGridProps {
  rating: number;
  durability?: number;
  value?: number;
  priceCategory?: string;
  updatedDate?: string;
  date?: string;
}

export function ResourceScoreGrid({
  rating,
  durability,
  value,
  priceCategory,
  updatedDate,
  date
}: ResourceScoreGridProps) {
  return (
    <ScoreGrid>
      <ScoreItem label="Overall" value={rating || 'N/A'} icon={Star} intent="warning" />
      {durability !== undefined && durability > 0 && <ScoreItem label="Durability" value={`${durability}/5`} />}
      {value !== undefined && value > 0 && <ScoreItem label="Value" value={`${value}/5`} />}
      <ScoreItem label="Price" value={priceCategory || '$$'} intent="warning" />
      {(updatedDate || date) && <ScoreItem label="Updated" value={updatedDate || date || ''} />}
    </ScoreGrid>
  );
}
