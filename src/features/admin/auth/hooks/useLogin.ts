// import { login } from "api/admin/session";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const useLogin = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleLogin = async (email, password) => {
//     try {
//       setLoading(true);
//       setError(null);

//       await login(email, password);

//       navigate("/admin/new");
//     } catch (err) {
//       setError("ログインに失敗しました");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     login: handleLogin,
//     loading,
//     error,
//   };
// };

// export default useLogin;
