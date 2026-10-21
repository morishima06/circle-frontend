import Link from "next/link";

import type { Product } from "@/types/product";

import { ProductImage } from "./ProductImage";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const isSale = product.salePrice != null;

          const discountPercentage = isSale
            ? Math.round(
                ((product.originalPrice - product.salePrice!) /
                  product.originalPrice) *
                  100,
              )
            : null;

          return (
            <div key={product.id} className="pb-1 text-sm">
              <Link
                href={product.url}
                className="block"
                data-testid="product-link"
              >
                <div className="relative mb-4 aspect-4/5">
                  <ProductImage imgUrl={product.imageUrl} alt={product.name} />
                </div>

                <h3 className="text-center font-semibold">
                  {product.designer.name}
                </h3>

                <p className="text-center text-gray-800">{product.name}</p>

                {isSale ? (
                  <div className="flex justify-center gap-1 text-xs font-semibold">
                    <span className="text-red-600">{product.salePrice}円</span>

                    <span className="text-slate-500 line-through">
                      {product.originalPrice}円
                    </span>

                    {discountPercentage && (
                      <span>{discountPercentage}%off</span>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-xs font-semibold">
                    <span>{product.originalPrice}円</span>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
