import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createAddress } from "@/api/customers/addresses";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { AccountAddressForm } from "@/features/customers/addresses/AccountAddressForm";
import {
  type AccountAddressData,
  accountAddressSchema,
} from "@/features/customers/addresses/schemas/accountAddressSchema";
import { handleFormError } from "@/lib/errors/handleFormError";
import { appToast } from "@/lib/toast/appToast";

const AddressNewPage = () => {
  const router = useRouter();

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

  const handleAddressCreate = async (data: AccountAddressData) => {
    try {
      await createAddress(data);

      appToast.success("住所が作成されました。");
      router.push("/customer/addresses");
    } catch (err) {
      handleFormError(err, form.setError);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="w-full max-w-[500px]">
        <AccountAddressForm onSubmit={handleAddressCreate} formType="new" />
      </div>
    </FormProvider>
  );
};

export default AddressNewPage;

AddressNewPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="配送先住所の登録">{page}</CustomerLayout>
);
