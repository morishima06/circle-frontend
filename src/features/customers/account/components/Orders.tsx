// import Link from "next/link";
// import React from "react";
// import { IoIosArrowForward } from "react-icons/io";

// export const DashboardOrders = ({ order }) => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold">最近の注文</h2>
//       {order && (
//         <div>
//           <div className="mt-4 flex border border-slate-300 p-4 text-sm text-slate-900">
//             <div className="mr-4 h-20 w-20">
//               <img src="" alt="" />
//             </div>

//             <div className="flex w-full items-center justify-between">
//               <div>
//                 <p className="font-semibold">注文番号：{order.orderNumber}</p>
//                 <p>注文日：{order.paidAt}</p>
//                 <p className="text-lg font-semibold text-green-600">
//                   配達準備中
//                 </p>
//               </div>
//               <div className="mr-4">
//                 <p>合計金額{order.totalAmount}</p>
//                 <p>商品合計　　１点</p>
//               </div>
//               <div>
//                 <IoIosArrowForward />
//               </div>
//             </div>
//           </div>
//           <div>
//             <p className="mt-4 space-x-3 text-sm font-semibold text-slate-900 underline underline-offset-4">
//               <Link href="/customer/orders">注文履歴一覧</Link>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
