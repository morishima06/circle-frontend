import { logoutCustomer } from "@/api/customers/auth/sessions";

export const useLogout = () => {
  const logout = async (): Promise<void> => {
    await logoutCustomer();
  };

  return { logout };
};
