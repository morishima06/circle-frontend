// hooks/useAdminAuth.ts
import { useContext } from "react";

import { AdminAuthContext } from "@/contexts/AdminAuthContext";

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
