import Link from "next/link";
import { useRouter } from "next/router";

type Designer = {
  id: number;
  name: string;
  slug: string;
};

type DesignerFilterProps = {
  designers: Designer[];
};

const normalizePathForDesigner = (pathname: string) => {
  return pathname.replace(/\/designers\/[^/]+$/, "");
};

export default function DesignerFilter({ designers }: DesignerFilterProps) {
  const router = useRouter();

  // クエリ文字列を除いたパスを取得
  const pathname = router.asPath.split("?")[0];

  // 現在選択中のデザイナー部分を取り除く
  const basePath = normalizePathForDesigner(pathname);

  // 現在のクエリパラメータを引き継ぐ
  const searchParams = new URLSearchParams();

  Object.entries(router.query).forEach(([key, value]) => {
    // 動的ルートのパラメータは除外
    if (["gender", "path"].includes(key)) return;

    if (typeof value === "string") {
      searchParams.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    }
  });

  const search = searchParams.toString();

  // デザイナー選択用URLを生成
  const getDesignerLink = (slug?: string) => {
    const path = slug ? `${basePath}/designers/${slug}` : basePath;

    return search ? `${path}?${search}` : path;
  };

  // 選択中のデザイナーを判定
  const currentDesigner = pathname.match(/\/designers\/([^/]+)$/)?.[1];

  return (
    <div>
      <h2 className="mb-1 text-xs">
        <Link href={getDesignerLink()} className="cursor-pointer">
          デザイナー
        </Link>
      </h2>

      <ul className="list-none text-xs">
        {designers.map((designer) => {
          const isSelected = currentDesigner === designer.slug;

          return (
            <li key={designer.id} className="my-1">
              <Link
                href={getDesignerLink(designer.slug)}
                className={`cursor-pointer ${
                  isSelected ? "font-bold underline" : "hover:underline"
                }`}
              >
                {designer.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
