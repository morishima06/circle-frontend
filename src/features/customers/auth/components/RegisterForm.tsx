import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import {
  RegisterData,
  registerSchema,
} from "@/features/customers/auth//schemas/registerSchema";
import { handleFormError } from "@/lib/errors/handleFormError";

import { useRegister } from "../hooks/useRegister";

export const RegisterForm = () => {
  const { register: registerCustomer } = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const result = await registerCustomer(data);
      console.log("register success:", result);
      router.push("/");
    } catch (error) {
      handleFormError(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 w-full">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          <InputField
            variant="outline"
            size="xs"
            label="姓"
            name="lastName"
            register={register}
            error={errors.lastName}
            placeholder=""
          />
          <InputField
            variant="outline"
            size="xs"
            label="名"
            name="firstName"
            register={register}
            error={errors.firstName}
            placeholder=""
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            variant="outline"
            size="xs"
            label="フリガナ(セイ)"
            name="lastNameKana"
            register={register}
            error={errors.lastNameKana}
          />

          <InputField
            variant="outline"
            size="xs"
            label="フリガナ(メイ)"
            name="firstNameKana"
            register={register}
            error={errors.firstNameKana}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            variant="outline"
            size="xs"
            label="メールアドレス"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="例）circle@example.jp"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputField
            variant="outline"
            size="xs"
            label="パスワード"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="半角英数字"
          />

          <InputField
            variant="outline"
            size="xs"
            label="パスワード確認"
            name="passwordConfirmation"
            type="password"
            register={register}
            error={errors.passwordConfirmation}
            placeholder="パスワード確認"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <Button type="submit" className="px-10 font-normal">
          アカウント作成
        </Button>
      </div>
    </form>
  );
};
