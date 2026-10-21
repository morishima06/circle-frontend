import type { Shipping } from "@/types/order";

export const ShippingAddress = ({
  shippingOrder,
}: {
  shippingOrder: Shipping;
}) => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">配送先情報</h2>
      <div className="text-sm">
        <address className="leading-5 not-italic">
          {shippingOrder?.lastName}
          {shippingOrder?.firstName}
          <br />
          {shippingOrder?.postalCode}
          <br />
          {shippingOrder?.prefecture}
          {shippingOrder?.city}
          <br />
          {shippingOrder?.addressLine1}
          <br />
          {shippingOrder?.addressLine2}
          <br />
          {shippingOrder?.phoneNumber}
          <br />
        </address>
      </div>
    </div>
  );
};
