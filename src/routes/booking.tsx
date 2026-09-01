import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { packages, services } from "@/data/site";
import { PageHeader } from "@/components/primitives";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "احجز جلستك | استوديو نُور" },
      {
        name: "description",
        content:
          "املأ نموذج الحجز لتثبيت موعد جلسة التصوير مع استوديو نُور، ونعود إليك خلال ٢٤ ساعة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "احجز جلسة تصوير مع نُور" },
      { property: "og:description", content: "نموذج حجز بسيط، ورد خلال ٢٤ ساعة." },
    ],
  }),
  component: BookingPage,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "date" | "service", string>>;

function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    pkg: packages[1]!.name,
    location: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 3) e.name = "الرجاء كتابة الاسم الكامل.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "صيغة البريد الإلكتروني غير صحيحة.";
    if (form.phone.replace(/\D/g, "").length < 9) e.phone = "رقم الجوال غير مكتمل.";
    if (!form.date) e.date = "اختر تاريخًا مبدئيًا للتصوير.";
    if (!form.service) e.service = "اختر نوع الخدمة.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <main>
        <PageHeader
          eyebrow="تم الاستلام"
          title="وصلنا طلبك، شكرًا لك"
          breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "الحجز" }]}
        />
        <section className="section">
          <div className="shell-narrow border border-border p-10 text-center">
            <span aria-hidden="true" className="mx-auto mb-6 block size-3 rotate-45 border border-accent" />
            <h2 className="t-h3">سنعود إليك خلال ٢٤ ساعة</h2>
            <p className="t-lead mx-auto mt-4 max-w-md">
              أرسلنا نسخة من الطلب إلى {form.email}. سنراجع التاريخ المطلوب ونرسل لك عرضًا
              تفصيليًا وخطوات تثبيت الموعد.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link to="/portfolio" className="btn btn-solid">
                تصفّح الأعمال
              </Link>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStatus("idle")}
              >
                إرسال طلب آخر
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow="الحجز"
        title="احجز موعد جلستك"
        lead="أخبرنا بتفاصيل المناسبة، ونرسل لك خلال ٢٤ ساعة عرضًا مفصّلًا وتأكيدًا مبدئيًا للتاريخ."
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "الحجز" }]}
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <form noValidate onSubmit={onSubmit} className="grid gap-7 sm:grid-cols-2">
            {status === "error" ? (
              <div
                role="alert"
                className="sm:col-span-2 border-r-2 border-destructive bg-destructive/5 px-5 py-4 text-sm"
              >
                تعذّر إرسال الطلب — راجع الحقول المميّزة بالأسفل.
              </div>
            ) : null}

            <Field
              id="b-name"
              label="الاسم الكامل"
              value={form.name}
              onChange={set("name")}
              error={errors.name}
              required
            />
            <Field
              id="b-email"
              label="البريد الإلكتروني"
              type="email"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
              required
            />
            <Field
              id="b-phone"
              label="رقم الجوال"
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              error={errors.phone}
              required
            />
            <Field
              id="b-date"
              label="التاريخ المبدئي"
              type="date"
              value={form.date}
              onChange={set("date")}
              error={errors.date}
              required
            />

            <div>
              <label htmlFor="b-service" className="t-caption">
                نوع الخدمة *
              </label>
              <select
                id="b-service"
                className="field mt-2"
                value={form.service}
                onChange={(e) => set("service")(e.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "b-service-err" : undefined}
              >
                <option value="">اختر خدمة…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <p id="b-service-err" className="mt-2 text-xs text-destructive">
                  {errors.service}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="b-pkg" className="t-caption">
                الباقة المفضّلة
              </label>
              <select
                id="b-pkg"
                className="field mt-2"
                value={form.pkg}
                onChange={(e) => set("pkg")(e.target.value)}
              >
                {packages.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} — {p.price} ر.س
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <Field
                id="b-location"
                label="مكان التصوير"
                value={form.location}
                onChange={set("location")}
                placeholder="مثال: قاعة الواحة، الرياض"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="b-notes" className="t-caption">
                تفاصيل إضافية
              </label>
              <textarea
                id="b-notes"
                rows={5}
                className="field mt-2"
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
                placeholder="عدد الضيوف، الجدول الزمني، أي طلبات خاصة…"
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
              <button className="btn btn-solid" disabled={status === "sending"}>
                {status === "sending" ? "جارٍ الإرسال…" : "أرسل طلب الحجز"}
              </button>
              <p className="t-caption">الحقول المعلّمة بـ * مطلوبة</p>
            </div>
          </form>

          <aside className="h-fit border border-border p-8">
            <h2 className="t-h3">كيف تسير العملية؟</h2>
            <ol className="mt-8 space-y-7">
              {[
                { t: "إرسال الطلب", d: "تملأ النموذج بتفاصيل المناسبة والتاريخ المبدئي." },
                { t: "مكالمة تعارف", d: "نتحدث ٢٠ دقيقة لفهم التوقعات والأسلوب البصري." },
                { t: "تثبيت الموعد", d: "عربون ٣٠٪ يحجز التاريخ في تقويم الاستوديو." },
                { t: "يوم التصوير", d: "خطة لقطات معتمدة مسبقًا وفريق كامل في الموعد." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-5">
                  <span className="t-caption shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-lg">{s.t}</span>
                    <span className="t-lead mt-1 block text-sm">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="t-caption mt-9 border-t border-border pt-6">
              تفضّل الحديث مباشرة؟{" "}
              <Link to="/contact" className="link-underline text-foreground">
                صفحة التواصل
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string | undefined;
  required?: boolean | undefined;
  placeholder?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-caption">
        {label} {required ? "*" : ""}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`field mt-2 ${error ? "border-destructive" : ""}`}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
