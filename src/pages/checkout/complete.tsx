import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

import { syncPayment } from "@/api/payment";
import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { useCartItemCount } from "@/features/cart/hooks/useCartItemCount";
import { LoadingScreen } from "@/features/checkout/components/LoadingScreen";
import { OrderCompleteContent } from "@/features/checkout/components/OrderCompleteContent";
import { useOrderComplete } from "@/features/checkout/hooks/useOrderComplete";

const CompletePage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [hasRetried, setHasRetried] = useState(false);

  const orderToken = typeof token === "string" ? token : undefined;

  const {
    order,
    mutate: mutateOrder,
    isLoading,
    error,
    stopPolling,
  } = useOrderComplete(orderToken);

  const { mutate: mutateItemCount } = useCartItemCount();

  // ポーリング終了後、決済同期を1回だけ実行
  useEffect(() => {
    if (!stopPolling) return;
    if (!order) return;
    if (!orderToken) return;
    if (hasRetried) return;
    if (order.status !== "pending") return;

    const run = async () => {
      try {
        await syncPayment(orderToken);
        await mutateOrder();
      } catch (e) {
        console.error(e);
      } finally {
        setHasRetried(true);
      }
    };

    run();
  }, [stopPolling, order, orderToken, hasRetried, mutateOrder]);

  // 注文確定後の後処理
  useEffect(() => {
    if (order?.status !== "confirmed") return;

    Cookies.remove("guest_token");
    mutateItemCount();
  }, [order?.status, mutateItemCount]);

  if (error) {
    return null;
  }

  if (isLoading || !order) {
    return null;
  }

  switch (order.status) {
    case "pending":
      if (hasRetried) {
        return (
          <div className="flex w-full justify-center">
            <div className="mt-10 w-full max-w-[980px] px-4 text-center">
              <h2 className="mb-6 text-2xl font-semibold">
                決済の確認に時間がかかっています
              </h2>
              <p className="text-sm leading-7">
                決済が正常に完了している場合は、
                ご注文確認メールをお送りします。
                <br />
                30分ほど経ってもメールが届かない場合は、
                お手数ですがお問い合わせください。
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block border px-6 py-3"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        );
      }

      return (
        <LoadingScreen message="決済処理中です。画面を閉じずにこのままお待ちください。" />
      );

    case "failed":
      return (
        <div className="flex w-full justify-center">
          <div className="mt-10 w-full max-w-[980px] px-4 text-center">
            <h2 className="mb-6 text-2xl font-semibold">決済に失敗しました</h2>

            <p className="text-sm leading-7">
              お支払いを完了できませんでした。
              <br />
              再度お試しください。
            </p>
          </div>
        </div>
      );

    case "confirmed":
      return (
        <div className="flex w-full justify-center">
          <div className="mt-6 w-full max-w-[980px] px-4">
            <OrderCompleteContent order={order} />
          </div>
        </div>
      );

    default:
      return null;
  }
};

CompletePage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default CompletePage;
