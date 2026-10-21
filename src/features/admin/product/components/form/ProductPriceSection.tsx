import { useFormContext, useWatch } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

export const ProductPriceSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProductSellData>();

  const onSale = useWatch({
    control,
    name: "onSale",
  });

  return (
    <>
      <div className="my-6 text-base font-semibold text-gray-700">商品価格</div>

      <InputField
        label="通常価格"
        name="price"
        type="text"
        size="xs"
        inputMode="numeric"
        normalizeInteger
        register={register}
        error={errors.price}
        variant="outline"
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("onSale")} />
        セール価格を設定する
      </label>

      {onSale && (
        <>
          <InputField
            label="セール価格"
            name="salePrice"
            size="xs"
            type="text"
            normalizeInteger
            inputMode="numeric"
            register={register}
            error={errors.salePrice}
            variant="outline"
          />

          <InputField
            label="セール開始日時"
            name="saleStartAt"
            size="xs"
            type="datetime-local"
            register={register}
            error={errors.saleStartAt}
          />

          <InputField
            label="セール終了日時"
            name="saleEndAt"
            size="xs"
            type="datetime-local"
            register={register}
            error={errors.saleEndAt}
          />
        </>
      )}
    </>
  );
};
