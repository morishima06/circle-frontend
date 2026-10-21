import { Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Customer } from "@/types/admin/customer";
import type { Order } from "@/types/admin/order";

import { useCSV } from "../order/hooks/useCSV";

type Props =
  | {
      type: "orders";
      selectedRecords: Order[];
      allRecords: Order[];
    }
  | {
      type: "customers";
      selectedRecords: Customer[];
      allRecords: Customer[];
    };

export const CSVExport = ({ type, selectedRecords, allRecords }: Props) => {
  const [confirm, setConfirm] = useState(false);

  const targets = selectedRecords.length > 0 ? selectedRecords : allRecords;

  const targetLabel =
    selectedRecords.length > 0
      ? `選択中の${selectedRecords.length}件`
      : `全${allRecords.length}件`;

  const { handleExport, loading } = useCSV({
    type,
    ids: targets.map((record) => record.id),
  });

  const handleExportClick = async () => {
    try {
      await handleExport();
      setConfirm(false);
    } catch {
      // エラー通知は useCSV 側で処理する
    }
  };

  return (
    <>
      <Button
        className="rounded-md bg-slate-800 p-3.5 text-sm text-white transition hover:bg-slate-700"
        variant="outline"
        size="sm"
        disabled={targets.length === 0}
        onClick={() => setConfirm(true)}
      >
        <Download className="h-3.5 w-3.5" />
        CSV出力
      </Button>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-1 text-base font-bold text-slate-800">
              CSVを出力しますか？
            </h3>

            <p className="mb-5 text-sm text-slate-500">対象：{targetLabel}</p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                disabled={loading}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                キャンセル
              </button>

              <button
                type="button"
                onClick={handleExportClick}
                disabled={loading || targets.length === 0}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? "出力中..." : "出力する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
