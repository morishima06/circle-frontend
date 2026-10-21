import { useRouter } from "next/router";
import { useState } from "react";

import { createFavorite, deleteFavorite } from "@/api/customers/favorites";
import { useSession } from "@/features/customers/auth/hooks/useSession";

export const useFavoriteActions = () => {
  const { isSignedIn } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const addFavorite = async (productId: number): Promise<boolean> => {
    if (!isSignedIn) {
      await router.push("/login");
      return false;
    }

    if (isLoading) return false;

    const start = Date.now();
    setIsLoading(true);

    try {
      await createFavorite(productId);
      return true;
    } finally {
      const elapsed = Date.now() - start;
      const remaining = 1000 - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setIsLoading(false);
    }
  };

  const removeFavorite = async (productId: number): Promise<boolean> => {
    if (isLoading) return false;

    const start = Date.now();
    setIsLoading(true);

    try {
      await deleteFavorite(productId);
      return true;
    } finally {
      const elapsed = Date.now() - start;
      const remaining = 1000 - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setIsLoading(false);
    }
  };

  return {
    addFavorite,
    removeFavorite,
    isLoading,
  };
};
