import { useFieldArray, useFormContext } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

export const SpecInputs = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProductSellData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specs",
  });

  return (
    <div>
      <div className="my-6 text-base font-semibold text-gray-700">商品仕様</div>

      <div className="mb-2 flex">
        <div className="flex-1 text-xs text-slate-800">項目</div>

        <div className="flex-1 text-xs text-slate-800">内容</div>

        <div className="w-20" />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 space-y-3">
          <div className="flex-1">
            <InputField
              name={`specs.${index}.key`}
              size="xs"
              register={register}
              error={errors.specs?.[index]?.key}
              placeholder="例）素材"
              variant="outline"
            />
          </div>

          <div className="flex-1">
            <InputField
              name={`specs.${index}.value`}
              register={register}
              size="xs"
              error={errors.specs?.[index]?.value}
              placeholder="例）100% Organic Cotton"
              variant="outline"
            />
          </div>

          <div className="flex w-20 items-center">
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-black"
              >
                削除
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            key: "",
            value: "",
          })
        }
        className="text-sm text-blue-600"
      >
        + 商品仕様を追加
      </button>
    </div>
  );
};
