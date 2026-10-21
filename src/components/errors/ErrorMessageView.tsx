import { useRouter } from "next/router";

import { Button } from "../ui/Button";

type ErrorMessageViewProps = {
  title?: string;
  message?: string;
  buttonText?: string;
  href?: string;
};

export const ErrorMessageView = ({
  title = "エラーが発生しました",
  message = "しばらくしてからもう一度お試しください。",
  buttonText = "トップページへ戻る",
  href = "/",
}: ErrorMessageViewProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-[55vh] items-center justify-center px-10 pt-20">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">{title}</h1>

        <p className="text-gray-900">{message}</p>

        <Button
          className="mt-5 w-48 rounded-2xl bg-gray-800 px-4 py-4.5 text-sm text-slate-50"
          onClick={() => router.push(href)}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
