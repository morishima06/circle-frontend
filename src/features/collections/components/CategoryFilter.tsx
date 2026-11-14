import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { Category } from "@/types/collection";

type Props = {
  categories: Category[];
};

export const CategoryFilter = ({ categories }: Props) => {
  const router = useRouter();
  const { asPath, query } = router;

  // クエリ文字列を除いた現在のパス
  const pathname = asPath.split("?")[0];

  const segments = pathname.split("/").filter(Boolean);

  const genderSlug = segments[0] || null;
  const categorySlug = segments[1] || null;

  const resolvedScope =
    segments[1] === "sale" || segments[1] === "new-arrivals"
      ? segments[1]
      : null;

  const resolvedDesignerSlug = (() => {
    const idx = segments.indexOf("designers");
    return idx !== -1 ? segments[idx + 1] : null;
  })();

  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!categorySlug || !categories?.length) {
      setOpenIds(new Set());
      return;
    }

    const collect = (
      nodes: Category[],
      parents: Category[] = [],
    ): Set<number> | null => {
      for (const node of nodes) {
        if (node.slug === categorySlug) {
          return new Set([...parents.map((parent) => parent.id), node.id]);
        }

        if (node.children?.length) {
          const found = collect(node.children, [...parents, node]);
          if (found) return found;
        }
      }

      return null;
    };

    setOpenIds(collect(categories) ?? new Set());
  }, [categorySlug, categories]);

  // 現在のクエリ条件を維持し、ページ番号だけリセットする
  const buildQueryString = () => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (["page", "gender", "path"].includes(key)) return;

      if (typeof value === "string") {
        params.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      }
    });
    return params.toString();
  };

  const buildPath = (catSlug?: string) => {
    if (!genderSlug) return "/";

    let path = `/${genderSlug}`;

    if (resolvedScope) {
      path += `/${resolvedScope}`;
    }

    if (catSlug) {
      path += `/${catSlug}`;
    }

    if (resolvedDesignerSlug) {
      path += `/designers/${resolvedDesignerSlug}`;
    }

    return path;
  };

  const queryString = buildQueryString();

  const buildHref = (path: string) =>
    queryString ? `${path}?${queryString}` : path;

  const renderCategory = (cat: Category) => {
    const isActive = categorySlug === cat.slug;
    const isOpen = openIds.has(cat.id);

    const path = isActive ? pathname : buildPath(cat.slug);
    const href = buildHref(path);

    return (
      <li key={cat.id} className="mb-1">
        <Link
          href={href}
          className={`block cursor-pointer hover:underline ${
            isActive ? "font-bold underline" : ""
          }`}
        >
          {cat.name}
        </Link>
        {(cat.children?.length ?? 0) > 0 && isOpen && (
          <ul className="mt-1 ml-4 list-none">
            {cat.children?.map((child) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  // カテゴリーを解除するリンク
  const allCategoriesPath = (() => {
    if (!genderSlug) return "/";

    let path = `/${genderSlug}`;

    if (resolvedScope) {
      path += `/${resolvedScope}`;
    }

    if (resolvedDesignerSlug) {
      path += `/designers/${resolvedDesignerSlug}`;
    }

    return path;
  })();

  const allCategoriesLink = buildHref(allCategoriesPath);

  return (
    <div className="mb-4 text-xs">
      <h2 className="mb-2">
        <Link
          href={allCategoriesLink}
          className={!categorySlug ? "font-bold underline" : ""}
        >
          カテゴリー
        </Link>
      </h2>
      <ul className="list-none">
        {categories.map((cat) => renderCategory(cat))}
      </ul>
    </div>
  );
};
