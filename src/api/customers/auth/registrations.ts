import type { RegisterData } from "@/features/customers/auth/schemas/registerSchema";
import client from "@/lib/api/client";

export const registerCustomer = (data: RegisterData) => {
  return client.post("/customers/register", {
    customer: {
      lastName: data.lastName,
      firstName: data.firstName,
      lastNameKana: data.lastNameKana,
      firstNameKana: data.firstNameKana,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    },
  });
};
