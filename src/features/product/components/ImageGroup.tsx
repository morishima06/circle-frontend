import { ProductImage } from "@/features/collections/components/ProductImage";
import type { ProductDetail } from "@/types/product";

export const ImageGroup = ({ product }: { product: ProductDetail }) => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {product?.images.slice(0, 4).map((img, i) => (
        <div key={i} className="relative aspect-4/5">
          <ProductImage imgUrl={img} alt={`${product.name} ${i + 1}`} />
        </div>
      ))}
      <div className="relative aspect-4/5">
        <ProductImage
          imgUrl="/images/no_image.png"
          alt={`${product.name} no image`}
        />
      </div>
    </div>
  );
};
