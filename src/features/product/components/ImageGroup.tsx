import { ProductImage } from "@/features/collections/components/ProductImage";
import type { ProductDetail } from "@/types/product";

export const ImageGroup = ({ product }: { product: ProductDetail }) => {
  const images = product.images.length > 0 ? product.images : [null];

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {images.map((img, i) => (
        <div key={i} className="relative aspect-4/5">
          <ProductImage imgUrl={img} alt={`${product.name} ${i + 1}`} />
        </div>
      ))}
    </div>
  );
};
