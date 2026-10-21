import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { updateAddress } from "@/api/customers/addresses";
import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { AccountAddressForm } from "@/features/customers/addresses/AccountAddressForm";
import { useAddress } from "@/features/customers/addresses/hooks/useAddress";
import {
  type AccountAddressData,
  accountAddressSchema,
} from "@/features/customers/addresses/schemas/accountAddressSchema";
import { handleFormError } from "@/lib/errors/handleFormError";
import { appToast } from "@/lib/toast/appToast";

const AddressEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const addressId = typeof id === "string" ? id : undefined;

  const { address, isLoading, error } = useAddress(addressId);

  const form = useForm<AccountAddressData>({
    resolver: zodResolver(accountAddressSchema),
    mode: "onChange",
    defaultValues: {
      lastName: "",
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      postalCode: "",
      prefecture: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      phoneNumber: "",
      isDefault: false,
    },
  });

  const handleAddressUpdate = async (data: AccountAddressData) => {
    if (!addressId) return;
    try {
      await updateAddress(addressId, data);

      appToast.success("配送先住所が更新されました。");
      router.push("/customer/addresses");
    } catch (err) {
      handleFormError(err, form.setError);
    }
  };

  return (
    <CustomerResourceBoundary isLoading={isLoading} error={error}>
      {address && (
        <FormProvider {...form}>
          <div className="w-[500px]">
            <AccountAddressForm
              onSubmit={handleAddressUpdate}
              address={address}
              formType="edit"
            />
          </div>
        </FormProvider>
      )}
    </CustomerResourceBoundary>
  );
};

export default AddressEditPage;

AddressEditPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="配送先住所の編集">{page}</CustomerLayout>
);
