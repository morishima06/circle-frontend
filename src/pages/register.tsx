import { ReactNode } from "react";

import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { RegisterForm } from "@/features/customers/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="mt-6 flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-center text-lg font-semibold">新規会員登録</h1>

      <div className="mx-auto mt-2 mb-8 w-full max-w-4xl bg-slate-100 px-12 py-10">
        <RegisterForm />
      </div>
    </div>
  );
};

RegisterPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default RegisterPage;
