import Link from "next/link";

import { Button } from "@/components/ui/Button";
export const EmptyCart = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center gap-6">
      <p className="text-xl font-semibold">ショッピングカートが空です。</p>
      <Button
        asChild
        className="hover:!bg-slate-800! rounded-sm bg-black p-5 text-white"
      >
        <Link href="/">買い物を続ける</Link>
      </Button>
    </div>
  );
};
