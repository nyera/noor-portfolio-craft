import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/data/site";
import { Accordion, PageHeader, Reveal } from "@/components/primitives";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "خدمات التصوير | استوديو نُور" },
      {
        name: "description",
        content:
          "تصوير أعراس، بورتريه، أزياء، تجاري، منتجات وجلسات خاصة — تفاصيل كل خدمة وأسعارها التقديرية.",
      },
      { property: "og:title", content: "خدمات التصوير — استوديو نُور" },
      { property: "og:description", content: "ست خدمات تصوير احترافية بأسعار واضحة." },
    ],
  }),
  component: ServicesArchive,
});

function ServicesArchive() {
  return (
    <main>
      <PageHeader
        eyebrow="الخدمات"
        title="خدمات التصوير"
        lead="كل خدمة لها فريقها وإعدادها وجدولها الزمني. اختر ما يناسب مشروعك، أو تواصل معنا لتصميم باقة خاصة."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "الخدمات" }]}
      />

      <section className="section">
        <div className="shell grid gap-x-8 gap-y-16 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 90}>
              <article className="group">
                <Link to="/services/$slug" params={{ slug: s.slug }}>
                  <div className="img-zoom">
                    <img
                      src={s.image}
                      alt={`${s.title} — نموذج من أعمال استوديو نُور`}
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "3 / 2" }}
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h2 className="t-h3 transition-colors group-hover:text-accent">{s.title}</h2>
                    <p className="t-caption shrink-0">{s.price}</p>
                  </div>
                  <p className="t-lead mt-3 text-sm">{s.short}</p>
                  <span className="link-underline mt-5 inline-block text-sm tracking-[0.14em]">
                    تفاصيل الخدمة
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell-narrow">
          <h2 className="t-h2 mb-10 text-center">أسئلة عامة</h2>
          <Accordion
            items={[
              { q: "كيف أعرف الخدمة المناسبة لي؟", a: "أرسل لنا تفاصيل المناسبة والتاريخ والموقع، وسنقترح الخدمة والباقة الأنسب خلال يوم عمل واحد." },
              { q: "هل الأسعار المعروضة نهائية؟", a: "الأسعار تقديرية وتبدأ من الحد الأدنى؛ يتغيّر السعر النهائي حسب المدة وعدد المصوّرين ومتطلبات التسليم." },
              { q: "هل توفّرون تصوير فيديو؟", a: "نعم، عبر فريق الفيديو الداخلي، ويمكن إضافته إلى أي خدمة." },
              { q: "ما سياسة الإلغاء؟", a: "يمكن تعديل الموعد مرة واحدة مجانًا قبل ٣٠ يومًا من التاريخ المحجوز." },
            ]}
          />
          <div className="mt-12 text-center">
            <Link to="/booking" className="btn btn-solid">
              أرسل طلب حجز
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
