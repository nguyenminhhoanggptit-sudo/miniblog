import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";
import { useFetch } from "../hooks/useFetch";
import { getLocalPosts } from "../storage";
import Spinner from "../components/Spinner";
import { card, input } from "../ui";
import type { Post } from "../types";

export default function Home() {
  const { data, loading, error } = useFetch<Post[]>(`${API}/posts`);
  const [query, setQuery] = useState("");
  const localPosts = useMemo(getLocalPosts, []);

  const q = query.trim().toLowerCase();

  const posts = [...localPosts, ...(data ?? [])].filter((p) =>
    p.title.toLowerCase().includes(q),
  );

  return (
    <>
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
          Ra khơi cùng những con chữ
        </h1>
        <p className="mt-2 text-sky-700">
          Chọn một bài viết để đọc, hoặc tìm theo tiêu đề.
        </p>
      </section>

      <div className="mx-auto mb-8 max-w-xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Tìm bài viết theo tiêu đề..."
          aria-label="Tìm bài viết theo tiêu đề"
          className={`${input} shadow-md shadow-sky-100`}
        />
      </div>

      {loading && <Spinner />}
      {error && (
        <p className="mb-6 rounded-2xl bg-rose-50 p-4 text-center text-sm text-rose-700">
          Không tải được danh sách bài viết từ API ({error}). Hãy kiểm tra kết
          nối rồi tải lại trang.
        </p>
      )}
      {!loading && posts.length === 0 && (
        <p className="py-10 text-center text-sky-700">
          Không có bài viết nào khớp với “{query}”.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/posts/${p.id}`}
            className={`${card} flex flex-col gap-3 p-6 transition hover:-translate-y-1 hover:shadow-xl`}
          >
            {p.isLocal && (
              <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                Bài của bạn
              </span>
            )}
            <h2 className="line-clamp-2 text-lg font-bold capitalize text-sky-900">
              {p.title}
            </h2>
            <p className="line-clamp-3 text-sm text-slate-600">{p.body}</p>
            <span className="mt-auto text-sm font-semibold text-sky-600">
              Đọc tiếp
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
