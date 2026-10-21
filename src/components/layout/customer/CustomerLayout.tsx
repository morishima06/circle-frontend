// src/components/layout/CustomerLayout.tsx
import { ReactNode } from "react";

import { Toaster } from "@/components/ui/Toaster";

import { Footer } from "../footer";
import { Header } from "../header";
import { CustomerSidebar } from "./CustomerSideBar";

type Props = {
  children: ReactNode;
  title: string;
};

export const CustomerLayout = ({ children, title }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="mt-10 mb-14 flex justify-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>

        <div className="flex gap-10 px-20">
          <div className="mr-16">
            <CustomerSidebar />
          </div>
          <div className="w-full flex-1">{children}</div>
        </div>
      </main>
      <Toaster position="top-right" />

      <Footer />
    </div>
  );
};
