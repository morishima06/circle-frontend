// import { yupResolver } from "@hookform/resolvers/yup";
// import TextOutlineField from "components/ui/TextOutlineField";
// import { passwordForgotSchema } from "lib/validation/schemas/passwordForgotSchema";
// import React from "react";
// import { useForm } from "react-hook-form";

// const PasswordForgotForm = ({ sendPasswordResetEmail }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(passwordForgotSchema),
//   });

//   const onSubmit = (data) => {
//     sendPasswordResetEmail(data.email);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
//         <TextOutlineField
//           label="メールアドレス"
//           name="email"
//           register={register}
//           error={errors.email}
//           type="email"
//         />
//         <button
//           type="submit"
//           className="mt-4 h-11 w-full rounded-md border border-slate-800 bg-slate-800 text-sm text-white hover:border-slate-700 hover:bg-slate-700"
//         >
//           パスワードをリセットする
//         </button>
//       </form>
//     </>
//   );
// };
// export default PasswordForgotForm;
