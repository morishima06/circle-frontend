import type { ReactNode } from "react";

import { Loader } from "../ui/Loader";

type Props = {
  isLoading: boolean;
  error?: Error;
  children: ReactNode;
};

export const CustomerResourceBoundary = ({
  isLoading,
  error,
  children,
}: Props) => {
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
        <h2 className="mb-2 text-lg font-bold">情報を取得できませんでした</h2>

        <p className="mb-3 text-sm text-gray-500">
          しばらくしてから再度お試しください。
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
