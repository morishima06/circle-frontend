// src/features/customers/account/components/AccountAddress.tsx
import Link from "next/link";

type Address = {
  postalCode: string;
  prefecture: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  phoneNumber: string;
};

type Props = {
  account: {
    defaultAddress?: Address;
  };
};

export const AccountAddress = ({ account }: Props) => {
  const defaultAddress = account?.defaultAddress;

  return (
    <div>
      <div className="mt-8 mb-5">
        <h2 className="text-lg font-semibold">配送先住所</h2>
      </div>
      <ul className="mt-4 space-y-1 text-sm text-slate-700">
        {defaultAddress ? (
          <>
            <li>{defaultAddress.postalCode}</li>
            <li>
              {(defaultAddress.prefecture ?? "") + (defaultAddress.city ?? "")}
            </li>
            <li>{defaultAddress.addressLine1}</li>
            <li>{defaultAddress.addressLine2}</li>
            <li>{defaultAddress.phoneNumber}</li>
          </>
        ) : (
          <li className="text-sm text-slate-700">
            現在登録されてる住所がありません
          </li>
        )}
      </ul>
      <div className="mt-3 text-sm font-semibold underline underline-offset-4">
        <Link href="/customer/addresses">住所一覧</Link>
      </div>
    </div>
  );
};
