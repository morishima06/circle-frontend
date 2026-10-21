import type { ProductDetail } from "@/types/product";

import { ProductActions } from "./ProductActions";

export const ProductInfo = ({ product }: { product: ProductDetail }) => {
  return (
    <div className="sticky top-20 z-0">
      <p className="mb-2 text-base font-bold">{product?.designer?.name}</p>
      <p className="mb-4 text-3xl font-semibold">{product?.name}</p>

      <div className="mb-6 space-x-1.5">
        {product.salePrice && (
          <span className="text-lg font-semibold text-gray-500 line-through">
            ¥{product.price.toLocaleString()}
          </span>
        )}

        <span className="text-lg font-bold">
          ¥{(product.salePrice ?? product.price).toLocaleString()}
        </span>

        <span className="text-sm">(税込)</span>
      </div>

      <p className="mb-2 text-xs">
        カラー: <span className="font-semibold">{product?.color}</span>
      </p>

      <div className="">
        <ProductActions product={product} />
      </div>
      <hr className="mt-6 mb-6 border-t border-gray-200" />
      <div className="px-2">
        <div className="mt-4 mb-4">
          <h3 className="mb-4">
            <span className="border-b-0 border-slate-800 pb-1 text-sm font-semibold">
              商品詳細
            </span>
          </h3>
          <p className="text-sm">{product?.description}</p>
        </div>
        <div className="space-y-2">
          {product?.specs?.map((spec) => (
            <div key={spec.id} className="flex gap-2">
              <span className="text-sm font-medium">{spec.key}：</span>
              <span className="text-sm font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
