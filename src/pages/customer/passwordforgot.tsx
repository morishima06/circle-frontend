// import { ResourceBoundary } from "@/components/boundaries/ResourceBoundary";
// import { Link, useNavigate } from "react-router-dom";

// import PasswordForgotForm from "@/features/customers/auth/components/PasswordForgotForm";
// import useSendPasswordResetEmail from "@/features/customers/auth/hooks/useSendPasswordResetEmail";

// const PasswordForgot = () => {
//   const { sendPasswordResetEmail, success, error } =
//     useSendPasswordResetEmail();
//   const navigate = useNavigate();

//   // success が true になったら navigate

//   return (
//     <ResourceBoundary error={error}>
//       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200">
//         <h1 className="text-[30px] font-medium">
//           <Link to="/">CIRCLE</Link>
//         </h1>
//         {success ? (
//           // 成功時はメッセージだけ表示
//           <div className="mt-8 mb-20 flex w-full max-w-md justify-center rounded-2xl border-slate-300 bg-white p-10">
//             <h1 className="text-sm font-bold">
//               リセットメールをお送りしました
//             </h1>
//           </div>
//         ) : (
//           <div className="mt-12 mb-20 w-full max-w-md rounded-2xl border-slate-300 bg-white p-10">
//             <h2 className="mb-6 text-2xl font-bold">パスワードを忘れた方</h2>

//             <p className="text-sm">
//               ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
//             </p>
//             <PasswordForgotForm
//               sendPasswordResetEmail={sendPasswordResetEmail}
//             />
//           </div>
//         )}
//       </div>
//     </ResourceBoundary>
//   );
// };

// export default PasswordForgot;
const PasswordForgot = () => {
  return <div>PasswordForgot</div>;
};
export default PasswordForgot;
