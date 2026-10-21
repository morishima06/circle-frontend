// import ResourceBoundary from "components/layout/wrapper/ResourceBoundary";
// import PasswordResetForm from "features/customers/auth/components/PasswordResetForm";
// import useResetPassword from "features/customers/auth/hooks/useResetPassword";
// import useVerifyPasswordResetToken from "features/customers/auth/hooks/useVerifyPasswordResetToken";
// import React, { useEffect } from "react";
// import { Link,useLocation, useNavigate, useParams } from "react-router-dom";

// const PasswordReset = () => {
//   const location = useLocation();
//   const { token } = useParams();
//   const email = new URLSearchParams(location.search).get("email");
//   const navigate = useNavigate();

//   const {
//     verifyPasswordResetToken,
//     success: verifySuccess,
//     error: verifyError,
//     isLoading,
//   } = useVerifyPasswordResetToken();
//   const {
//     resetPassword,
//     success: resetSuccess,
//     error: resetError,
//   } = useResetPassword();

//   console.log(verifyError);

//   useEffect(() => {
//     verifyPasswordResetToken(email, token);
//   }, []);

//   useEffect(() => {
//     if (verifyError?.status === 401) {
//       navigate("/login");
//     }
//   }, [verifyError]);
//   // 判定用フラグ
//   const showForm =
//     !resetSuccess &&
//     (resetError?.status === 422 || !resetError) &&
//     verifySuccess;

//   return (
//     <ResourceBoundary error={verifyError || resetError} isLoading={isLoading}>
//       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200">
//         <h1 className="text-[30px] font-medium">
//           <Link to="/">CIRCLE</Link>
//         </h1>

//         <div className="mt-8 mb-20 w-full max-w-md rounded-2xl border border-gray-300 bg-white p-10">
//           {resetError?.status === 401 && (
//             <div className="text-center">
//               <p className="mt-2 text-gray-700">
//                 このリンクは無効または期限切れです。再度パスワードリセットを行ってください。
//               </p>
//               <Link
//                 to="/password-resets"
//                 className="mt-4 block text-blue-500 underline"
//               >
//                 パスワードリセットへ
//               </Link>
//             </div>
//           )}

//           {showForm && (
//             <>
//               <h2 className="mb-6 text-2xl font-bold">パスワード再設定</h2>
//               <p className="text-sm text-gray-700">
//                 新しいパスワードを入力してください。
//               </p>

//               {/* バリデーションエラー */}
//               {resetError?.status === 422 && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {Object.values(resetError.errors).flat().join(", ")}
//                 </p>
//               )}

//               <PasswordResetForm
//                 resetPassword={resetPassword}
//                 token={token}
//                 email={email}
//               />
//             </>
//           )}
//           {/* 成功メッセージ */}
//           {resetSuccess && (
//             <>
//               <h2 className="font-semibold">パスワード変更しました</h2>
//               <p className="mt-2 text-sm">
//                 新しいパスワードをご利用いただけます
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </ResourceBoundary>
//   );
// };

// export default PasswordReset;
const PasswordReset = () => {
  return <div>PasswordReset</div>;
};
export default PasswordReset;
