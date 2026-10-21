import Link from "next/link";
import type { ReactNode } from "react";

import { deleteAddress } from "@/api/customers/addresses";
import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { AddressItem } from "@/features/customers/addresses/AddressItem";
import { useAddresses } from "@/features/customers/addresses/hooks/useAddresses";
import { handleError } from "@/lib/errors/handleError";

const AddressesPage = () => {
  const { addresses, error, isLoading, mutate } = useAddresses();
  console.log(addresses);

  const defaultAddress = addresses.find((address) => address.isDefault);

  const otherAddresses = addresses.filter((address) => !address.isDefault);

  const handleDelete = async (id: number) => {
    if (!window.confirm("この住所を削除しますか？")) return;

    try {
      await deleteAddress(id);
      mutate();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <CustomerResourceBoundary isLoading={isLoading} error={error}>
      <div className="w-full">
        <h1 className="text-xl font-semibold">現在のお届け先</h1>

        {defaultAddress ? (
          <AddressItem address={defaultAddress} handleDelete={handleDelete} />
        ) : (
          <p className="mt-4 text-sm text-slate-700">
            現在のお届け先は設定されていません
          </p>
        )}

        {otherAddresses.length > 0 && (
          <div className="w-full">
            <hr className="mt-6 mb-6 border-t border-slate-300" />

            <h2 className="text-lg font-semibold">その他登録住所</h2>

            {otherAddresses.map((address) => (
              <div key={address.id}>
                <AddressItem address={address} handleDelete={handleDelete} />

                <hr className="mt-6 mb-6 border-t border-slate-300" />
              </div>
            ))}
          </div>
        )}

        <Button
          asChild
          className="mt-6 flex w-48 items-center justify-center rounded-md border border-black bg-black p-3 py-5 text-sm text-white hover:border-slate-700 hover:bg-slate-700"
        >
          <Link href="/customer/addresses/new">配送先住所を登録する</Link>
        </Button>
      </div>
    </CustomerResourceBoundary>
  );
};

AddressesPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="配送先住所">{page}</CustomerLayout>
);

export default AddressesPage;
