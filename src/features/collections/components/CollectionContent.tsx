import { Pagination } from "@/components/ui/PageNation";
import type { Product } from "@/types/product";

import { ProductList } from "./ProductList";

type Props = {
  products: Product[];
  pagination: {
    totalPages: number;
  };
};
export const CollectionContent = ({ products, pagination }: Props) => {
  return (
    <div className="space-y-10">
      <ProductList products={products} />

      <Pagination totalPages={pagination.totalPages} />
    </div>
  );
};
