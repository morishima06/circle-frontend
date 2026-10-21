import { loginCustomer } from "@/api/customers/auth/sessions";

import type { LoginData } from "../schemas/loginSchema";

export const useLogin = () => {
  const login = async (data: LoginData) => {
    const res = await loginCustomer(data);

    return {
      requires2fa: res.requires_2fa,
    };
  };

  return { login };
};
