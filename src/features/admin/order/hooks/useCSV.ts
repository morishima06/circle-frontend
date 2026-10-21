import { useState } from "react";

import { exportCustomersCSV, exportOrdersCSV } from "@/api/admin/csv";
import { downloadCSV } from "@/lib/downloadCSV";

type CSVType = "orders" | "customers";

type Props = {
  type: CSVType;
  ids: number[];
};

export const useCSV = ({ type, ids }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const response =
        type === "orders"
          ? await exportOrdersCSV(ids)
          : await exportCustomersCSV(ids);

      const date = new Date().toISOString().slice(0, 10);
      downloadCSV(response.data, `${type}_${date}.csv`);
    } finally {
      setLoading(false);
    }
  };

  return { handleExport, loading };
};
