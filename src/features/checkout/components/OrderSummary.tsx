import Image from "next/image";

import type { Order } from "@/types/order";

type Props = {
  order: Order | null;
};

export const OrderSummary = ({ order }: Props) => {
  return (
    <div>
      <div className="mb-4 text-base font-semibold">ご注文内容</div>

      <div className="space-y-3 border-y border-slate-300 py-4 text-sm">
        {order?.items.map((item) => (
          <div className="flex items-center" key={item.skuId}>
            <div className="flex w-full items-start">
              <div className="relative mr-6 aspect-4/5 w-full max-w-24">
                <Image
                  src={item.imageUrl || "/images/no_image.png"}
                  alt={item.name}
                  fill
                  unoptimized
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div>
                <div>{item.designer}</div>
                <div>{item.name}</div>
                <div>サイズ：{item.size}</div>
                <div>カラー：{item.color}</div>
                <div>数量：{item.quantity}</div>

                <div className="flex">
                  {item.unitPrice < item.originalPrice && (
                    <span className="mr-1 text-gray-500 line-through">
                      ¥{item.originalPrice}
                    </span>
                  )}

                  <span>¥{item.unitPrice}</span>
                </div>

                <div className="mt-1">
                  {item.stockStatus === "in_stock" && (
                    <div className="text-xs text-green-600">在庫あり</div>
                  )}

                  {item.stockStatus === "out_of_stock" && (
                    <div className="text-xs text-red-600">※ 在庫切れ</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {order && (
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex justify-between">
            <span>小計（税込）</span>
            <span>¥{order.subtotal}</span>
          </li>

          <li className="flex justify-between">
            <span>送料（税込）</span>
            <span>
              {order.shippingFee === 0 ? "無料" : `¥${order.shippingFee}`}
            </span>
          </li>

          <li className="flex justify-between text-sm font-semibold">
            <span>合計金額（税込）</span>
            <span>¥{order.total}</span>
          </li>
        </ul>
      )}
    </div>
  );
};
