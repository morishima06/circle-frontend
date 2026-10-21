// components/AddressFields.tsx

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import type { CheckoutAddressData } from "@/features/checkout/schemas/checkoutAddressSchema";
import { PREFECTURE_OPTIONS } from "@/features/customers/constants/prefectures";
type Props = {
  register: UseFormRegister<CheckoutAddressData>;
  errors: FieldErrors<CheckoutAddressData>;
};

export const AddressFields = ({ register, errors }: Props) => {
  return (
    <div className="mt-4">
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600">
        <InputField
          variant="outline"
          label="姓"
          name="lastName"
          register={register}
          error={errors.lastName}
          type="text"
        />

        <InputField
          variant="outline"
          label="名"
          name="firstName"
          register={register}
          error={errors.firstName}
          type="text"
        />

        <InputField
          variant="outline"
          label="郵便番号"
          name="postalCode"
          register={register}
          error={errors.postalCode}
          type="text"
          placeholder="1234567"
        />

        <SelectField
          size="xs"
          variant="outline"
          label="都道府県"
          name="prefecture"
          register={register}
          options={PREFECTURE_OPTIONS}
          error={errors.prefecture}
        />

        <InputField
          variant="outline"
          label="市区町村"
          name="city"
          register={register}
          error={errors.city}
          type="text"
        />

        <div className="col-span-2">
          <InputField
            variant="outline"
            label="住所1"
            name="addressLine1"
            register={register}
            error={errors.addressLine1}
            type="text"
          />
        </div>

        <div className="col-span-2">
          <InputField
            variant="outline"
            label="住所2"
            name="addressLine2"
            register={register}
            error={errors.addressLine2}
            type="text"
          />
        </div>

        <InputField
          variant="outline"
          label="電話番号"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          type="text"
        />
      </div>
    </div>
  );
};
