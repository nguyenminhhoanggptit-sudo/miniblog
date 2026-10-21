import { Link, useParams } from "react-router-dom";
import { API } from "../api";
import { useFetch } from "../hooks/useFetch";
import { getLocalPosts } from "../storage";
import Spinner from "../components/Spinner";
import { card } from "../ui";
import type { Comment, Post } from "../types";

export default function PostDetail() {
  const { id = "" } = useParams();
  const isLocal = id.startsWith("local-");
  const localPost = isLocal
    ? getLocalPosts().find((p) => p.id === id)
    : undefined;

  const {
    data: apiPost,
    loading,
    error,
  } = useFetch<Post>(isLocal ? null : `${API}/posts/${id}`);
  const {
    data: comments,
    loading: cLoading,
    error: cError,
  } = useFetch<Comment[]>(isLocal ? null : `${API}/posts/${id}/comments`);
  const post = isLocal ? localPost : apiPost;

  const back = (
    <Link
      to="/"
      className="mb-6 inline-block text-sm font-semibold text-sky-600"
    >
      ← Về trang chủ
    </Link>
  );

  if (loading) return <Spinner />;
  if (error || !post) {
    return (
      <>
        {back}
        <p className="rounded-2xl bg-rose-50 p-6 text-rose-700">
          Không tìm thấy bài viết{error ? ` (${error})` : ""}.
        </p>
      </>
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      {back}
      <div className={`${card} p-8`}>
        <h1 className="text-2xl font-extrabold capitalize text-sky-900 sm:text-3xl">
          {post.title}
        </h1>
        <p className="mt-1 text-sm text-sky-600">
          {isLocal
            ? `Tác giả: ${post.author} · ${new Date(post.createdAt!).toLocaleString("vi-VN")}`
            : `Tác giả #${post.userId}`}
        </p>
        <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
          {post.body}
        </p>
      </div>

      {!isLocal && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-sky-900">
            Bình luận {comments && `(${comments.length})`}
          </h2>
          {cLoading && <Spinner label="Đang tải bình luận..." />}
          {cError && (
            <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
              Không tải được bình luận: {cError}
            </p>
          )}
          <ul className="space-y-4">
            {comments?.map((c) => (
              <li key={c.id} className={`${card} flex gap-4 p-5`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold uppercase text-sky-700">
                  {c.name[0]}
                </div>
                <div>
                  <p className="font-semibold capitalize text-sky-900">
                    {c.name}
                  </p>
                  <p className="text-xs text-sky-500">{c.email}</p>
                  <p className="mt-2 text-sm text-slate-600">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
