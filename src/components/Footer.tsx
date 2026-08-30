import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { brand, services } from "@/data/site";

const socials = ["إنستغرام", "بيهانس", "ڤيميو", "لينكدإن"];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="border-t border-border bg-surface text-surface-foreground">
      <div className="shell grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
        <div className="lg:pl-10">
          <Logo />
          <p className="t-lead mt-6 text-sm">{brand.descriptionAr}</p>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {socials.map((s) => (
              <li key={s}>
                <a href="#" className="link-underline text-muted-foreground hover:text-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="روابط الموقع">
          <h2 className="t-eyebrow">الموقع</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { to: "/portfolio", label: "الأعمال" },
              { to: "/about", label: "عن الاستوديو" },
              { to: "/journal", label: "المدوّنة" },
              { to: "/pricing", label: "الباقات" },
              { to: "/shop", label: "المتجر" },
              { to: "/contact", label: "تواصل" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="الخدمات">
          <h2 className="t-eyebrow">الخدمات</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="link-underline text-muted-foreground hover:text-foreground"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="t-eyebrow">تواصل</h2>
          <address className="mt-6 space-y-2 text-sm not-italic text-muted-foreground">
            <p>{brand.address}</p>
            <p dir="ltr" className="text-start">
              {brand.phone}
            </p>
            <p>{brand.email}</p>
            <p>{brand.hours}</p>
          </address>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
          >
            <label htmlFor="newsletter" className="t-caption">
              النشرة البريدية — مقال واحد شهريًا
            </label>
            <div className="mt-3 flex gap-3">
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="field"
              />
              <button type="submit" className="btn btn-solid px-5 py-2.5 text-xs">
                اشترك
              </button>
            </div>
            {sent ? (
              <p role="status" className="mt-3 text-sm text-success">
                تم الاشتراك، شكرًا لك.
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-3 py-7 text-xs text-muted-foreground md:flex-row">
          <p>© ٢٠٢٦ نُور للتصوير الفوتوغرافي. جميع الحقوق محفوظة.</p>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="link-underline hover:text-foreground">
                سياسة الخصوصية
              </a>
            </li>
            <li>
              <a href="#" className="link-underline hover:text-foreground">
                الشروط والأحكام
              </a>
            </li>
            <li>
              <a href="#" className="link-underline hover:text-foreground">
                خريطة الموقع
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
