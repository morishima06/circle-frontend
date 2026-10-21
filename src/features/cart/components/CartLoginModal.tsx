import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";

import { Button } from "@/components/ui/Button";
type Props = {
  onClose: () => void;
};

export const CartLoginModal = ({ onClose }: Props) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white px-10 py-6">
        {/* 閉じる */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-2 right-2 text-slate-600"
        >
          <IoMdClose size={24} />
        </Button>

        {/* タイトル */}
        <h1 className="mb-6 text-center text-xl font-bold">購入手続き</h1>

        {/* 説明 */}
        <p className="mb-8 text-sm leading-relaxed">
          早くて簡単なご注文手続きには、ログイン・新規会員登録が便利です
        </p>

        {/* ログイン */}
        <Button
          size="md"
          className="mb-2 h-10 w-full"
          onClick={() => handleNavigate("/login")}
        >
          ログインする
        </Button>

        {/* 登録 */}
        <Button
          variant="outline"
          size="md"
          className="mb-2 h-10 w-full"
          onClick={() => handleNavigate("/register")}
        >
          登録する
        </Button>

        {/* 会員登録せず購入 */}
        <div className="flex justify-center">
          <Button
            variant="link"
            size="md"
            className="text-blue-600"
            onClick={() => handleNavigate("/checkout?step=1")}
          >
            会員登録せず購入する
          </Button>
        </div>
      </div>
    </div>
  );
};
