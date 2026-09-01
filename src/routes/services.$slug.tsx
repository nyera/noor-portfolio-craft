import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, services, testimonials } from "@/data/site";
import { Accordion, Breadcrumbs, Reveal } from "@/components/primitives";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "الخدمة غير متاحة" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} | استوديو نُور` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.title} — استوديو نُور` },
        { property: "og:description", content: service.short },
      ],
    };
  },
  component: SingleService,
});

function SingleService() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const gallery = projects.slice(0, 4);

  return (
    <main>
      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src={service.image}
          alt={`${service.title} — استوديو نُور`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="shell relative flex min-h-[70vh] flex-col justify-end pb-16 pt-40 text-ink-foreground">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", to: "/" },
              { label: "الخدمات", to: "/services" },
              { label: service.title },
            ]}
          />
          <h1 className="t-h1 mt-6 max-w-3xl">{service.title}</h1>
          <p className="mt-5 max-w-xl leading-9 text-ink-foreground/80">{service.short}</p>
          <p className="t-eyebrow mt-8 text-ink-foreground/60">{service.price}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2">عن الخدمة</h2>
            <p className="t-lead mt-6">{service.description}</p>

            <h3 className="t-h3 mt-12">المزايا</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-border pb-4 text-sm">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-border p-8">
              <p className="t-eyebrow">ما الذي يشمله؟</p>
              <ul className="mt-6 space-y-3 text-sm">
                {service.includes.map((f) => (
                  <li key={f} className="border-b border-border pb-3">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-display text-2xl">{service.price}</p>
              <Link to="/booking" className="btn btn-solid mt-6 w-full">
                احجز هذه الخدمة
              </Link>
              <Link to="/pricing" className="btn btn-outline mt-3 w-full">
                مقارنة الباقات
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <h2 className="t-h3 mb-8">نماذج من الأعمال</h2>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {gallery.map((p) => (
              <li key={p.slug} className="img-zoom">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.categoryAr}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">أسئلة متكررة</h2>
            <div className="mt-8">
              <Accordion items={service.faq} />
            </div>
          </div>
          <div>
            <h2 className="t-h2">رأي عميل</h2>
            <figure className="mt-8">
              <blockquote className="font-display text-2xl leading-[2]">
                «{testimonials[0]!.quote}»
              </blockquote>
              <figcaption className="t-caption mt-6">
                {testimonials[0]!.name} — {testimonials[0]!.role}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="t-h3 mb-8">خدمات ذات صلة</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {related.map((s) => (
              <Reveal key={s.slug} as="li">
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group block">
                  <div className="img-zoom">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl transition-colors group-hover:text-accent">
                    {s.title}
                  </h3>
                  <p className="t-caption mt-2">{s.price}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
