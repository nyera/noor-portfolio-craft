import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { projects } from "@/data/site";
import { Breadcrumbs, Reveal } from "@/components/primitives";
import { Lightbox } from "@/components/Lightbox";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug);
    if (index === -1) throw notFound();
    return {
      project: projects[index]!,
      prev: projects[(index - 1 + projects.length) % projects.length]!,
      next: projects[(index + 1) % projects.length]!,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "المشروع غير متاح" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} | أعمال استوديو نُور` },
        { name: "description", content: project.excerpt },
        { property: "og:title", content: `${project.title} — ${project.categoryAr}` },
        { property: "og:description", content: project.excerpt },
      ],
    };
  },
  component: SingleProject,
});

function SingleProject() {
  const { project, prev, next } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — ${project.categoryAr} في ${project.location}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/20" />
        <div className="shell relative flex h-full flex-col justify-end pb-16 pt-40 text-ink-foreground">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", to: "/" },
              { label: "الأعمال", to: "/portfolio" },
              { label: project.title },
            ]}
          />
          <h1 className="t-display mt-6">{project.title}</h1>
          <p className="mt-4 max-w-xl leading-9 text-ink-foreground/80">{project.excerpt}</p>
        </div>
      </section>

      <section className="border-b border-border py-8">
        <div className="shell grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["العميل", project.client],
            ["التصنيف", project.categoryAr],
            ["الموقع", project.location],
            ["السنة", project.year],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="t-caption">{k}</dt>
              <dd className="mt-1.5 text-sm">{v}</dd>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <h2 className="t-eyebrow lg:col-span-3">عن المشروع</h2>
          <p className="t-lead lg:col-span-8">{project.description}</p>
        </div>
      </section>

      {/* Editorial gallery */}
      <section className="pb-8">
        <div className="shell space-y-6">
          <Reveal>
            <button
              type="button"
              onClick={() => setLightbox(0)}
              className="img-zoom block w-full"
              aria-label="فتح الصورة بملء الشاشة"
            >
              <img
                src={project.gallery[0]}
                alt={`${project.title} — لقطة رئيسية`}
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 9" }}
              />
            </button>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.slice(1).map((src, i) => (
              <Reveal key={i} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  className="img-zoom block w-full"
                  aria-label={`فتح الصورة ${i + 2} بملء الشاشة`}
                >
                  <img
                    src={src}
                    alt={`${project.title} — صورة ${i + 2}`}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: i % 2 === 0 ? "4 / 5" : "3 / 4" }}
                  />
                </button>
              </Reveal>
            ))}
          </div>
          <p className="t-caption">
            جميع الصور مصوّرة بضوء طبيعي · {project.location} · {project.year}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
          <p className="t-caption">مشاركة المشروع</p>
          <ul className="flex gap-5 text-sm">
            {["إنستغرام", "واتساب", "إكس", "نسخ الرابط"].map((s) => (
              <li key={s}>
                <button type="button" className="link-underline">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell mt-8 flex items-center justify-between gap-6">
          <Link
            to="/portfolio/$slug"
            params={{ slug: prev.slug }}
            className="group text-start"
            rel="prev"
          >
            <span className="t-caption block">المشروع السابق</span>
            <span className="mt-1 block font-display text-xl transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            to="/portfolio/$slug"
            params={{ slug: next.slug }}
            className="group text-end"
            rel="next"
          >
            <span className="t-caption block">المشروع التالي</span>
            <span className="mt-1 block font-display text-xl transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell">
          <h2 className="t-h3 mb-10">مشاريع ذات صلة</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} ratio="4 / 5" />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/booking" className="btn btn-solid">
              احجز مشروعًا مشابهًا
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        images={project.gallery}
        index={lightbox}
        onIndexChange={setLightbox}
        onClose={() => setLightbox(null)}
        caption={`${project.title} — ${project.location}`}
      />
    </main>
  );
}
