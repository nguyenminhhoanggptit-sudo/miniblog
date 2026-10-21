import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";

export function useFetch<T>(url: string | null) {
  const { showToast } = useToast();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(url !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        const msg = err.message || "Không thể kết nối mạng";
        setError(msg);
        setLoading(false);
        showToast(`Gọi API thất bại: ${msg}`, "error");
      });

    return () => ctrl.abort();
  }, [url, showToast]);

  return { data, loading, error };
}
