import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-sky-700 text-white shadow" : "text-sky-900 hover:bg-sky-100"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Bạn đã đăng xuất");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-extrabold text-sky-800">
          🌊 MiniBlog
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            Viết bài
          </NavLink>
          {user ? (
            <>
              <span className="px-2 text-sm text-sky-700">
                Xin chào, <b>{user}</b>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-sky-300 px-4 py-2 text-sm font-medium text-sky-800 transition hover:bg-sky-50"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Đăng nhập
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
