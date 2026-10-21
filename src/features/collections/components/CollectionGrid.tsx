// // features/collection/components/CollectionGrid.jsx
// import Pagination from "components/ui/PageNation";
// import { Link } from "react-router-dom";

// import CategoryFilter from "./CategoryFilter";
// import ColorFilter from "./ColorFilter";
// import DesignerFilter from "./DesignerFilter";
// import ProductList from "./ProductList";
// import SortFilter from "./SortFilter";

// const CollectionGrid = ({
//   products,
//   categories,
//   designers,
//   colors,
//   urlParams,
//   location,
//   pagination,
// }) => {
//   return (
//     <div className="grid grid-cols-[auto_1fr_auto] gap-1 px-6 pb-6">
//       {/* 左サイド */}
//       <aside className="pr-6">
//         {products.length > 0 && (
//           <>
//             <CategoryFilter
//               urlParams={urlParams}
//               categories={categories}
//               location={location}
//             />
//             <DesignerFilter
//               urlParams={urlParams}
//               designers={designers}
//               location={location}
//             />
//           </>
//         )}
//       </aside>

//       {/* メイン */}
//       <section className="px-6">
//         {products.length === 0 ? (
//           <div className="py-8 text-center text-gray-900">
//             <p className="mb-5">現在、このカテゴリーの商品はありません。</p>
//             <Link
//               to="/"
//               className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-300"
//             >
//               ホームページに戻る
//             </Link>
//           </div>
//         ) : (
//           <ProductList products={products} />
//         )}

//         {products.length > 0 && (
//           <Pagination totalPages={pagination?.totalPages} />
//         )}
//       </section>

//       {/* 右サイド */}
//       <aside className="flex justify-end text-xs">
//         {products.length > 0 && (
//           <div>
//             <SortFilter location={location} />
//             <ColorFilter colors={colors} location={location} />
//           </div>
//         )}
//       </aside>
//     </div>
//   );
// };

// export default CollectionGrid;
