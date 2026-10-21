import Link from "next/link";
import { ReactNode } from "react";

import { StoreLayout } from "@/components/layout/store/StoreLayout";
import { Button } from "@/components/ui/Button";
import { GoogleAuthButton } from "@/features/customers/auth/components/GoogleAuthButton";
import { LoginForm } from "@/features/customers/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-center text-lg font-semibold">ログイン</h1>

      <div className="mx-auto mt-2 mb-8 max-w-4xl bg-slate-100 px-12 py-10">
        <div className="grid grid-cols-[1fr_1px_1fr] gap-10">
          {/* Login */}
          <section className="flex flex-col">
            <p className="mb-8 text-base font-semibold">会員登録がお済みの方</p>

            <div className="space-y-2">
              <LoginForm />
              <GoogleAuthButton label="Googleでログイン" />
            </div>
          </section>

          <div className="my-6 bg-gray-300" />
          {/* Register */}
          <section className="flex flex-col">
            <h2 className="mb-8 text-base font-bold">
              会員登録がお済みでない方
            </h2>
            <p className="mb-6 text-sm leading-6">
              会員登録することで様々な特典がご利用いただけます。
              <br />
              メルマガも一緒にご登録いただくと次回のお買い物に
            </p>
            <ul className="mb-10 space-y-1 text-sm">
              <li>✓ 購入金額に応じて次回使えるポイントが貯まる</li>
              <li>✓ 新作や限定イベントなどを随時配信</li>
              <li>✓ 会員ステータスに応じた様々な特典</li>
            </ul>
            <Button type="button" className="font-semibold" asChild>
              <Link href="/register">新規会員登録</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

export default LoginPage;
