import Link from "next/link";
import { useRouter } from "next/router";

import type { Color } from "@/types/collection";

type Props = {
  colors: Color[];
};

export const ColorFilter = ({ colors }: Props) => {
  const { asPath, query } = useRouter();

  // クエリ文字列を除いた現在のパス
  const pathname = asPath.split("?")[0];
  const activeColor = query.color;

  const getColorLink = (colorSlug?: string) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (["page", "gender", "path"].includes(key)) return;

      if (typeof value === "string") {
        params.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      }
    });

    if (colorSlug) {
      params.set("color", colorSlug);
    }

    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  return (
    <div className="mb-4 text-xs">
      <h2 className="mb-1 font-semibold">カラー</h2>

      <ul className="space-y-[2px]">
        <li>
          <Link
            href={getColorLink()}
            className={!activeColor ? "font-bold underline" : ""}
          >
            すべて
          </Link>
        </li>

        {colors.map((color) => {
          const isActive = activeColor === color.slug;

          return (
            <li key={color.id}>
              <Link
                href={getColorLink(color.slug)}
                className={isActive ? "font-bold underline" : ""}
              >
                {color.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
