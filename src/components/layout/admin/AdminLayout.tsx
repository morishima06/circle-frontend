import { Toaster } from "@/components/ui/Toaster";

import AdminSideBar from "./AdminSideBar";

type Props = {
  children: React.ReactNode;
};

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
          <h1 className="text-muted-foreground text-sm font-medium">
            EC管理画面
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm">admin@example.com</div>
          </div>
        </header>
        <main className="flex-1 bg-[#f5f7fa]">{children}</main>
        <Toaster position="top-right" style={{ pointerEvents: "none" }} />
      </div>
    </div>
  );
};
