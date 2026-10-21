// import { useState } from "react";

// import { resetPasswordCustomer } from "@/api/customers/auth/password_resets";

// const useResetPassword = () => {
//   const [data, setData] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const resetPassword = async ({ email, token, password }) => {
//     setLoading(true);
//     setData(null);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await resetPasswordCustomer({ email, token, password });
//       setData({ message: response.data.message });
//       setSuccess(true);
//     } catch (err) {
//       setError({
//         errors: err.response?.data?.errors || [],
//         status: err.response?.status || 0,
//       });
//       setSuccess(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { resetPassword, data, success, error, loading };
// };

// export default useResetPassword;
