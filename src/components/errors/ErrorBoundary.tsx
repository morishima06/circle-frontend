import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "./ErrorFallback";

type Props = {
  children: ReactNode;
};

export const ErrorBoundary = ({ children }: Props) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
