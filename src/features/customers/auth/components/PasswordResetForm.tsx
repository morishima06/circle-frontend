// import { yupResolver } from "@hookform/resolvers/yup";
// import TextOutlineField from "components/ui/TextOutlineField";
// import { passwordResetSchema } from "lib/validation/schemas/passwordResetSchema";
// import React from "react";
// import { useForm } from "react-hook-form";

// const PasswordResetForm = ({ resetPassword, email, token }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(passwordResetSchema),
//   });

//   const onSubmit = (data) => {
//     resetPassword({ password: data.password, email, token });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
//         <div className="flex flex-col">
//           <TextOutlineField
//             label="パスワード"
//             name="password"
//             register={register}
//             error={errors.password}
//             type="password"
//           />
//           <button
//             type="submit"
//             className="mt-4 h-11 w-full rounded-md border border-slate-800 bg-slate-800 text-sm text-white hover:border-slate-700 hover:bg-slate-700 disabled:opacity-50"
//           >
//             パスワードをリセットする
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };
// export default PasswordResetForm;
