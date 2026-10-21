// import { createContext } from 'react';
// import { useSession } from '@/features/customers/auth/hooks/useSession';

// export const CustomerAuthContext = createContext({
//   currentCustomer: null,
//   isSignedIn: false,
//   isLoading: false,
//   error: null,
//   mutate: async () => {},
// });
// export const CustomerAuthProvider = ({ children }) => {
//   const { currentCustomer, isLoading, error, mutate } = useSession();

//   const isSignedIn = !!currentCustomer?.customer;

//   console.log(currentCustomer, isSignedIn);

//   return (
//     <CustomerAuthContext.Provider
//       value={{
//         currentCustomer,
//         isSignedIn,
//         isLoading,
//         error,
//         mutate,
//       }}
//     >
//       {children}
//     </CustomerAuthContext.Provider>
//   );
// };
