import { toast as sonnerToast } from "sonner";

export const appToast = {
  success: (message: string) => {
    sonnerToast.custom(
      (t) => (
        <div className="pointer-events-auto flex min-w-64 translate-x-2 translate-y-10 items-center justify-between gap-4 rounded-sm bg-black px-3 py-3 text-xs text-white">
          <span>{message}</span>
          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      ),
      { id: "app-success" },
    );
  },

  error: (message: string) => {
    sonnerToast.custom(
      (t) => (
        <div className="pointer-events-auto flex min-w-64 translate-y-10 items-center justify-between gap-4 rounded-sm bg-black px-3 py-3 text-xs text-white">
          <span>{message}</span>
          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 8000 },
    );
  },
};
