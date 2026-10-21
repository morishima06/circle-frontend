// import { useState } from "react";

// import { sendPasswordResetCustomerEmail } from "@/api/customers/auth/password_resets";

// const useSendPasswordResetEmail = () => {
//   const [data, setData] = useState(null); // 成功レスポンス
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null); // エラー
//   const [loading, setLoading] = useState(false);

//   const sendPasswordResetEmail = async (email) => {
//     setLoading(true);
//     setData(null);
//     setSuccess(false);
//     setError(null);

//     try {
//       const response = await sendPasswordResetCustomerEmail({ email });
//       setData(response.data);
//       setSuccess(true);
//     } catch (err) {
//       const errRes = err.response;

//       setError({
//         errors: errRes.data.errors || [],
//         status: errRes.status || 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { sendPasswordResetEmail, data, success, error, loading };
// };

// export default useSendPasswordResetEmail;
