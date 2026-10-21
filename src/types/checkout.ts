export type ConfirmCheckout = {
  clientSecret: string | null;
  completeToken: string;
};
export type PaymentMethod = "card" | "cod";
