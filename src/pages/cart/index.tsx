import { ReactNode } from "react";
import { useEffect } from "react";

import { ResourceBoundary } from "@/components/boundaries/ResourceBoundary";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { CartItemList } from "@/features/cart/components/CartItemList";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { useCart } from "@/features/cart/hooks/useCart";

const CartPage = () => {
  const { cart, error, isLoading } = useCart();
  useEffect(() => {
    console.log("create CART");
  }, []);

  return (
    <ResourceBoundary isLoading={isLoading} error={error}>
      {cart &&
        (cart.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="pt-10 pl-6">
              {/* <p>{obj.name}</p>; */}
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
        ))}
    </ResourceBoundary>
  );
};

CartPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default CartPage;
