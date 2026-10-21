import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

import { FullscreenLoader } from "@/components/ui/FullscreenLoader";
import { OtpVerifyForm } from "@/features/customers/auth/components/OtpVerifyForm";
import { useVerifySession } from "@/features/customers/auth/hooks/useVerifySession";

const TwoFactorPage = () => {
  const router = useRouter();

  const { verifySession } = useVerifySession();

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await verifySession();
        setIsVerified(true);
      } catch {
        router.replace("/login");
      }
    };

    checkSession();
  }, [router, verifySession]);

  if (!isVerified) {
    return <FullscreenLoader />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200">
      <h1 className="mt-8 text-3xl font-medium">
        <Link href="/">CIRCLE</Link>
      </h1>

      <div className="mt-8 mb-20 w-full max-w-md rounded-2xl border border-gray-300 bg-white p-10">
        <h2 className="mb-6 text-2xl font-bold">2段階認証</h2>

        <p className="mb-4">送信された6ケタの確認コードを入力してください</p>

        <OtpVerifyForm />
      </div>
    </div>
  );
};

TwoFactorPage.getLayout = (page: ReactNode) => page;

export default TwoFactorPage;
