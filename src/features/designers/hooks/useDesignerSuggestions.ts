import { useEffect, useState } from "react";

import { searchDesignerSuggestions } from "@/api/designer";
import { useDebounce } from "@/hooks/useDebounce";
import type { Designer } from "@/types/designer";

export const useDesignerSuggestions = (query: string) => {
  const debouncedQuery = useDebounce(query, 300);

  const [designers, setDesigners] = useState<Designer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();

    if (normalizedQuery.length < 2) {
      setDesigners([]);
      setIsLoading(false);
      return;
    }

    const fetchDesigners = async () => {
      setIsLoading(true);

      const startTime = Date.now();

      try {
        const designers = await searchDesignerSuggestions(normalizedQuery);
        setDesigners(designers);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 400 - elapsed);

        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    };

    fetchDesigners();
  }, [debouncedQuery]);

  return {
    designers,
    isLoading,
    debouncedQuery,
  };
};
