import Link from "next/link";
import { ReactNode } from "react";

import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { ProductImage } from "@/features/collections/components/ProductImage";
import { ORDER_STATUS_LABELS } from "@/features/customers/orders/constants";
import { useCustomerOrders } from "@/features/customers/orders/hooks/useCustomerOrder";
import { formatDate } from "@/utils/date";

const OrdersPage = () => {
  const { orders, error, isLoading } = useCustomerOrders();

  return (
    <CustomerResourceBoundary isLoading={isLoading} error={error}>
      <div className="w-full">
        {orders.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            現在注文履歴はありません
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.number}
                className="flex flex-col border border-gray-300 px-4 pt-5 pb-3"
              >
                {/* Order Info */}
                <div className="">
                  <p className="mb-1 text-xs tracking-[0.15em] uppercase">
                    注文番号: #{order.number}
                  </p>

                  <p className="mb-2 text-xs tracking-[0.08em] text-gray-600">
                    注文日: {formatDate(order.orderedAt)}
                  </p>

                  <p className="text-xs tracking-[0.08em] text-gray-600">
                    合計額: ¥{order.total.toLocaleString()}
                  </p>
                </div>

                {/* Product Image */}
                <div className="mt-7 mb-7">
                  <div className="relative aspect-4/5 h-32">
                    <ProductImage imgUrl={order.imageUrl} alt="" />
                  </div>
                </div>

                <div className="">
                  <button className="w-16 bg-black px-2 py-1 text-xs font-semibold text-white">
                    {ORDER_STATUS_LABELS[order.status]}
                  </button>

                  <hr className="mt-2 mb-1 border-gray-300 bg-black" />

                  {/* Action */}
                  <div className="mt-auto">
                    <Link
                      href={`/customer/orders/${order.number}`}
                      className="text-xs font-semibold text-gray-700"
                    >
                      注文詳細を表示する
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerResourceBoundary>
  );
};

OrdersPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="注文履歴">{page}</CustomerLayout>
);

export default OrdersPage;
