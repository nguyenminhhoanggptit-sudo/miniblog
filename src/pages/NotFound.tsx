import { Link } from "react-router-dom";
import { btn, card } from "../ui";

export default function NotFound() {
  return (
    <div className={`${card} mx-auto max-w-lg p-10 text-center`}>
      <div className="text-6xl">
        <span className="sway">🚢</span> 🛟
      </div>
      <h1 className="mt-4 text-5xl font-extrabold text-sky-800">404</h1>
      <p className="mt-2 text-lg font-semibold text-sky-900">
        Con tàu đã lạc khỏi hải trình
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Đường dẫn này không tồn tại.
      </p>
      <Link to="/" className={`${btn} mt-6`}>
        Quay về đất liền
      </Link>
    </div>
  );
}
