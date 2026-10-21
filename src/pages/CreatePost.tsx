import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { addLocalPost } from "../storage";
import { btn, card, input } from "../ui";

type Field = "title" | "body";
type Errors = Partial<Record<Field, string>>;

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  const title = v.title.trim();
  const body = v.body.trim();
  if (!title) e.title = "Vui lòng nhập tiêu đề.";
  else if (title.length < 5) e.title = "Tiêu đề cần ít nhất 5 ký tự.";
  else if (title.length > 100) e.title = "Tiêu đề tối đa 100 ký tự.";
  if (!body) e.body = "Vui lòng nhập nội dung.";
  else if (body.length < 20) e.body = "Nội dung cần ít nhất 20 ký tự.";
  return e;
}

export default function CreatePost() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<Field, string>>({
    title: "",
    body: "",
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});

  const errors = validate(values);
  const show = (f: Field) => touched[f] && errors[f];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, body: true });
    if (Object.keys(errors).length > 0) {
      showToast("Vui lòng kiểm tra lại các trường bị lỗi", "error");
      return;
    }
    addLocalPost({
      title: values.title.trim(),
      body: values.body.trim(),
      author: user ?? "admin",
    });
    showToast("Đã đăng bài viết mới");
    navigate("/");
  };

  const bind = (f: Field) => ({
    value: values[f],
    onChange: (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [f]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": !!show(f),
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${card} mx-auto max-w-2xl space-y-5 p-8`}
    >
      <h1 className="text-2xl font-extrabold text-sky-900">Viết bài mới</h1>
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Tiêu đề
        </label>
        <input id="title" className={input} {...bind("title")} />
        {show("title") && (
          <p role="alert" className="mt-1 text-sm text-rose-600">
            {errors.title}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium">
          Nội dung
        </label>
        <textarea id="body" rows={8} className={input} {...bind("body")} />
        {show("body") && (
          <p role="alert" className="mt-1 text-sm text-rose-600">
            {errors.body}
          </p>
        )}
      </div>
      <button type="submit" className={btn}>
        Đăng bài
      </button>
    </form>
  );
}
