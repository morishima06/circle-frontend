import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

import { createOrder } from "@/api/order";
import { ErrorMessageView } from "@/components/errors/ErrorMessageView";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { AddressForm } from "@/features/checkout/components/AddressForm ";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { LoadingScreen } from "@/features/checkout/components/LoadingScreen";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { ShippingAddress } from "@/features/checkout/components/ShippingAddress";
import { ShippingOptions } from "@/features/checkout/components/ShippingOptions";
import { StepIndicator } from "@/features/checkout/components/StepIndicator";
import type { Order } from "@/types/order";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(stripeKey);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    console.log("create order");
    const initOrder = async () => {
      const res = await createOrder();
      setOrder(res);
    };
    initOrder();
  }, []);

  if (!stripePromise) {
    return (
      <ErrorMessageView
        title="決済を開始できません"
        message="時間をおいて再度お試しください。"
      />
    );
  }

  if (!order) {
    return <LoadingScreen />;
  }
  console.log("shipping:", order?.shipping);
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full max-w-[1280px] py-10">
        <StepIndicator currentStep={step} />

        <div className="grid w-full grid-cols-1 pt-6 md:grid-cols-12">
          {/* 左カラム */}
          <div className="w-full pr-16 md:col-span-8">
            {/* STEP 1: 住所入力 */}
            {step === "1" && <AddressForm order={order} setOrder={setOrder} />}

            {/* STEP 2: 支払い */}
            {step === "2" && (
              <>
                <ShippingAddress shippingOrder={order.shipping} />
                <hr className="my-6 border-t border-slate-300" />

                <ShippingOptions />

                <hr className="my-6 border-t border-slate-300" />

                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </>
            )}
          </div>

          {/* 右カラム */}
          <div className="md:col-span-4">
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default CheckoutPage;
