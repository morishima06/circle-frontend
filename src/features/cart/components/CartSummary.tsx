// src/features/cart/components/CartSummary.tsx
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useSession } from "@/features/customers/auth/hooks/useSession";
import type { Cart } from "@/types/cart";

import { CartLoginModal } from "./CartLoginModal";

type Props = {
  cart: Cart;
};

export const CartSummary = ({ cart }: Props) => {
  const { isSignedIn } = useSession();

  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { subtotal, shippingFee, total } = cart;

  const handleCheckout = () => {
    if (!isSignedIn) {
      setShowLoginModal(true);
      return;
    }

    router.push("/checkout?step=1");
  };

  return (
    <div className="w-full border border-slate-300 p-5">
      <h4 className="mb-4 text-lg font-semibold">ご注文内容</h4>

      <div className="text-sm">
        <div className="mb-1 flex justify-between">
          <span>小計</span>
          <span>¥{subtotal}</span>
        </div>

        <div className="mb-4 flex justify-between">
          <span>送料</span>
          <span>{shippingFee === 0 ? "無料" : `¥${shippingFee}`}</span>
        </div>

        <hr className="border-slate-300 pb-4" />

        <div className="flex justify-between text-sm font-semibold">
          <span>合計金額（税込）</span>
          <span>¥{total}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        className="mt-6 w-full rounded-none px-2 py-2 text-center text-sm"
      >
        購入手続きに進む
      </Button>

      {showLoginModal && (
        <CartLoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};
