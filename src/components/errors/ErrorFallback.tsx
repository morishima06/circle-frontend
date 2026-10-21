import type { FallbackProps } from "react-error-boundary";

import { Button } from "../ui/Button";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log("Fallback", error);

  return (
    <div>
      <p>エラーが発生しました</p>

      <p>
        問題が発生しました。
        <br />
        再試行するか、しばらくしてからもう一度お試しください。
      </p>

      <Button
        onClick={resetErrorBoundary}
        className="rounded-md bg-black px-4 py-5 text-base text-white"
      >
        再試行
      </Button>
    </div>
  );
};
