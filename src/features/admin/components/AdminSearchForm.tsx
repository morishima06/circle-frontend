import type { FormEvent, ReactNode } from "react";

type AdminSearchFormProps = {
  keyword: string;
  keywordLabel: string;
  keywordPlaceholder: string;
  onChangeKeyword: (value: string) => void;
  onSubmit: () => void;
  children?: ReactNode;
};

export const AdminSearchForm = ({
  keyword,
  keywordLabel,
  keywordPlaceholder,
  onChangeKeyword,
  onSubmit,
  children,
}: AdminSearchFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {keywordLabel}
          </label>

          <input
            type="text"
            value={keyword}
            onChange={(event) => onChangeKeyword(event.target.value)}
            placeholder={keywordPlaceholder}
            className="w-full rounded-md border bg-white px-3 py-2 text-sm"
          />
        </div>

        {children}

        <div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-500"
          >
            検索
          </button>
        </div>
      </div>
    </form>
  );
};
