// src/features/customers/account/components/AccountProfile.tsx
import Link from "next/link";

type Props = {
  account: {
    name: string;
    email: string;
  };
};

export const AccountProfile = ({ account }: Props) => {
  return (
    <div className="mb-10">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">アカウント情報</h2>
      </div>
      {account && (
        <ul className="mt-4 space-y-1 text-sm text-slate-800">
          <li>{account.name}</li>
          <li>{account.email}</li>
        </ul>
      )}
      <div className="mt-3 text-sm font-semibold text-slate-900 underline underline-offset-4">
        <Link href="/customer/edit">アカウント編集</Link>
      </div>
    </div>
  );
};
