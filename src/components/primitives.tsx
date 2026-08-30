import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="t-eyebrow">{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`mb-12 flex flex-col gap-6 md:mb-16 ${
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="t-h2 mt-4">{title}</h2>
        {lead ? <p className="t-lead mt-5">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("ar-EG")}
      {suffix}
    </span>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="مسار التنقّل" className="t-caption">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <Link
                to={item.to}
                params={item.params as never}
                className="link-underline hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumbs: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <header className="border-b border-border pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />
        <p className="t-eyebrow mt-8">{eyebrow}</p>
        <h1 className="t-h1 mt-4 max-w-4xl">{title}</h1>
        {lead ? <p className="t-lead mt-6 max-w-2xl">{lead}</p> : null}
      </div>
    </header>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-start text-base font-medium transition-colors hover:text-accent"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`text-xl leading-none transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-500"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="t-lead pb-7 max-w-3xl">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border px-3 py-1 text-[0.72rem] tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

export function Rating({ value }: { value: number }) {
  return (
    <p className="text-accent" aria-label={`${value} من ٥`}>
      <span aria-hidden="true">{"★".repeat(value)}</span>
    </p>
  );
}

export function Pagination({ current = 1, total = 4 }: { current?: number; total?: number }) {
  return (
    <nav aria-label="ترقيم الصفحات" className="mt-16 flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === current ? "page" : undefined}
          className={`size-11 border text-sm transition-colors ${
            n === current
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:border-foreground"
          }`}
        >
          {n.toLocaleString("ar-EG")}
        </button>
      ))}
      <button type="button" className="btn btn-outline mr-3 px-5 py-2.5 text-xs">
        التالي
      </button>
    </nav>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-border px-8 py-20 text-center">
      <span aria-hidden="true" className="mx-auto mb-6 block size-3 rotate-45 border border-accent" />
      <h3 className="t-h3">{title}</h3>
      <p className="t-lead mx-auto mt-4 max-w-md">{body}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}

export function SkeletonCard({ ratio = "4 / 5" }: { ratio?: string }) {
  return <div className="skeleton w-full" style={{ aspectRatio: ratio }} />;
}
