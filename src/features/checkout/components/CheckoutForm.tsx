import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { confirmCheckout } from "@/api/checkout";
import cardBrand from "@/assets/icons/cardBrand.png";
import type { PaymentMethod } from "@/types/checkout";

export const CheckoutForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  console.log(paymentMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // 毎回リセット
    console.log(1111);

    try {
      const data = await confirmCheckout({
        paymentMethod,
      });
      // ↑ ここでエラーなら catch に飛ぶので、以降は実行されない
      console.log(data.clientSecret);
      console.log(222);

      if (data.clientSecret) {
        if (!stripe || !elements) {
          setError("決済情報を読み込めませんでした");
          return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
          setError("カード情報を入力してください");
          return;
        }

        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: cardElement,
            },
          });

        console.log(paymentIntent);

        if (stripeError) {
          setError(stripeError.message ?? "決済エラーが発生しました");
          return;
        }

        router.replace(`/checkout/complete?token=${data.completeToken}`);

        return;
      }
      setLoading(false);
      console.log(8888888888888);

      router.replace(`/checkout/complete?token=${data.completeToken}`);

      return;
    } catch (e: unknown) {
      console.log(e);

      if (
        typeof e === "object" &&
        e !== null &&
        "message" in e &&
        typeof e.message === "string"
      ) {
        setError(e.message);
      } else {
        setError("エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-6">
      <h2 className="text-lg font-bold">支払い方法を選択</h2>
      <div className="space-y-3">
        {/* クレジットカード */}
        <div className="border border-slate-500 p-4">
          <div className="flex h-5 justify-between">
            <div className="flex items-center">
              <input
                type="radio"
                value="card"
                className="mr-2"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="mr-2 text-sm">クレジットカード</span>
            </div>
            <Image src={cardBrand} alt="カードブランド" height={20} />
          </div>

          {paymentMethod === "card" && (
            <div className="mt-6 text-xs">
              <div className="mb-2">
                <label>カード番号</label>
                <CardNumberElement className="mt-1 h-9 w-full border border-slate-500 py-2 pl-2" />
              </div>
              <div className="mb-2">
                <label>有効期限</label>
                <CardExpiryElement className="mt-1 h-9 w-full border border-slate-500 py-2 pl-2" />
              </div>
              <div className="mb-2">
                <label>CVC</label>
                <CardCvcElement className="mt-1 h-9 w-full border border-slate-500 py-2 pl-2" />
              </div>
            </div>
          )}
        </div>

        {/* 代金引換 */}
        <div className="border border-slate-500 p-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span className="mr-2 text-sm">代金引換</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !stripe}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "処理中..." : "支払いを確定する"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};
