import { ScoreGrid, ScoreItem } from '@/components/layout/DetailElements';


interface ResourceGridProps {
  rating: number;
  durability?: number;
  value?: number;
  priceCategory?: string;
  updatedDate?: string;
  date?: string;
}

export function ResourceGrid({
  rating: _rating,
  durability,
  value,
  priceCategory,
  updatedDate,
  date
}: ResourceGridProps) {
  return (
    <ScoreGrid>
      {durability !== undefined && durability > 0 && <ScoreItem label="Durability" value={`${durability}/5`} />}
      {value !== undefined && value > 0 && <ScoreItem label="Value" value={`${value}/5`} />}
      <ScoreItem label="Price" value={priceCategory || '$$'} intent="warning" />
      {(updatedDate || date) && <ScoreItem label="Updated" value={updatedDate || date || ''} />}
    </ScoreGrid>
  );
}
