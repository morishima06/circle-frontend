import Image from "next/image";

import type { Favorite } from "@/types/customer/favorite";

type Props = {
  favorites: Favorite[];
  handleRemoveFavorite: (productId: number) => Promise<void>;
  isLoading: boolean;
};

export const FavoritesList = ({
  favorites,
  handleRemoveFavorite,
  isLoading,
}: Props) => {
  if (favorites.length === 0) {
    return (
      <p className="text-sm text-slate-700">
        現在お気に入りの商品の登録がありません。
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {favorites?.map((favorite) => (
        <div
          key={favorite.id}
          className="mb-4 w-[170px] pb-2 text-center text-sm"
        >
          <div className="relative aspect-4/5">
            <Image
              src={favorite.product.imageUrl || "/images/no_image.png"}
              alt={favorite.product.name}
              fill
              className="object-cover object-center"
            />
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {favorite.product.designer.name}
          </p>

          <h4 className="mt-1 h-8 text-xs font-semibold">
            {favorite.product.name}
          </h4>

          <p className="mt-1 text-xs">¥{favorite.product.price}</p>

          <button
            onClick={() => handleRemoveFavorite(favorite.product.id)}
            className="mt-3 w-full bg-black px-2 py-2 text-xs text-white"
            disabled={isLoading}
          >
            {isLoading ? "削除中..." : "削除する"}
          </button>
        </div>
      ))}
    </div>
  );
};
