import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { useCartItemActions } from "@/features/cart/hooks/useCartItemActions";
import { FavoriteButton } from "@/features/favorite/components/FavoriteButton";
import { handleError } from "@/lib/errors/handleError";
import { appToast } from "@/lib/toast/appToast";
import type { ProductDetail } from "@/types/product";

export const ProductActions = ({ product }: { product: ProductDetail }) => {
  const quantity = 1;
  const { skus } = product || {};
  const { addItem, isLoading } = useCartItemActions();

  const [selectedSkuId, setSelectedSkuId] = useState<number | null>(null);

  useEffect(() => {
    if (skus?.length === 1) {
      setSelectedSkuId(skus[0].id);
    }
  }, [skus]);

  const handleSelect = (skuId: number) => {
    setSelectedSkuId(skuId);
  };

  const handleAddToCart = async () => {
    if (!selectedSkuId) {
      appToast.error("サイズを選択してください");

      return;
    }

    try {
      await addItem(selectedSkuId, quantity);
      appToast.success("カートに追加しました");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div className="mb-4">
        <p className="mt-2 mb-3 text-xs">サイズ:</p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {skus?.map((sku) => (
            <button
              key={sku.id}
              type="button"
              data-testid="size-option"
              onClick={() => handleSelect(sku.id)}
              disabled={sku.availableStock === 0 || isLoading}
              className={clsx(
                "relative flex h-9 w-full items-center justify-center overflow-hidden border text-xs",
                {
                  "cursor-not-allowed rounded-sm border-gray-300 bg-gray-100 text-gray-400":
                    sku.availableStock === 0,
                  "rounded-sm border-black bg-black text-white":
                    sku.availableStock > 0 && selectedSkuId === sku.id,
                  "rounded-sm border-gray-300 bg-white text-slate-700":
                    sku.availableStock > 0 && selectedSkuId !== sku.id,
                },
              )}
            >
              <span className="relative z-10">{sku.size}</span>
              {sku.availableStock === 0 && (
                <span className="absolute top-1/2 left-[-30%] h-[1px] w-[160%] rotate-45 bg-gray-300"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex w-full items-center gap-1">
        <Button
          type="submit"
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-sm bg-black text-sm text-white"
        >
          {isLoading ? (
            <Loader className="border-white" size="sm" />
          ) : (
            "カートに入れる"
          )}
        </Button>

        <div className="shrink-0">
          <FavoriteButton productId={product.id} />
        </div>
      </div>{" "}
    </>
  );
};
