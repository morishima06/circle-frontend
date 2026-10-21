import { useCartItemActions } from "@/features/cart/hooks/useCartItemActions";
import { handleError } from "@/lib/errors/handleError";
import type { CartItem } from "@/types/cart";

import { CartItemRow } from "./CartItemRow";

type Props = {
  items: CartItem[];
};

export const CartItemList = ({ items }: Props) => {
  const { updateItem, removeItem, loadingItemId } = useCartItemActions();

  const handleUpdate = async (skuId: number, quantity: number) => {
    try {
      await updateItem(skuId, quantity);
    } catch (error) {
      handleError(error);
    }
  };
  const handleRemove = async (skuId: number) => {
    try {
      await removeItem(skuId);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="pb-2">
      <table className="w-full">
        <thead>
          <tr className="text-sm text-slate-700">
            <th className="w-4/12 pb-2 text-left font-semibold">商品</th>
            <th className="w-2/12 pb-2 text-left">数量</th>
            <th className="w-4/12 pr-2 pb-2 text-right">合計</th>
          </tr>
        </thead>

        <tbody className="border-y border-slate-300">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              loadingItemId={loadingItemId}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
