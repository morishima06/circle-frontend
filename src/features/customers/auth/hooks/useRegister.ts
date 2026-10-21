import { registerCustomer } from "@/api/customers/auth/registrations";
import { RegisterData } from "@/features/customers/auth//schemas/registerSchema";

import { useSession } from "./useSession";

export const useRegister = () => {
  const { mutate: fetchCurrentCustomer } = useSession();

  const register = async (data: RegisterData) => {
    await registerCustomer(data);
    await fetchCurrentCustomer();
  };

  return { register };
};
