import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ToastType = "success" | "error";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
interface ToastCtx {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed right-4 top-4 z-50 flex max-w-sm flex-col gap-3"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
              t.type === "error" ? "bg-rose-600" : "bg-teal-600"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast phải nằm trong ToastProvider");
  return ctx;
}
