import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { CiTrash } from "react-icons/ci";

import { Loader } from "@/components/ui/Loader";
import type { CartItem } from "@/types/cart";

import { getStockStatus } from "../lib/stockStatus";

type Props = {
  item: CartItem;
  loadingItemId: number | null;
  handleUpdate: (skuId: number, quantity: number) => Promise<void>;
  handleRemove: (skuId: number) => Promise<void>;
};

export const CartItemRow = ({
  item,
  loadingItemId,
  handleUpdate,
  handleRemove,
}: Props) => {
  const { id, product, sku, price, quantity, color } = item;
  const { designer } = product;
  const productPath = `/${product.gender}/p/${designer?.slug}/${product.styleCodeSlug}`;
  const designerPath = `/${product.gender}/designers/${designer?.slug}`;
  const stockStatus = getStockStatus(sku.availableStock, quantity);

  return (
    <tr key={id} className="h-28 text-sm">
      {/* 商品情報 */}
      <td className="w-7/12 items-center py-4">
        <div className="flex">
          <div className="relative mr-2 aspect-4/5 w-full max-w-28">
            <Link href={productPath} className="mr-2 w-full">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl || "/images/no_image.png"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              )}
            </Link>
          </div>

          <div className="mx-4 space-y-0.5">
            <Link
              href={designerPath}
              className="text-sm font-bold hover:text-gray-600"
            >
              {designer?.name}
            </Link>
            <Link
              href={productPath}
              className="block pb-0.5 text-sm hover:text-gray-600"
            >
              {product.name}
            </Link>
            {price.unitPrice < price.originalPrice && (
              <div className="text-gray-500 line-through">
                ¥{price.originalPrice?.toLocaleString()}
              </div>
            )}
            <div className="pb-2">¥{price.unitPrice?.toLocaleString()}</div>
            <div className="text-xs">サイズ：{sku.size}</div>
            <div className="text-xs">カラー：{color.name}</div>

            {stockStatus && (
              <p
                className={clsx(
                  "mt-1 text-xs",
                  stockStatus.type === "exceeded"
                    ? "text-orange-500"
                    : "text-red-500",
                )}
              >
                {stockStatus.message}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* 数量 */}
      <td className="w-3/12 py-4">
        <div className="flex">
          <div
            className={clsx(
              "flex h-8 w-20 items-center border",
              sku.availableStock === 0 ? "border-gray-200" : "border-stone-400",
            )}
          >
            <button
              className={clsx(
                "h-8 w-8 text-xs",
                quantity <= 1 && "cursor-not-allowed text-gray-300",
              )}
              aria-label="数量を1減らす"
              onClick={() => handleUpdate(sku.id, quantity - 1)}
              disabled={loadingItemId === sku.id || quantity <= 1}
            >
              -
            </button>
            <p
              className={clsx(
                "px-2 text-xs",
                sku.availableStock === 0 && "text-gray-300",
              )}
            >
              {quantity}
            </p>
            <button
              className={clsx(
                "h-8 w-8 text-xs",
                quantity >= sku.availableStock &&
                  "cursor-not-allowed text-gray-300",
              )}
              aria-label="数量を1増やす"
              onClick={() => handleUpdate(sku.id, quantity + 1)}
              disabled={
                loadingItemId === sku.id || quantity >= sku.availableStock
              }
            >
              +
            </button>
          </div>

          {/* ゴミ箱は常に使える */}
          <button
            className="ml-2 block p-1"
            aria-label="カートから削除"
            onClick={() => handleRemove(sku.id)}
          >
            <CiTrash size={17} />
          </button>
        </div>
      </td>
      {/* 小計 */}
      <td className="w-2/12 py-4 pr-2 text-right text-sm">
        <div className="flex justify-end">
          {loadingItemId === sku.id ? (
            <Loader size="sm" />
          ) : (
            <span>¥{price.lineTotal?.toLocaleString()}</span>
          )}
        </div>
      </td>
    </tr>
  );
};
