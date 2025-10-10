import React, { useEffect, useState } from "react";

type Props = { slug: string };

const LikeButton: React.FC<Props> = ({ slug }) => {
  const [count, setCount] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const apiBase = (import.meta as any).env?.DEV
    ? ((import.meta as any).env?.VITE_API_BASE || "http://localhost:7071")
    : "";

  useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/api/blog-likes?slug=${encodeURIComponent(slug)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (!cancelled) setCount(Number(data?.count || 0)); })
      .catch(() => { if (!cancelled) setCount(0); });
    return () => { cancelled = true; };
  }, [slug]);

  function onLike() {
    if (pending) return;
    // simple client-side guard: only one like per session per slug
    const key = `liked:${slug}`;
    if (sessionStorage.getItem(key)) return;
    setPending(true);
    fetch(`${apiBase}/api/blog-likes?slug=${encodeURIComponent(slug)}`, { method: "POST" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setCount(Number(data?.count || 0));
        sessionStorage.setItem(key, "1");
      })
      .catch(() => {})
      .finally(() => setPending(false));
  }

  return (
    <button
      type="button"
      onClick={onLike}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:border-teal-500 disabled:opacity-60"
      aria-label="Like"
    >
      <span>👍</span>
      <span>{count ?? "…"}</span>
    </button>
  );
};

export default LikeButton;
