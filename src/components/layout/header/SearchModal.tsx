import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";

import { useDesignerSuggestions } from "@/features/designers/hooks/useDesignerSuggestions";
import type { Designer } from "@/types/designer";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  closeModal: () => void;
};

type SearchHistory = {
  label: string;
  href: string;
  type: "keyword" | "designer";
};

export const SearchModal = ({ inputRef, closeModal }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const router = useRouter();

  const { designers, isLoading, debouncedQuery } =
    useDesignerSuggestions(searchText);

  // 検索履歴をlocalStorageから読み込む
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

      if (Array.isArray(history)) {
        const validHistory = history.filter(
          (item): item is SearchHistory =>
            item !== null &&
            typeof item === "object" &&
            typeof item.label === "string" &&
            typeof item.href === "string" &&
            (item.type === "keyword" || item.type === "designer"),
        );

        setSearchHistory(validHistory);
      }
    } catch {
      setSearchHistory([]);
    }
  }, []);

  // 入力内容をクリア
  const clearInput = () => {
    setSearchText("");
    inputRef.current?.focus();
  };

  // キーワード検索ページへ移動
  const navigateToSearch = (keyword: string) => {
    void router.push({
      pathname: "/search",
      query: { q: keyword },
    });
  };

  // 検索履歴を保存
  const saveSearchHistory = (entry: SearchHistory) => {
    const filtered = searchHistory.filter((item) => item.href !== entry.href);

    const updatedHistory = [entry, ...filtered].slice(0, 10);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setSearchHistory(updatedHistory);
  };

  // 通常のキーワード検索
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = searchText.trim();

    if (!keyword) return;

    saveSearchHistory({
      label: keyword,
      href: `/search?q=${encodeURIComponent(keyword)}`,
      type: "keyword",
    });

    closeModal();
    navigateToSearch(keyword);
  };

  // 検索履歴をクリック
  const handleHistoryClick = (item: SearchHistory) => {
    closeModal();
    void router.push(item.href);
  };

  // デザイナー候補をクリック
  const handleDesignerClick = (designer: Designer) => {
    const href = `/men/designers/${designer.slug}`;

    saveSearchHistory({
      label: designer.name,
      href,
      type: "designer",
    });

    closeModal();
    void router.push(href);
  };

  const showHistory = searchText.trim().length < 2 && searchHistory.length > 0;

  const showSuggestions = searchText.trim().length >= 2;

  return (
    <div className="fixed inset-0 z-20 bg-black/30" onClick={closeModal}>
      <div className="bg-white px-8 py-6" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSearchSubmit}>
          {/* 閉じるボタン */}
          <div className="flex items-center justify-end pb-2">
            <button
              type="button"
              aria-label="検索を閉じる"
              onClick={closeModal}
              className="cursor-pointer"
            >
              <TfiClose size={20} />
            </button>
          </div>

          {/* 検索フォーム */}
          <div className="w-full">
            <div className="mt-4 flex items-center space-x-2 border-b border-black pb-2">
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
              <div className="mb-4 mt-8 text-xs font-semibold text-gray-500">
                検索履歴
              </div>

              <ul className="bg-white text-xs font-semibold">
                {searchHistory.map((item) => (
                  <li
                    key={`${item.type}-${item.href}`}
                    className="cursor-pointer py-2 hover:bg-gray-100 hover:underline"
                    onClick={() => handleHistoryClick(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* デザイナー検索候補 */}
          {showSuggestions && (
            <>
              {isLoading || debouncedQuery.trim().length < 2 ? (
                <div className="mt-6 text-xs text-gray-500">検索中...</div>
              ) : designers.length > 0 ? (
                <>
                  <div className="mb-2 mt-6 text-xs font-semibold text-gray-500">
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
                  <button
                    type="submit"
                    className="hover:text-black hover:underline"
                  >
                    ENTERキーをクリックして検索
                  </button>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};
