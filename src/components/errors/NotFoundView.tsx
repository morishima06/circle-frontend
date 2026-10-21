import Link from "next/link";

import { Button } from "../ui/Button";

export const NotFoundView = () => {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-10 pt-20">
      <h1 className="mb-3 text-2xl font-semibold">
        お探しのページは見つかりませんでした。
      </h1>
      <p className="font-sm mb-6 text-sm text-gray-600">
        ページは、削除、変更されているか、または一時的に利用できない可能性があります。
      </p>
      <Button
        className="rounded-md bg-black px-4 py-5 text-sm text-white"
        asChild
      >
        <Link href="/">トップページに戻る</Link>
      </Button>
    </div>
  );
};
