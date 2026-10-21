export default function Spinner({
  label = "Đang ra khơi...",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 py-16 text-sky-700"
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-sky-100 border-t-sky-500" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl">
          🌊
        </span>
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
