import { useState } from "react";

import { verifyCustomerOtp } from "@/api/customers/auth/two_factors";

import { useSession } from "./useSession";

export const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: fetchCurrentCustomer } = useSession();

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);

    try {
      await verifyCustomerOtp({ otp });
      await fetchCurrentCustomer();
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyOtp, isLoading };
};
