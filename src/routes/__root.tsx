import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { images } from "@/data/site";

function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-80 border-t border-border bg-background/97 backdrop-blur-sm">
      <div className="shell flex flex-col items-start gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="t-caption max-w-2xl">
          نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفّح وقياس أداء المعارض. يمكنك مراجعة سياسة
          الخصوصية في أي وقت.
        </p>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => setVisible(false)} className="btn btn-outline px-5 py-2.5 text-xs">
            الأساسية فقط
          </button>
          <button onClick={() => setVisible(false)} className="btn btn-solid px-5 py-2.5 text-xs">
            موافق
          </button>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <main className="relative flex min-h-screen items-center">
      <img
        src={images.portrait1}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
      />
      <div className="shell relative py-40 text-center">
        <p className="t-eyebrow">خطأ ٤٠٤</p>
        <h1 className="t-display mt-6">يبدو أن هذه الصورة ضاعت في الطريق.</h1>
        <p className="t-lead mx-auto mt-6 max-w-xl">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة إلى الرئيسية أو تصفّح الأعمال.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn btn-solid">
            العودة للرئيسية
          </Link>
          <Link to="/portfolio" className="btn btn-outline">
            تصفّح الأعمال
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <p className="t-eyebrow">خطأ ٥٠٠</p>
        <h1 className="t-h1 mt-5">تعذّر تحميل هذه الصفحة</h1>
        <p className="t-lead mt-4">
          حدث خلل غير متوقع أثناء تحميل المحتوى. جرّب التحديث أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-solid"
          >
            إعادة المحاولة
          </button>
          <a href="/" className="btn btn-outline">
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "نُور | استوديو تصوير فوتوغرافي" },
      {
        name: "description",
        content: "استوديو نُور للتصوير الفوتوغرافي — أعراس، بورتريه، أزياء وتصوير تجاري.",
      },
      { name: "author", content: "NOOR Studio" },
      { property: "og:site_name", content: "NOOR — نُور" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_SA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const transparent = pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <Header transparent={transparent} />
      <div id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
      <Footer />
      <CookieNotice />
    </QueryClientProvider>
  );
}
