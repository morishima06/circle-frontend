// src/features/cart/lib/stockStatus.ts
type StockStatus = {
  type: "out_of_stock" | "exceeded" | "low_stock";
  message: string;
} | null;

export const getStockStatus = (
  availableStock: number,
  quantity: number,
): StockStatus => {
  if (availableStock === 0)
    return { type: "out_of_stock", message: "在庫切れ" };
  if (quantity > availableStock)
    return {
      type: "exceeded",
      message: `在庫が${availableStock}点になりました`,
    };
  if (availableStock <= 5)
    return { type: "low_stock", message: `残り${availableStock}点` };
  return null;
};
