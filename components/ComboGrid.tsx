import { Combo } from '@/lib/database.types';
import { ComboCard } from './ComboCard';

interface ComboGridProps {
  combos: Combo[];
}

export function ComboGrid({ combos }: ComboGridProps) {
  const sortedCombos = [...combos].sort((a, b) => a.orden - b.orden);

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>
    </section>
  );
}
