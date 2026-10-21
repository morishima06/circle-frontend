// src/pages/account/edit.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";

import { profileUpdate } from "@/api/customers/profiles";
import { CustomerResourceBoundary } from "@/components/boundaries/CustomerResourceBoundary";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { useAccount } from "@/features/customers/account/hooks/useAccount";
import { useSession } from "@/features/customers/auth/hooks/useSession";
import { GENDER_OPTIONS } from "@/features/customers/constants/options";
import {
  ProfileData,
  profileSchema,
} from "@/features/favorite/schemas/profileSchema";
import { handleError } from "@/lib/errors/handleError";
import { appToast } from "@/lib/toast/appToast";

const AccountEditPage = () => {
  const { isLoading } = useSession();
  const { account } = useAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      last_name: "",
      first_name: "",
      last_name_kana: "",
      first_name_kana: "",
      gender: "",
      phone_number: "",
      birth_date: "",
    },
  });

  useEffect(() => {
    if (!account) return;

    reset({
      last_name: account.lastName ?? "",
      first_name: account.firstName ?? "",
      last_name_kana: account.lastNameKana ?? "",
      first_name_kana: account.firstNameKana ?? "",
      gender: account.gender ?? "",
      phone_number: account.phoneNumber ?? "",
      birth_date: account.birthDate ?? "",
    });
  }, [account, reset]);

  const onSubmit = async (data: ProfileData) => {
    try {
      await profileUpdate({ customer: data });
      console.log(909090);
      appToast.success("プロフィールが更新されました！");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <CustomerResourceBoundary isLoading={isLoading}>
      <div className="w-[500px]">
        <h2 className="text-lg font-semibold">プロフィール情報</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 space-y-6 text-sm text-slate-700"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              variant="underline"
              size="sm"
              label="姓*"
              name="last_name"
              register={register}
              error={errors.last_name}
            />

            <InputField
              variant="underline"
              size="sm"
              label="名*"
              name="first_name"
              register={register}
              error={errors.first_name}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              variant="underline"
              size="sm"
              label="フリガナ(セイ)*"
              name="last_name_kana"
              register={register}
              error={errors.last_name_kana}
            />

            <InputField
              variant="underline"
              size="sm"
              label="フリガナ(メイ)*"
              name="first_name_kana"
              register={register}
              error={errors.first_name_kana}
            />
          </div>

          <SelectField
            variant="underline"
            size="xs"
            label="性別"
            name="gender"
            register={register}
            options={GENDER_OPTIONS}
            placeholder="性別を選択してください"
            error={errors.gender}
          />

          <InputField
            variant="underline"
            size="sm"
            label="電話番号*"
            name="phone_number"
            register={register}
            error={errors.phone_number}
            placeholder="01201111111(ハイフンなし)"
          />

          <InputField
            variant="underline"
            size="sm"
            label="生年月日*"
            name="birth_date"
            type="date"
            register={register}
            error={errors.birth_date}
          />

          <button
            type="submit"
            className="mt-3 bg-black p-3 text-xs text-white"
          >
            更新する
          </button>
        </form>
      </div>
    </CustomerResourceBoundary>
  );
};

AccountEditPage.getLayout = (page: ReactNode) => (
  <CustomerLayout title="プロフィール">{page}</CustomerLayout>
);

export default AccountEditPage;
