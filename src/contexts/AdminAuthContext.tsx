import { createContext, type ReactNode } from "react";

import { useAdminSession } from "@/features/admin/auth/hooks/useAdminSession";

type Props = {
  children: ReactNode;
};

export const AdminAuthContext = createContext({
  currentAdmin: null,
  isSignedIn: false,
  isLoading: false,
  error: null,
  mutate: async () => {},
});

export const AdminAuthProvider = ({ children }: Props) => {
  const { currentAdmin, isLoading, error, mutate } = useAdminSession();

  const isSignedIn = !!currentAdmin?.admin;

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        isSignedIn,
        isLoading,
        error,
        mutate,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
