import { useFormContext } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import { TextareaField } from "@/components/ui/TextareaField";
import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

export const ProductBasicSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductSellData>();

  return (
    <>
      <div className="my-6 text-base font-semibold text-gray-700">商品概要</div>

      <InputField
        label="商品名"
        name="name"
        size="xs"
        register={register}
        error={errors.name}
        variant="outline"
      />

      <InputField
        label="製品番号"
        name="styleCode"
        size="xs"
        register={register}
        error={errors.styleCode}
        variant="outline"
        placeholder="製品番号(なければ自動割当)"
      />

      <TextareaField
        label="説明"
        name="description"
        register={register}
        error={errors.description}
      />
    </>
  );
};
