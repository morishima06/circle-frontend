import { toast } from "sonner";

export const CartToast = {
  success: (message: string) => {
    toast.custom(
      () => (
        <div className="bg-black py-3 pr-4 pl-6 text-sm text-white">
          {message}
        </div>
      ),
      { id: "cart-toast" },
    );
  },
  error: (message: string) => {
    toast.custom(
      (t) => (
        <div className="pointer-events-auto flex min-w-64 translate-y-10 items-center justify-between gap-4 bg-black px-6 py-3 text-xs text-white">
          <span>{message}</span>
          <button
            onClick={() => toast.dismiss(t)}
            className="shrink-0 text-white/60 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 8000 },
    );
  },
};
