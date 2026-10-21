// import client from "@/lib/api/client";

// export const sendPasswordResetCustomerEmail = ({ email }) => {
//   return client.post("/customer/password_resets", { email });
// };

// export const verifyPasswordResetCustomerToken = (email, token) => {
//   return client.get(`/customer/password_resets/${token}/edit`, {
//     params: { email },
//   });
// };

// export const resetPasswordCustomer = ({ email, password, token }) => {
//   return client.patch(
//     "/customer/password_resets",
//     { email, password, token }, // トークンと新しいパスワードを送信
//   );
// };
