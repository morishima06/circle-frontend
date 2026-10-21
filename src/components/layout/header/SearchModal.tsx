// src/components/layout/Header/SearchModal.tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

import { useDesignerSuggestions } from "@/features/designers/hooks/useDesignerSuggestions";
import type { Designer } from "@/types/designer";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  closeModal: () => void;
};

export const SearchModal = ({ inputRef, closeModal }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchHistory, setSearchHistory] = useState<{ keyword: string }[]>([]);

  const router = useRouter();

  const { designers, isLoading, debouncedQuery } =
    useDesignerSuggestions(searchText);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    setSearchHistory(history);
  }, []);

  const clearInput = () => {
    setSearchText("");
    inputRef.current?.focus();
  };

  const navigateToSearch = (keyword: string) => {
    const encoded = encodeURIComponent(keyword);

    router.push(`/${selectedCategory}?q=${encoded}`);
  };

  const saveSearchHistory = (keyword: string) => {
    const newEntry = { keyword };

    const filtered = searchHistory.filter((item) => item.keyword !== keyword);

    const updatedHistory = [newEntry, ...filtered].slice(0, 10);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setSearchHistory(updatedHistory);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const keyword = searchText.trim();

    if (!keyword) return;

    saveSearchHistory(keyword);
    closeModal();
    navigateToSearch(keyword);
  };

  const handleHistoryClick = (keyword: string) => {
    closeModal();
    navigateToSearch(keyword);
  };

  const handleDesignerClick = (designer: Designer) => {
    saveSearchHistory(designer.name);
    closeModal();
    navigateToSearch(designer.name);
  };

  const showHistory = searchText.length < 2 && searchHistory.length > 0;

  const showSuggestions = searchText.length >= 2;

  return (
    <div className="fixed inset-0 z-20 bg-black/30" onClick={closeModal}>
      <div className="bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSearchSubmit}>
          {/* カテゴリー選択 + 閉じる */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex space-x-4">
              {["men", "men/new-arrivals", "men/sale"].map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`text-sm ${
                    selectedCategory === category
                      ? "font-bold underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.split("/").pop()?.toUpperCase()}
                </button>
              ))}
            </div>

            <IoMdClose
              size={20}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </div>
          {/* 検索フォーム */}
          <div className="mt-4 w-full">
            <div className="flex items-center space-x-2 border-b border-black pb-1">
              <IoSearchOutline size={18} />

              <input
                ref={inputRef}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="ブランド,商品名を検索"
                className="h-8 flex-1 text-sm outline-none"
              />

              {searchText && (
                <button
                  type="button"
                  className="text-sm text-gray-600"
                  onClick={clearInput}
                >
                  clear
                </button>
              )}
            </div>
          </div>
          {/* 検索履歴 */}
          {showHistory && (
            <>
              <div className="mt-6 mb-2 text-xs font-semibold text-gray-500">
                検索履歴
              </div>

              <ul className="bg-white text-xs font-semibold">
                {searchHistory.map((item) => (
                  <li
                    key={item.keyword}
                    className="cursor-pointer py-1.5 hover:bg-gray-100 hover:underline"
                    onClick={() => handleHistoryClick(item.keyword)}
                  >
                    {item.keyword}
                  </li>
                ))}
              </ul>
            </>
          )}
          {/* Designer検索候補 */}
          {showSuggestions && (
            <>
              {isLoading || debouncedQuery.trim().length < 2 ? (
                <div className="mt-6 text-xs text-gray-500">検索中...</div>
              ) : designers.length > 0 ? (
                <>
                  <div className="mt-6 mb-2 text-xs font-semibold text-gray-500">
                    検索候補
                  </div>

                  <ul className="bg-white text-xs font-semibold">
                    {designers.map((designer) => (
                      <li
                        key={designer.id}
                        className="cursor-pointer py-2 hover:bg-gray-100 hover:underline"
                        onClick={() => handleDesignerClick(designer)}
                      >
                        {designer.name}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="mt-6 text-xs text-gray-500">
                  該当する検索候補はありません
                </div>
              )}
            </>
          )}{" "}
        </form>
      </div>
    </div>
  );
};
