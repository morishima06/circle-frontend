import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useDesignerSearch } from "@/features/admin/product/hooks/useDesignerSearch";
import type { ProductSellFormInput } from "@/features/admin/product/schemas/productSellSchema";

type Designer = {
  id: number;
  name: string;
};

type Props = {
  initialDesignerName?: string;
};

export const DesignerSelect = ({ initialDesignerName }: Props) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<ProductSellFormInput>();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Designer | null>(null);
  const [open, setOpen] = useState(false);

  const { designers, loading } = useDesignerSearch(query);

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 編集画面などで初期デザイナー名が渡された場合
   */
  useEffect(() => {
    if (initialDesignerName) {
      setQuery(initialDesignerName);
    }
  }, [initialDesignerName]);

  /**
   * コンポーネント外をクリックしたら候補を閉じる
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * 入力変更
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    setSelected(null);
    setOpen(true);

    /**
     * 選択済みデザイナーを変更したので、
     * designerIdもクリアする。
     *
     * フォーム値はstringで統一。
     */
    setValue("designerId", "");
  };

  /**
   * デザイナー選択
   */
  const handleSelect = (designer: Designer) => {
    setSelected(designer);
    setQuery(designer.name);
    setOpen(false);

    setValue("designerId", String(designer.id), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-xs text-slate-800">ブランド</label>

      <div className="relative">
        <input
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder="ブランド名を入力すると候補が表示されます"
          className="w-full rounded-md border border-gray-300 bg-white p-3 pr-10 text-xs"
        />

        {(selected || initialDesignerName) && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-sm">
            ✔
          </div>
        )}
      </div>

      {open && designers.length > 0 && (
        <ul className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-sm border border-slate-200 bg-white">
          {designers.map((designer) => (
            <li key={designer.id}>
              <button
                type="button"
                onClick={() => handleSelect(designer)}
                className="w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
              >
                {designer.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="mt-1 text-xs text-gray-500">検索中...</p>}

      {errors.designerId && (
        <p className="mt-1 text-xs text-red-500">{errors.designerId.message}</p>
      )}
    </div>
  );
};
