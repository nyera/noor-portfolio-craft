import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  brand,
  categories,
  images,
  posts,
  projects,
  services,
  stats,
  testimonials,
} from "@/data/site";
import { Counter, Reveal, SectionHead, Rating } from "@/components/primitives";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نُور | استوديو تصوير فوتوغرافي في الرياض" },
      {
        name: "description",
        content:
          "استوديو نُور: تصوير أعراس وبورتريه وأزياء وتصوير تجاري بلغة بصرية هادئة. شاهد الأعمال واحجز جلستك.",
      },
      { property: "og:title", content: "نُور | استوديو تصوير فوتوغرافي" },
      {
        property: "og:description",
        content: "صور تُحفظ: أعراس، بورتريه، أزياء، وتصوير تجاري من استوديو نُور.",
      },
    ],
  }),
  component: Home,
});

const instagram = [
  images.heroWedding,
  images.portrait1,
  images.fashion1,
  images.product1,
  images.event1,
  images.commercial1,
  images.detail1,
  images.photographer,
];

function Home() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const [featured, ...rest] = posts;

  return (
    <main>
      {/* HERO */}
      <section className="grain relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={images.heroWedding}
          alt="عروس ترتدي فستانًا حريريًا تسير في رواق حجري مضاء بضوء العصر"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/45" />

        <div className="shell relative w-full pb-20 pt-40 text-white md:pb-28">
          <p className="t-eyebrow animate-fade-up text-white/70">استوديو نُور · الرياض</p>
          <h1
            className="t-display mt-6 max-w-4xl animate-fade-up text-balance"
            style={{ animationDelay: "120ms" }}
          >
            صورٌ تبقى بعد أن يمضي الضوء
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-base leading-9 text-white/80"
            style={{ animationDelay: "240ms" }}
          >
            {brand.descriptionAr}
          </p>
          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <Link to="/portfolio" className="btn btn-solid-light">
              شاهد الأعمال
            </Link>
            <Link to="/booking" className="btn btn-ghost-light">
              احجز جلستك
            </Link>
          </div>

          <div className="mt-16 flex items-end justify-between border-t border-white/20 pt-6">
            <p className="text-[0.7rem] tracking-[0.3em] text-white/60">تصفّح للأسفل</p>
            <p className="text-[0.7rem] tracking-[0.2em] text-white/60">
              ليلٌ ونُور · الرياض ٢٠٢٥
            </p>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section border-b border-border">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="t-eyebrow">فلسفتنا</p>
          </Reveal>
          <Reveal className="md:col-span-7" delay={80}>
            <p className="t-h3 leading-[1.9]">
              لا نطارد اللحظة، ننتظرها. نصوّر بضوء موجود أصلًا في المكان، ونترك للصورة مساحة كي
              تتنفّس — لأن أجمل ما في الصورة هو ما لم يُقَل فيها.
            </p>
            <Link to="/about" className="link-underline mt-8 inline-block text-sm tracking-[0.14em]">
              تعرّف على الاستوديو
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="أعمال مختارة"
            title="مشاريع من الأرشيف"
            lead="مجموعة من أحدث المشاريع في الأعراس والبورتريه والأزياء والتصوير التجاري."
            action={
              <Link to="/portfolio" className="btn btn-outline shrink-0">
                كل الأعمال
              </Link>
            }
          />

          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="تصفية حسب التصنيف">
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`border px-5 py-2 text-sm transition-colors ${
                filter === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
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
                className={`border px-5 py-2 text-sm transition-colors ${
                  filter === c.slug
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {c.ar}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProjectCard project={p} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section bg-surface text-surface-foreground">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <img
              src={images.photographer}
              alt="خالد النُّعمان، المصوّر المؤسس لاستوديو نُور، يحمل كاميرا تناظرية"
              loading="lazy"
              width={1024}
              height={1376}
              className="w-full object-cover"
              style={{ aspectRatio: "3 / 4" }}
            />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
            <p className="t-eyebrow">عن المصوّر</p>
            <h2 className="t-h2 mt-4">خالد النُّعمان</h2>
            <p className="t-lead mt-6">
              مصوّر فوتوغرافي منذ اثني عشر عامًا، بدأ من التصوير الوثائقي ثم انتقل إلى الأعراس
              والبورتريه. يؤمن أن الصورة الجيدة تبدأ من علاقة هادئة مع من أمام العدسة، لا من العدسة
              نفسها.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <dt className="t-caption">الخبرة</dt>
                <dd className="mt-2 font-display text-2xl">١٢ سنة</dd>
              </div>
              <div>
                <dt className="t-caption">التكريمات</dt>
                <dd className="mt-2 font-display text-2xl">٩ جوائز</dd>
              </div>
            </dl>
            <Link to="/about" className="btn btn-outline mt-10">
              السيرة الكاملة
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="الخدمات"
            title="ما الذي نصوّره؟"
            lead="ست خدمات أساسية، كل واحدة بإعداد وفريق وتسليم مختلف."
          />
          <ul className="divide-y divide-border border-y border-border">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group grid items-center gap-6 py-8 md:grid-cols-12"
                >
                  <span className="t-caption md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl transition-colors group-hover:text-accent md:col-span-4">
                    {s.title}
                  </h3>
                  <p className="t-lead text-sm md:col-span-4">{s.short}</p>
                  <span className="t-caption md:col-span-2">{s.price}</span>
                  <span className="hidden justify-self-end overflow-hidden md:col-span-1 md:block">
                    <img
                      src={s.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="size-16 object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-ink py-20 text-ink-foreground">
        <div className="shell grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-display text-4xl md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="t-caption mt-3 text-ink-foreground/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="آراء العملاء" title="ماذا قالوا عن التجربة؟" align="center" />
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="flex h-full flex-col">
                  <Rating value={t.rating} />
                  <blockquote className="mt-5 flex-1 font-display text-xl leading-[2]">
                    «{t.quote}»
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="size-12 object-cover grayscale"
                    />
                    <span>
                      <span className="block text-sm font-medium">{t.name}</span>
                      <span className="t-caption">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="border-t border-border pt-16 pb-20">
        <div className="shell mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="t-eyebrow">إنستغرام</p>
            <h2 className="t-h3 mt-3">@noor.studio</h2>
          </div>
          <a href="#" className="link-underline text-sm tracking-[0.14em]">
            تابعنا
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-1.5 px-1.5 sm:grid-cols-4 lg:grid-cols-8">
          {instagram.map((src, i) => (
            <li key={i} className="img-zoom group relative">
              <a href="#" aria-label={`صورة إنستغرام رقم ${i + 1}`}>
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* JOURNAL */}
      <section className="section bg-surface text-surface-foreground">
        <div className="shell">
          <SectionHead
            eyebrow="المدوّنة"
            title="مقالات عن الضوء والصورة"
            action={
              <Link to="/journal" className="btn btn-outline shrink-0">
                كل المقالات
              </Link>
            }
          />
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <article className="group">
                <Link to="/journal/$slug" params={{ slug: featured.slug }}>
                  <div className="img-zoom">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ aspectRatio: "16 / 10" }}
                    />
                  </div>
                  <p className="t-caption mt-6">
                    {featured.category} · {featured.date} · {featured.readingTime}
                  </p>
                  <h3 className="t-h3 mt-3 transition-colors group-hover:text-accent">
                    {featured.title}
                  </h3>
                  <p className="t-lead mt-3">{featured.excerpt}</p>
                </Link>
              </article>
            </Reveal>

            <ul className="divide-y divide-border border-t border-border">
              {rest.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center gap-6 py-7"
                  >
                    <img
                      src={p.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="size-24 shrink-0 object-cover"
                    />
                    <span>
                      <span className="t-caption block">
                        {p.category} · {p.readingTime}
                      </span>
                      <span className="mt-2 block font-display text-xl transition-colors group-hover:text-accent">
                        {p.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <img
          src={images.detail1}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="shell relative py-28 text-center text-ink-foreground md:py-40">
          <p className="t-eyebrow text-ink-foreground/60">لنبدأ</p>
          <h2 className="t-h1 mx-auto mt-6 max-w-3xl text-balance">
            لنصنع صورًا تستحق أن تُحفظ.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn btn-solid-light">
              احجز موعد التصوير
            </Link>
            <Link to="/contact" className="btn btn-ghost-light">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
