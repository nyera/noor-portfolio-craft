import { createFileRoute, Link } from "@tanstack/react-router";
import { images, stats, testimonials } from "@/data/site";
import { Counter, PageHeader, Reveal, SectionHead } from "@/components/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن الاستوديو | نُور للتصوير الفوتوغرافي" },
      {
        name: "description",
        content:
          "قصة استوديو نُور: الفلسفة البصرية، مراحل العمل، الجوائز والعلامات التي عملنا معها.",
      },
      { property: "og:title", content: "عن استوديو نُور" },
      {
        property: "og:description",
        content: "اثنا عشر عامًا من التصوير بين الأعراس والبورتريه والأزياء.",
      },
    ],
  }),
  component: About,
});

const process = [
  { n: "٠١", t: "الاستشارة", d: "نتحدث عن المناسبة والمزاج البصري والتوقيت، ونحدد نطاق العمل." },
  { n: "٠٢", t: "التحضير", d: "لوح مزاجي، خطة لقطات، زيارة استكشافية للموقع عند الحاجة." },
  { n: "٠٣", t: "التصوير", d: "يوم التصوير بإيقاع هادئ، بأقل تدخل ممكن في مجرى اللحظة." },
  { n: "٠٤", t: "المعالجة", d: "اختيار وتنقيح بلوحة ألوان ثابتة تحافظ على هوية الصورة." },
  { n: "٠٥", t: "التسليم", d: "معرض رقمي خاص، ملفات بدقة الطباعة، وخيارات ألبوم أرشيفي." },
];

const awards = [
  { y: "٢٠٢٥", t: "جائزة الصورة الوثائقية — المركز الأول" },
  { y: "٢٠٢٤", t: "اختيار هيئة الأفلام ضمن أفضل ٢٠ مصوّرًا" },
  { y: "٢٠٢٣", t: "نشر في مجلة «إطار» — ملف خاص" },
  { y: "٢٠٢٢", t: "معرض «وُجوه» الفردي — الرياض" },
];

const clients = ["دار عود", "مجموعة ضياء", "دار مَها", "هيئة الأفلام", "مجلة إطار", "بيت الحرفة"];

function About() {
  return (
    <main>
      <PageHeader
        eyebrow="عن الاستوديو"
        title="اثنا عشر عامًا خلف العدسة، وضوءٌ واحد لم يتغيّر"
        lead="نُور استوديو تصوير مقره الرياض، يعمل على الأعراس والبورتريه والأزياء والمشاريع التجارية داخل المملكة وخارجها."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "عن الاستوديو" }]}
      />

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <img
              src={images.photographer}
              alt="بورتريه للمصوّر خالد النُّعمان داخل الاستوديو"
              loading="lazy"
              width={1024}
              height={1376}
              className="w-full object-cover"
              style={{ aspectRatio: "3 / 4" }}
            />
            <p className="t-caption mt-4">خالد النُّعمان — مؤسس الاستوديو، الرياض ٢٠٢٥</p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="t-h2">السيرة</h2>
              <div className="t-lead mt-6 space-y-6">
                <p>
                  بدأت التصوير عام ٢٠١٣ بكاميرا مستعملة وفيلم منتهي الصلاحية. عملت لسنوات في
                  التصوير الوثائقي قبل أن أنتقل إلى الأعراس، وهناك اكتشفت أن أفضل ما أجيده هو
                  الانتظار: أن أبقى في الزاوية حتى تحدث اللحظة من تلقاء نفسها.
                </p>
                <p>
                  اليوم يضم الاستوديو فريقًا من أربعة أشخاص، ونعمل على عدد محدود من المشاريع سنويًا
                  حتى نمنح كل مشروع الوقت الذي يستحقه.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="t-h2 mt-14">الفلسفة</h2>
              <p className="t-lead mt-6">
                ثلاث قواعد نلتزم بها: الضوء الطبيعي أولًا، الصدق قبل المثالية، والصمت جزء من
                التكوين. لا نضيف ما ليس موجودًا في المشهد، ولا نحذف ما يجعله حقيقيًا.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-20 text-ink-foreground">
        <div className="shell grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="t-caption mt-3 text-ink-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="طريقة العمل" title="خمس مراحل من أول رسالة حتى التسليم" />
          <ol className="divide-y divide-border border-y border-border">
            {process.map((p) => (
              <li key={p.n} className="grid gap-4 py-8 md:grid-cols-12">
                <span className="t-caption md:col-span-2">{p.n}</span>
                <h3 className="font-display text-2xl md:col-span-4">{p.t}</h3>
                <p className="t-lead text-sm md:col-span-6">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">الجوائز والمنشورات</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {awards.map((a) => (
                <li key={a.t} className="flex gap-6 py-5">
                  <span className="t-caption w-16 shrink-0">{a.y}</span>
                  <span className="text-sm leading-8">{a.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h2">علامات عملنا معها</h2>
            <ul className="mt-8 grid grid-cols-2 border-t border-r border-border">
              {clients.map((c) => (
                <li
                  key={c}
                  className="border-b border-l border-border px-6 py-10 text-center font-display text-xl"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="آراء" title="شهادات من عملاء الاستوديو" align="center" />
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name}>
                <blockquote className="font-display text-lg leading-[2]">«{t.quote}»</blockquote>
                <figcaption className="t-caption mt-6 border-t border-border pt-5">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/booking" className="btn btn-solid">
              احجز جلستك
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
