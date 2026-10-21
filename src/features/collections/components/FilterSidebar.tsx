import type { Category } from "@/types/collection";
import type { Designer } from "@/types/collection";

import { CategoryFilter } from "./CategoryFilter";
import DesignerFilter from "./DesignerFilter";

type Props = {
  categories: Category[];
  designers: Designer[];
};

export default function FilterSidebar({ categories, designers }: Props) {
  console.log(categories);
  console.log(designers);

  return (
    <div className="space-y-8">
      <CategoryFilter categories={categories} />
      <DesignerFilter designers={designers} />
    </div>
  );
}
