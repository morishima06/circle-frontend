// src/features/customers/addresses/components/AddressItem.tsx
import Link from "next/link";

import type { Address } from "@/types/customer/address";

type Props = {
  address: Address;
  handleDelete: (id: number) => void;
};

export const AddressItem = ({ address, handleDelete }: Props) => {
  return (
    <div className="text-slate-900">
      <ul className="mt-4 text-sm">
        <li>
          {address.lastName} {address.firstName}
        </li>
        <li>
          {address.lastNameKana} {address.firstNameKana}
        </li>
        <li>〒{address.postalCode}</li>
        <li>{address.prefecture}</li>
        <li>{address.city}</li>
        <li>{address.addressLine1}</li>
        <li>{address.addressLine2}</li>
        <li>{address.phoneNumber}</li>
      </ul>
      <div className="mt-2 flex flex-col gap-0.5">
        <Link
          href={`/customer/addresses/${address.id}/edit`}
          className="text-sm font-bold underline"
        >
          編集する
        </Link>

        <button
          onClick={() => handleDelete(address.id)}
          className="text-left text-sm font-bold underline"
        >
          削除する
        </button>
      </div>
    </div>
  );
};
