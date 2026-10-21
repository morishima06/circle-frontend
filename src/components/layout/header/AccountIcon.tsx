// src/components/layout/Header/icons/AccountDropdown.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";

import { useLogout } from "@/features/customers/auth/hooks/useLogout";

type Props = {
  isSignedIn: boolean;
};

export const AccountIcon = ({ isSignedIn }: Props) => {
  const { logout } = useLogout();

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (err: unknown) {
      console.error("ログアウトに失敗しました", err);
    }
  };

  const handleAccountClick = () => {
    router.push(isSignedIn ? "/customer" : "/login");
  };
  return (
    <div
      className="relative z-10 before:absolute before:top-full before:right-0 before:left-0 before:h-2 before:content-['']"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VscAccount
        data-testid="account-icon"
        onClick={handleAccountClick}
        size={18}
        className="cursor-pointer"
      />

      {isHovered && (
        <div className="absolute left-1/2 z-10 mt-2 -translate-x-1/2 border border-slate-300 bg-white px-6 py-3 text-center">
          <h5 className="mb-2 text-xs font-semibold whitespace-nowrap">
            アカウント
          </h5>
          <ul className="space-y-2 text-center text-xs whitespace-nowrap">
            {isSignedIn ? (
              <>
                <li>
                  <Link href="/customer/orders">注文詳細</Link>
                </li>
                <li>
                  <Link href="/customer/favorites">お気に入り</Link>
                </li>
                <li>
                  <Link href="/customer">アカウント詳細</Link>
                </li>
                <li className="flex justify-center">
                  <button onClick={handleLogout} className="text-xs">
                    ログアウト
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">ログイン</Link>
                </li>
                <li>
                  <Link href="/register">新規登録</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
