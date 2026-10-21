import Link from "next/link";
import { useRouter } from "next/router";
import { BsCart } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

import { useCartItemCount } from "@/features/cart/hooks/useCartItemCount";
import { useSession } from "@/features/customers/auth/hooks/useSession";

import { AccountIcon } from "./AccountIcon";

type Props = {
  openModal: () => void;
};

export const HeaderActions = ({ openModal }: Props) => {
  const router = useRouter();
  const { isSignedIn } = useSession();
  const { itemCount } = useCartItemCount();

  const handleFavoritesClick = () => {
    router.push(isSignedIn ? "/customer/favorites" : "/login");
  };

  return (
    <div className="flex items-center gap-6">
      <IoSearchOutline
        size={18}
        className="cursor-pointer"
        onClick={openModal}
      />

      <IoMdHeartEmpty
        size={18}
        className="cursor-pointer"
        onClick={handleFavoritesClick}
      />

      <AccountIcon isSignedIn={isSignedIn} />

      <Link href="/cart" className="relative" data-testid="cart-link">
        <BsCart size={18} className="cursor-pointer" />

        {itemCount > 0 && (
          <span
            className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white"
            data-testid="cart-item-count"
          >
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  );
};
