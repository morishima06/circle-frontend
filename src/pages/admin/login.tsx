// src/pages/admin/Login.jsx
import { ReactNode } from "react";

import { Logo } from "@/components/layout/header/Logo";
const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200">
      <Logo />
      <div className="mt-8 mb-20 w-full max-w-md rounded-xl border-slate-300 bg-white p-8">
        <h2 className="mb-8 text-xl font-bold">管理者ログイン</h2>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: ReactNode) => page;

export default LoginPage;
