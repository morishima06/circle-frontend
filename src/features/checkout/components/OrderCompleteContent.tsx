import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";

import type { OrderComplete } from "@/types/order";

type Props = {
  order: OrderComplete;
};
export const OrderCompleteContent = ({ order }: Props) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center pt-10 pb-10">
    <BsCheckCircle className="mb-4 text-5xl" />
    <h1 className="mt-1 mb-3 text-2xl font-bold">ご注文完了しました</h1>
    {/* <hr className="w-full border-t mb-8 border-slate-300" /> */}

    <div className="my-3 border-y py-8">
      <p className="w-100 text-center text-sm font-medium tracking-widest">
        注文番号
        <br />
        {order.number}
      </p>
      <p className="mt-4 mb-4 text-center text-sm text-gray-600">
        ご注文ありがとうございます
        <br />
        ご登録のメールアドレスに確認メールを送信しています。
      </p>

      <div className="mt-1 flex justify-center py-2 text-center">
        <Link
          href="/"
          className="w-60 rounded-xl bg-black px-4 py-3 text-center text-sm text-white"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>

    <div className="rounded-lg">
      {/* <p className=" text-lg font-semibold">{order.orderNumber}</p> */}
    </div>
  </div>
);
