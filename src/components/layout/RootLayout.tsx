import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};
export const RootLayout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => toast.dismiss();
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  return <>{children}</>;
};
