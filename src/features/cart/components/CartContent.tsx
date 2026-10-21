import { Cart } from "@/types/cart";

import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

type Props = {
  cart: Cart;
};

export const CartContent = ({ cart }: Props) => {
  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="pt-10 pl-6">
        <h2 className="text-lg font-semibold">ショッピングカート</h2>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 px-6 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:mr-8">
          <CartItemList items={cart.items} />
        </div>

        <div className="lg:col-span-4">
          <CartSummary cart={cart} />
        </div>
      </div>
    </>
  );
};
