import type { FC } from "react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import CheckboxField from "@/components/ui/CheckboxField";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { usePostalCode } from "@/features/customers/account/hooks/usePostalCode";
import type { Address } from "@/types/customer/address";

import { PREFECTURE_OPTIONS } from "../constants/prefectures";
import { type AccountAddressData } from "./schemas/accountAddressSchema";

type Props = {
  onSubmit: (data: AccountAddressData) => void | Promise<void>;
  address?: Address;
  formType: "new" | "edit";
  showIsDefault?: boolean;
};

export const AccountAddressForm: FC<Props> = ({
  onSubmit,
  address,
  formType,
  showIsDefault = true,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    formState: { errors },
  } = useFormContext<AccountAddressData>();

  const { fetchAddressByPostalCode } = usePostalCode();

  const postalCode = useWatch({
    control,
    name: "postalCode",
  });

  useEffect(() => {
    console.log(address);
    if (!address) return;

    reset({
      lastName: address.lastName ?? "",
      firstName: address.firstName ?? "",
      lastNameKana: address.lastNameKana ?? "",
      firstNameKana: address.firstNameKana ?? "",
      postalCode: address.postalCode ?? "",
      prefecture: address.prefecture ?? "",
      city: address.city ?? "",
      addressLine1: address.addressLine1 ?? "",
      addressLine2: address.addressLine2 ?? "",
      phoneNumber: address.phoneNumber ?? "",
      isDefault: address.isDefault ?? false,
    });
  }, [address, reset]);

  useEffect(() => {
    if (!postalCode) return;

    const cleaned = postalCode.replace(/-/g, "");

    if (!/^\d{7}$/.test(cleaned)) return;

    const fetchAddress = async () => {
      try {
        const result = await fetchAddressByPostalCode(cleaned);

        setValue("prefecture", result.address1);
        setValue("city", `${result.address2}${result.address3}`);
      } catch {
        setError("postalCode", {
          message: "住所が見つかりませんでした",
        });
      }
    };

    fetchAddress();
  }, [postalCode, fetchAddressByPostalCode, setValue, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* 氏名 */}

        <div className="grid grid-cols-2 gap-4">
          <InputField
            variant="underline"
            size="xs"
            label="姓*"
            name="lastName"
            register={register}
            error={errors.lastName}
          />

          <InputField
            variant="underline"
            size="xs"
            label="名*"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
        </div>

        {/* フリガナ */}

        <div className="grid grid-cols-2 gap-4">
          <InputField
            variant="underline"
            size="xs"
            label="フリガナ(セイ)*"
            name="lastNameKana"
            register={register}
            error={errors.lastNameKana}
          />

          <InputField
            variant="underline"
            size="xs"
            label="フリガナ(メイ)*"
            name="firstNameKana"
            register={register}
            error={errors.firstNameKana}
          />
        </div>

        {/* 郵便番号 */}

        <InputField
          variant="underline"
          size="xs"
          label="郵便番号"
          name="postalCode"
          register={register}
          error={errors.postalCode}
          type="text"
          placeholder="1234567"
        />

        {/* 都道府県 */}

        <SelectField
          variant="underline"
          size="xs"
          label="都道府県*"
          name="prefecture"
          register={register}
          options={PREFECTURE_OPTIONS}
          error={errors.prefecture}
        />

        {/* 市区町村 */}

        <InputField
          variant="underline"
          size="xs"
          label="市区町村*"
          name="city"
          register={register}
          error={errors.city}
        />

        {/* 番地 */}

        <InputField
          variant="underline"
          size="xs"
          label="番地*"
          name="addressLine1"
          register={register}
          error={errors.addressLine1}
        />

        {/* 建物名 */}

        <InputField
          variant="underline"
          size="xs"
          label="建物名・部屋番号"
          name="addressLine2"
          register={register}
          error={errors.addressLine2}
        />

        {/* 電話番号 */}

        <InputField
          variant="underline"
          size="xs"
          label="連絡先電話番号*"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
        />

        {showIsDefault && (
          <>
            <CheckboxField
              label="現在の配送先住所に設定する"
              name="isDefault"
              register={register}
            />

            <Button
              type="submit"
              size="sm"
              className="rounded-none bg-black px-20 py-5 text-white hover:bg-slate-800"
            >
              {formType === "edit"
                ? "配送先の住所を更新する"
                : "配送先の住所を登録する"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
