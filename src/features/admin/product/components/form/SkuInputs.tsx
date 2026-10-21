import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import type { ProductSellFormInput } from "@/features/admin/product/schemas/productSellSchema";

type Size = {
  id: number;
  label: string;
};

type Props = {
  sizes: Size[];
};

export const SkuInputs = ({ sizes }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProductSellFormInput>();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "skus",
  });

  useEffect(() => {
    if (fields.length === 0) {
      replace([
        {
          sizeId: "",
          stock: "1",
        },
      ]);
    }
  }, [fields.length, replace]);

  return (
    <div>
      <div className="mb-2 flex gap-4">
        <div className="flex-1 text-xs text-slate-800">サイズ</div>

        <div className="flex-1 text-xs text-slate-800">在庫</div>

        <div className="w-20" />
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3">
            <div className="flex-1">
              <SelectField
                variant="outline"
                size="xs"
                name={`skus.${index}.sizeId`}
                register={register}
                options={sizes.map((size) => ({
                  value: String(size.id),
                  label: size.label,
                }))}
              />
            </div>

            <div className="flex-1">
              <InputField
                name={`skus.${index}.stock`}
                size="xs"
                register={register}
                type="number"
                min={1}
                max={99}
                error={errors.skus?.[index]?.stock}
              />
            </div>

            <div className="flex w-20 items-center">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs"
                >
                  削除
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            sizeId: "",
            stock: "1",
          })
        }
        className="mt-2 text-sm text-blue-600"
      >
        +サイズ・在庫を追加
      </button>
    </div>
  );
};
