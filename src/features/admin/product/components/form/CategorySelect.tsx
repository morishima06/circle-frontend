import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RiArrowDownSLine } from "react-icons/ri";

import { useCategoriesTree } from "@/features/admin/product/hooks/useCategoriesTree";
import type { ProductSellFormInput } from "@/features/admin/product/schemas/productSellSchema";
import type { Category } from "@/types/admin/category";

type Props = {
  initialCategoryId?: number | null;
};

export const CategorySelect = ({ initialCategoryId }: Props) => {
  const { setValue } = useFormContext<ProductSellFormInput>();

  const { categories, loading } = useCategoriesTree();

  const [selectedPath, setSelectedPath] = useState<number[]>([]);

  useEffect(() => {
    if (!initialCategoryId || !categories.length) {
      return;
    }

    const findPath = (
      nodes: Category[],
      targetId: number,
      path: number[] = [],
    ): number[] | null => {
      for (const node of nodes) {
        const newPath = [...path, node.id];

        if (node.id === targetId) {
          return newPath;
        }

        if (node.children?.length) {
          const found = findPath(node.children, targetId, newPath);

          if (found) {
            return found;
          }
        }
      }

      return null;
    };

    const path = findPath(categories, initialCategoryId);

    if (path) {
      setSelectedPath(path);

      setValue("categoryId", String(initialCategoryId), {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
  }, [initialCategoryId, categories, setValue]);

  const getOptionsAtLevel = (level: number): Category[] => {
    if (level === 0) {
      return categories;
    }

    let current = categories;

    for (let i = 0; i < level; i++) {
      const found = current.find((category) => category.id === selectedPath[i]);

      if (!found) {
        return [];
      }

      current = found.children ?? [];
    }

    return current;
  };

  /**
   * 末端カテゴリか判定する
   */
  const isLeaf = (category: Category): boolean => {
    return !category.children?.length;
  };

  const handleChange = (level: number, value: string): void => {
    /**
     * 未選択に戻した場合
     */
    if (!value) {
      const newPath = selectedPath.slice(0, level);

      setSelectedPath(newPath);

      /**
       * 末端カテゴリではなくなったので
       * categoryIdをクリアする。
       */
      setValue("categoryId", "", {
        shouldDirty: true,
        shouldValidate: true,
      });

      return;
    }

    /**
     * selectのvalueはstringなので、
     * path自体ではnumberとして扱う。
     */
    const id = Number(value);

    /**
     * 現在の階層以降を切り捨てて
     * 新しいpathを作る。
     */
    const newPath = [...selectedPath.slice(0, level), id];

    setSelectedPath(newPath);

    /**
     * 新しいpathを辿って、
     * 選択されたカテゴリを取得する。
     */
    let current = categories;
    let selected: Category | null = null;

    for (const pathId of newPath) {
      selected = current.find((category) => category.id === pathId) ?? null;

      if (!selected) {
        break;
      }

      current = selected.children ?? [];
    }

    if (selected && isLeaf(selected)) {
      setValue("categoryId", String(selected.id), {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue("categoryId", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const getSelectedNames = (): string[] => {
    const names: string[] = [];

    let current = categories;

    for (const id of selectedPath) {
      const found = current.find((category) => category.id === id);

      if (!found) {
        break;
      }

      names.push(found.name);

      current = found.children ?? [];
    }

    return names;
  };

  if (loading) {
    return <>Loading...</>;
  }

  const selectLevels = Array.from(
    {
      length: selectedPath.length + 1,
    },
    (_, index) => index,
  );

  return (
    <div>
      <div className="mb-2 text-xs text-gray-700">カテゴリー</div>

      {selectedPath.length > 0 && (
        <div className="mb-3 text-sm text-gray-600">
          {getSelectedNames().join(" > ")}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {selectLevels.map((level) => {
          const options = getOptionsAtLevel(level);

          if (!options.length) {
            return null;
          }

          return (
            <div key={level} className="relative w-64 gap-2">
              <select
                value={selectedPath[level] ?? ""}
                onChange={(e) => handleChange(level, e.target.value)}
                className="h-10 w-full appearance-none rounded-md border border-gray-300 bg-white p-3 pr-10 text-xs"
              >
                <option value="">選択してください</option>

                {options.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <RiArrowDownSLine
                className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
