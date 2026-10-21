import useSWR from "swr";

import { getAddresses } from "@/api/customers/addresses";
import { useSession } from "@/features/customers/auth/hooks/useSession";

export const useGetAddresses = () => {
  const { isSignedIn } = useSession();

  const { data: addresses } = useSWR(
    isSignedIn ? "/customers/addresses" : null,
    getAddresses,
  );

  return { addresses };
};
