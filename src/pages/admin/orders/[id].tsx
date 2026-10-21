import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

import { AdminLayout } from "@/components/layout/admin/AdminLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useOrderDetail } from "@/features/admin/order/hooks/useOrderDetail";
import { useShipOrder } from "@/features/admin/order/hooks/useShipOrder";
import { handleError } from "@/lib/errors/handleError";
import { adminToast } from "@/lib/toast/adminToast";
import {
  ORDER_STATUS_BADGE,
  PAYMENT_STATUS_BADGE,
  SHIPMENT_STATUS_BADGE,
} from "@/utils/badge";
import { CARRIER_LABELS } from "@/utils/carrier";
import { formatDate } from "@/utils/date";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex gap-4 py-1 text-sm">
    <span className="text-muted-foreground w-28 shrink-0">{label}</span>
    <span>{value}</span>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const AdminOrderDetailPage = () => {
  const router = useRouter();
  const orderId = Number(router.query.id);
  const [carrier, setCarrier] = useState("yamato");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [open, setOpen] = useState(false);

  const {
    order,
    error,
    isLoading,
    mutate: mutateOrderDetail,
  } = useOrderDetail(orderId);

  const { ship } = useShipOrder();

  const handleShip = async ({
    orderId,
    carrier,
    trackingNumber,
  }: {
    orderId: number;
    carrier: string;
    trackingNumber: string;
  }) => {
    try {
      await ship({
        orderId,
        carrier,
        trackingNumber,
      });

      console.log("ship success");

      await mutateOrderDetail();

      console.log("mutate success");

      adminToast.success("発送処理が完了しました");
      console.log("after toast");
      setOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">注文の取得に失敗しました</div>;
  }

  if (!order) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">注文詳細</h1>
        <Button variant="outline" onClick={() => router.push("/admin/orders")}>
          注文一覧へ戻る
        </Button>
      </div>

      {/* ① 注文情報 */}
      <Section title="注文情報">
        <Row label="注文番号" value={order.number} />
        <Row label="注文日時" value={formatDate(order.orderedAt)} />
        <Row
          label="注文状況"
          value={
            <Badge className={ORDER_STATUS_BADGE[order.status]?.className}>
              {ORDER_STATUS_BADGE[order.status]?.label}
            </Badge>
          }
        />
        <Row label="注文者名" value={order.shipping.name} />
        <Row label="メール" value={order.shipping.email} />
        <Row
          label="支払い方法"
          value={order.payment.method === "cod" ? "代引き" : "カード"}
        />
        <Row
          label="支払状況"
          value={
            <Badge
              className={PAYMENT_STATUS_BADGE[order.payment.status]?.className}
            >
              {PAYMENT_STATUS_BADGE[order.payment.status]?.label}
            </Badge>
          }
        />
        <Row
          label="出荷状況"
          value={
            <Badge
              className={
                SHIPMENT_STATUS_BADGE[order.shipment.status]?.className
              }
            >
              {SHIPMENT_STATUS_BADGE[order.shipment.status]?.label}
            </Badge>
          }
        />
        <Row
          label="発送日"
          value={
            order.shipment.shippedAt
              ? formatDate(order.shipment.shippedAt)
              : "未発送"
          }
        />{" "}
        {order.notes && <Row label="備考" value={order.notes} />}
      </Section>

      {/* ② 出荷情報（配送先 + 発送通知フォーム） */}
      <Section title="出荷情報">
        {/* 配送先 */}
        <Row label="氏名" value={order.shipping.name} />
        <Row label="電話番号" value={order.shipping.phoneNumber} />
        <Row label="郵便番号" value={`〒${order.shipping.postalCode}`} />
        <Row
          label="住所"
          value={`${order.shipping.prefecture}${order.shipping.city}${order.shipping.addressLine1}${order.shipping.addressLine2 ?? ""}`}
        />

        {/* 区切り */}
        <hr className="my-4" />

        {/* 発送通知フォーム */}
        <p className="mb-3 text-sm font-medium text-black">発送通知</p>

        {order.shipment.status === "shipped" ? (
          // 送信済み表示
          <div>
            <Row
              label="配送会社"
              value={
                CARRIER_LABELS[order.shipment.carrierName] ??
                order.shipment.carrierName
              }
            />
            <Row label="追跡番号" value={order.shipment.trackingNumber} />
          </div>
        ) : (
          // フォーム
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">配送会社</label>
              <select
                className="w-full rounded-md border px-3 py-2"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
              >
                <option value="yamato">ヤマト運輸</option>
                <option value="sagawa">佐川急便</option>
                <option value="japan_post">日本郵便</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">追跡番号</label>
              <Input
                placeholder="追跡番号を入力"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button disabled={!trackingNumber}>発送通知を送る</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>発送通知を送信しますか？</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 text-sm">
                  <p>配送会社：{carrier}</p>
                  <p>追跡番号：{trackingNumber}</p>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    キャンセル
                  </Button>
                  <Button
                    onClick={() =>
                      handleShip({ orderId, carrier, trackingNumber })
                    }
                  >
                    送信する
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </Section>

      {/* ③ 商品情報（注文商品 + 合計） */}
      <Section title="商品情報">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-4 last:border-none"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">{item.designer}</p>
                <p className="text-muted-foreground text-sm">
                  {item.color} / {item.size}
                </p>
                <p className="text-muted-foreground text-sm">
                  数量: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                {item.price !== item.originalPrice && (
                  <p className="text-muted-foreground text-xs line-through">
                    ¥{item.originalPrice.toLocaleString()}
                  </p>
                )}
                <p>¥{item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 合計 */}
        <div className="mt-4 space-y-1 border-t pt-4">
          <Row
            label="送料"
            value={`¥${order.payment.shippingFee.toLocaleString()}`}
          />
          <div className="flex gap-4 pt-2 text-sm font-semibold">
            <span className="w-28 shrink-0">合計</span>
            <span>¥{order.payment.total.toLocaleString()}</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

AdminOrderDetailPage.getLayout = (page: ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminOrderDetailPage;
