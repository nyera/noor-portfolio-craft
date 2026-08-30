import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/data/site";
import { SearchOverlay } from "./SearchOverlay";

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  };

  const overHero = transparent && !scrolled;
  const tone = overHero ? "text-white" : "text-foreground";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-100 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        تخطَّ إلى المحتوى
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${tone} ${
          overHero
            ? "bg-transparent py-6"
            : "border-b border-border bg-background/92 py-3.5 backdrop-blur-md md:py-4"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Link to="/" aria-label="نُور — الصفحة الرئيسية" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="التنقّل الرئيسي" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.83rem] tracking-[0.06em]">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline py-2 opacity-80 transition-opacity hover:opacity-100"
                    activeProps={{ className: "link-underline py-2 opacity-100 font-medium" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="فتح البحث"
              className="text-xs tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100"
            >
              بحث
            </button>
            <span aria-hidden="true" className="hidden h-4 w-px bg-current opacity-25 sm:block" />
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={dark}
              className="hidden text-xs tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 sm:block"
            >
              {dark ? "فاتح" : "داكن"}
            </button>
            <span aria-hidden="true" className="hidden h-4 w-px bg-current opacity-25 sm:block" />
            <button
              type="button"
              className="hidden text-xs tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 sm:block"
              aria-label="تغيير اللغة إلى الإنجليزية"
            >
              EN
            </button>
            <Link
              to="/booking"
              className={`btn hidden px-6 py-3 text-[0.72rem] lg:inline-flex ${
                overHero ? "btn-ghost-light" : "btn-solid"
              }`}
            >
              احجز جلستك
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              className="flex flex-col items-end gap-[5px] py-2 lg:hidden"
            >
              <span aria-hidden="true" className="block h-px w-6 bg-current" />
              <span aria-hidden="true" className="block h-px w-4 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-90 bg-ink text-ink-foreground transition-opacity duration-500 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="قائمة التنقّل"
      >
        <div className="shell flex h-full flex-col py-7">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
              className="border border-ink-foreground/30 px-4 py-2 text-xs tracking-[0.2em]"
            >
              إغلاق
            </button>
          </div>

          <nav aria-label="قائمة الجوال" className="mt-14 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.to} className="border-b border-ink-foreground/10">
                  <Link
                    to={item.to}
                    className="flex items-baseline gap-4 py-4 font-display text-3xl"
                  >
                    <span className="text-[0.6rem] tracking-[0.2em] opacity-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-4">
            <Link to="/booking" className="btn btn-solid-light w-full">
              احجز جلستك
            </Link>
            <p className="t-caption text-ink-foreground/60">
              hello@noor.studio · ‎+966 55 214 8890
            </p>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
