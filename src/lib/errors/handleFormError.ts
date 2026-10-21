import type { FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import type { ApiError } from "@/types/error";

export const handleFormError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) => {
  const apiError = error as ApiError;

  if (apiError.status === 422) {
    if (apiError.code === "validation_failed") {
      Object.entries(apiError.fields ?? {}).forEach(([field, messages]) => {
        setError(field as Parameters<typeof setError>[0], {
          message: messages[0],
        });
      });
    } else {
      toast.error(apiError.message);
    }

    return;
  }

  toast.error("エラーが発生しました。しばらくしてからもう一度お試しください。");
};
