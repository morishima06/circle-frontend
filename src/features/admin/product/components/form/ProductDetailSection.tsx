import { useFormContext, useWatch } from "react-hook-form";

import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

import { useCategorySizes } from "../../hooks/useCategorySizes";
import { CategorySelect } from "./CategorySelect";
import { ColorSelect } from "./ColorSelect";
import { DesignerSelect } from "./DesignerSelect";
import { SkuInputs } from "./SkuInputs";

type Props = {
  initialDesignerName?: string;
  initialCategoryId?: number;
};

export const ProductDetailSection = ({
  initialDesignerName,
  initialCategoryId,
}: Props) => {
  const { control } = useFormContext<ProductSellData>();

  const categoryId = useWatch({
    control,
    name: "categoryId",
  });

  const { sizes } = useCategorySizes(categoryId);

  return (
    <section>
      <div className="space-y-2">
        <div className="my-6 text-base font-semibold text-gray-700">
          商品詳細
        </div>

        <DesignerSelect initialDesignerName={initialDesignerName} />

        <ColorSelect />

        <CategorySelect initialCategoryId={initialCategoryId} />

        {sizes.length > 0 && <SkuInputs sizes={sizes} />}
      </div>
    </section>
  );
};
