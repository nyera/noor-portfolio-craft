import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { brand } from "@/data/site";
import { Accordion, PageHeader, SectionHead } from "@/components/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | استوديو نُور" },
      {
        name: "description",
        content:
          "عنوان استوديو نُور في الرياض، أرقام التواصل، وساعات العمل، مع نموذج مراسلة مباشر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "تواصل مع استوديو نُور" },
      { property: "og:description", content: "زُر الاستوديو أو راسلنا، ونرد خلال يوم عمل." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  { q: "هل الزيارة تحتاج موعدًا مسبقًا؟", a: "نعم، نستقبل الزيارات بموعد لضمان توفّر الاستوديو ومساحة العرض." },
  { q: "كم تستغرقون للرد؟", a: "نرد على الرسائل خلال يوم عمل واحد، وعلى طلبات الحجز خلال ٢٤ ساعة." },
  { q: "هل تصوّرون خارج الرياض؟", a: "نعم، داخل المملكة وخارجها مع احتساب تكاليف السفر والإقامة." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus("error");
      return;
    }
    setStatus("sent");
  };

  return (
    <main>
      <PageHeader
        eyebrow="تواصل"
        title="زُر الاستوديو أو راسلنا"
        lead="بابنا مفتوح بموعد مسبق، ونرد على كل رسالة خلال يوم عمل واحد."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "تواصل" }]}
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="t-h3">بيانات الاستوديو</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
              {[
                { t: "العنوان", d: brand.address },
                { t: "الهاتف", d: brand.phone },
                { t: "البريد", d: brand.email },
                { t: "ساعات العمل", d: brand.hours },
              ].map((r) => (
                <div key={r.t} className="flex justify-between gap-6 py-4">
                  <dt className="t-caption">{r.t}</dt>
                  <dd dir="auto" className="text-start">
                    {r.d}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 border border-border">
              <div
                aria-label="خريطة موقع الاستوديو"
                role="img"
                className="grain flex h-56 items-center justify-center bg-surface text-surface-foreground"
              >
                <span className="t-caption">خريطة الموقع — حي السفارات، الرياض</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
                <p className="t-caption">مواقف مجانية أمام المبنى</p>
                <a href="#" className="link-underline text-sm">
                  الاتجاهات
                </a>
              </div>
            </div>

            <p className="t-lead mt-10 text-sm">
              تبحث عن حجز جلسة مباشرة؟{" "}
              <Link to="/booking" className="link-underline text-foreground">
                انتقل إلى نموذج الحجز
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="t-h3">أرسل رسالة</h2>

            {status === "sent" ? (
              <div className="mt-8 border border-border p-10 text-center">
                <span aria-hidden="true" className="mx-auto mb-5 block size-3 rotate-45 border border-accent" />
                <h3 className="font-display text-2xl">تم إرسال رسالتك</h3>
                <p className="t-lead mx-auto mt-3 max-w-sm text-sm">
                  شكرًا {form.name}، سنعود إليك على {form.email} خلال يوم عمل.
                </p>
                <button
                  type="button"
                  className="btn btn-outline mt-8"
                  onClick={() => {
                    setForm({ name: "", email: "", subject: "", message: "" });
                    setStatus("idle");
                  }}
                >
                  رسالة جديدة
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
                {status === "error" ? (
                  <p
                    role="alert"
                    className="sm:col-span-2 border-r-2 border-destructive bg-destructive/5 px-5 py-4 text-sm"
                  >
                    تحقّق من الاسم والبريد الإلكتروني، واكتب رسالة لا تقل عن ١٠ أحرف.
                  </p>
                ) : null}

                <div>
                  <label htmlFor="c-name" className="t-caption">
                    الاسم *
                  </label>
                  <input
                    id="c-name"
                    className="field mt-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="t-caption">
                    البريد الإلكتروني *
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className="field mt-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-subject" className="t-caption">
                    الموضوع
                  </label>
                  <input
                    id="c-subject"
                    className="field mt-2"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-msg" className="t-caption">
                    الرسالة *
                  </label>
                  <textarea
                    id="c-msg"
                    rows={6}
                    className="field mt-2"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button className="btn btn-solid sm:w-fit">إرسال الرسالة</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell-narrow">
          <SectionHead eyebrow="أسئلة" title="قبل أن تراسلنا" />
          <Accordion items={faqs} />
        </div>
      </section>
    </main>
  );
}
