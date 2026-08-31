import { createFileRoute, Link } from "@tanstack/react-router";
import { packages, services } from "@/data/site";
import { Accordion, PageHeader, Reveal, SectionHead } from "@/components/primitives";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الباقات والأسعار | استوديو نُور" },
      {
        name: "description",
        content:
          "باقات تصوير واضحة الأسعار للأعراس والبورتريه والتصوير التجاري، مع تفاصيل ما تشمله كل باقة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "الباقات والأسعار — استوديو نُور" },
      {
        property: "og:description",
        content: "أسعار شفافة لكل خدمات التصوير في استوديو نُور.",
      },
    ],
  }),
  component: PricingPage,
});

const comparison = [
  { label: "ساعات التغطية", a: "٦ ساعات", b: "١٠ ساعات", c: "يومان" },
  { label: "عدد المصوّرين", a: "١", b: "٢", c: "٣" },
  { label: "الصور المعالَجة", a: "٣٠٠", b: "٦٠٠", c: "١٠٠٠+" },
  { label: "ألبوم مطبوع", a: "—", b: "٣٠×٣٠", c: "ألبومان" },
  { label: "فيلم قصير", a: "—", b: "٣ دقائق", c: "٥ دقائق" },
  { label: "مدة التسليم", a: "١٤ يومًا", b: "٢١ يومًا", c: "٣٠ يومًا" },
];

const faqs = [
  { q: "كيف يتم تثبيت الموعد؟", a: "عربون ٣٠٪ غير مسترد يثبّت التاريخ في التقويم، والمبلغ المتبقي يُسدَّد قبل موعد التصوير بأسبوع." },
  { q: "هل الأسعار شاملة الضريبة؟", a: "الأسعار المعروضة قبل ضريبة القيمة المضافة، وتُضاف في الفاتورة النهائية." },
  { q: "هل يمكن تخصيص باقة؟", a: "نعم، نبني باقة خاصة حسب عدد الساعات والمواقع ومخرجات التسليم المطلوبة." },
  { q: "ماذا لو تأجّلت المناسبة؟", a: "يمكن نقل العربون لتاريخ آخر خلال ١٢ شهرًا مرة واحدة دون رسوم إضافية." },
];

function PricingPage() {
  return (
    <main>
      <PageHeader
        eyebrow="الباقات"
        title="أسعار واضحة، دون مفاجآت"
        lead="اختر الباقة الأقرب لاحتياجك، أو اطلب باقة مخصّصة تُبنى حول مناسبتك."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "الباقات" }]}
      />

      <section className="section">
        <div className="shell grid gap-8 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <article
                className={`flex h-full flex-col border p-9 ${
                  p.highlight
                    ? "border-foreground bg-ink text-ink-foreground"
                    : "border-border"
                }`}
              >
                <p
                  className={`t-eyebrow ${p.highlight ? "text-ink-foreground/60" : ""}`}
                >
                  {p.note}
                </p>
                <h2 className="t-h3 mt-4">{p.name}</h2>
                <p className="mt-6 font-display text-4xl">
                  {p.price} <span className="text-base">ر.س</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rotate-45 border border-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`btn mt-10 w-full ${p.highlight ? "btn-solid-light" : "btn-outline"}`}
                >
                  احجز هذه الباقة
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell">
          <SectionHead eyebrow="مقارنة" title="ما الفرق بين الباقات؟" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <caption className="sr-only">مقارنة تفصيلية بين باقات التصوير</caption>
              <thead>
                <tr className="border-y border-border text-start">
                  <th scope="col" className="py-4 text-start font-normal t-caption">
                    البند
                  </th>
                  {packages.map((p) => (
                    <th key={p.name} scope="col" className="py-4 text-start font-display text-base">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-4 text-start font-normal text-muted-foreground">
                      {row.label}
                    </th>
                    <td className="py-4">{row.a}</td>
                    <td className="py-4">{row.b}</td>
                    <td className="py-4">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="خدمات أخرى"
            title="أسعار تبدأ من"
            lead="لكل خدمة نقطة انطلاق سعرية، وتُحدَّد التكلفة النهائية بعد فهم نطاق العمل."
          />
          <ul className="divide-y divide-border border-y border-border">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-wrap items-center justify-between gap-4 py-6"
                >
                  <span className="font-display text-xl transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="t-caption">{s.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell-narrow">
          <SectionHead eyebrow="أسئلة" title="الأسئلة الشائعة عن الأسعار" />
          <Accordion items={faqs} />
        </div>
      </section>
    </main>
  );
}
