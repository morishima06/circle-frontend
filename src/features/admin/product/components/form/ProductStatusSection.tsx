import { useFormContext } from "react-hook-form";

import { SelectField } from "@/components/ui/SelectField";
import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

export const ProductStatusSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductSellData>();

  return (
    <>
      <div className="my-6 text-base font-semibold text-gray-700">商品状況</div>

      <SelectField
        variant="outline"
        size="xs"
        label="商品状態"
        name="status"
        register={register}
        error={errors.status}
        options={[
          { value: "published", label: "販売中" },
          { value: "unpublished", label: "販売停止" },
        ]}
      />
    </>
  );
};
