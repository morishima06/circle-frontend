import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";

import { Loader } from "@/components/ui/Loader";
import { useFavoriteIds } from "@/features/admin/customers/favorites/hooks/useFavoriteIds";
import { handleError } from "@/lib/errors/handleError";
import { appToast } from "@/lib/toast/appToast";

import { useFavoriteActions } from "../hooks/useFavoriteActions";

export const FavoriteButton = ({ productId }: { productId: number }) => {
  const { addFavorite, removeFavorite, isLoading } = useFavoriteActions();
  const { favoriteIds, mutate } = useFavoriteIds();

  const isFavorited = favoriteIds?.includes(productId);
  console.log(productId);

  const handleAddFavorite = async () => {
    try {
      const success = await addFavorite(productId);

      if (!success) return;

      await mutate();
      appToast.success("お気に入りに追加しました");
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const success = await removeFavorite(productId);

      if (!success) return;

      await mutate();
      appToast.success("お気に入りから削除しました");
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="ml-1">
        <Loader size="md" />
      </div>
    );
  }

  return isFavorited ? (
    <FaHeart
      size={26}
      onClick={handleRemoveFavorite}
      className="ml-1 cursor-pointer"
    />
  ) : (
    <IoMdHeartEmpty
      size={31}
      onClick={handleAddFavorite}
      className="ml-1 cursor-pointer"
    />
  );
};
