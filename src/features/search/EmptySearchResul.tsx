import Link from "next/link";

import { Button } from "@/components/ui/Button";

type Props = {
  q: string;
};

export const EmptySearchResults = ({ q }: Props) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-10 pt-20">
      <p className="mb-6 text-lg font-medium">
        「{q}」に該当する商品が見つかりませんでした。
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
