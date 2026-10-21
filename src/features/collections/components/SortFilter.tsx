import Link from "next/link";
import { useRouter } from "next/router";

export const SortFilter = () => {
  const { asPath, query } = useRouter();

  // クエリ文字列を除いた現在のパス
  const pathname = asPath.split("?")[0];

  const getSortLink = (sortOrder: string) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (["page", "gender", "path"].includes(key)) return;

      if (typeof value === "string") {
        params.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      }
    });

    params.set("sort", sortOrder);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mb-6 text-xs">
      <p className="mb-2">並び替え</p>

      <ul className="space-y-1">
        <li>
          <Link href={getSortLink("price-asc")}>価格の安い順</Link>
        </li>
        <li>
          <Link href={getSortLink("price-desc")}>価格の高い順</Link>
        </li>
      </ul>
    </div>
  );
};
