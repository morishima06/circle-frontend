import { ReactNode } from "react";

import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { Toaster } from "@/components/ui/Toaster";

import { Footer } from "../footer";
import { Header } from "../header";

type LayoutProps = {
  children: ReactNode;
};

export const StoreLayout = ({ children }: LayoutProps) => {
  console.log(999999);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
      <Toaster position="top-right" style={{ pointerEvents: "none" }} />
      <Footer />
    </div>
  );
};
