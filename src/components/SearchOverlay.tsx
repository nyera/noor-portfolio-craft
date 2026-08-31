import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { projects, services } from "@/data/site";

type Result = { title: string; type: string; to: string; params?: Record<string, string> };

const index: Result[] = [
  ...projects.map((p) => ({
    title: p.title,
    type: "مشروع",
    to: "/portfolio/$slug",
    params: { slug: p.slug },
  })),
  ...services.map((s) => ({
    title: s.title,
    type: "خدمة",
    to: "/services/$slug",
    params: { slug: s.slug },
  })),
  { title: "عن الاستوديو", type: "صفحة", to: "/about" },
  { title: "الباقات والأسعار", type: "صفحة", to: "/pricing" },
  { title: "تواصل معنا", type: "صفحة", to: "/contact" },
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(
    () => (q.trim() ? index.filter((r) => r.title.includes(q.trim())) : []),
    [q],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="البحث في الموقع"
      className="fixed inset-0 z-100 bg-background/98 backdrop-blur-sm animate-fade-up"
    >
      <div className="shell pt-10">
        <div className="flex items-center justify-between">
          <p className="t-eyebrow">البحث</p>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline px-5 py-2.5 text-xs"
            aria-label="إغلاق البحث"
          >
            إغلاق
          </button>
        </div>

        <label htmlFor="site-search" className="sr-only">
          ابحث في الأعمال والخدمات
        </label>
        <input
          id="site-search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن مشروع أو خدمة…"
          className="field mt-10 border-b-2 pb-6 font-display text-3xl md:text-5xl"
        />

        <div className="mt-10 max-h-[55vh] overflow-y-auto pb-16">
          {q.trim() === "" ? (
            <div>
              <p className="t-caption">اقتراحات سريعة</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {["أعراس", "بورتريه", "الباقات", "تواصل"].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQ(s)}
                      className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length === 0 ? (
            <div className="border border-dashed border-border px-6 py-16 text-center">
              <h2 className="t-h3">لا توجد نتائج مطابقة</h2>
              <p className="t-lead mt-3">
                جرّب كلمات أقل تحديدًا، أو تصفّح الأعمال والخدمات مباشرة.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-t border-border">
              {results.map((r) => (
                <li key={`${r.type}-${r.title}`}>
                  <Link
                    to={r.to}
                    params={r.params as never}
                    onClick={onClose}
                    className="flex items-center justify-between gap-6 py-5 transition-colors hover:text-accent"
                  >
                    <span className="font-display text-xl">{r.title}</span>
                    <span className="t-caption">{r.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
