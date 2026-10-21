import type { ApiError } from "@/types/error";

import { InternalServerView } from "../errors/InternalServerView";
import { NotFoundView } from "../errors/NotFoundView";
import { FullscreenLoader } from "../ui/FullscreenLoader";

type Props = {
  isLoading: boolean;
  error: ApiError | undefined;
  children: React.ReactNode;
};

export const ResourceBoundary = ({ isLoading, error, children }: Props) => {
  if (isLoading) {
    return <FullscreenLoader />;
  }

  const status = error?.status;

  if (status !== undefined && status >= 400 && status < 500) {
    return <NotFoundView />;
  }

  if (status !== undefined && status >= 500) {
    return <InternalServerView />;
  }

  return <>{children}</>;
};
