import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { btn, card, input } from "../ui";

export default function Login() {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username.trim(), password)) {
      showToast("Đăng nhập thành công");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${card} mx-auto max-w-md space-y-5 p-8`}
    >
      <h1 className="text-2xl font-extrabold text-sky-900">Đăng nhập</h1>
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium">
          Tên đăng nhập
        </label>
        <input
          id="username"
          className={input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          className={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
      <button type="submit" className={`${btn} w-full`}>
        Đăng nhập
      </button>
    </form>
  );
}
