import type { ApiError } from "@/types/error";

import { appToast } from "../toast/appToast";

export const handleError = (error: unknown) => {
  const apiError = error as ApiError;

  if (apiError.status === 422) {
    if (apiError.code === "validation_failed" && apiError.fields) {
      const message = Object.values(apiError.fields).flat()[0];

      appToast.error(message ?? apiError.message);
    } else {
      appToast.error(apiError.message);
    }

    return;
  }

  console.error(apiError);

  appToast.error(
    "エラーが発生しました。しばらくしてからもう一度お試しください。",
  );
};
