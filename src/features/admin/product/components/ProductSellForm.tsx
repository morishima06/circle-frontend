import type { ProductImage } from "@/types/admin/product";

import { ImageUpload } from "./form/ImageUpload";
import { ProductBasicSection } from "./form/ProductBasicSection";
import { ProductDetailSection } from "./form/ProductDetailSection";
import { ProductPriceSection } from "./form/ProductPriceSection";
import { ProductStatusSection } from "./form/ProductStatusSection";
import { SpecInputs } from "./form/SpecInputs";

type Image = ProductImage & {
  signedId?: string;
};

type Props = {
  initialImages?: Image[];
  initialDesignerName?: string;
  initialCategoryId?: number;
};

export const ProductSellForm = ({
  initialImages,
  initialDesignerName,
  initialCategoryId,
}: Props) => {
  return (
    <div className="space-y-6">
      <ImageUpload initialImages={initialImages} />

      <ProductBasicSection />

      <ProductDetailSection
        initialDesignerName={initialDesignerName}
        initialCategoryId={initialCategoryId}
      />

      <ProductPriceSection />

      <ProductStatusSection />

      <SpecInputs />
    </div>
  );
};
