import type { Color } from "@/types/collection";

import { ColorFilter } from "./ColorFilter";
import { SortFilter } from "./SortFilter";

type Props = {
  colors: Color[];
};

export const FilterPanel = ({ colors }: Props) => {
  return (
    <div>
      <ColorFilter colors={colors} />
      <SortFilter />
    </div>
  );
};
