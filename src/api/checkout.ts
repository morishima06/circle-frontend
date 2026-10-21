import client from "@/lib/api/client";
import type { ConfirmCheckout,PaymentMethod } from "@/types/checkout";

// カート件数
export const confirmCheckout = async ({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}): Promise<ConfirmCheckout> => {
  const res = await client.post("/checkout/confirm", {
    paymentMethod,
  });
  console.log(res);

  return res.data;
};
