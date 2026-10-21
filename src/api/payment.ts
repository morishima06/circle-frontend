import client from "@/lib/api/client";

export const checkoutStripePayment = async () => {
  const res = await client.post("/payments");
  return res.data;
};

export const createStripePayment = async () => {
  const res = await client.post("/payments");
  return res.data;
};

export const createPayment = async (paymentMethod: string) => {
  const res = await client.post("/payments", {
    payment_method: paymentMethod,
  });

  return res.data;
};

export const createStripeIntent = async () => {
  const res = await client.post("/checkout/create_intent");
  return res.data;
};

export const completeCheckout = async () => {
  const res = await client.post("/checkout/complete_checkout");
  return res.data;
};

export const reserveStock = async () => {
  const res = await client.post("/payments/reserve_stock");
  return res.data;
};

export const syncPayment = async (token: string) => {
  const res = await client.post("/payments/sync", {
    complete_token: token,
  });

  return res.data;
};
