import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { ProductImage } from "@/features/collections/components/ProductImage";
import { ORDER_STATUS_LABELS } from "@/features/customers/orders/constants";
import { useCustomerOrderDetail } from "@/features/customers/orders/hooks/useCustomerOrderDetail";

const OrderDetailPage = () => {
  const router = useRouter();
  const { orderNumber } = router.query;

  const {
    data: order,
    error,
    isLoading,
  } = useCustomerOrderDetail(
    typeof orderNumber === "string" ? orderNumber : undefined,
  );

  return (
    <CustomerResourceBoundary error={error} isLoading={isLoading}>
      <div>
        <p className="mb-1 text-sm font-semibold">注文番号：#{order?.number}</p>

        <p className="mb-4 text-sm font-semibold">
          発送状況：
          {order?.status ? ORDER_STATUS_LABELS[order.status] : ""}
        </p>

        <div className="border-y border-gray-200 text-xs">
          {order?.items?.map((item) => (
            <div key={item.id} className="flex justify-between py-5">
              <div className="flex">
                <div className="relative mr-4 aspect-4/5 w-24">
                  <ProductImage imgUrl={item.imageUrl} alt={item.name} />
                </div>

                <div className="leading-4">
                  <p className="mb-1 font-semibold">{item.designer}</p>

                  <p className="mb-2 text-sm">{item.name}</p>

                  <p className="mb-3">
                    サイズ：
                    <span className="font-semibold">{item.size}</span>
                  </p>

                  <p className="mb-1">数量：{item.quantity}</p>

                  <p>単価：¥{item.unitPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="mt-5 flex justify-between text-sm">
            <p>小計</p>
            <p>¥{order?.subtotal}</p>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <p>送料</p>
            <p>¥{order?.shippingFee}</p>
          </div>

          <div className="mt-5 mb-4 flex justify-between text-base">
            <p className="text-sm font-semibold">合計</p>
            <p className="text-sm font-semibold">¥{order?.total}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-slate-200 text-sm">
          <div className="mt-5">
            <p className="mb-3">注文者情報</p>

            <p>{order?.email}</p>

            <p>
              {order?.shipping?.lastName}
              {order?.shipping?.firstName}
            </p>
          </div>

          <div className="mt-5">
            <p className="mb-3">配送先住所</p>
            <p>
              {order?.shipping?.lastName}
              {order?.shipping?.firstName}
            </p>

            <p>{order?.shipping?.postalCode}</p>
            <p>{order?.shipping?.prefecture}</p>
            <p>{order?.shipping?.city}</p>
            <p>{order?.shipping?.addressLine1}</p>
            <p>{order?.shipping?.addressLine2}</p>
            <p>{order?.shipping?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </CustomerResourceBoundary>
  );
};

OrderDetailPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="注文詳細">{page}</CustomerLayout>
);

export default OrderDetailPage;
