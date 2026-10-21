// import TextOutlineField from "components/ui/TextOutlineField";
// import { loginSchema } from "lib/validation/schemas/loginSchema";
// import { useForm } from "react-hook-form";

// import { InputField } from "@/components/ui/InputField";

// const LoginForm = ({ login }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit = (data) => {
//     login(data.email, data.password);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full space-y-4">
//       <TextOutlineField
//         label="メールアドレス"
//         name="email"
//         register={register}
//         error={errors.email}
//         type="email"
//       />
//       <TextOutlineField
//         label="パスワード"
//         name="password"
//         register={register}
//         error={errors.password}
//         type="password"
//       />
//       <InputField
//         variant="underline"
//         label="姓*"
//         name="lastName"
//         register={register}
//         error={errors.lastName}
//       />

//       <button
//         type="submit"
//         className="h-11 w-full rounded-md bg-blue-500 py-3 text-sm text-white hover:border-blue-400 hover:bg-blue-400"
//       >
//         ログイン
//       </button>
//     </form>
//   );
// };
// export default LoginForm;
