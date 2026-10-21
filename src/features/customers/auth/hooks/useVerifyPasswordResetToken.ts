// import { useState } from "react";

// import { verifyPasswordResetCustomerToken } from "@/api/customers/auth/password_resets";

// const useVerifyPasswordResetToken = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false); // 検証成功フラグ
//   const [isLoading, setIsLoading] = useState(true);

//   const verifyPasswordResetToken = async (email, token) => {
//     setIsLoading(true);
//     setData(null);
//     setError(null);
//     setSuccess(false); // 検証前なので false にリセット

//     try {
//       const response = await verifyPasswordResetCustomerToken(email, token);
//       setData(response.data);
//       setSuccess(true); // 検証成功
//     } catch (err) {
//       const errRes = err.response;
//       setError({
//         errors: errRes?.data?.errors || [],
//         status: errRes?.status || 0,
//       });
//       setSuccess(false); // 検証失敗
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { verifyPasswordResetToken, data, error, isLoading, success };
// };

// export default useVerifyPasswordResetToken;
