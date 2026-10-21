import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { updateOrder } from "@/api/order";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import {
  type CheckoutAddressData,
  checkoutAddressSchema,
} from "@/features/checkout/schemas/checkoutAddressSchema";
import { usePostalCode } from "@/features/customers/account/hooks/usePostalCode";
import { useSession } from "@/features/customers/auth/hooks/useSession";
import { handleFormError } from "@/lib/errors/handleFormError";
import type { Order } from "@/types/order";

import { useGetAddresses } from "../hooks/useGetAddresses";
import { AddressFields } from "./AddressFields";

type Props = {
  order: Order | null;
  setOrder: Dispatch<SetStateAction<Order | null>>;
};

export const AddressForm = ({ order, setOrder }: Props) => {
  const router = useRouter();
  const { isSignedIn } = useSession();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm<CheckoutAddressData>({
    resolver: zodResolver(checkoutAddressSchema),
    defaultValues: {
      email: "",
      lastName: "",
      firstName: "",
      postalCode: "",
      prefecture: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      phoneNumber: "",
    },
  });

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  const { addresses } = useGetAddresses();
  const { fetchAddressByPostalCode } = usePostalCode();

  const addressList = addresses ?? [];

  const defaultAddress =
    addressList.find((address) => address.isDefault) ?? null;

  const defaultAddressId = defaultAddress?.id ?? null;

  const otherAddresses = addressList.filter((address) => !address.isDefault);

  // 注文情報をフォームに反映
  useEffect(() => {
    if (!order) return;

    reset({
      email: order.email ?? "",
      lastName: order.shipping?.lastName ?? "",
      firstName: order.shipping?.firstName ?? "",
      postalCode: order.shipping?.postalCode ?? "",
      prefecture: order.shipping?.prefecture ?? "",
      city: order.shipping?.city ?? "",
      addressLine1: order.shipping?.addressLine1 ?? "",
      addressLine2: order.shipping?.addressLine2 ?? "",
      phoneNumber: order.shipping?.phoneNumber ?? "",
    });
  }, [order, reset]);

  // 選択する住所を設定
  useEffect(() => {
    if (order?.selectedAddressId) {
      setSelectedAddressId(order.selectedAddressId);
      return;
    }

    setSelectedAddressId(defaultAddressId);
  }, [order?.selectedAddressId, defaultAddressId]);

  // 郵便番号を監視
  const postalCode = useWatch({
    control,
    name: "postalCode",
  });

  // 郵便番号から住所を取得
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

  // 住所選択
  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
  };

  // 次へ
  const handleNext = async (data: CheckoutAddressData) => {
    try {
      // 保存済み住所を選択している場合
      if (selectedAddressId !== null) {
        const res = await updateOrder({
          selectedAddressId,
        });

        setOrder(res);
        await router.push("/checkout?step=2");
        return;
      }

      // 新しい住所を入力している場合
      const res = await updateOrder(data);

      setOrder(res);
      await router.push("/checkout?step=2");
    } catch (error: unknown) {
      handleFormError(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <h1 className="text-xl font-semibold">ご連絡先</h1>

      <div className="border-slate-300 py-6">
        <InputField
          variant="outline"
          label="email"
          name="email"
          register={register}
          error={errors.email}
          type="text"
          readOnly={isSignedIn}
        />
      </div>

      <h1 className="text-xl font-semibold">お届け先</h1>

      {/* デフォルト住所 */}
      {defaultAddress && (
        <div className="mt-6">
          <hr className="mb-8 border-t border-slate-300" />

          <label className="flex cursor-pointer">
            <input
              type="radio"
              name="address"
              value={defaultAddress.id}
              checked={selectedAddressId === defaultAddress.id}
              onChange={() => handleSelectAddress(defaultAddress.id)}
              className="form-radio mr-3 text-blue-500"
            />

            <address className="text-sm leading-5 text-slate-700 not-italic">
              <span className="leading-6 font-semibold">
                {defaultAddress.lastName}
                {defaultAddress.firstName}
              </span>
              <br />〒{defaultAddress.postalCode}
              <br />
              {defaultAddress.prefecture}
              {defaultAddress.city}
              {defaultAddress.addressLine1}
              <br />
              {defaultAddress.addressLine2}
              <br />
              {defaultAddress.phoneNumber}
            </address>
          </label>

          <hr className="mt-8 border-t border-slate-300" />
        </div>
      )}

      {/* その他の住所 */}
      {otherAddresses.length > 0 && (
        <div>
          {otherAddresses.map((address) => (
            <div className="mt-8" key={address.id}>
              <label className="flex cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddressId === address.id}
                  onChange={() => handleSelectAddress(address.id)}
                  className="form-radio mr-3 text-blue-500"
                />

                <address className="text-xs leading-5 text-slate-600 not-italic">
                  <div className="font-semibold">
                    {address.lastName}
                    {address.firstName}
                  </div>
                  〒{address.postalCode}
                  <br />
                  {address.prefecture}
                  {address.city}
                  {address.addressLine1}
                  {address.addressLine2}
                  <br />
                  {address.phoneNumber}
                </address>
              </label>

              <hr className="mt-8 border-t border-slate-300" />
            </div>
          ))}
        </div>
      )}

      {/* 新規住所入力 */}
      <div className="mt-8 text-sm leading-5">
        <label className="flex cursor-pointer items-center">
          <input
            type="radio"
            name="address"
            checked={selectedAddressId === null}
            onChange={() => setSelectedAddressId(null)}
            className="mr-2"
          />
          新しい住所を入力
        </label>

        {selectedAddressId === null && (
          <AddressFields register={register} errors={errors} />
        )}
      </div>

      <Button
        type="submit"
        className="mt-8 w-3/6 rounded-none bg-black p-2 text-white"
      >
        次へ
      </Button>
    </form>
  );
};
