import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { handleFormError } from "@/lib/errors/handleFormError";

import { useLogin } from "../hooks/useLogin";
import { useSession } from "../hooks/useSession";
import { type LoginData, loginSchema } from "../schemas/loginSchema";

export const LoginForm = () => {
  const { login } = useLogin();
  const { mutate: fetchCurrentCustomer } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await login(data);
      console.log(result);

      if (result.requires2fa) {
        console.log("2FAへ遷移します");
        await router.replace("/two-factor");
        console.log("router.push完了");
        return;
      }

      console.log("トップへ遷移します");
      await fetchCurrentCustomer();

      router.push("/");
    } catch (error: unknown) {
      handleFormError<LoginData>(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <InputField
        variant="outline"
        size="xs"
        label="メールアドレス"
        name="email"
        register={register}
        error={errors.email}
        type="email"
      />
      <InputField
        variant="outline"
        size="xs"
        label="パスワード"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="text-center">
        <Link
          href="/password-resets"
          className="text-blue-00 text-xs hover:underline"
        >
          パスワードを忘れた方はこちら
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 font-semibold text-white hover:bg-blue-400"
      >
        ログイン
      </Button>
    </form>
  );
};
