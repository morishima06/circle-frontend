import client from "@/lib/api/client";

export const addCartItem = ({
  skuId,
  quantity,
}: {
  skuId: number;
  quantity: number;
}) => {
  return client.post("/cart_items", {
    sku_id: skuId,
    quantity,
  });
};

export const updateCartItem = ({
  skuId,
  quantity,
}: {
  skuId: number;
  quantity: number;
}) => {
  return client.patch(`cart_items/${skuId}`, { quantity });
};

export const destroyCartItem = (skuId: number) => {
  return client.delete(`cart_items/${skuId}`);
};
