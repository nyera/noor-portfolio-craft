import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, projects } from "@/data/site";
import { EmptyState, PageHeader, Pagination, Reveal } from "@/components/primitives";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "الأعمال | استوديو نُور للتصوير" },
      {
        name: "description",
        content:
          "أرشيف أعمال استوديو نُور: مشاريع أعراس وبورتريه وأزياء وتصوير تجاري ومنتجات ومناسبات.",
      },
      { property: "og:title", content: "أرشيف الأعمال — استوديو نُور" },
      { property: "og:description", content: "مشاريع تصوير مختارة بتصنيفات متعددة." },
    ],
  }),
  component: PortfolioArchive,
});

type Layout = "masonry" | "grid" | "full";

function PortfolioArchive() {
  const [filter, setFilter] = useState("all");
  const [layout, setLayout] = useState<Layout>("masonry");
  const [query, setQuery] = useState("");

  const visible = projects.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      (query.trim() === "" || p.title.includes(query.trim()) || p.excerpt.includes(query.trim())),
  );

  return (
    <main>
      <PageHeader
        eyebrow="الأعمال"
        title="أرشيف المشاريع"
        lead="ستة تصنيفات، وعشرات المشاريع الموثّقة منذ ٢٠١٣. استخدم التصفية أو البحث للوصول إلى ما يهمك."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "الأعمال" }]}
      />

      <div className="sticky top-[64px] z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب التصنيف">
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`px-4 py-2 text-sm transition-colors ${
                filter === "all" ? "text-foreground underline underline-offset-8" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              الكل
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setFilter(c.slug)}
                aria-pressed={filter === c.slug}
                className={`px-4 py-2 text-sm transition-colors ${
                  filter === c.slug
                    ? "text-foreground underline underline-offset-8"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.ar}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="portfolio-search" className="sr-only">
              ابحث في الأعمال
            </label>
            <input
              id="portfolio-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث…"
              className="field w-36 text-sm"
            />
            <div className="flex gap-1" role="group" aria-label="نمط العرض">
              {(
                [
                  ["masonry", "متدرّج"],
                  ["grid", "شبكة"],
                  ["full", "عرض كامل"],
                ] as [Layout, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLayout(key)}
                  aria-pressed={layout === key}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    layout === key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          {visible.length === 0 ? (
            <EmptyState
              title="لا توجد مشاريع في هذا التصنيف بعد"
              body="جرّب تصنيفًا آخر أو امسح كلمة البحث لعرض كل الأعمال."
              action={
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setFilter("all");
                    setQuery("");
                  }}
                >
                  عرض كل الأعمال
                </button>
              }
            />
          ) : layout === "masonry" ? (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
              {visible.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ProjectCard project={p} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          ) : layout === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ProjectCard project={p} ratio="4 / 5" priority={i < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {visible.map((p, i) => (
                <Reveal key={p.slug}>
                  <ProjectCard project={p} ratio="21 / 9" priority={i < 1} />
                </Reveal>
              ))}
            </div>
          )}

          {visible.length > 0 ? (
            <>
              <div className="mt-16 text-center">
                <button type="button" className="btn btn-outline">
                  تحميل المزيد
                </button>
              </div>
              <Pagination current={1} total={4} />
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
