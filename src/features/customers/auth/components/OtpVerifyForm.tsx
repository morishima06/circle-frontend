import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/ui/InputField";
import {
  type OtpVerifyData,
  otpVerifySchema,
} from "@/features/customers/auth//schemas/otpVerifySchema";
import { handleFormError } from "@/lib/errors/handleFormError";

import { useVerifyOtp } from "../hooks/useVerifyOtp";

export const OtpVerifyForm = () => {
  const router = useRouter();

  const { verifyOtp } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OtpVerifyData>({
    resolver: zodResolver(otpVerifySchema),
  });

  const onSubmit = async (data: OtpVerifyData): Promise<void> => {
    try {
      await verifyOtp(data.otp);
      await router.push("/");
    } catch (error: unknown) {
      handleFormError(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
      <InputField
        variant="outline"
        label="６桁認証コード"
        name="otp"
        register={register}
        error={errors.otp}
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="6桁のコードを入力"
      />
      <button
        type="submit"
        className="mt-4 h-11 w-full rounded-md border border-slate-800 bg-slate-800 text-sm text-white hover:border-slate-700 hover:bg-slate-700"
      >
        認証する
      </button>
    </form>
  );
};
