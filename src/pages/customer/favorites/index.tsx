import { ReactNode } from "react";

import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { FavoritesList } from "@/features/favorite/components/FavoritesList";
import { useFavorite } from "@/features/favorite/hooks/useFavorite";
import { useFavoriteActions } from "@/features/favorite/hooks/useFavoriteActions";
import { handleError } from "@/lib/errors/handleError";

const FavoritesPage = () => {
  const { favorites, isLoading, error, mutate } = useFavorite();
  const { removeFavorite } = useFavoriteActions();

  const handleRemoveFavorite = async (productId: number) => {
    try {
      await removeFavorite(productId);
      await mutate();
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <CustomerResourceBoundary isLoading={isLoading} error={error}>
      <div className="w-full">
        <h2 className="mb-6 text-lg font-semibold">お気に入りリスト</h2>

        <FavoritesList
          favorites={favorites}
          handleRemoveFavorite={handleRemoveFavorite}
          isLoading={isLoading}
        />
      </div>
    </CustomerResourceBoundary>
  );
};
export default FavoritesPage;

FavoritesPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="お気に入り">{page}</CustomerLayout>
);
