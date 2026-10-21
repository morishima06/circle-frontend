import { useRouter } from "next/router";
import useSWR from "swr";

import { getCurrentCustomer } from "@/api/customers/auth/sessions";

export const useSession = () => {
  const router = useRouter();

  const isAdmin = router.pathname.startsWith("/admin");

  const {
    data: currentCustomer,
    error,
    isLoading,
    mutate,
  } = useSWR(isAdmin ? null : "/current_customer", () => getCurrentCustomer());

  const isSignedIn = !!currentCustomer?.customer;
  return {
    currentCustomer,
    isSignedIn,
    isLoading,
    error,
    mutate,
  };
};
