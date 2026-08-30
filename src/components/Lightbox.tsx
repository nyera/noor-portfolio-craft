import { useCallback, useEffect } from "react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  caption,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  caption?: string;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // RTL: right arrow moves forward visually to the previous item
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev, onClose]);

  if (!open || index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="معرض الصور بملء الشاشة"
      className="fixed inset-0 z-100 flex flex-col bg-ink/97 animate-fade-up"
    >
      <div className="flex items-center justify-between px-5 py-5 text-ink-foreground md:px-10">
        <p className="t-caption text-ink-foreground/70">
          {(index + 1).toLocaleString("ar-EG")} / {images.length.toLocaleString("ar-EG")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="border border-ink-foreground/30 px-4 py-2 text-xs tracking-[0.2em] transition-colors hover:bg-ink-foreground hover:text-ink"
        >
          إغلاق
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
        <img
          src={images[index]}
          alt={caption ?? "صورة من المعرض"}
          className="max-h-[76vh] w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pb-8 text-ink-foreground md:px-10">
        <button
          type="button"
          onClick={prev}
          className="btn btn-ghost-light px-6 py-3"
          aria-label="الصورة السابقة"
        >
          السابق
        </button>
        {caption ? <p className="t-caption text-ink-foreground/70">{caption}</p> : <span />}
        <button
          type="button"
          onClick={next}
          className="btn btn-ghost-light px-6 py-3"
          aria-label="الصورة التالية"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
