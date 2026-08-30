import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { images, posts } from "@/data/site";
import { Breadcrumbs, Tag } from "@/components/primitives";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const i = posts.findIndex((p) => p.slug === params.slug);
    if (i === -1) throw notFound();
    return {
      post: posts[i],
      prev: posts[(i - 1 + posts.length) % posts.length],
      next: posts[(i + 1) % posts.length],
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "المقال غير متاح" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | مدوّنة نُور` },
        { name: "description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
      ],
    };
  },
  component: SinglePost,
});

function SinglePost() {
  const { post, prev, next } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <header className="shell pt-36 pb-10 md:pt-44">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", to: "/" },
            { label: "المدوّنة", to: "/journal" },
            { label: post.title },
          ]}
        />
        <p className="t-eyebrow mt-8">{post.category}</p>
        <h1 className="t-h1 mt-4 max-w-4xl">{post.title}</h1>
        <p className="t-caption mt-6">
          بقلم {post.author} · {post.date} · {post.readingTime}
        </p>
      </header>

      <figure className="shell">
        <img
          src={post.image}
          alt={post.title}
          className="w-full object-cover"
          style={{ aspectRatio: "16 / 9" }}
        />
        <figcaption className="t-caption mt-3">
          {post.title} — من أرشيف استوديو نُور
        </figcaption>
      </figure>

      <article className="shell-narrow py-16">
        <p className="t-lead border-r-2 border-accent pr-6 text-lg">{post.excerpt}</p>

        <div className="mt-12 space-y-8 text-[1.02rem] leading-[2.2]">
          {post.body.map((p, i) => (
            <div key={i}>
              {i === 1 ? (
                <figure className="my-12">
                  <img
                    src={images.detail1}
                    alt="تفاصيل يد العروس بضوء دافئ"
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: "4 / 3" }}
                  />
                  <figcaption className="t-caption mt-3">
                    الضوء الجانبي قبل الغروب بأربعين دقيقة
                  </figcaption>
                </figure>
              ) : null}
              <p>{p}</p>
            </div>
          ))}

          <blockquote className="my-12 border-r-2 border-foreground pr-6 font-display text-2xl leading-[2]">
            «الصورة الجيدة لا تُلتقط، بل يُسمح لها بالحدوث.»
          </blockquote>
        </div>

        <ul className="mt-12 flex flex-wrap gap-3">
          {["تصوير", post.category, "استوديو نُور"].map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-border py-6">
          <p className="t-caption">مشاركة المقال</p>
          <ul className="flex gap-5 text-sm">
            {["إكس", "واتساب", "لينكدإن", "نسخ الرابط"].map((s) => (
              <li key={s}>
                <button type="button" className="link-underline">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <section className="mt-12 flex gap-6 border border-border p-7">
          <img
            src={images.photographer}
            alt={post.author}
            loading="lazy"
            className="size-24 shrink-0 object-cover grayscale"
          />
          <div>
            <h2 className="font-display text-xl">{post.author}</h2>
            <p className="t-lead mt-2 text-sm">
              مصوّر في استوديو نُور، يكتب عن الضوء وطرق العمل داخل الاستوديو.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="t-h3">التعليقات (٣)</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {[
              { n: "ريم", d: "قبل ٣ أيام", c: "مقال عملي جدًا، جرّبت النافذتين في جلسة الأسبوع الماضي والنتيجة ممتازة." },
              { n: "فيصل", d: "قبل أسبوع", c: "هل ينطبق نفس التوقيت في المدن الساحلية؟" },
              { n: "نورة", d: "قبل أسبوعين", c: "شكرًا على المشاركة، بانتظار مقال عن معالجة الألوان." },
            ].map((c) => (
              <li key={c.n} className="py-5">
                <p className="text-sm font-medium">
                  {c.n} <span className="t-caption">· {c.d}</span>
                </p>
                <p className="t-lead mt-2 text-sm">{c.c}</p>
              </li>
            ))}
          </ul>
          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="cn" className="t-caption">
                الاسم
              </label>
              <input id="cn" className="field mt-2" />
            </div>
            <div>
              <label htmlFor="ce" className="t-caption">
                البريد الإلكتروني
              </label>
              <input id="ce" type="email" className="field mt-2" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="cc" className="t-caption">
                تعليقك
              </label>
              <textarea id="cc" rows={4} className="field mt-2" />
            </div>
            <button className="btn btn-solid sm:w-fit">أرسل التعليق</button>
          </form>
        </section>
      </article>

      <nav className="shell flex items-center justify-between gap-6 border-t border-border py-10">
        <Link to="/journal/$slug" params={{ slug: prev.slug }} className="group text-start" rel="prev">
          <span className="t-caption block">المقال السابق</span>
          <span className="mt-1 block font-display text-lg transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
        <Link to="/journal/$slug" params={{ slug: next.slug }} className="group text-end" rel="next">
          <span className="t-caption block">المقال التالي</span>
          <span className="mt-1 block font-display text-lg transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      </nav>

      <section className="section bg-surface text-surface-foreground">
        <div className="shell">
          <h2 className="t-h3 mb-10">مقالات ذات صلة</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <article key={p.slug} className="group">
                <Link to="/journal/$slug" params={{ slug: p.slug }}>
                  <div className="img-zoom">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-lg transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="t-caption mt-2">{p.date}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
