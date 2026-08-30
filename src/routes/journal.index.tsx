import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { posts } from "@/data/site";
import { EmptyState, PageHeader, Pagination, Reveal } from "@/components/primitives";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "المدوّنة | استوديو نُور" },
      {
        name: "description",
        content: "مقالات عن الإضاءة والتصوير وتخطيط جلسات الأعراس والبورتريه من استوديو نُور.",
      },
      { property: "og:title", content: "مدوّنة نُور — عن الضوء والصورة" },
      { property: "og:description", content: "مقالات عملية في التصوير الفوتوغرافي." },
    ],
  }),
  component: JournalArchive,
});

const cats = ["الكل", "إضاءة", "أعراس", "بورتريه", "أرشيف"];

function JournalArchive() {
  const [cat, setCat] = useState("الكل");
  const list = cat === "الكل" ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = list;

  return (
    <main>
      <PageHeader
        eyebrow="المدوّنة"
        title="عن الضوء والصورة"
        lead="ملاحظات عملية من داخل الاستوديو: الإضاءة، التخطيط، الأرشفة، واختيار المصوّر."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "المدوّنة" }]}
      />

      <section className="section">
        <div className="shell">
          <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="تصنيفات المقالات">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`border px-5 py-2 text-sm transition-colors ${
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <EmptyState
              title="لا توجد مقالات في هذا التصنيف"
              body="نضيف مقالًا جديدًا كل شهر. اختر تصنيفًا آخر في هذه الأثناء."
              action={
                <button type="button" className="btn btn-outline" onClick={() => setCat("الكل")}>
                  عرض كل المقالات
                </button>
              }
            />
          ) : (
            <>
              <Reveal>
                <article className="group grid gap-10 border-b border-border pb-16 lg:grid-cols-2">
                  <Link to="/journal/$slug" params={{ slug: featured.slug }} className="img-zoom">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full object-cover"
                      style={{ aspectRatio: "4 / 3" }}
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <p className="t-eyebrow">مقال مميّز</p>
                    <h2 className="t-h2 mt-4">
                      <Link
                        to="/journal/$slug"
                        params={{ slug: featured.slug }}
                        className="transition-colors group-hover:text-accent"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="t-lead mt-5">{featured.excerpt}</p>
                    <p className="t-caption mt-6">
                      {featured.author} · {featured.date} · {featured.readingTime}
                    </p>
                  </div>
                </article>
              </Reveal>

              <div className="mt-16 grid gap-12 md:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 90}>
                    <article className="group">
                      <Link to="/journal/$slug" params={{ slug: p.slug }}>
                        <div className="img-zoom">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full object-cover"
                            style={{ aspectRatio: "3 / 2" }}
                          />
                        </div>
                        <p className="t-caption mt-5">
                          {p.category} · {p.date} · {p.readingTime}
                        </p>
                        <h3 className="mt-3 font-display text-xl transition-colors group-hover:text-accent">
                          {p.title}
                        </h3>
                        <p className="t-lead mt-3 text-sm">{p.excerpt}</p>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Pagination current={1} total={3} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
