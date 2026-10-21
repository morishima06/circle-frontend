import { useRouter } from "next/router";

import { Button } from "../ui/Button";

export const InternalServerView = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-10 pt-20">
      <h1 className="mb-3 text-2xl font-semibold">サーバーエラー</h1>
      <p className="font-sm mb-4 text-sm text-gray-600">
        現在、サーバーで問題が発生しています。しばらくしてから再度お試しください。
      </p>
      <Button
        className="rounded-md bg-black px-4 py-5 text-sm text-white"
        onClick={() => router.push("/")}
      >
        トップページに戻る
      </Button>
    </div>
  );
};
