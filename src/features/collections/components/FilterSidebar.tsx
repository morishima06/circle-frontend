import type { CollectionFilters } from "@/types/collection";

import { CategoryFilter } from "./CategoryFilter";
import DesignerFilter from "./DesignerFilter";

type Props = {
  filters: CollectionFilters;
};

export default function FilterSidebar({ filters }: Props) {
  return (
    <div className="space-y-8">
      <CategoryFilter categories={filters.categories} />
      <DesignerFilter designers={filters.designers} />
    </div>
  );
}
