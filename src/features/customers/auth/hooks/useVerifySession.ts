import { verifyCustomerSession } from "@/api/customers/auth/two_factors";

export const useVerifySession = () => {
  const verifySession = async () => {
    await verifyCustomerSession();
  };

  return { verifySession };
};
