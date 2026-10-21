import { useFormContext } from "react-hook-form";

import { SelectField } from "@/components/ui/SelectField";
import { useColors } from "@/features/admin/product/hooks/useColors";
import type { ProductSellData } from "@/features/admin/product/schemas/productSellSchema";

export const ColorSelect = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductSellData>();

  const { colors, isLoading } = useColors();

  const options = colors.map((color) => ({
    value: String(color.id),
    label: color.name,
  }));

  return (
    <SelectField
      variant="outline"
      size="xs"
      label="カラー"
      name="colorId"
      register={register}
      error={errors.colorId}
      options={isLoading ? [{ value: "", label: "読み込み中..." }] : options}
      disabled={isLoading}
    />
  );
};
