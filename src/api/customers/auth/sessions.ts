import type { LoginData } from "@/features/customers/auth/schemas/loginSchema";
import client from "@/lib/api/client";

export const loginCustomer = async ({ email, password }: LoginData) => {
  const res = await client.post("/customers/login", {
    customer: {
      email,
      password,
    },
  });

  return res.data;
};

export const logoutCustomer = async () => {
  const res = await client.delete("/customers/logout");

  return res.data;
};

export const getCurrentCustomer = async () => {
  const res = await client.get("/current_customer");

  return res.data;
};
